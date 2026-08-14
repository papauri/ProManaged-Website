# ProManaged IT — WEBSITE BUILDER (catalogue + plan)

**Status: awaiting review. Nothing has been built.** This file is the capability
catalogue and the plan for a second builder. The page, stylesheet, script and
endpoint are not written yet, by decision — the catalogue and its delivery-status
labels are to be reviewed first.

---

## 1. PURPOSE

The same guided experience as the Hospitality System Builder, but for anyone who
wants a website — and deliberately spanning the whole range, from a five-page
brochure site to a product with paying users.

> **Tell us what it needs to do. We'll show you what it would take to build.**

The commercial job is identical: help someone understand what they actually need,
let them select only that, explain how the pieces connect, and produce a
structured discovery brief instead of "please contact me".

## 2. RELATIONSHIP TO THE HOSPITALITY BUILDER

**Decision taken: separate copy, no refactor.** `js/hospitality_builder.js`,
`css/hospitality_builder.css`, `php/hospitality.php`, `php/hospitality_catalogue.php`
and `pages/hospitality_builder.html` are **not to be touched**. The website builder
gets its own near-duplicate set.

The cost of that decision, recorded so it is not a surprise later: the mechanism
is duplicated, so every future fix to the card, the map, the progression or the
submission path has to be made twice, and there will be two test suites covering
the same logic. That is accepted in exchange for zero risk to a page that is
already shipped and verified.

`js/interface_motion.js` already supports `data-cursor-calm` and needs no change —
the new page simply uses the attribute.

## 3. THE FORK THAT MAKES ONE PAGE SERVE BOTH ENDS

`pages/custom_websites.html` already draws the right line:

> A website mainly presents information. A web app lets people log in and do
> things — book appointments, manage data, track orders.

So chapter 01 asks **"does anyone log in?"** — and that single answer is what
separates a brochure site from a product. It should visibly change what the rest
of the page emphasises rather than just being stored.

### Chapter 01 — questions

| Question | Control | Notes |
| --- | --- | --- |
| What is this site for? | Choice chips | Show what we do · Take bookings or orders · A tool our team uses · A product with paying users · Not sure yet |
| Does anyone log in? | Choice chips | Nobody · Our team · Our customers · Both |
| Roughly how many pages? | Stepper | Same accessible +/- control as the room count. "Not sure" must be reachable. |
| What do you have today? | Choice chips (multi) | Nothing yet · A site we have outgrown · A site that needs rebuilding · Social pages only |
| Anything it absolutely must do? | Optional free text | The most useful box on the page, as with the hospitality note. |

## 4. CORE — every build includes these

Not selectable. Presented as the floor, exactly as the hospitality foundation is.

| id | Name | Title direction | Status |
| --- | --- | --- | --- |
| `pages` | Pages & content | The pages themselves, written to be read. | Built before |
| `mobile` | Built for phones | Designed for a phone first, not squeezed onto one. | Built before |
| `enquiry` | A way to reach you | A form that reaches a real inbox, not a black hole. | Built before |
| `hosting` | Hosting, domain & SSL | Set up and handed over working. | Built before |

## 5. OPTIONAL MODULES — 13, in four groups

Grouped from the start; eleven flat was already proven to be a wall.

### Group 1 — Being found (4)
| id | Name | Status |
| --- | --- | --- |
| `seo` | Search-friendly setup | Built before |
| `blog` | Blog or news | Proposed module |
| `gallery` | Photo gallery | Built before |
| `languages` | More than one language | Proposed module |

### Group 2 — Letting people do something (4)
| id | Name | Status | Depends on |
| --- | --- | --- | --- |
| `bookings` | Bookings & appointments | Built before | `enquiry` |
| `payments` | Online payments | Proposed module | works with `bookings`, `shop` |
| `shop` | Shop / e-commerce | Proposed module | works with `payments` |
| `accounts` | Customer accounts | Proposed module | works with `bookings` |

### Group 3 — Running it yourself (3)
| id | Name | Status | Depends on |
| --- | --- | --- | --- |
| `cms` | Edit content yourself | Built before | `pages` |
| `admin` | Team logins & admin area | Built before | works with `cms` |
| `reports` | Reports & numbers | Proposed module | works with `bookings` |

### Group 4 — When it becomes a product (2)
| id | Name | Status |
| --- | --- | --- |
| `saas` | Multi-tenant product | Proposed module |
| `integrations` | Custom integrations | Custom development |

## 6. THE DELIVERY-STATUS CONTRACT — EVIDENCE FOR EVERY "BUILT BEFORE"

Same rule as `.claude/HOSPITALITY_SYSTEM_BUILDER.md` §19, and the same
enforcement: the permitted set is asserted in the test suites, so promoting a
capability without widening the allow-list fails the build.

Every claim below rests on the read-only inspection of the two delivered hotel
systems (14 Aug 2026) or on this repository itself. **Nothing rests on marketing
copy.**

