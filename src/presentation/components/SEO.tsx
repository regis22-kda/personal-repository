import { useEffect } from 'react'
import { buildTitle } from '../../core/constants/metadata'

interface SEOProps {
  title: string
  description: string
}

export function SEO({ title, description }: SEOProps) {
  useEffect(() => {
    document.title = buildTitle(title)

    const meta = document.querySelector('meta[name="description"]')
    if (meta) {
      meta.setAttribute('content', description)
      return
    }

    const created = document.createElement('meta')
    created.name = 'description'
    created.content = description
    document.head.appendChild(created)
  }, [title, description])

  return null
}
