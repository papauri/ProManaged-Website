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
        // How hard the reticle chases the pointer. Low enough to read as weight, high
        // enough that it never feels detached from the hand. Reduced motion takes 1,
        // which is exact tracking with no lag at all.
        var EASE = reduced ? 1 : 0.19;
        // How far a framed card pulls its outline toward the pointer. Small on
        // purpose — it should read as the card acknowledging you, not as a wobble.
        var MAGNET = 7;

        var pointer = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
        var ringPos = { x: pointer.x, y: pointer.y, w: RING, h: RING, r: RING / 2 };
        var target = { x: pointer.x, y: pointer.y, w: RING, h: RING, r: RING / 2 };
        var pressed = false;
        var live = false;
        var running = false;
        var mode = 'default';

        // The element the ring is currently framed to, plus the card currently taking
        // the light. Kept as one reference each so leaving is always exact.
        var framed = null;
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
           a second easing in the stylesheet would compound into lag. */
        var frame = function () {
            var dx = target.x - ringPos.x;
            var dy = target.y - ringPos.y;
            var dw = target.w - ringPos.w;
            var dh = target.h - ringPos.h;

            ringPos.x += dx * EASE;
            ringPos.y += dy * EASE;
            ringPos.w += dw * EASE;
            ringPos.h += dh * EASE;

            var scale = pressed ? 0.84 : 1;

            ring.style.width = ringPos.w + 'px';
            ring.style.height = ringPos.h + 'px';
            ring.style.transform =
                'translate3d(' + ringPos.x + 'px,' + ringPos.y + 'px,0) translate(-50%,-50%) scale(' + scale + ')';
            // The outline inherits the frame's radius so it curves with the card it
            // has landed on rather than staying circular over a square corner.
            ring.style.setProperty('--ring-radius', target.r + 'px');

            dot.style.transform =
                'translate3d(' + pointer.x + 'px,' + pointer.y + 'px,0) translate(-50%,-50%)';

            // The label hangs off the pointer, not off the ring, so it stays readable
            // when the ring has become a card-sized rectangle.
            label.style.transform =
                'translate3d(' + pointer.x + 'px,' + (pointer.y + 22) + 'px,0) translate(-50%,0)';

            // Park the loop once everything has arrived. Idle hovering costs nothing.
            var settled =
                Math.abs(dx) < 0.35 && Math.abs(dy) < 0.35 &&
                Math.abs(dw) < 0.35 && Math.abs(dh) < 0.35;

            if (settled) {
                running = false;
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

        var resolve = function (el) {
            if (!el || el.nodeType !== 1) {
                setMode('default');
                setLabel('');
                framed = null;
                target.w = RING; target.h = RING; target.r = RING / 2;
                return;
            }

            // Never cover a text field: the native caret is information.
            if (el.closest(TYPING)) {
                setMode('off');
                setLabel('');
                framed = null;
                return;
            }

            if (el.closest(CALM)) {
                // Two states only: a control, or everything else. No card framing and
                // no caret, which are the two that make this section feel busy.
                framed = null;
                setLabel('');
                if (el.closest(CONTROL)) {
                    setMode('link');
                    target.w = 44; target.h = 44; target.r = 22;
                } else {
                    setMode('default');
                    target.w = RING; target.h = RING; target.r = RING / 2;
                }
                return;
            }

            var card = el.closest('[data-field]');
            var control = el.closest(CONTROL);

            if (card && (control || card.hasAttribute('data-target') || card.matches('a, [role="link"]'))) {
                // A card that is itself a destination: frame it.
                framed = card;
                setMode('frame');
                setLabel(card.getAttribute('data-cursor-label') || '');
                return;
            }

            framed = null;

            if (control) {
                setMode('link');
                setLabel('');
                target.w = 56; target.h = 56; target.r = 28;
                return;
            }

            if (el.closest(TEXTUAL)) {
                setMode('text');
                setLabel('');
                // The frame collapses onto the pointer; the caret itself is the dot,
                // restyled into a bar by css/interaction.css.
                target.w = 2; target.h = 24; target.r = 1;
                return;
            }

            setMode('default');
            setLabel('');
            target.w = RING; target.h = RING; target.r = RING / 2;
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

            if (framed === card) {
                // Frame mode: the ring becomes the card's outline, pulled a few pixels
                // toward the pointer so it still answers to the hand.
                var radius = parseFloat(getComputedStyle(card).borderTopLeftRadius) || 12;
                target.x = box.left + box.width / 2 + (px - 0.5) * 2 * MAGNET;
                target.y = box.top + box.height / 2 + (py - 0.5) * 2 * MAGNET;
                target.w = box.width + 12;
                target.h = box.height + 12;
                // Radius + the 6px the outline stands off by, so the traced line is
                // concentric with the card's own corner rather than a tighter arc
                // pulled in from a wider curve.
                target.r = radius + 6;
            }
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

            if (!framed) {
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

        // A framed card that scrolls under the pointer must keep its outline. Cheap:
        // one rect read, only while something is actually framed.
        window.addEventListener('scroll', function () {
            if (framed) applyField(framed, pointer.x, pointer.y);
            run();
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
