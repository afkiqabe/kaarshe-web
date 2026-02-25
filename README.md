# Kaarshe Web

A modern website built with **Next.js (App Router)** and powered by a **Headless WordPress CMS** (REST API + ACF). Content is managed in WordPress and rendered on the frontend with **ISR caching** and an optional webhook-based revalidation flow.

> Status: content-driven (Headless WP). The Publications section is intentionally disabled.

---

## Description

Kaarshe Web is a production-grade website platform where non-technical editors can manage pages, navigation, footer content, SEO defaults, blog posts, and more directly in WordPress. The Next.js frontend focuses on performance, accessibility, and a clean UI—while WordPress remains the single source of truth for content.

---

## Features

- **Headless WordPress** via REST (`/wp-json/wp/v2`) + ACF fields exposed in the API
- **Dynamic pages** driven by WordPress Pages + ACF (Home, About, Vision, Contact, Legal pages, etc.)
- **Blog** backed by WordPress Posts (list + single post pages)
- **Research** section backed by a WordPress Custom Post Type (CPT)
- **Global site settings** (header/nav, footer, branding, social links, newsletter modal copy, SEO defaults) via a WP page (slug: `site-settings`)
- **ISR caching + tag-based invalidation** for fast, scalable content delivery
- **Revalidation endpoint** (`POST /api/revalidate`) for webhook-driven updates
- **Newsletter subscribe endpoint** (`POST /api/newsletter/subscribe`) that can store subscribers in WordPress via a CPT (optional)
- **Dark/light theme** with persistent user preference

---

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **UI:** React 19, Tailwind CSS
- **CMS:** WordPress (Headless), ACF (Advanced Custom Fields)
- **Linting:** ESLint

---

## Installation

### Prerequisites

- Node.js (recommended: **18+**)
- A WordPress site with:
  - REST API enabled (default)
  - ACF installed (recommended)

### Setup

1. Install dependencies

```bash
npm install
```

2. Create your environment file

```bash
cp .env.example .env.local
```

3. Fill in required variables in `.env.local` (see **Environment Variables** below).

4. Run the dev server

```bash
npm run dev
```

Then open: http://localhost:3000

---

## Usage

### Development

```bash
npm run dev
```

### Production build

```bash
npm run build
npm run start
```

### Lint

```bash
npm run lint
```

---

## Environment Variables

Create `.env.local` (do not commit) and set the values below.

### Required

| Variable             |                             Example | Description                                                                |
| -------------------- | ----------------------------------: | -------------------------------------------------------------------------- |
| `WORDPRESS_API_BASE` | `https://example.com/wp-json/wp/v2` | Base URL for WordPress REST API v2                                         |
| `REVALIDATE_SECRET`  |                      `super-secret` | Secret expected by `POST /api/revalidate` via `x-revalidate-secret` header |

### Optional (recommended)

| Variable                         |                         Example | Description                                                                 |
| -------------------------------- | ------------------------------: | --------------------------------------------------------------------------- |
| `WORDPRESS_APP_USER`             |                      `api-user` | WordPress user for Application Password auth (used by newsletter subscribe) |
| `WORDPRESS_APP_PASSWORD`         | `xxxx xxxx xxxx xxxx xxxx xxxx` | WordPress Application Password                                              |
| `WORDPRESS_NEWSLETTER_POST_TYPE` |         `newsletter_subscriber` | CPT slug to store newsletter subscribers in WP                              |

### Optional (content model overrides)

These let you customize which WordPress slugs/post-types the frontend reads from.