| id | Evidence |
| --- | --- |
| `pages` | Both delivered hotel sites are full multi-page public sites. |
| `mobile` | This repository is mobile-first throughout (`css/tokens.css` is the phone composition). |
| `enquiry` | `php/contact.php`, `php/booking.php`, PHPMailer over SMTP, in production. |
| `hosting` | Both client systems are hosted and served under TLS on `promanaged-it.com`. |
| `seo` | Delivered sites carry deliberate SEO titles and meta descriptions. **Scope the claim narrowly to page structure, titles and descriptions — not rankings, and never a traffic promise.** |
| `gallery` | An "Explore Our Hotel" gallery section on both delivered sites. |
| `bookings` | A full multi-step booking engine with live availability on both. |
| `cms` | The digital menu and the events module are both owner-editable content, per tenant. |
| `admin` | An authenticated Admin Portal with CSRF protection and password reset on both. |

### Deliberately NOT "Built before" — and why

- **`payments`** — the hotel booking pages mention card and bank transfer as
  *policy text*. That is not an integrated payment module. Do not promote without
  real evidence.
- **`saas`** — the hotel booking form carries a `client_uuid`, which is genuine
  evidence of tenant-scoped architecture. It is **not** evidence of a
  multi-tenant product offered to customers, which is a different thing. Proposed.
- **`blog`, `languages`, `shop`, `accounts`, `reports`** — no evidence found.

> **Known tension, flagged for your decision.** `pages/custom_websites.html`
> publicly states that ProManaged builds "Multi-tenant SaaS products, from first
> version to scale" and "Subscription billing and user accounts". Those are
> capability claims about what you *can* build. This catalogue treats them as
> Proposed because I could not verify them as *delivered*. If they have in fact
> been delivered somewhere I have not seen, tell me and I will promote them and
> widen the allow-list. I have not changed the existing page's copy either way.

## 7. WHAT CARRIES OVER UNCHANGED

Confirmed working and verified on the hospitality page; reuse the same patterns:

- module card with status chip, why, workflow steps, relationships;
- dependency explanation — core targets explained, optional targets actionable,
  never a dead-end "Add" button;
- the evolving system map, with only new tiles animating;
- three-group chunking with per-group spans;
- guided progression: completion-driven advances plus a continue control on every
  chapter, `focusin` in the abandon list, free-text field blur as a trigger;
- `data-cursor-calm` on the builder wrapper;
- `behavior: 'instant'` per scroll frame — `'auto'` defers to the stylesheet's
  `scroll-behavior: smooth` and the travel stops short;
- `.hb-card-detail[hidden]` equivalent — a class `display` rule beats `[hidden]`
  and leaves every panel open;
- submission as IDs only, labels resolved server-side from an allow-list, fixed
  core never read from the request.

## 8. WHAT MUST BE WRITTEN FRESH

- the catalogue above, with `why` and `story` prose per module;
- chapter 01's questions and their state;
- the workflow-story generator and the summary-paragraph generator — these are
  hand-written prose in the hospitality file and do not transfer;
- all chapter copy.

## 9. PROPOSED FILES

- `pages/website_builder.html`
- `css/website_builder.css`
- `js/website_builder.js`
- `php/website.php`
- `php/website_catalogue.php`
- `tests/website_builder.test.js`
- `tests/website_endpoint.test.php`
- `pages/custom_websites.html` — a second entry CTA beside the hospitality one.

**No navigation tile.** `css/navbar.css` composes the bento panel for exactly
seven tiles, with per-tile stagger delays 1–7 and minor tiles at `span 4`. An
eighth broke the row last time and this would be a ninth. Both builders stay
reachable from the Build page.

## 10. OPEN QUESTIONS FOR REVIEW

1. **The catalogue itself** — is anything missing that people actually ask you
   for, and is anything here something you would rather not offer?
2. **The `saas` / `payments` tension in §6** — delivered anywhere I have not seen?
3. **Should the log-in answer change the page?** My recommendation: yes — when
   nobody logs in, groups 3 and 4 are visibly de-emphasised as "probably not you"
   rather than hidden, so a brochure-site visitor is not weighing thirteen
   choices. This is the strongest anti-overwhelm mechanic available and I would
   build it unless you say otherwise.
4. **Does this replace the hospitality builder as the general route**, or sit
   beside it? Assumption: beside it, with hospitality kept as the specialist page.

## 11. DEFINITION OF DONE — for the build cycle, once approved

Same bar as the hospitality builder, which means all of:

- [ ] Catalogue and labels approved.
- [ ] Every capability explains why it matters and how it runs.
- [ ] Dependencies explained, never silently applied, never a dead-end.
- [ ] System visual evolves; summary generated only from actual selections.
- [ ] Structured brief reaches ProManaged; branded internal + customer emails.
- [ ] Both test suites written and passing, including the Built-before allow-list.
- [ ] Verified in a browser at 375, 430, 768, 1024, 1440, 1600, 1920 — no overflow.
- [ ] Contrast measured, not eyeballed, on elements that own a text node directly.
- [ ] Zero console errors; existing pages and contracts untouched.
