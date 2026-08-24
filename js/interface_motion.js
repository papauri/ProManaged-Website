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
        A dot that tracks exactly, and a soft glow that lags on a spring and blooms
        warmer over anything interactive — the same bloom the boot overture's dot
        field uses (js/boot.js), carried through the rest of the site instead of
        left behind on the first screen.

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
             - the glow's spring lag becomes 1:1 tracking (EASE below is 1);
             - cards no longer tilt in 3D or rotate their marks (css/interaction.css);
             - the glow's bloom is an instant size change instead of a stretch-and-ease.
           What remains is state: the light, the traced edge, and the glow itself.

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

           REVISED 2026-08-25, at the site owner's request: the previous reticle traced
           the exact rectangle of whatever it hovered — a card, a button — latching its
           outline onto that element's own edge and corner radius. In practice that read
           as a viewfinder acquiring a target, not as an instrument, which is the
           opposite of what it was going for. It is gone.

           In its place: a dot that still tracks the pointer exactly, and a soft warm
           glow around it that blooms bigger and brighter over anything interactive —
           the same visual idea as the bloom in the boot overture's cursor-reactive dot
           field, so the site's very first interaction (playing with the dots while it
           loads) and its everyday cursor read as one instrument, not two unrelated
           decorations. The glow never becomes anyone else's shape; only its size and
           warmth change. */
        var cursor = document.createElement('div');
        cursor.className = 'pm-cursor';
        cursor.setAttribute('aria-hidden', 'true');

        var glow = document.createElement('span');
        glow.className = 'pm-cursor-glow';

        var dot = document.createElement('span');
        dot.className = 'pm-cursor-dot';
        var label = document.createElement('span');
        label.className = 'pm-cursor-label';
        cursor.appendChild(glow);
        cursor.appendChild(dot);
        cursor.appendChild(label);
        document.body.appendChild(cursor);
        root.classList.add('pm-cursor-live');

        // Resting diameter, and the diameter the glow blooms to over anything
        // interactive — a control, a destination card, a route row. One size for all
        // of them: the glow is reporting "you can act here," not the shape of the
        // thing itself.
        var REST = 26;
        var ACTIVE = 68;
        // How hard the glow chases the pointer, expressed as the fraction of the
        // remaining distance covered in ONE 60Hz frame. The per-frame factor is
        // re-derived from real elapsed time below, so the weight feels identical on a
        // 60Hz and a 120Hz display — applying this raw per frame made the cursor
        // converge twice as fast on a high-refresh monitor. Reduced motion takes 1,
        // which is exact tracking with no lag at all.
        var EASE = reduced ? 1 : 0.19;
        // Peak elongation along the direction of travel, as a fraction. The stretch is
        // driven by how far the glow is currently lagging the pointer, so it grows on a
        // fast flick and resolves itself as the glow catches up — no separate velocity
        // decay to tune, and it can never stick. Motion only, so reduced motion is 0.
        var STRETCH = reduced ? 0 : 0.17;
        var STRETCH_FULL = 210;

        var pointer = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
        var glowPos = { x: pointer.x, y: pointer.y, size: REST };
        var target = { x: pointer.x, y: pointer.y, size: REST };
        var pressed = false;
        var live = false;
        var running = false;
        var mode = 'default';
        var lastFrame = 0;

        // The card currently taking the light (module 2's own tracking — unrelated to
        // the glow's size or position).
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
           custom property + transition: the glow already has its own spring here, and
           a second easing in the stylesheet would compound into lag.

           Position and size are eased by the same factor, so a bloom over a newly-
           hovered control is one continuous grow rather than a springing dot with a
           size that jumps on the first frame. */
        var frame = function (now) {
            // Frame-rate independence. EASE is expressed per 60Hz frame; converting it
            // through the real elapsed time keeps the weight identical at any refresh
            // rate. dt is clamped because a backgrounded tab resumes with a huge gap,
            // and an unclamped factor there would teleport the glow.
            var dt = lastFrame ? Math.min(now - lastFrame, 64) : 16.667;
            lastFrame = now;
            var k = EASE >= 1 ? 1 : 1 - Math.pow(1 - EASE, dt / 16.667);

            var dx = target.x - glowPos.x;
            var dy = target.y - glowPos.y;
            var ds = target.size - glowPos.size;

            glowPos.x += dx * k;
            glowPos.y += dy * k;
            glowPos.size += ds * k;

            // A press tightens the glow — the same tactile squeeze a physical control
            // gives back.
            var press = pressed ? 0.86 : 1;

            /* The lag stretch. The glow is always a little behind the pointer; that gap
               IS the speed, so elongating along it turns the lag into intent rather
               than sloppiness. */
            var stretch = '';
            if (STRETCH) {
                var lag = Math.sqrt(dx * dx + dy * dy);
                var s = Math.min(lag / STRETCH_FULL, 1) * STRETCH;
                if (s > 0.004) {
                    var a = Math.atan2(dy, dx) * 180 / Math.PI;
                    stretch = ' rotate(' + a.toFixed(2) + 'deg) scale(' +
                        (1 + s).toFixed(4) + ',' + (1 - s * 0.55).toFixed(4) +
                        ') rotate(' + (-a).toFixed(2) + 'deg)';
                }
            }

            glow.style.width = glowPos.size.toFixed(2) + 'px';
            glow.style.height = glowPos.size.toFixed(2) + 'px';
            glow.style.transform =
                'translate3d(' + glowPos.x.toFixed(2) + 'px,' + glowPos.y.toFixed(2) + 'px,0)' +
                ' translate(-50%,-50%) scale(' + press + ')' + stretch;

            dot.style.transform =
                'translate3d(' + pointer.x + 'px,' + pointer.y + 'px,0) translate(-50%,-50%)';

            // The label hangs off the pointer, not off the glow, so it stays readable
            // however big the bloom currently is.
            label.style.transform =
                'translate3d(' + pointer.x + 'px,' + (pointer.y + 22) + 'px,0) translate(-50%,0)';

            // Park the loop once everything has arrived. Idle hovering costs nothing.
            var settled =
                Math.abs(dx) < 0.35 && Math.abs(dy) < 0.35 && Math.abs(ds) < 0.35;

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
        /* Opt-out for dense interactive regions. Even the simplified glow changes size
           on every control, card and paragraph boundary; in a section that is
           wall-to-wall cards, controls and copy — the hospitality builder's steps —
           that still fires constantly. Inside a marked region the cursor keeps just
           two states (a control, or everything else), so it stops competing with the
           thing the visitor is actually doing. */
        var CALM = '[data-cursor-calm]';

        var resolve = function (el) {
            if (!el || el.nodeType !== 1) {
                setMode('default');
                setLabel('');
                target.size = REST;
                return;
            }

            // Never cover a text field: the native caret is information.
            if (el.closest(TYPING)) {
                setMode('off');
                setLabel('');
                return;
            }

            if (el.closest(CALM)) {
                // Two states only: a control, or everything else. No caret, which is
                // the other thing that makes this section feel busy.
                setLabel('');
                if (el.closest(CONTROL)) {
                    setMode('active');
                    target.size = ACTIVE;
                } else {
                    setMode('default');
                    target.size = REST;
                }
                return;
            }

            var card = el.closest('[data-field]');
            var control = el.closest(CONTROL);

            if (card && (control || card.hasAttribute('data-target') || card.matches('a, [role="link"]'))) {
                // A card that is itself a destination: bloom, and name it.
                setMode('active');
                target.size = ACTIVE;
                setLabel(card.getAttribute('data-cursor-label') || '');
                return;
            }

            if (control) {
                setMode('active');
                setLabel('');
                target.size = ACTIVE;
                return;
            }

            if (el.closest(TEXTUAL)) {
                setMode('text');
                setLabel('');
                return;
            }

            setMode('default');
            setLabel('');
            target.size = REST;
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

        /* ---------- Events ---------- */
        document.addEventListener('pointermove', function (e) {
            if (e.pointerType !== 'mouse') return;

            pointer.x = e.clientX;
            pointer.y = e.clientY;

            if (!live) {
                live = true;
                cursor.classList.add('is-live');
                // Do not spring in from the centre of the screen on the first move.
                glowPos.x = pointer.x;
                glowPos.y = pointer.y;
            }

            resolve(e.target);

            var card = e.target.nodeType === 1 ? e.target.closest('[data-field]') : null;
            if (card !== lit) {
                clearLit();
                lit = card;
            }
            if (card) applyField(card, e.clientX, e.clientY);

            target.x = pointer.x;
            target.y = pointer.y;

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

        // The card light is re-placed on scroll, so a card scrolling under a still
        // pointer does not keep its highlight parked where the pointer used to be
        // over it. Cheap: one rect read, only while a card is actually lit.
        window.addEventListener('scroll', function () {
            if (lit) {
                applyField(lit, pointer.x, pointer.y);
                run();
            }
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