| Variable                                   |                Default | Used For                                              |
| ------------------------------------------ | ---------------------: | ----------------------------------------------------- |
| `WORDPRESS_SITE_SETTINGS_PAGE_SLUG`        |        `site-settings` | Global header/footer/branding/SEO/newsletter settings |
| `WORDPRESS_HOME_PAGE_SLUG`                 |                 `home` | Home page content                                     |
| `WORDPRESS_ABOUT_PAGE_SLUG`                |                `about` | About page content                                    |
| `WORDPRESS_VISION_PAGE_SLUG`               |               `vision` | Vision page content                                   |
| `WORDPRESS_CONTACT_PAGE_SLUG`              |              `contact` | Contact page content                                  |
| `WORDPRESS_BOOK_SPEAKING_PAGE_SLUG`        |        `book-speaking` | Book/Speaking page content                            |
| `WORDPRESS_DISCLAIMER_PAGE_SLUG`           |           `disclaimer` | Disclaimer page content                               |
| `WORDPRESS_PRIVACY_POLICY_PAGE_SLUG`       |       `privacy-policy` | Privacy Policy page content                           |
| `WORDPRESS_TERMS_AND_CONDITIONS_PAGE_SLUG` | `terms-and-conditions` | Terms page content                                    |
| `WORDPRESS_RESEARCH_PAGE_SLUG`             |             `research` | Research landing page content                         |
| `WORDPRESS_RESEARCH_POST_TYPE`             |             `research` | Research CPT slug                                     |

---

## API Endpoints

### `POST /api/revalidate`

Used to invalidate cached pages/tags (ideal for WordPress webhooks).

**Headers**

- `x-revalidate-secret: <REVALIDATE_SECRET>`
- `content-type: application/json`

**Body** (at least one of the fields is required)

```json
{
  "slug": "my-post-slug",
  "paths": ["/", "/blog"],
  "tags": ["wp:posts", "wp:post:my-post-slug"]
}
```

**Example**

```bash
curl -X POST "http://localhost:3000/api/revalidate" \
	-H "content-type: application/json" \
	-H "x-revalidate-secret: $REVALIDATE_SECRET" \
	-d '{"paths":["/","/blog"],"tags":["wp:posts"]}'
```

### `POST /api/newsletter/subscribe`

Stores a newsletter signup. By default this endpoint attempts to create a WordPress post in a CPT (e.g. `newsletter_subscriber`).

**Body**

```json
{
  "email": "person@example.com",
  "source": "footer"
}
```

**Notes**

- Requires `WORDPRESS_APP_USER` and `WORDPRESS_APP_PASSWORD` (Application Password) to be set.
- If not configured, the endpoint returns `501` with a helpful message.

---

## Folder Structure

```txt
.
├── public/                 # Static assets (images, fonts)
├── src/
│   ├── app/                # Next.js App Router routes
│   │   ├── api/            # API routes (revalidate, newsletter)
│   │   └── ...             # Pages (home, blog, about, etc.)
│   ├── components/         # UI + layout components
│   ├── hooks/              # Reusable React hooks
│   ├── lib/                # WordPress client + ACF helpers + utilities
│   └── styles/             # Shared styling helpers
├── .env.example            # Safe template for environment variables
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

## Screenshots

Add screenshots under `docs/screenshots/` and link them here.

```md
![Home](docs/screenshots/home.png)
![Blog](docs/screenshots/blog.png)
![Single Post](docs/screenshots/post.png)
```

---

## Future Improvements

- Add automated tests (unit + integration) for WordPress fetching, ACF parsing, and API routes
- Add spam protection + rate limiting for newsletter signup
- Add deduplication for newsletter subscribers (avoid repeated emails)
- Add “Preview mode” for editors (draft previews from WordPress)
- Add structured logging/monitoring for production debugging

---

## Contributing

Contributions are welcome.

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/my-change`)
3. Commit your changes (`git commit -m "Add my change"`)
4. Push the branch (`git push origin feature/my-change`)
5. Open a Pull Request

---

## License

No license file is included yet. If you want this to be open source, add a `LICENSE` file (MIT is a common choice).

---

## Author

**Mohamed Salad**

<!-- - Website: _add link_ -->
- LinkedIn: _https://www.linkedin.com/in/afkiqabe/_
- Email: _afkiqabe1@gmail.com_
