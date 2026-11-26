import type { GatsbyNode } from "gatsby";

/**
 * Explicitly declare all queried Contentful GraphQL types and fields so
 * empty optional fields in Contentful (e.g. Category.iconName in a freshly
 * migrated space) never disappear from Gatsby's inferred schema and break
 * `gatsby build`.
 *
 * `@dontInfer` is intentionally omitted so these definitions merge cleanly
 * with `gatsby-source-contentful` (interfaces, `gatsbyImage`, `sys`, etc.).
 * Linked fields and Contentful TextNodes must use `@link(by: "id", from: "<field>___NODE")`
 * because `gatsby-source-contentful` stores references under `___NODE` keys.
 */
export const createSchemaCustomization: GatsbyNode["createSchemaCustomization"] = ({
  actions,
}) => {
  actions.createTypes(`
    type ContentfulCategory implements Node {
      title: String
      slug: String
      iconName: String
    }

    type contentfulBlogPostAuthorBioTextNode implements Node {
      bio: String
    }

    type ContentfulBlogPostAuthor implements Node {
      username: String
      firstName: String
      lastName: String
      bio: contentfulBlogPostAuthorBioTextNode @link(by: "id", from: "bio___NODE")
      avatar: ContentfulAsset @link(by: "id", from: "avatar___NODE")
    }

    type ContentfulBlogPostContent {
      raw: String
    }

    type ContentfulBlogPost implements Node {
      title: String
      slug: String
      abstract: String
      seoKeywords: [String]
      createdAt: Date @dateformat
      updatedAt: Date @dateformat
      categories: ContentfulCategory @link(by: "id", from: "categories___NODE")
      author: ContentfulBlogPostAuthor @link(by: "id", from: "author___NODE")
      coverImage: ContentfulAsset @link(by: "id", from: "coverImage___NODE")
      content: ContentfulBlogPostContent
    }

    type ContentfulAsset implements Node {
      description: String
    }
  `);
};
