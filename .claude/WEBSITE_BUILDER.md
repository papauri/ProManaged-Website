# ProManaged IT — WEBSITE BUILDER

**Status: built, verified and shipped.** `pages/website_builder.html` and its
stylesheet, script, endpoint and two test suites are live. This file is the
catalogue of record and the reasoning behind it.

---

## 1. PURPOSE

The same guided experience as the Hospitality System Builder, for someone who
wants a **straightforward business website**.

> **Tell us what your site needs to do. We'll show you what it would take.**

The commercial job is identical: help someone understand what they need, let them
select only that, explain how the pieces connect, and produce a structured
discovery brief rather than "please contact me".

## 2. SCOPE — DELIBERATELY SMALL

**Decision taken: keep this to simpler websites.**

An earlier draft spanned brochure sites through to SaaS with subscription
billing. That is cut, and the reasoning is recorded because it will be tempting to
widen this later:

A configurator that offers a customer a *product with paying users* as a
checkbox, when we cannot point at one we have delivered, does not read as
ambitious. It reads as a business promising anything you click. The builder's
persuasive force comes from almost every capability being something we have
genuinely built — and one unverifiable claim sitting among them damages the ones
that are true.

**The rule: everything in the catalogue is delivered work, except one honest
catch-all.** Ten of the eleven capabilities are things we have built and can show
running. That ratio is asserted by `tests/website_builder.test.js` and is the
thing to protect if this catalogue is ever revisited.

**There is no "Proposed module" tier here**, unlike the hospitality builder. A row
of proposed chips is the same over-claim problem in a quieter font. A capability
is either delivered work or it is the catch-all.

### Explicitly out of scope

Subscription billing, e-commerce, customer logins, reporting dashboards,
multi-language. None verified as delivered. Removed rather than labelled — they
are covered by `custom` if someone asks.

### Multi-tenant: added back, and why that is not a contradiction

`multisite` was cut in the first pass and then restored, correctly. The evidence
is solid and was verified directly: both hotel systems run on **one build** with
tenant-scoped data — identical structure, separate content, separate admin,
neither able to see the other, with a `client_uuid` on the booking form.

The distinction that matters, and that the copy holds to: we have delivered **one
system serving several businesses**. We have *not* delivered a self-service SaaS
product that customers sign up to and are billed for. The module claims the
former and says nothing about the latter.

## 3. RELATIONSHIP TO THE HOSPITALITY BUILDER

**Decision taken: separate copy, no refactor.** The website builder is its own
near-duplicate set. The hospitality files were not restructured.

The cost, recorded so it is not a surprise: the mechanism is duplicated, so every
future fix to the card, the map, the progression or the submission path must be
made twice, and two suites cover the same logic. Accepted in exchange for zero
risk to a page already shipped and verified.

One exception was made deliberately during this build: a **one-line contrast fix**
to `css/hospitality_builder.css` (see §8). That is a shipped accessibility defect,
not a refactor.

`js/interface_motion.js` already supported `data-cursor-calm`; the new page uses
the attribute and the shared file was not changed.

## 3B. THE STEP GATE — HOW THE BUILDER IS SHOWN

Added after the builder shipped, because the page was presenting the whole
instrument to everyone: a visitor who had not decided they wanted a website
scrolled into six interactive chapters with no stated purpose, and the closing form
could be reached with chapter 01 never answered.

The rules now, shared with the hospitality builder and enforced by
`node tests/builder_flow.test.js`:

1. The page opens on `#begin` — a plain gate that says what the form is, that it is
   not a quote, roughly how long it takes, and that no contact details are asked for
   until the last step. One control opens the instrument.
2. Beside it, a static numbered outline of all seven steps. It answers "what am I
   filling in" before anything is asked, reads with JavaScript off, and tracks
   Done / You are here / Locked once the builder is open.
3. One chapter at a time. The continue control reveals the next chapter and refuses
   to advance while the current one is incomplete.
4. Chapter 01's requirement is **both** the purpose and the current situation —
   every suggestion the rest of the page makes is shaped by those two answers. The
   page count has a default and the free-text box is optional, so neither gates.
5. The closing form refuses to submit an incomplete configuration. `php/website.php`
   validates independently and remains the real gate.

