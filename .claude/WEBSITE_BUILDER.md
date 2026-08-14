# ProManaged IT — WEBSITE BUILDER (catalogue + plan)

**Status: awaiting review. Nothing has been built.** This file is the capability
catalogue and the plan for a second builder. The page, stylesheet, script and
endpoint are not written yet, by decision — the catalogue and its delivery-status
labels are to be reviewed first.

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

An earlier draft of this catalogue spanned brochure sites through to multi-tenant
SaaS with subscription billing. That is cut. The reasoning is credibility, and it
is worth writing down because it will be tempting to widen this later:

A configurator that offers a customer a *product with paying users* as a
checkbox, when we cannot point at one we have delivered, does not read as
ambitious. It reads as a business promising anything you click. The builder's
whole persuasive force comes from most of its capabilities being things we have
genuinely built — and one unverifiable claim sitting among them damages the ones
that are true.

So the rule for this builder: **almost everything in the catalogue should be
something we have actually delivered.** Anything bigger is not listed as a
module — it is named honestly in one place as a conversation (see `custom`).

### Explicitly out of scope

`saas` (multi-tenant products), `billing` (subscriptions), `shop` (e-commerce),
`accounts` (customer logins), `reports`, `languages`. None were verified as
delivered. Removed rather than labelled Proposed — a long list of "Proposed
module" chips is itself the problem this decision is solving.

## 3. RELATIONSHIP TO THE HOSPITALITY BUILDER

**Decision taken: separate copy, no refactor.** `js/hospitality_builder.js`,
`css/hospitality_builder.css`, `php/hospitality.php`, `php/hospitality_catalogue.php`
and `pages/hospitality_builder.html` are **not to be touched**. The website builder
gets its own near-duplicate set.

The cost, recorded so it is not a surprise later: the mechanism is duplicated, so
every future fix to the card, the map, the progression or the submission path has
to be made twice, and there will be two test suites covering the same logic.
Accepted in exchange for zero risk to a page already shipped and verified.

`js/interface_motion.js` already supports `data-cursor-calm` and needs no change.

## 4. CHAPTER 01 — QUESTIONS

The earlier "does anyone log in?" fork is dropped along with the SaaS end of the
range; there is no longer a brochure-versus-product split to detect.

| Question | Control | Options |
| --- | --- | --- |
| What is the site for? | Choice chips | Show what we do · Take bookings or enquiries · Share updates and photos · Not sure yet |
| Roughly how many pages? | Stepper | Same accessible +/- control as the room count; "not sure" must be reachable |
| What do you have today? | Choice chips (multi) | Nothing yet · A site we have outgrown · A site that needs rebuilding · Social pages only |
| Anything it must do? | Optional free text | The most useful box on the page, as with the hospitality note |

## 5. CORE — every build includes these

Not selectable. Presented as the floor, exactly as the hospitality foundation is.

| id | Name | Title direction |
| --- | --- | --- |
| `pages` | Pages & content | The pages themselves, written to be read. |
| `mobile` | Built for phones | Designed for a phone first, not squeezed onto one. |
| `enquiry` | A way to reach you | A form that reaches a real inbox, not a black hole. |
| `hosting` | Hosting, domain & SSL | Set up, secured and handed over working. |

All four are **Built before**.

## 6. OPTIONAL MODULES — 6, in two groups

### Group 1 — Being found (3)
| id | Name | Status |
| --- | --- | --- |
| `seo` | Search-friendly setup | Built before |
| `gallery` | Photo gallery | Built before |
| `updates` | Updates & news | Built before |

### Group 2 — Doing more than showing (3)
| id | Name | Status | Relationships |
| --- | --- | --- | --- |
| `bookings` | Bookings & enquiries | Built before | builds on `enquiry` |
| `selfedit` | Edit it yourself | Built before | builds on `pages` |
| `custom` | Something else | Custom development | — |

Six modules of which five are delivered work. That ratio *is* the credibility
argument, and it is the thing to protect if this catalogue is ever revisited.

### `custom` — the honest catch-all

One module, deliberately not a checkbox for a specific feature. It is where
anything bigger goes, named plainly rather than hidden:

> **Something else.** A shop, customer logins, a product people subscribe to,
> connecting to software you already use — these are real things, and they are
> real projects. We scope them in a conversation rather than offering them as a
> box to tick, because what they take depends entirely on what you need.

This is what stops the small catalogue reading as *"that's all they can do"*
while still promising nothing specific.

## 7. THE DELIVERY-STATUS CONTRACT — EVIDENCE FOR EVERY CLAIM

Same rule as `.claude/HOSPITALITY_SYSTEM_BUILDER.md` §19, same enforcement: the
permitted set is asserted in the test suites, so promoting a capability without
widening the allow-list fails the build.

