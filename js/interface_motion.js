/* interface_motion.js — the pointer and scroll layer.

   Three independent modules, in ascending order of how optional they are. Each one
   checks its own preconditions and stands down cleanly; none of them is required for
   the site to work, and none of them touches the Building Blocks choreography in
   js/main.js, the navigation contract in js/mobile_phone_navbar.js or any form.

     1. SCROLL STATE (every device)
        Writes --pm-progress and the .nav-condensed / .nav-tucked flags on <html>.
        css/navbar.css turns those into the resting/condensed capsule, the progress
        line along its lower edge, and the tuck-away on downward scroll.

     2. THE CARD FIELD (fine pointer only)
        Writes --mx/--my (where the light falls) and --fx/--fy (how far the card leans)
        on the ONE card currently under the pointer. css/interaction.css owns every
        visual consequence.

     3. THE INSTRUMENT CURSOR (fine pointer only)
        A dot that tracks exactly, a ring that lags on a spring, and a ring that snaps
        to the geometry of whatever it is over.

   ONE rAF LOOP serves modules 2 and 3, and it only runs while there is something left
   to move — it parks itself when the cursor has caught up and nothing is animating,
   and a pointer event restarts it. Idle scrolling and idle hovering cost nothing.

   Everything is additive. No element is hidden by this file, so nothing here can
   leave content stranded if it throws. */
