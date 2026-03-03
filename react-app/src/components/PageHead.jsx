import { useEffect } from 'react'

const BASE_URL = 'https://altorlab.com'

const PageHead = ({ title, description, slug, datePublished, dateModified }) => {
  useEffect(() => {
    // Set document title
    document.title = title

    // Set or update meta tags
    const setMeta = (attr, key, content) => {
      let el = document.querySelector(`meta[${attr}="${key}"]`)
      if (!el) {
        el = document.createElement('meta')
        el.setAttribute(attr, key)
        document.head.appendChild(el)
      }
      el.setAttribute('content', content)
    }

    setMeta('name', 'description', description)
    setMeta('name', 'title', title)
    setMeta('property', 'og:title', title)
    setMeta('property', 'og:description', description)
    setMeta('property', 'og:url', `${BASE_URL}${slug}`)
    setMeta('property', 'og:type', 'article')
    setMeta('property', 'og:image', `${BASE_URL}/og-image.png`)
    setMeta('name', 'twitter:card', 'summary_large_image')
    setMeta('name', 'twitter:title', title)
    setMeta('name', 'twitter:description', description)
    setMeta('name', 'twitter:image', `${BASE_URL}/og-image.png`)

    // Set canonical URL
    let canonical = document.querySelector('link[rel="canonical"]')
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.setAttribute('rel', 'canonical')
      document.head.appendChild(canonical)
    }
    canonical.setAttribute('href', `${BASE_URL}${slug}`)

    // Inject Article JSON-LD
    const jsonLd = {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: title,
      description,
      url: `${BASE_URL}${slug}`,
      datePublished,
      dateModified: dateModified || datePublished,
      author: {
        '@type': 'Organization',
        name: 'Altor',
        url: BASE_URL,
      },
      publisher: {
        '@type': 'Organization',
        name: 'Altor',
        url: BASE_URL,
        logo: {
          '@type': 'ImageObject',
          url: `${BASE_URL}/favicon.svg`,
        },
      },
    }

    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.id = 'page-jsonld'
    script.textContent = JSON.stringify(jsonLd)

    // Remove any existing page-specific JSON-LD
    const existing = document.getElementById('page-jsonld')
    if (existing) existing.remove()

    document.head.appendChild(script)

    return () => {
      const el = document.getElementById('page-jsonld')
      if (el) el.remove()
    }
  }, [title, description, slug, datePublished, dateModified])

  return null
}

export default PageHead