Mechanics live in `js/builder_flow.js` / `css/builder_flow.css`; see
`.claude/SYSTEM_MAP.md` for the capture-phase and load-order contracts. This file's
catalogue, chapter content and endpoint behaviour are unchanged by it.

## 4. CHAPTER 01 — QUESTIONS

| Question | Control | Options |
| --- | --- | --- |
| What is the site mainly for? | Choice chips | Show what we do · Take bookings or enquiries · Share updates and photos · Not sure yet |
| Roughly how many pages? | Stepper (1–200, default 6) | "A guess is fine" |
| What do you have today? | Choice chips (multi) | Nothing yet · A site we have outgrown · A site that needs rebuilding · Social pages only |
| Anything it must do? | Optional free text | The most useful box on the page |

The earlier "does anyone log in?" fork went with the SaaS end of the range; there
is no longer a brochure-versus-product split to detect.

## 5. ALWAYS INCLUDED — 4

Not selectable. Presented as the floor.

| id | Name | Status |
| --- | --- | --- |
| `pages` | Pages & content | Built before |
| `mobile` | Built for phones | Built before |
| `enquiry` | A way to reach you | Built before |
| `hosting` | Hosting, domain & SSL | Built before |

## 6. OPTIONAL MODULES — 7, in three groups

### Group 1 — Being found, and worth staying on (3)
| id | Name | Status | Relationships |
| --- | --- | --- | --- |
| `seo` | Search-friendly setup | Built before | builds on `pages` |
| `gallery` | Photo gallery | Built before | `pages`; works with `selfedit` |
| `updates` | Updates & news | Built before | `pages`; works with `selfedit` |

### Group 2 — Doing more than showing (2)
| id | Name | Status | Relationships |
| --- | --- | --- | --- |
| `bookings` | Bookings & enquiries | Built before | builds on `enquiry`; works with `selfedit` |
| `selfedit` | Edit it yourself | Built before | builds on `pages` |

### Group 3 — Beyond one simple site (2)
| id | Name | Status | Relationships |
| --- | --- | --- | --- |
| `multisite` | More than one business | Built before | builds on `selfedit` |
| `custom` | Something else | Custom development | — |

### `custom` — the honest catch-all

Deliberately not a checkbox for a specific feature. It is where anything bigger
goes, named plainly rather than hidden — a shop, customer logins, a subscription
product, connecting to existing software — as things scoped in a conversation.
This is what stops a small catalogue reading as *"that's all they can do"* while
still promising nothing specific.

## 7. EVIDENCE FOR EVERY CLAIM

Same rule and enforcement as `.claude/HOSPITALITY_SYSTEM_BUILDER.md` §19: the
permitted set is asserted in both suites, so promoting a capability without
widening the allow-list fails the build.

All of it comes from the read-only inspection of the two delivered hotel systems
(14 Aug 2026) or from this repository. **Nothing rests on marketing copy.**

| id | Evidence |
| --- | --- |
| `pages` | Both delivered hotel sites are full multi-page public sites. |
| `mobile` | This repository is mobile-first throughout (`css/tokens.css` is the phone composition). |
| `enquiry` | `php/contact.php`, `php/booking.php`, PHPMailer over SMTP, in production. |
| `hosting` | Both client systems hosted and served under TLS on `promanaged-it.com`. |
| `seo` | Deliberate SEO titles and meta descriptions on delivered sites. **Scoped narrowly to structure, titles and descriptions — never rankings.** A test asserts no ranking or traffic promise appears in the copy. |
| `gallery` | An "Explore Our Hotel" gallery section on both delivered sites. |
| `updates` | The events module on both: owner-published, dated items with a real empty state. Described as a simple updates section, **not** a blogging platform. |
| `bookings` | A full multi-step booking engine with live availability, guest details and confirmation on both. |
| `selfedit` | Menu and events are owner-editable per tenant, behind an authenticated admin portal with CSRF and password reset. |
| `multisite` | Two hotels on one build, tenant-scoped, separate content and separate admin each, `client_uuid` on the booking form. |

## 8. VERIFICATION PERFORMED

- **Both suites pass.** `node tests/website_builder.test.js` (11 capabilities, 10
  delivered) and `php tests/website_endpoint.test.php`. The hospitality suites
  were re-run and still pass.
