#!/usr/bin/env node
import { execSync } from 'node:child_process'
import { readFileSync } from 'node:fs'

const args = new Set(process.argv.slice(2))
const stagedOnly = args.has('--staged')

const secretPatterns = [
  {
    name: 'Supabase service role assignment',
    pattern:
      /SUPABASE_SERVICE_ROLE_KEY\s*=\s*(?!\.\.\.|<[^>]+>|\$\{?SUPABASE_SERVICE_ROLE_KEY\}?)[^\s#]+/g,
  },
  {
    name: 'Supabase secret key token',
    pattern: /\bsb_secret_[a-zA-Z0-9]{20,}\b/g,
  },
  {
    name: 'JWT-like credential',
    pattern: /\beyJ[A-Za-z0-9_-]{20,}\.[A-Za-z0-9_-]{20,}\.[A-Za-z0-9_-]{20,}\b/g,
  },
  {
    name: 'Private key block',
    pattern: /-----BEGIN (?:RSA |EC |OPENSSH |)PRIVATE KEY-----/g,
  },
  {
    name: 'AWS access key',
    pattern: /\bAKIA[0-9A-Z]{16}\b/g,
  },
]

function getFileList() {
  const command = stagedOnly
    ? 'git diff --cached --name-only --diff-filter=ACMRTUXB'
    : 'git ls-files'

  return execSync(command, { encoding: 'utf8' })
    .split('\n')
    .map((item) => item.trim())
    .filter(Boolean)
    .filter((file) => !file.startsWith('dist/'))
}

function isLikelyText(contentBuffer) {
  const length = Math.min(contentBuffer.length, 1024)
  for (let index = 0; index < length; index += 1) {
    if (contentBuffer[index] === 0) {
      return false
    }
  }

  return true
}

const findings = []

for (const filePath of getFileList()) {
  let buffer

  try {
    buffer = readFileSync(filePath)
  } catch {
    continue
  }

  if (!isLikelyText(buffer)) {
    continue
  }

  const content = buffer.toString('utf8')

  for (const descriptor of secretPatterns) {
    const match = descriptor.pattern.exec(content)
    descriptor.pattern.lastIndex = 0

    if (!match) {
      continue
    }

    findings.push({
      filePath,
      kind: descriptor.name,
      sample: String(match[0]).slice(0, 80),
    })
  }
}

if (findings.length > 0) {
  console.error('Secret scan failed. Potential credentials found:')
  for (const finding of findings) {
    console.error(`- ${finding.filePath} (${finding.kind}): ${finding.sample}`)
  }
  process.exit(1)
}

console.log(`Secret scan passed (${stagedOnly ? 'staged files' : 'tracked files'}).`)