Every claim rests on the read-only inspection of the two delivered hotel systems
(14 Aug 2026) or on this repository. **Nothing rests on marketing copy.**

| id | Evidence |
| --- | --- |
| `pages` | Both delivered hotel sites are full multi-page public sites. |
| `mobile` | This repository is mobile-first throughout (`css/tokens.css` is the phone composition). |
| `enquiry` | `php/contact.php`, `php/booking.php`, PHPMailer over SMTP, in production. |
| `hosting` | Both client systems are hosted and served under TLS on `promanaged-it.com`. |
| `seo` | Delivered sites carry deliberate SEO titles and meta descriptions. **Scope narrowly to page structure, titles and descriptions — never rankings, never a traffic promise.** |
| `gallery` | An "Explore Our Hotel" gallery section on both delivered sites. |
| `updates` | The events module on both sites: owner-published, dated items that appear on the public site, with a real empty state. Describe it as a simple updates/news section — **not** a full blogging platform with categories and comments. |
| `bookings` | A full multi-step booking engine with live availability, guest details and confirmation on both sites. |
| `selfedit` | The digital menu and the events module are both owner-editable per tenant, behind an authenticated admin portal with CSRF and password reset. |

## 8. A SEPARATE ISSUE THIS RAISES — NOT ACTED ON

Cutting the SaaS end out of the *builder* does not remove it from the site.
`pages/custom_websites.html` currently states publicly that ProManaged builds:

- "Multi-tenant SaaS products, from first version to scale"
- "Subscription billing and user accounts"
- "Architecture that grows with your user base"

If the concern is not appearing to over-promise, that live page is a larger
exposure than a builder that does not exist yet — it makes the same claims, to
more visitors, today.

**This has deliberately NOT been changed.** It is approved public copy and a
commercial decision about what the business offers, which is not mine to make.
Three options if you want it addressed, in a separate cycle:

1. Leave it — the claims are about capability, not delivered work, and that is a
   normal thing for a software firm to say.
2. Soften the wording to what is demonstrable, keeping the ambition without the
   specific unbacked claims.
3. Remove the SaaS block entirely and let Build stand on the delivered work.

My recommendation is **2**, and I would not touch it without your say-so.

## 9. WHAT CARRIES OVER UNCHANGED

Verified working on the hospitality page; reuse the same patterns:

- module card with status chip, why, workflow steps, relationships;
- dependency explanation — core targets explained, optional targets actionable,
  never a dead-end "Add" button;
- the evolving system map, with only new tiles animating;
- group chunking with per-group spans;
- guided progression: completion-driven advances plus a continue control on every
  chapter, `focusin` in the abandon list, free-text blur as a trigger;
- `data-cursor-calm` on the builder wrapper;
- `behavior: 'instant'` per scroll frame — `'auto'` defers to the stylesheet's
  `scroll-behavior: smooth` and the travel stops short;
- a `[hidden]` display rule at higher specificity than the class that shows it;
- submission as IDs only, labels resolved server-side from an allow-list, fixed
  core never read from the request.

## 10. WHAT MUST BE WRITTEN FRESH

- the catalogue above, with `why` and `story` prose per module;
- chapter 01's questions and their state;
- the workflow-story and summary-paragraph generators — hand-written prose in the
  hospitality file, which does not transfer;
- all chapter copy.

## 11. PROPOSED FILES

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
eighth broke the row last time; this would be a ninth. Both builders stay
reachable from the Build page.

## 12. OPEN QUESTIONS FOR REVIEW

1. **Is six the right catalogue?** Anything you are regularly asked for that is
   missing, or anything here you would rather not offer?
2. **Is `updates` fairly labelled?** It rests on the events module, which is a
   dated-items publisher rather than a blog. I have worded the claim narrowly,
   but you know what was actually built.
3. **The `custom_websites.html` copy in §8** — leave, soften, or remove?
4. **Does this sit beside the hospitality builder** rather than replacing it?
   Assumption: beside it, hospitality kept as the specialist page.

## 13. DEFINITION OF DONE — for the build cycle, once approved

- [ ] Catalogue and labels approved.
- [ ] Every capability explains why it matters and how it runs.
- [ ] Dependencies explained, never silently applied, never a dead-end.
- [ ] System visual evolves; summary generated only from actual selections.
- [ ] Structured brief reaches ProManaged; branded internal + customer emails.
- [ ] Both test suites written and passing, including the Built-before allow-list.
- [ ] Verified in a browser at 375, 430, 768, 1024, 1440, 1600, 1920 — no overflow.
- [ ] Contrast measured, not eyeballed, on elements that own a text node directly.
- [ ] Zero console errors; existing pages and contracts untouched.