- **Contrast.** Zero failures across 296 measured elements on the website builder
  and 383 on the hospitality builder, **in the fully-expanded state** — every
  choice made, every module selected, every panel open.
- **Responsive.** No overflow at 375, 430, 768, 1024, 1440, 1600 or 1920px with
  everything selected. The 1880px rail ceiling holds at 1920. Desktop composition
  lands as designed: core 4+3+3+2, found 5+4+3, doing 7+5, beyond 5+7.
- **Behaviour.** Dependency prompts resolve on use; zero dead-end "Add" buttons
  targeting always-included capabilities; the note does not scroll away
  mid-thought and advances on blur; continue controls land on target.
- **Email.** One live submission returned 200 with no PHP notice and no mail
  error, addressed to `info@promanaged-it.com` so nothing reached a third party.
- **Console.** Zero errors, zero warnings.

### A latent defect this build exposed in the hospitality page

`.hb-summary-item-status` used `--color-text-subtle` on `.block--stone`, measuring
**4.46:1** — under AA. The earlier hospitality audit reported that page clean, and
that report was **incomplete**: the element only renders once a module has been
selected, and the audit ran on the page as loaded. Fixed in both files.

> **Audit interactive pages in their selected state, not just as loaded.** An
> element that only exists after an interaction is invisible to a page-load audit.

## 9. SUBSCRIPTION BILLING — REMOVED FROM PUBLIC COPY

**Done, on instruction.** Subscription billing was never verified as delivered
work, so every public claim of it is gone. There were **four** places, not the one
originally flagged:

| File | Was | Now |
| --- | --- | --- |
| `index.html` | "Products with logins and subscriptions, from first version to scale" | "Multi-tenant products with user accounts and secure logins" |
| `pages/custom_websites.html` | Heading "Products with paying users"; bullet "Subscription billing and user accounts" | Heading "Products with many customers"; bullets "Multi-tenant products — one system serving several businesses" and "User accounts and secure logins" |
| `learn_more.html` (capabilities) | "Products with paying users" / "…through accounts, subscriptions and scale" | "Products with many customers" / "…through user accounts, secure logins and scale" |
| `learn_more.html` (audiences) | "…can carry paying users…" | "…can carry real customers…" |

The headings changed as well as the bullets on purpose. "Products with paying
users" implies we handle the payment side; removing the billing bullet while
keeping that heading would have left the promise standing with nothing under it.

**What was kept, because it is verified:** multi-tenant products, user accounts
and secure logins, architecture that grows. See §7 for the evidence.

**Deliberately NOT changed**, since none of these are billing claims:

- the word "SaaS" where it describes a *category of work* (`custom_websites.html`
  meta description and FAQ, `index.html` keywords) — multi-tenant platform work is
  verified, so the category is accurate;
- "generic SaaS card/pill/dashboard" in the design docs and stylesheets — that is
  an aesthetic being avoided, not a claim;
- `FREE_LIFETIME_SAAS` in `tests/hospitality_endpoint.test.php` — a deliberately
  invented capability used as hostile input to prove the allow-list drops it;
- the hospitality builder's `payments` module, which is about recording deposits
  and balances against a reservation and is honestly labelled "Proposed module" —
  a different thing from subscription billing.

## 10. FILES

- `pages/website_builder.html`
- `css/website_builder.css`
- `js/website_builder.js`
- `php/website.php`, `php/website_catalogue.php`
- `tests/website_builder.test.js`, `tests/website_endpoint.test.php`
- `pages/custom_websites.html` — entry CTA, placed before the hospitality one
  since it is the general route
- `js/form_intake.js` — one added `init()` call

**No navigation tile.** `css/navbar.css` composes the bento panel for exactly
seven tiles, with per-tile stagger delays 1–7 and minor tiles at `span 4`. Both
builders are reached from the Build page.

## 11. OPEN QUESTIONS

1. **Is seven the right catalogue?** Anything you are regularly asked for that is
   missing, or anything here you would rather not offer?
2. **Is `updates` fairly labelled?** It rests on the events module — a dated-items
   publisher rather than a blog. The claim is worded narrowly, but you know what
   was actually built.
3. ~~The `custom_websites.html` copy~~ — done, see §9.
