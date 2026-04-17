import { useEffect } from 'react'

const BASE_URL = 'https://altorlab.com'

const PageHead = ({
  title,
  description,
  slug,
  datePublished,
  dateModified,
  breadcrumbs,
  schemaType = 'Article',
  extraSchema,
}) => {
  useEffect(() => {
    document.title = title

    const setMeta = (attr, key, content) => {
      let el = document.querySelector(`meta[${attr}="${key}"]`)
      if (!el) {
        el = document.createElement('meta')
        el.setAttribute(attr, key)
        document.head.appendChild(el)
      }
      el.setAttribute('content', content)
    }

    const url = `${BASE_URL}${slug}`

    setMeta('name', 'description', description)
    setMeta('name', 'title', title)
    setMeta('name', 'robots', 'index, follow, max-snippet:-1, max-image-preview:large')
    setMeta('property', 'og:title', title)
    setMeta('property', 'og:description', description)
    setMeta('property', 'og:url', url)
    setMeta('property', 'og:type', schemaType === 'Article' ? 'article' : 'website')
    setMeta('property', 'og:image', `${BASE_URL}/og-image.png`)
    setMeta('name', 'twitter:card', 'summary_large_image')
    setMeta('name', 'twitter:title', title)
    setMeta('name', 'twitter:description', description)
    setMeta('name', 'twitter:image', `${BASE_URL}/og-image.png`)

    let canonical = document.querySelector('link[rel="canonical"]')
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.setAttribute('rel', 'canonical')
      document.head.appendChild(canonical)
    }
    canonical.setAttribute('href', url)

    const graph = []

    const publisher = {
      '@type': 'Organization',
      name: 'Altor',
      url: BASE_URL,
      logo: { '@type': 'ImageObject', url: `${BASE_URL}/favicon.svg` },
    }

    if (schemaType === 'Article') {
      graph.push({
        '@type': 'Article',
        '@id': `${url}#article`,
        headline: title,
        description,
        url,
        datePublished,
        dateModified: dateModified || datePublished,
        author: { '@type': 'Organization', name: 'Altor', url: BASE_URL },
        publisher,
      })
    } else if (schemaType === 'WebPage') {
      graph.push({
        '@type': 'WebPage',
        '@id': `${url}#webpage`,
        name: title,
        description,
        url,
        datePublished,
        dateModified: dateModified || datePublished,
        publisher,
      })
    }

    if (breadcrumbs && breadcrumbs.length > 0) {
      graph.push({
        '@type': 'BreadcrumbList',
        '@id': `${url}#breadcrumb`,
        itemListElement: breadcrumbs.map((crumb, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          name: crumb.name,
          item: crumb.url ? `${BASE_URL}${crumb.url}` : undefined,
        })),
      })
    }

    if (extraSchema) {
      const extras = Array.isArray(extraSchema) ? extraSchema : [extraSchema]
      graph.push(...extras)
    }

    const jsonLd = {
      '@context': 'https://schema.org',
      '@graph': graph.length === 1 ? graph : graph,
    }

    const existing = document.getElementById('page-jsonld')
    if (existing) existing.remove()

    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.id = 'page-jsonld'
    script.textContent = JSON.stringify(jsonLd)
    document.head.appendChild(script)

    return () => {
      const el = document.getElementById('page-jsonld')
      if (el) el.remove()
    }
  }, [title, description, slug, datePublished, dateModified, breadcrumbs, schemaType, extraSchema])

  return null
}

export default PageHead
