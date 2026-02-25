# WordPress + ACF Schema Checklist (Kaarshe Web)

This project fetches page content from WordPress Pages (by **slug**) and reads **ACF fields** from the REST response (`page.acf`). Research documents are optionally fetched from a WordPress **Custom Post Type** (CPT).

## Step-by-step setup checklist (do this in order)

- Set WP **Permalinks** to “Post name”.
- Ensure ACF fields are exposed in REST (ACF PRO REST support, or install an “ACF to REST API” plugin).
- Confirm your WP REST base works: `https://YOUR_DOMAIN/wp-json/wp/v2` and set `WORDPRESS_API_BASE` in your Next.js env.
- Create WP Pages with these slugs: `home`, `about`, `vision`, `research`, `book-speaking`, `contact`, `privacy-policy`, `terms-and-conditions`, `disclaimer`.
- Create a WP Page with slug `site-settings` and set `WORDPRESS_SITE_SETTINGS_PAGE_SLUG` (optional but recommended).
- Create ACF Field Group(s) for `site-settings` and add: `header.*`, `footer.*`, `branding.*`, `seo.*`, `newsletter_modal.*`.
- Create ACF Field Group(s) for each page slug (Home/About/Vision/Research/Book Speaking/Contact) and add the fields listed below in this doc.
- For every ACF Image field, set Return Format to **Image Array**.
- Create the Research CPT (default slug `research`) with `show_in_rest: true` and set `WORDPRESS_RESEARCH_POST_TYPE` if you use a different slug.
- Create the Research taxonomy (recommended `research_category`) with `show_in_rest: true`.
- (Optional) Create a Newsletter Subscriber CPT (default slug `newsletter_subscriber`) with `show_in_rest: true` for `POST /api/newsletter/subscribe`.
- (Optional) Create a WP Application Password and set `WORDPRESS_APP_USER` + `WORDPRESS_APP_PASSWORD` (required for newsletter submissions).
- (Optional) Set `REVALIDATE_SECRET` to use `POST /api/revalidate` after WP edits.
- Add a few WP **Posts** (blog) with featured images; the frontend fetches these from `/wp/v2/posts`.
- Sanity check: visit the site and verify each page renders; then adjust content in WP and revalidate (or wait for ISR).

## Production / launch checklist

- Frontend env vars are set on your host (not only locally):
  - `WORDPRESS_API_BASE`
  - `WORDPRESS_SITE_SETTINGS_PAGE_SLUG` (if using site settings; default `site-settings`)
  - `REVALIDATE_SECRET` (if using `/api/revalidate`)
  - `WORDPRESS_RESEARCH_POST_TYPE` (if not using default `research`)
  - Newsletter storage (optional): `WORDPRESS_APP_USER`, `WORDPRESS_APP_PASSWORD`, `WORDPRESS_NEWSLETTER_POST_TYPE`
- WordPress REST responses include `acf` for Pages/CPT items (ACF REST plugin/config verified).
- CPTs are REST-enabled:
  - Research CPT `show_in_rest: true` and taxonomy `show_in_rest: true`
  - Newsletter subscriber CPT `show_in_rest: true` (only if you want real newsletter submissions)
- `site-settings` page exists and contains:
  - Header nav + CTA
  - Footer columns + newsletter copy + copyright
  - Branding logo text/image
  - SEO fields + OG image
  - Newsletter modal settings
- Optional instant updates:
  - WP Webhooks (or similar) calls `POST /api/revalidate` with header `x-revalidate-secret`
  - Test by editing `site-settings` and confirming the site updates immediately
- Quick smoke tests after deploy:
  - Home/About/Vision/Research/Contact/Book Speaking render without fallback placeholders
  - Blog list + single post render from WP Posts
  - Header logo/nav updates when you edit `site-settings`
  - Footer newsletter form can submit (if configured) and returns success

## Prerequisites

- **Expose ACF in REST**: ensure your WordPress returns the `acf` object in REST responses for pages and CPT items.
  - Common approaches: ACF PRO + REST support, or a plugin like “ACF to REST API”.
- **Permalinks**: use “Post name” permalinks (recommended) so slugs behave predictably.
- **CPT/Taxonomy REST** (Research): set `show_in_rest: true` on the CPT and its taxonomy.

## Slugs / Env Variables

Required WP API base:

- `WORDPRESS_API_BASE` — example: `https://blog.kaarshe.com/wp-json/wp/v2`

These environment variables control which WP Page slug is fetched:

- `WORDPRESS_HOME_PAGE_SLUG` (default: `home`)
- `WORDPRESS_ABOUT_PAGE_SLUG` (default: `about`)
- `WORDPRESS_VISION_PAGE_SLUG` (default: `vision`)
- `WORDPRESS_RESEARCH_PAGE_SLUG` (default: `research`)
- `WORDPRESS_BOOK_SPEAKING_PAGE_SLUG` (default: `book-speaking`)
- `WORDPRESS_PUBLICATIONS_PAGE_SLUG` (default: `publications`) (not implemented yet in frontend)

Legal pages (WordPress Pages rendered from editor content):

- `WORDPRESS_PRIVACY_POLICY_PAGE_SLUG` (default: `privacy-policy`)
- `WORDPRESS_TERMS_AND_CONDITIONS_PAGE_SLUG` (default: `terms-and-conditions`)
- `WORDPRESS_DISCLAIMER_PAGE_SLUG` (default: `disclaimer`)

Research CPT:

- `WORDPRESS_RESEARCH_POST_TYPE` (default: `research`)

Optional “site settings” (Header/Footer):

- Recommended: create a WP Page with slug `site-settings` and store global settings in its ACF fields.
- If you do this, add: `WORDPRESS_SITE_SETTINGS_PAGE_SLUG` (recommended value: `site-settings`)

Optional “site settings” (Branding/SEO/Newsletter modal):

- The project supports dynamic **logo/wordmark**, **SEO metadata**, and **Home newsletter modal** settings from the same `site-settings` ACF.
- If fields are missing in WP, the frontend falls back to `siteConfig` defaults.

Newsletter subscription storage (optional, for real submissions):

- The frontend posts to `POST /api/newsletter/subscribe`.
- This server route creates a record in WordPress via REST and requires Application Password auth.
- Env vars:
  - `WORDPRESS_APP_USER`
  - `WORDPRESS_APP_PASSWORD`
  - `WORDPRESS_NEWSLETTER_POST_TYPE` (default: `newsletter_subscriber`)

Revalidation (optional, for ISR):

- `REVALIDATE_SECRET` — shared secret used by `POST /api/revalidate`

## ACF Data Shapes Supported

### Strings

Use simple Text / Textarea fields.

### Images (`acfImage`)

The frontend accepts either:

- **Image URL** (string), or
- **Image Array** (object) with at least `url` (and optionally `alt`).

Recommended ACF field setting:

- Image field “Return Format”: **Image Array**.

### Arrays of objects

Where the UI expects a list of items with keys like `title`, `icon`, etc., use **Repeater** fields.

### Arrays of strings (important)

Some fields represent a “list of strings” (bullets, paragraphs, objectives).

The frontend accepts **either**:

- a raw `string[]` (if your REST layer returns it that way), **or**
- an ACF **Repeater** (array of objects). In repeater rows, the frontend will pick a string from common keys like `text`, `value`, `label`, `title`, `name` (and will also fall back to the first string value it finds in the row).

These list fields are:

- `about.biography.paragraphs`
- `home.policy_highlights.policies[].points`
- `vision.pillars[].points`
- `vision.strategies[].objectives`

Recommended WP/ACF setup: use a **Repeater** with a single sub-field named `text`.

---

# Global content (Header + Footer)

These are usually not “page content” — they’re global site settings.

Recommended approach (works without extra plugins):

1. Create a WordPress Page named “Site Settings” with slug `site-settings`.
2. Attach an ACF Field Group “Site Settings” to that page.
3. Store all Header/Footer content there (nav labels, links, socials, footer columns, etc.).

Alternative approach (more “WordPress native”, but typically needs plugins):

- Use WP Menus + a REST API plugin for menus.

Suggested ACF fields on `site-settings`:

## Header

- `header.cta_label` (Text) — e.g. “Contact”
- `header.cta_href` (Text) — e.g. `/contact`
- `header.nav` (Repeater) rows:
  - `label` (Text)
  - `href` (Text)

## Footer

- `footer.tagline` (Textarea)
- `footer.socials` (Repeater) rows:
  - `label` (Text)
  - `href` (Text)
  - `icon` (Text) — Material symbol name, or keep icon inference in code
