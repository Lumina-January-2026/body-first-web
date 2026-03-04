interface ArticleData {
  type: 'Article';
  title: string;
  description: string;
  author: string;
  publishedAt: string;
  updatedAt?: string;
  url: string;
}

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQData {
  type: 'FAQPage';
  items: FAQItem[];
}

interface WebSiteData {
  type: 'WebSite';
  name: string;
  url: string;
}

type StructuredDataProps = ArticleData | FAQData | WebSiteData;

export default function StructuredData(props: StructuredDataProps) {
  let jsonLd: Record<string, unknown>;

  switch (props.type) {
    case 'Article':
      jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: props.title,
        description: props.description,
        author: {
          '@type': 'Organization',
          name: props.author,
        },
        datePublished: props.publishedAt,
        dateModified: props.updatedAt || props.publishedAt,
        url: props.url,
        publisher: {
          '@type': 'Organization',
          name: 'Body First',
        },
      };
      break;
    case 'FAQPage':
      jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: props.items.map((item) => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: item.answer,
          },
        })),
      };
      break;
    case 'WebSite':
      jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: props.name,
        url: props.url,
      };
      break;
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