(function () {
    'use strict';

    var root = document.documentElement;
    var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    /* ==========================================================================
       1. SCROLL STATE
       ========================================================================== */
    function initScrollState() {
        var rail = document.querySelector('.nav-rail');
        if (!rail) return;

        // Below this the page has barely moved and the capsule stays in its resting
        // state; below TUCK_AFTER it never tucks at all, so the control is always
        // present near the top of a page where a visitor is most likely to want it.
        var CONDENSE_AFTER = 24;
        var TUCK_AFTER = 420;
        // Enough movement to be a decision rather than a trackpad tremor.
        var INTENT = 6;

        var last = window.scrollY;
        var queued = false;

        var read = function () {
            queued = false;
            var y = window.scrollY;
            var delta = y - last;

            var scrollable = document.documentElement.scrollHeight - window.innerHeight;
            root.style.setProperty('--pm-progress', scrollable > 0
                ? Math.min(1, Math.max(0, y / scrollable)).toFixed(4)
                : '0');

            root.classList.toggle('nav-condensed', y > CONDENSE_AFTER);

            if (Math.abs(delta) >= INTENT) {
                // Never tuck the only navigation affordance out of reach: not while
                // the panel is open, and not while the keyboard is inside the rail.
                var navHasFocus = rail.contains(document.activeElement);
                var panelOpen = root.classList.contains('nav-is-open');
                var tuck = delta > 0 && y > TUCK_AFTER && !navHasFocus && !panelOpen;
                root.classList.toggle('nav-tucked', tuck);
                last = y;
            }
        };

        var request = function () {
            if (queued) return;
            queued = true;
            requestAnimationFrame(read);
        };

        read();
        window.addEventListener('scroll', request, { passive: true });
        window.addEventListener('resize', request);
        // Tabbing into a tucked rail must bring it back.
        document.addEventListener('focusin', function (e) {
            if (rail.contains(e.target)) root.classList.remove('nav-tucked');
        });
    }

    /* ==========================================================================
       2 + 3. POINTER LAYER
       ========================================================================== */
    function initPointer() {
        // A hovering, precise pointer on a viewport with room for the effect. Coarse
        // pointers and hybrid devices in touch mode never reach any of the code below.
        if (!window.matchMedia('(hover: hover) and (pointer: fine) and (min-width: 1024px)').matches) return;

        /* ---------- Reduced motion is GRADED, not a kill switch ----------
           `prefers-reduced-motion` exists for vestibular triggers: large-area travel,
           parallax, spin, zoom. A reticle that tracks the visitor's own pointer is not
           one of those — it IS the pointer, redrawn. Refusing to show it does not make
           the page calmer, it just takes the instrument away from the people most
           likely to be navigating deliberately.

           So under the preference the pointer layer still runs, and the parts that are
           genuinely motion are the parts that are dropped:
             - the ring's spring lag becomes 1:1 tracking (EASE below is 1);
             - cards no longer tilt in 3D or rotate their marks (css/interaction.css);
             - the reticle snaps between shapes instead of easing (same file).
           What remains is state: the light, the traced edge, the geometry it snaps to.

           The scroll choreography is untouched by this and stays fully suppressed —
           content that moves on its own is exactly what the preference is asking us
           not to do. */
        root.classList.add('pm-pointer');
        if (reduced) root.classList.add('pm-calm');

        /* ---------- Tag the surfaces ----------
           Done here rather than in the markup so a card added to any page in future
           inherits the behaviour without anyone remembering an attribute.

           Only elements that HAVE a surface. Bare blocks and the evidence rail are
           deliberately excluded: they are text on the page background, and a light
           falling across them would be a glowing rectangle floating in open space
           with a traced edge over nothing. */
        var fields = [].slice.call(document.querySelectorAll(
            '.grid > .block:not(.block--bare), .nav-tile'
        ));
        fields.forEach(function (el) { el.setAttribute('data-field', ''); });

        /* ---------- Cursor DOM ----------
           Built in script, never in the markup: it is decoration with no accessible
           meaning, and a page served without JS should not carry an empty div for it.

           The reticle is a single hairline outline, not a set of corner brackets. A
           bracket that latches onto a thing reads as an instrument acquiring a
           target — a busier, more "gamified" mark than the rest of the site's calm
           editorial instrumentation. One continuous line is the quieter idiom: it
           traces the exact shape of whatever it is over — a small circle at rest, the
           precise outline of a card once it lands on one — the way a selection or a
           link preview is marked in the calmer end of contemporary software, not the
           way a viewfinder marks a subject. It costs the same: one element, one width/
           height/radius written per frame, no reflow. */
        var cursor = document.createElement('div');
        cursor.className = 'pm-cursor';
        cursor.setAttribute('aria-hidden', 'true');

        var ring = document.createElement('span');
        ring.className = 'pm-cursor-frame';

        var dot = document.createElement('span');
        dot.className = 'pm-cursor-dot';
        var label = document.createElement('span');
        label.className = 'pm-cursor-label';
        cursor.appendChild(ring);
        cursor.appendChild(dot);
        cursor.appendChild(label);
        document.body.appendChild(cursor);
        root.classList.add('pm-cursor-live');

        var RING = 26;
        // The resting ring over a plain inline link — a control, but not a shape worth
        // tracing. Smaller than the old 56px circle, which read as a blob next to the
        // fine outline everything else now uses.
        var LINK_RING = 34;
        // How hard the reticle chases the pointer, expressed as the fraction of the
        // remaining distance covered in ONE 60Hz frame. The per-frame factor is
        // re-derived from real elapsed time below, so the weight feels identical on a
        // 60Hz and a 120Hz display — applying this raw per frame made the cursor
        // converge twice as fast on a high-refresh monitor. Reduced motion takes 1,
        // which is exact tracking with no lag at all.
        var EASE = reduced ? 1 : 0.19;
        // How far a traced element pulls its outline toward the pointer. Small on
        // purpose — it should read as the card acknowledging you, not as a wobble.
        var MAGNET = 7;
        // Peak elongation along the direction of travel, as a fraction. The stretch is
        // driven by how far the ring is currently lagging the pointer, so it grows on a
        // fast flick and resolves itself as the ring catches up — no separate velocity
        // decay to tune, and it can never stick. Motion only, so reduced motion is 0.
        var STRETCH = reduced ? 0 : 0.17;
        var STRETCH_FULL = 210;

        var pointer = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
        var ringPos = { x: pointer.x, y: pointer.y, w: RING, h: RING, r: RING / 2 };
        var target = { x: pointer.x, y: pointer.y, w: RING, h: RING, r: RING / 2 };
        var pressed = false;
        var live = false;
        var running = false;
        var mode = 'default';
        var lastFrame = 0;

        // The element the outline is currently traced to — a destination card OR a
        // solid control — plus how much room to leave around it, and the card currently
        // taking the light. One reference each, so leaving is always exact.
        var traced = null;
        var tracedPad = 12;
        var lit = null;

        var setMode = function (next) {
            if (next === mode) return;
            mode = next;
            cursor.setAttribute('data-mode', next);
        };

        var setLabel = function (text) {
            if (text) {
                if (label.textContent !== text) label.textContent = text;
                cursor.classList.add('has-label');
            } else {
                cursor.classList.remove('has-label');
            }
        };

        /* ---------- Per-frame ----------
           Position is written straight to style.transform rather than through a CSS
           custom property + transition: the ring already has its own spring here, and
           a second easing in the stylesheet would compound into lag.

           Everything the ring owns — position, size AND corner radius — is eased by the
           same factor, so a circle becoming a card outline is one continuous morph
           rather than a springing box with a radius that jumps on the first frame. */
        var frame = function (now) {
            // Frame-rate independence. EASE is expressed per 60Hz frame; converting it
            // through the real elapsed time keeps the weight identical at any refresh
            // rate. dt is clamped because a backgrounded tab resumes with a huge gap,
            // and an unclamped factor there would teleport the ring.
            var dt = lastFrame ? Math.min(now - lastFrame, 64) : 16.667;
            lastFrame = now;
            var k = EASE >= 1 ? 1 : 1 - Math.pow(1 - EASE, dt / 16.667);

            var dx = target.x - ringPos.x;
            var dy = target.y - ringPos.y;
            var dw = target.w - ringPos.w;
            var dh = target.h - ringPos.h;
            var dr = target.r - ringPos.r;

            ringPos.x += dx * k;
            ringPos.y += dy * k;
            ringPos.w += dw * k;
            ringPos.h += dh * k;
            ringPos.r += dr * k;

            // A press tightens the mark. A traced outline barely moves — shrinking a
            // whole card's outline by a sixth reads as the card recoiling, not as a
            // click — while the free ring takes the full squeeze.
            var press = pressed ? (traced ? 0.985 : 0.86) : 1;

            /* The lag stretch. The ring is always a little behind the pointer; that gap
               IS the speed, so elongating along it turns the lag into intent rather
               than sloppiness. Suppressed whenever the outline is traced to something:
               a card's outline is reporting real geometry, and geometry that stretches
               is just wrong. */
            var stretch = '';
            if (STRETCH && !traced) {
                var lag = Math.sqrt(dx * dx + dy * dy);
                var s = Math.min(lag / STRETCH_FULL, 1) * STRETCH;
                if (s > 0.004) {
                    var a = Math.atan2(dy, dx) * 180 / Math.PI;
                    stretch = ' rotate(' + a.toFixed(2) + 'deg) scale(' +
                        (1 + s).toFixed(4) + ',' + (1 - s * 0.55).toFixed(4) +
                        ') rotate(' + (-a).toFixed(2) + 'deg)';
                }
            }

            ring.style.width = ringPos.w + 'px';
            ring.style.height = ringPos.h + 'px';
            ring.style.transform =
                'translate3d(' + ringPos.x.toFixed(2) + 'px,' + ringPos.y.toFixed(2) + 'px,0)' +
                ' translate(-50%,-50%) scale(' + press + ')' + stretch;
            // The outline carries the radius it is currently easing through, so it
            // curves with the card it has landed on rather than staying circular over a
            // square corner — and gets there gradually.
            ring.style.setProperty('--ring-radius', ringPos.r.toFixed(2) + 'px');

            dot.style.transform =
                'translate3d(' + pointer.x + 'px,' + pointer.y + 'px,0) translate(-50%,-50%)';

            // The label hangs off the pointer, not off the ring, so it stays readable
            // when the ring has become a card-sized rectangle.
            label.style.transform =
                'translate3d(' + pointer.x + 'px,' + (pointer.y + 22) + 'px,0) translate(-50%,0)';

            // Park the loop once everything has arrived. Idle hovering costs nothing.
            var settled =
                Math.abs(dx) < 0.35 && Math.abs(dy) < 0.35 &&
                Math.abs(dw) < 0.35 && Math.abs(dh) < 0.35 &&
                Math.abs(dr) < 0.35;

            if (settled) {
                running = false;
                lastFrame = 0;
                return;
            }
            requestAnimationFrame(frame);
        };

        var run = function () {
            if (running) return;
            running = true;
            requestAnimationFrame(frame);
        };

        /* ---------- What is under the pointer ----------
           Resolved on every move. `closest` walks at most a handful of ancestors and
           the result is compared against the last one, so the DOM writes below happen
           on ENTER and LEAVE only, never per frame. */
        var CONTROL = 'a[href], button, [role="link"], input[type="submit"], .block--interactive';
        var TEXTUAL = 'p, li, h1, h2, h3, h4, blockquote, .lede';
        var TYPING = 'input, textarea, select';
        /* Opt-out for dense interactive regions. The four-mode cursor is right for
           editorial chapters, where each change of mode is an occasional event. In a
           section that is wall-to-wall cards, controls and copy — the hospitality
           builder's steps — the same behaviour fires constantly: the frame snaps
           around a whole card, collapses to a caret over its paragraph, expands to a
           link ring over its button, and back, on every few pixels of travel. Inside
           a marked region the cursor keeps just two states, so it stops competing
           with the thing the visitor is actually doing. */
        var CALM = '[data-cursor-calm]';
        /* Controls that are a SHAPE rather than a span of words. A button, a pill, a
           route row is a discrete object with its own edge, so the outline acquires it
           the way it acquires a card — the control is what the cursor is reporting, and
           reporting it as a floating circle throws that geometry away. An inline link
           inside a paragraph is deliberately NOT here: tracing a few words mid-sentence
           reads as a highlight, and there is already a caret mode for running copy. */
        var SOLID = '.btn, button, [role="button"], input[type="submit"], input[type="button"], .route';
        // Past this an "acquired" control is really a region, and tracing it stops
        // reading as a cursor at all. Falls back to the free ring.
        var SOLID_MAX_W = 560;
        var SOLID_MAX_H = 220;

        var traceable = function (el) {
            if (!el || !el.matches(SOLID)) return false;
            var box = el.getBoundingClientRect();
            return !!box.width && !!box.height
                && box.width <= SOLID_MAX_W && box.height <= SOLID_MAX_H;
        };

        var freeRing = function (size) {
            traced = null;
            target.w = size; target.h = size; target.r = size / 2;
        };

        var resolve = function (el) {
            if (!el || el.nodeType !== 1) {
                setMode('default');
                setLabel('');
                freeRing(RING);
                return;
            }

            // Never cover a text field: the native caret is information.
            if (el.closest(TYPING)) {
                setMode('off');
                setLabel('');
                traced = null;
                return;
            }

            if (el.closest(CALM)) {
                // Two states only: a control, or everything else. No card framing and
                // no caret, which are the two that make this section feel busy. The
                // control still acquires its own shape — that is the state the visitor
                // is acting on, and it is one state, not a fifth one.
                setLabel('');
                var calmControl = el.closest(CONTROL);
                if (calmControl) {
                    setMode('link');
                    if (traceable(calmControl)) {
                        traced = calmControl;
                        tracedPad = 8;
                    } else {
                        freeRing(LINK_RING);
                    }
                } else {
                    setMode('default');
                    freeRing(RING);
                }
                return;
            }

            var card = el.closest('[data-field]');
            var control = el.closest(CONTROL);

            if (card && (control || card.hasAttribute('data-target') || card.matches('a, [role="link"]'))) {
                // A card that is itself a destination: trace it.
                traced = card;
                tracedPad = 12;
                setMode('frame');
                setLabel(card.getAttribute('data-cursor-label') || '');
                return;
            }

            if (control) {
                setMode('link');
                setLabel('');
                // A solid control is acquired at its own edge; anything else — an
                // inline link, a bare interactive block — keeps the free ring.
                if (traceable(control)) {
                    traced = control;
                    tracedPad = 8;
                } else {
                    freeRing(LINK_RING);
                }
                return;
            }

            traced = null;

            if (el.closest(TEXTUAL)) {
                setMode('text');
                setLabel('');
                // The outline collapses onto the pointer; the caret itself is the dot,
                // restyled into a bar by css/interaction.css.
                target.w = 2; target.h = 24; target.r = 1;
                return;
            }

            setMode('default');
            setLabel('');
            freeRing(RING);
        };

        /* ---------- The card field ----------
           --mx/--my place the light in the card's own coordinate space; --fx/--fy are
           the lean, capped by --field-tilt so a wide block never looks like it is
           falling over. Written on the hovered card only, and cleared on leave. */
        var tiltCap = parseFloat(
            getComputedStyle(root).getPropertyValue('--field-tilt')
        ) || 3.4;

        var clearLit = function () {
            if (!lit) return;
            lit.style.removeProperty('--mx');
            lit.style.removeProperty('--my');
            lit.style.removeProperty('--fx');
            lit.style.removeProperty('--fy');
            lit = null;
        };

        var applyField = function (card, x, y) {
            var box = card.getBoundingClientRect();
            if (!box.width || !box.height) return;

            var px = (x - box.left) / box.width;
            var py = (y - box.top) / box.height;

            card.style.setProperty('--mx', (px * 100).toFixed(2) + '%');
            card.style.setProperty('--my', (py * 100).toFixed(2) + '%');
            // Lean TOWARD the pointer: the near edge drops, the far edge rises.
            card.style.setProperty('--fy', ((px - 0.5) * 2 * tiltCap).toFixed(2) + 'deg');
            card.style.setProperty('--fx', ((0.5 - py) * 2 * tiltCap).toFixed(2) + 'deg');
            // The traced edge grows from the side the pointer is nearest.
            card.style.setProperty('--trace-origin', px < 0.5 ? 'left' : 'right');
        };

        /* ---------- Acquiring a shape ----------
           The outline becomes the element's own edge, pulled a few pixels toward the
           pointer so it still answers to the hand. Used for both things the cursor can
           acquire — a destination card and a solid control — because from the ring's
           point of view they are the same operation on a different box.

           Reads one rect. Called from pointermove and from scroll (a card that scrolls
           under a still pointer has to keep its outline), never per animation frame. */
        var traceGeom = function (el, x, y, pad) {
            var box = el.getBoundingClientRect();
            if (!box.width || !box.height) return;

            var px = (x - box.left) / box.width;
            var py = (y - box.top) / box.height;
            var radius = parseFloat(getComputedStyle(el).borderTopLeftRadius) || 0;
            var half = pad / 2;

            target.x = box.left + box.width / 2 + (px - 0.5) * 2 * MAGNET;
            target.y = box.top + box.height / 2 + (py - 0.5) * 2 * MAGNET;
            target.w = box.width + pad;
            target.h = box.height + pad;
            // The element's own radius plus the standoff, so the line is concentric
            // with the corner it is tracing rather than a tighter arc inside it. A
            // pill (a huge radius on a short box) stays a pill because the radius is
            // capped to half the traced height.
            target.r = Math.min(radius + half, target.h / 2);
        };

        /* ---------- Events ---------- */
        document.addEventListener('pointermove', function (e) {
            if (e.pointerType !== 'mouse') return;

            pointer.x = e.clientX;
            pointer.y = e.clientY;

            if (!live) {
                live = true;
                cursor.classList.add('is-live');
                // Do not spring in from the centre of the screen on the first move.
                ringPos.x = pointer.x;
                ringPos.y = pointer.y;
            }

            resolve(e.target);

            var card = e.target.nodeType === 1 ? e.target.closest('[data-field]') : null;
            if (card !== lit) {
                clearLit();
                lit = card;
            }
            if (card) applyField(card, e.clientX, e.clientY);

            if (traced) {
                traceGeom(traced, e.clientX, e.clientY, tracedPad);
            } else {
                target.x = pointer.x;
                target.y = pointer.y;
            }

            run();
        }, { passive: true });

        document.addEventListener('pointerdown', function (e) {
            if (e.pointerType !== 'mouse') return;
            pressed = true;
            run();
        }, { passive: true });

        document.addEventListener('pointerup', function (e) {
            if (e.pointerType !== 'mouse') return;
            pressed = false;
            run();
        }, { passive: true });

        // Leaving the window, or switching to touch, retires the cursor and hands the
        // native one back.
        document.addEventListener('pointerleave', function () {
            live = false;
            cursor.classList.remove('is-live');
            clearLit();
        });

        window.addEventListener('blur', function () {
            pressed = false;
            live = false;
            cursor.classList.remove('is-live');
            clearLit();
        });

        // An acquired card or control that scrolls under the pointer must keep its
        // outline. Cheap: one rect read, only while something is actually traced. The
        // card light is re-placed too, so a card scrolling under a still pointer does
        // not keep its highlight parked where the pointer used to be over it.
        window.addEventListener('scroll', function () {
            if (traced) traceGeom(traced, pointer.x, pointer.y, tracedPad);
            if (lit) applyField(lit, pointer.x, pointer.y);
            if (traced || lit) run();
        }, { passive: true });

        // A touch on a hybrid device means the visitor has put the mouse down.
        window.addEventListener('touchstart', function () {
            live = false;
            cursor.classList.remove('is-live');
            root.classList.remove('pm-cursor-live');
            clearLit();
        }, { passive: true, once: true });
    }

    var start = function () {
        try { initScrollState(); } catch (err) { /* navigation still works without it */ }
        try { initPointer(); } catch (err) { /* decoration only */ }
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', start);
    } else {
        start();
    }
}());
