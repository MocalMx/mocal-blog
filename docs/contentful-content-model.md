# Contentful content model

The blog sources its articles from Contentful through `gatsby-source-contentful`. The content model is versioned in [`contentful/content-model.json`](../contentful/content-model.json) in the format used by the Contentful CLI (`contentTypes` + `editorInterfaces`), so a new space can be bootstrapped without clicking through the UI.

## Content types

| Name (must match exactly) | ID | Used for |
|---------------------------|----|----------|
| `Category` | `category` | Badge, breadcrumbs, home categories (`title`, `slug`, `iconName`) |
| `Blog Post Author` | `blogPostAuthor` | Byline (`username`, `firstName`, `lastName`, `bio`, `avatar`) |
| `Blog Post` | `blogPost` | Article page `/articles/{slug}` (`title`, `slug`, `abstract`, `seoKeywords`, `coverImage`, `categories`, `author`, `content`) |

> **Names matter.** `gatsby-source-contentful` builds GraphQL types from the content type **name** (`useNameForId` defaults to `true`), e.g. `Blog Post Author` → `ContentfulBlogPostAuthor`. Renaming a content type breaks the queries in `src/graphql/contentful.fragments.ts` and `src/pages/`. Field IDs are also referenced by those queries.

`Blog Post.categories` is a single reference to `Category` (not an array), because the code reads `post.categories.title`.

## Import into a new space

1. Create a Content Management API personal access token in the target Contentful account (Settings → CMA tokens).
2. Import the model (content types and editor interfaces only, no entries):

   ```bash
   npx contentful-cli space import \
     --space-id <NEW_SPACE_ID> \
     --environment-id master \
     --management-token <CMA_TOKEN> \
     --content-file contentful/content-model.json
   ```

3. Create a Content Delivery API key in the new space and update `GATSBY_CONTENTFUL_SPACE_ID` / `GATSBY_CONTENTFUL_ACCESS_TOKEN` (see [environment-variables.md](environment-variables.md)).
4. Run `npm run build` to confirm the queries resolve.

## Migrating existing entries

If the old space is still accessible, export it (model + entries + assets) and import it into the new one:

```bash
npx contentful-cli space export --space-id <OLD_SPACE_ID> --management-token <OLD_CMA_TOKEN> \
  --content-file contentful/export.json --download-assets
npx contentful-cli space import --space-id <NEW_SPACE_ID> --management-token <NEW_CMA_TOKEN> \
  --content-file contentful/export.json --asset-directory <export-assets-dir>
```

Do not commit `contentful/export.json` (it contains content, not just the model).

## Provenance

`content-model.json` was reconstructed from the fields the code queries (`src/graphql/contentful.fragments.ts`, `src/pages/`) and the generated GraphQL types. Validations (unique slugs, image-only assets, linked content types), required flags and widgets are reasonable defaults, not a verbatim export. If you can still export the old space, diff its `contentTypes` against this file.