- `footer.columns` (Repeater) rows:
  - `title` (Text)
  - `links` (Repeater) rows:
    - `label` (Text)
    - `href` (Text)
- `footer.copyright` (Text)

Optional additions supported by the layout/components (recommended if you want _everything_ editable):

- `footer.headings.quick_links` (Text)
- `footer.headings.resources` (Text)
- `footer.headings.legal` (Text)
- `footer.copyright` (Text) — e.g. `© 2026 KAARSHE. All rights reserved.`

## Branding (optional)

Suggested (supported in the current frontend):

- `branding.logo_text` (Text) — e.g. `KAARSHE`
- `branding.logo_image` (Image) — WP media image (Return format: Image Array)

## SEO (optional)

Suggested (supported in the current frontend):

- `seo.site_name` (Text)
- `seo.short_name` (Text)
- `seo.description` (Textarea)
- `seo.og_image` (Image) or URL (Text)
- `seo.twitter_creator` (Text) — e.g. `@kaarshe`
- `seo.google_verification` (Text)

## Newsletter modal (optional)

The Home newsletter modal reads its settings from `site-settings` and only appears on `/`.

- `newsletter_modal.enabled` (True/False)
- `newsletter_modal.delay_ms` (Number)
- `newsletter_modal.title` (Text)
- `newsletter_modal.description` (Textarea)
- `newsletter_modal.email_placeholder` (Text)
- `newsletter_modal.button_label` (Text)
- `newsletter_modal.success_message` (Text)

---

# Newsletter subscriptions (storage in WordPress)

The site’s newsletter forms (modal, footer, and newsletter section component) POST to the Next.js route:

- `POST /api/newsletter/subscribe`

That route then creates a record in WordPress via REST.

## Option A (recommended): Create a "Newsletter Subscriber" CPT

Create a CPT with slug `newsletter_subscriber` and set:

- `show_in_rest: true`
- `supports: ["title", "editor"]` (minimum)

The API route creates a post with:

- `title`: the subscriber email
- `status`: `publish`
- `content`: includes a simple `source:` label (modal/footer/section)

You can use any CPT slug by setting:

- `WORDPRESS_NEWSLETTER_POST_TYPE` (default: `newsletter_subscriber`)

## Auth requirements

This integration uses WordPress **Application Passwords** (Basic Auth) from server-side env vars:

- `WORDPRESS_APP_USER`
- `WORDPRESS_APP_PASSWORD`

The WP user must have permission to create posts of that CPT via REST.

## Notes / limitations

- No dedupe is enforced yet (submitting the same email twice will create two entries).
- Consider adding server-side rate limiting (at the edge/proxy) to reduce spam.

---

# Blog (WordPress Posts)

Yes — the blog is **separate** from the “Pages by slug” system.

The frontend fetches:

- Blog list: WordPress **Posts** (`/wp-json/wp/v2/posts`) with pagination
- Single post: WordPress **Posts** by `slug`

This means you manage blog content as normal WordPress Posts (title/body/excerpt/featured image), not as ACF-on-Pages.

## WP fields used (core)

The UI is driven primarily by standard WP post fields:

- `slug`
- `date`
- `title.rendered`
- `excerpt.rendered`
- `content.rendered`

Featured image + author/terms are pulled via REST embedding (`?_embed=1`) when available.

## Optional extras

- You can still attach ACF fields to Posts if you want extra metadata, but the current blog UI does not require it.
- If you want category/tag filtering later, ensure the taxonomies you use are visible in REST (default WP categories/tags already are).

Notes:

- You can keep the Header/Footer _layout_ in Next.js, but move the _content_ (labels/URLs) to WP.
- The project already supports fallbacks, so you can migrate gradually.

---

# Page: Home (slug `home`)

File mapping: `src/app/page.tsx`

You can implement fields as **nested groups** (preferred) or **flat aliases**. The frontend checks both.

## Group `hero`

- `hero.title` (Text)
- `hero.title_highlight` (Text)
- `hero.title_suffix` (Text)
- `hero.title_highlight_2` (Text)
- `hero.description` (Textarea)
- `hero.image` (Image)

CTA fields (either grouped or flat):

- `hero.cta_primary_label` (Text)
- `hero.cta_primary_href` (Text)
- `hero.cta_primary_icon` (Text) — Material Symbol name, e.g. `arrow_forward`
- `hero.cta_secondary_label` (Text)
- `hero.cta_secondary_href` (Text)

