import { useEffect } from 'react'
import { APP_NAME, buildTitle } from '../../core/constants/metadata'
import { useProfile } from '../../application/hooks/useProfile'

interface SEOProps {
  title: string
  description: string
}

export function SEO({ title, description }: SEOProps) {
  const { profile } = useProfile()

  useEffect(() => {
    const appName = profile?.siteTitle || APP_NAME
    const faviconUrl = profile?.faviconUrl || '/vite.svg'

    document.title = buildTitle(title, appName)

    const meta = document.querySelector('meta[name="description"]')
    if (meta) {
      meta.setAttribute('content', description)
    } else {
      const created = document.createElement('meta')
      created.name = 'description'
      created.content = description
      document.head.appendChild(created)
    }

    const faviconLink =
      document.querySelector<HTMLLinkElement>('link[rel="icon"]') ??
      document.querySelector<HTMLLinkElement>('link[rel="shortcut icon"]')

    if (faviconLink) {
      faviconLink.href = faviconUrl
    } else {
      const createdLink = document.createElement('link')
      createdLink.rel = 'icon'
      createdLink.href = faviconUrl
      document.head.appendChild(createdLink)
    }
  }, [title, description, profile?.siteTitle, profile?.faviconUrl])

  return null
}
