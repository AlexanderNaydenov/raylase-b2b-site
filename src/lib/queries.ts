const heroImageFields = `
  heroImage {
    url
    width
    height
  }
`;

export const PRODUCTS_INDEX = `
  query ProductsIndex {
    products(orderBy: sortOrder_ASC) {
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
  query ProductBySlug($slug: String!) {
    products(where: { slug: $slug }, first: 1) {
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
  query ProductSlugs {
    products {
      slug
    }
  }
`;

export const FEATURED_PRODUCTS = `
  query FeaturedProducts {
    products(where: { isFeatured: true }, orderBy: sortOrder_ASC) {
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
  query MarketingPages {
    marketingPages(orderBy: eventDate_ASC) {
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
  query MarketingBySlug($slug: String!) {
    marketingPages(where: { slug: $slug }, first: 1) {
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
  query MarketingSlugs {
    marketingPages {
      slug
    }
  }
`;