Flat aliases also accepted:

- `hero_title`, `hero_title_highlight`, `hero_title_suffix`, `hero_title_highlight_2`, `hero_description`, `hero_image`
- `cta_primary_label`, `cta_primary_href`, `cta_primary_icon`, `cta_secondary_label`, `cta_secondary_href`

## Group `mission`

- `mission.quote_icon` (Text) — Material Symbol name, e.g. `format_quote`
- `mission.text` (Textarea)

Flat aliases also accepted:

- `mission_quote_icon`, `mission_text`

## Group `policy_highlights`

- `policy_highlights.title` (Text)
- `policy_highlights.policies` (Repeater) rows:
  - `icon` (Text) — Material Symbol name
  - `title` (Text)
  - `description` (Textarea)
  - `points` (list of strings) — raw `string[]` OR Repeater rows (recommended: sub-field `text`)

Flat aliases also accepted:

- `policy_highlights_title`
- `policies` (for the repeater itself)

## Group `insights`

This section’s **posts** come from WordPress Posts automatically. ACF is only used for the section headings:

- `insights.badge` (Text)
- `insights.title` (Text)

Flat aliases also accepted:

- `insights_badge`, `insights_title`

---

# Page: About (slug `about`)

File mapping: `src/app/about/page.tsx`

## Group `hero`

- `hero.badge` (Text)
- `hero.title` (Text)
- `hero.description` (Textarea)
- `hero.stats.years` (Text)
- `hero.stats.label` (Text)
- `hero.image` (Image)

Flat aliases also accepted:

- `hero_badge`, `hero_title`, `hero_description`, `hero_years`, `hero_years_label`, `hero_image`

## Group `biography`

- `biography.quote` (Textarea)
- `biography.paragraphs` (list of strings) — raw `string[]` OR Repeater rows (recommended: sub-field `text`)

Flat aliases also accepted:

- `bio_quote`, `bio_paragraphs`

## Field `values`

- `values` (Repeater) rows:
  - `icon` (Text)
  - `title` (Text)
  - `description` (Textarea)

Flat alias also accepted:

- `core_values`

## Field `milestones`

- `milestones` (Repeater) rows:
  - `year` (Text)
  - `title` (Text)
  - `description` (Textarea)
  - `icon` (Text)

Flat alias also accepted:

- `timeline`

---

# Page: Book Speaking (slug `book-speaking`)

File mapping: `src/app/book-speaking/page.tsx` + `src/app/book-speaking/BookSpeakingClient.tsx`

## Group `hero`

- `hero.title` (Text)
- `hero.description` (Textarea)

Flat aliases also accepted:

- `page_title`, `page_description`

## Field `topics`

- `topics` (Repeater) rows:
  - `icon` (Text) — Material Symbol name, e.g. `campaign`
  - `title` (Text)
  - `description` (Textarea)
  - `bullets` (list of strings) — raw `string[]` OR Repeater rows (recommended: sub-field `text`)

## Group `format_options` (Format options section)

- `format_options.title` (Text)
- `format_options.description` (Textarea)
- `format_options.options` (Repeater) rows:
  - `label` (Text)
  - `detail` (Text) — e.g. `30–60 min`

Flat aliases also accepted:

- `format_title`, `format_description`

## Group `request` (Request speaking section)

- `request.title` (Text)
- `request.description` (Textarea)
- `request.response_note` (Text) — e.g. `Typical response: 1–2 business days`
- `request.submit_label` (Text) — button label (idle)
- `request.success_label` (Text) — button label (success)

Flat aliases also accepted:

- `request_title`, `request_description`, `request_response_note`, `request_submit_label`, `request_success_label`

## Group `form` (Request speaking form labels/placeholders)

- `form.organization_label` (Text)
- `form.organization_placeholder` (Text)
- `form.email_label` (Text)
- `form.email_placeholder` (Text)
- `form.date_label` (Text)
- `form.format_label` (Text)
- `form.notes_label` (Text)
- `form.notes_placeholder` (Text)

Flat aliases also accepted:

- `form_organization_label`, `form_organization_placeholder`
- `form_email_label`, `form_email_placeholder`
- `form_date_label`, `form_format_label`
- `form_notes_label`, `form_notes_placeholder`

