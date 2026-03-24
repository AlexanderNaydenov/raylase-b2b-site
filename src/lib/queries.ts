const heroImageFields = `
  heroImage {
    url
    width
    height
  }
`;

export const PRODUCTS_INDEX = `
  query ProductsIndex($locales: [Locale!]!, $stage: Stage!) {
    products(orderBy: sortOrder_ASC, locales: $locales, stage: $stage) {
      id
      title
      slug
      subtitle
      excerpt
      ${heroImageFields}
      isFeatured
      category {
        name
        slug
      }
    }
  }
`;

export const PRODUCT_BY_SLUG = `
  query ProductBySlug($slug: String!, $locales: [Locale!]!, $stage: Stage!) {
    products(where: { slug: $slug }, first: 1, locales: $locales, stage: $stage) {
      id
      title
      slug
      subtitle
      excerpt
      ${heroImageFields}
      isFeatured
      category {
        name
        slug
      }
      body {
        html
      }
      specs {
        label
        value
      }
      relatedProducts {
        id
        title
        slug
        subtitle
        excerpt
        ${heroImageFields}
        category {
          name
          slug
        }
      }
    }
  }
`;

export const PRODUCT_SLUGS = `
  query ProductSlugs($locales: [Locale!]!, $stage: Stage!) {
    products(locales: $locales, stage: $stage) {
      slug
    }
  }
`;

export const FEATURED_PRODUCTS = `
  query FeaturedProducts($locales: [Locale!]!, $stage: Stage!) {
    products(where: { isFeatured: true }, orderBy: sortOrder_ASC, locales: $locales, stage: $stage) {
      id
      title
      slug
      subtitle
      excerpt
      ${heroImageFields}
      category {
        name
        slug
      }
    }
  }
`;

export const MARKETING_PAGES = `
  query MarketingPages($locales: [Locale!]!, $stage: Stage!) {
    marketingPages(orderBy: eventDate_ASC, locales: $locales, stage: $stage) {
      id
      title
      slug
      pageType
      excerpt
      eventDate
      location
      ${heroImageFields}
    }
  }
`;

export const MARKETING_BY_SLUG = `
  query MarketingBySlug($slug: String!, $locales: [Locale!]!, $stage: Stage!) {
    marketingPages(where: { slug: $slug }, first: 1, locales: $locales, stage: $stage) {
      id
      title
      slug
      pageType
      excerpt
      eventDate
      location
      ${heroImageFields}
      body {
        html
      }
    }
  }
`;

export const MARKETING_SLUGS = `
  query MarketingSlugs($locales: [Locale!]!, $stage: Stage!) {
    marketingPages(locales: $locales, stage: $stage) {
      slug
    }
  }
`;
