'use client';

import Head from 'next/head';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: 'website' | 'article';
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  tags?: string[];
}

export default function SEO({
  title = 'Wanderlust Chronicles - AI-Powered Professional Travel Blog',
  description = 'Discover the world through AI-enhanced travel stories, professional insights, and stunning destinations. Experience extraordinary journeys with our executive-grade travel content platform.',
  keywords = ['travel', 'ai travel blog', 'professional travel', 'travel destinations', 'wanderlust chronicles', 'travel stories', 'travel guides', 'executive travel'],
  image = 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1200&h=630&fit=crop',
  url = 'https://wanderlustchronicles.vercel.app',
  type = 'website',
  publishedTime,
  modifiedTime,
  author = 'Wanderlust Chronicles Team',
  tags = []
}: SEOProps) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': type === 'article' ? 'Article' : 'WebSite',
    name: title,
    description,
    url,
    image,
    author: {
      '@type': 'Organization',
      name: author
    },
    publisher: {
      '@type': 'Organization',
      name: 'Wanderlust Chronicles',
      logo: {
        '@type': 'ImageObject',
        url: `${url}/logo.png`
      }
    },
    ...(type === 'article' && {
      headline: title,
      datePublished: publishedTime,
      dateModified: modifiedTime || publishedTime,
      keywords: [...keywords, ...tags].join(', '),
      articleSection: 'Travel',
      wordCount: 1200,
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': url
      }
    }),
    ...(type === 'website' && {
      potentialAction: {
        '@type': 'SearchAction',
        target: `${url}/search?q={search_term_string}`,
        'query-input': 'required name=search_term_string'
      }
    })
  };

  return (
    <Head>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="keywords" content={[...keywords, ...tags].join(', ')} />
      <meta name="author" content={author} />
      <meta name="robots" content="index, follow" />
      <meta name="language" content="English" />
      <meta name="revisit-after" content="7 days" />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:locale" content="en_US" />
      <meta property="og:site_name" content="Wanderlust Chronicles" />
      
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />
      <meta property="twitter:creator" content="@WanderlustChron" />
      <meta property="twitter:site" content="@WanderlustChron" />
      
      {/* Article specific meta tags */}
      {type === 'article' && (
        <>
          <meta property="article:author" content={author} />
          <meta property="article:section" content="Travel" />
          {tags.map((tag) => (
            <meta key={tag} property="article:tag" content={tag} />
          ))}
          {publishedTime && (
            <meta property="article:published_time" content={publishedTime} />
          )}
          {modifiedTime && (
            <meta property="article:modified_time" content={modifiedTime} />
          )}
        </>
      )}
      
      {/* Canonical URL */}
      <link rel="canonical" href={url} />
      
      {/* Favicons */}
      <link rel="icon" href="/favicon.ico" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData)
        }}
      />
      
      {/* Additional SEO enhancements */}
      <meta name="theme-color" content="#8b5cf6" />
      <meta name="msapplication-TileColor" content="#8b5cf6" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
      <meta name="format-detection" content="telephone=no" />
      
      {/* Preconnect for performance */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="preconnect" href="https://images.unsplash.com" />
      
      {/* DNS prefetch for external resources */}
      <link rel="dns-prefetch" href="//www.google-analytics.com" />
      <link rel="dns-prefetch" href="//fonts.googleapis.com" />
      <link rel="dns-prefetch" href="//images.unsplash.com" />
    </Head>
  );
}