---

# Page: Vision (slug `vision`)

File mapping: `src/app/vision/page.tsx`

## Group `hero`

- `hero.title` (Text)
- `hero.title_highlight` (Text)
- `hero.description` (Textarea)

Flat aliases also accepted:

- `hero_title`, `hero_title_highlight`, `hero_description`

## Field `pillars`

- `pillars` (Repeater) rows:
  - `icon` (Text)
  - `title` (Text)
  - `description` (Textarea)
  - `points` (list of strings) — raw `string[]` OR Repeater rows (recommended: sub-field `text`)

Flat alias also accepted:

- `policy_pillars`

## Group `quote`

- `quote.text` (Textarea)
- `quote.author` (Text)
- `quote.title` (Text)

Flat aliases also accepted:

- `quote_text`, `quote_author`, `quote_title`

## Field `strategies`

- `strategies` (Repeater) rows:
  - `id` (Text) — used in URL `?topic=...` (example values: `economy`, `healthcare`, etc.)
  - `title` (Text)
  - `description` (Textarea)
  - `image` (Image or URL string)
  - `objectives` (list of strings) — raw `string[]` OR Repeater rows (recommended: sub-field `text`)

Flat alias also accepted:

- `topics`

---

# Page: Research (slug `research`)

File mapping: `src/app/research/page.tsx`

## Group `hero`

- `hero.badge` (Text)
- `hero.title` (Text)
- `hero.title_highlight` (Text)
- `hero.description` (Textarea)
- `hero.stats` (Repeater) rows:
  - `icon` (Text)
  - `label` (Text)

Flat aliases also accepted:

- `hero_badge`, `hero_title`, `hero_title_highlight`, `hero_description`, `hero_stats`

---

# Legal & misc pages (Privacy / Terms / Disclaimer / Book-speaking / Contact)

Recommendation:

- If a page is mostly rich text (legal pages), manage it as a normal WP **Page** using the WP editor, and fetch/render `page.content.rendered`.
- If a page has a custom layout or UI behavior (Contact page map, “Book speaking” CTA blocks), keep the React layout but store all copy/images in **ACF** on the corresponding WP Page.

Suggested slugs:

- `privacy-policy`
- `terms-and-conditions`
- `disclaimer`
- `book-speaking`
- `contact`

Minimal ACF pattern for these pages:

- `hero.badge` (Text)
- `hero.title` (Text)
- `hero.title_highlight` (Text)
- `hero.description` (Textarea)
- `hero.image` (Image) (optional)

For Contact specifically (if you want it CMS-driven):

- `contact.address_label` (Text) — e.g. “Office Address”
- `contact.address` (Textarea)
- `contact.map_embed_url` (URL/Text) — optional if you want to swap the iframe URL via CMS
- `contact.phone` (Text)
- `contact.email` (Text)
- `contact.socials` (Repeater) rows: `label`, `href`, `icon`

---

# CPT: Research Items (post type default `research`)

File mapping: `src/app/research/page.tsx`

## Requirements

- CPT slug: `research` (or set `WORDPRESS_RESEARCH_POST_TYPE`)
- Must be queryable in REST: `/wp-json/wp/v2/research`
- Taxonomy (recommended): `research_category` with `show_in_rest: true`

The frontend categorizes each item by term embedded in `_embedded["wp:term"]` where `term.taxonomy` matches:

- `research_category` (preferred)
- `category` (fallback)

## Core WP fields used

- `title.rendered` (required)
- `excerpt.rendered` (recommended for description)
- `content.rendered` (optional; used to estimate read time if ACF is missing)
- `date` (optional)

## ACF fields read from each CPT item

Any of these keys will work (aliases are checked):

- **Download URL** (recommended)
  - `download_url` or `downloadUrl` or `pdf` or `file`
  - Accepted formats:
    - URL string, or
    - File array/object with `url`

- **Author**
  - `author` or `author_name` (Text)

- **Read time**
  - `read_time` or `readTime` (Text) e.g. `8 min read`
  - If missing, frontend estimates from HTML content.

---

## Quick sanity checklist

- Pages exist with slugs: `home`, `about`, `vision`, `research`.
- Each page has an ACF Field Group assigned (Location rules).
- The WP REST response for those pages includes `acf`.
- Research CPT is visible in REST and returns `_embed` terms (taxonomy configured).
