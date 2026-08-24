/* boot.js — the load overture.

   THIS IS A DELIBERATE BRAND BEAT, WITH A GUARANTEED MINIMUM HOLD — a deviation
   from this file's original zero-latency rule, made explicitly at the site owner's
   request (2026-08-14) so the mark, the letter-by-letter name and the progress
   readout are fully watchable, not just glimpsed, on every load — not only a
   warm-cache reload. MIN_HOLD below is that floor: the overlay never lifts before
   it, however fast the page is ready. MAX is a hard ceiling independent of
   MIN_HOLD, kept comfortably above it for a hung load.

   It is loaded SYNCHRONOUSLY in <head>, before the stylesheets have painted anything,
   which is the only place it can be: an overlay that appears after first paint is a
   flash of content followed by a curtain, which is worse than no curtain at all.
   Because of that it must stay small and must not touch layout.

   VISIBILITY IS MONOTONIC, exactly as it is for the hero in global_styles.css. Four
   independent guarantees that the curtain always lifts:
     1. The removal timer is armed BEFORE the overlay is inserted, so even if every
        line after it throws, the page is uncovered on a bounded clock.
     2. Removal is also bound to DOMContentLoaded (deferred to MIN_HOLD if that fires
        early), which is the normal path.
     3. The whole body is wrapped in try/catch, and the catch removes the overlay
        immediately — errors bypass MIN_HOLD entirely; a hold is only ever worth
        enforcing on the healthy path.
     4. It only ever exists at all if this script ran; no JavaScript means no overlay,
        because there is no markup for one anywhere in the HTML.

   The mark, the name and the readout are drawn to match the page's own brand: the
   name now uses the site's monospace "tech-geek" wordmark treatment (the same
   family as the nav wordmark and the mobile Menu label), so the overture reads as
   the same identity as everything behind it, not a separate splash design. */
(function (d, w) {
    'use strict';

    // The guaranteed floor: the curtain never lifts before this many ms have
    // passed, however fast the document is ready. Set to a few full seconds, on
    // request, so the mark settling, the name cascading in, the interactive dot
    // field and the readout climbing to 100% are all fully seen and played with
    // rather than rushed past.
    var MIN_HOLD = 4200;

    // The hard ceiling, independent of MIN_HOLD. Nothing waits for this on a
    // healthy load — DOMContentLoaded plus MIN_HOLD gets there long first. It
    // exists for the pathological case: a stylesheet that never resolves, a font
    // request hanging on a dead CDN, a parse error in a script above this one. The
    // visitor gets the page regardless. Kept with a margin above MIN_HOLD
    // proportional to the one it always had, so a genuinely hung load still
    // recovers quickly rather than sitting at the new, longer floor.
    var MAX = 6200;

    // Matches the fade below. Kept as one value so the class removal and the DOM
    // removal cannot drift apart.
    var FADE = 420;

    // The business name, cascaded on letter by letter. A literal string rather than
    // read from the DOM: this script runs before <body> exists, so there is nothing
    // to read it from yet.
    var NAME = 'ProManaged IT';
    var TAGLINE = 'Build · Source · Support';

    var root = d.documentElement;
    var overlay = null;
    var pctEl = null;
    var done = false;
    var ceilingTimer = 0;
    var holdTimer = 0;
    var startedAt = Date.now();
    var stopDots = null;

    // A canvas dot field the visitor can play with while the overture holds:
    // a loose grid of faint points that bloom into the brand's copper accent
    // as the cursor (or a finger, on touch) passes near them, then settle back.
    // Self-contained and returns its own teardown so remove() can silence the
    // animation loop and listeners the instant the curtain lifts — nothing here
    // should keep running, or keep a reference alive, once the overlay is gone.
    var setupDots = function (canvas) {
        var ctx = canvas.getContext('2d');
        if (!ctx) return null;

        var dpr = Math.min(w.devicePixelRatio || 1, 2);
        var W = 0, H = 0, dots = [];
        var pointer = { x: -9999, y: -9999, active: false };
        var rafId = 0;

        var buildGrid = function () {
            dots = [];
            var spacing = W < 640 ? 42 : 62;
            var cols = Math.ceil(W / spacing) + 1;
            var rows = Math.ceil(H / spacing) + 1;
            for (var yi = 0; yi < rows; yi++) {
                for (var xi = 0; xi < cols; xi++) {
                    dots.push({
                        x: xi * spacing + (Math.random() - 0.5) * spacing * 0.6,
                        y: yi * spacing + (Math.random() - 0.5) * spacing * 0.6,
                        baseR: 1 + Math.random() * 0.7,
                        glow: 0
                    });
                }
            }
        };

        var resize = function () {
            W = w.innerWidth;
            H = w.innerHeight;
            canvas.width = Math.round(W * dpr);
            canvas.height = Math.round(H * dpr);
            canvas.style.width = W + 'px';
            canvas.style.height = H + 'px';
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            buildGrid();
        };

        var onMove = function (x, y) {
            pointer.x = x;
            pointer.y = y;
            pointer.active = true;
        };
        var onMouseMove = function (e) { onMove(e.clientX, e.clientY); };
        var onTouchMove = function (e) {
            if (e.touches && e.touches[0]) onMove(e.touches[0].clientX, e.touches[0].clientY);
        };
        var onLeave = function () { pointer.active = false; };

        // The radius of influence around the pointer, and the copper accent the
        // dots warm toward — the same #96502c already used for the progress rule,
        // so the field reads as one material rather than a bolted-on effect.
        var RADIUS = 150;
        var ACCENT = [214, 122, 66];
        var BASE = [247, 243, 236];

        var tick = function () {
            ctx.clearRect(0, 0, W, H);
            for (var i = 0; i < dots.length; i++) {
                var dot = dots[i];
                var target = 0;
                if (pointer.active) {
                    var dx = dot.x - pointer.x, dy = dot.y - pointer.y;
                    var dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < RADIUS) target = 1 - dist / RADIUS;
                }
                // Eased toward the target rather than snapped to it, so the bloom
                // trails the cursor like a soft wake instead of flickering on/off
                // as dots cross the radius boundary frame to frame.
                dot.glow += (target - dot.glow) * 0.14;
                var r = dot.baseR + dot.glow * 3.2;
                var alpha = 0.14 + dot.glow * 0.8;

                if (dot.glow > 0.04) {
                    ctx.beginPath();
                    ctx.fillStyle = 'rgba(' + ACCENT[0] + ',' + ACCENT[1] + ',' + ACCENT[2] + ',' + (dot.glow * 0.22).toFixed(3) + ')';
                    ctx.arc(dot.x, dot.y, r * 3.4, 0, Math.PI * 2);
                    ctx.fill();
                }

                var t = dot.glow;
                var cr = Math.round(BASE[0] + (ACCENT[0] - BASE[0]) * t);
                var cg = Math.round(BASE[1] + (ACCENT[1] - BASE[1]) * t);
                var cb = Math.round(BASE[2] + (ACCENT[2] - BASE[2]) * t);
                ctx.beginPath();
                ctx.fillStyle = 'rgba(' + cr + ',' + cg + ',' + cb + ',' + alpha.toFixed(3) + ')';
                ctx.arc(dot.x, dot.y, r, 0, Math.PI * 2);
                ctx.fill();
            }
            rafId = w.requestAnimationFrame(tick);
        };

        w.addEventListener('mousemove', onMouseMove, { passive: true });
        w.addEventListener('touchmove', onTouchMove, { passive: true });
        w.addEventListener('mouseout', onLeave, { passive: true });
        w.addEventListener('resize', resize);

        resize();
        tick();

        return function cleanup() {
            w.cancelAnimationFrame(rafId);
            w.removeEventListener('mousemove', onMouseMove);
            w.removeEventListener('touchmove', onTouchMove);
            w.removeEventListener('mouseout', onLeave);
            w.removeEventListener('resize', resize);
        };
    };

    var remove = function () {
        if (done) return;
        done = true;
        w.clearTimeout(ceilingTimer);
        w.clearTimeout(holdTimer);
        if (stopDots) { stopDots(); stopDots = null; }
        root.classList.remove('pm-booting', 'pm-boot-calm');
        if (!overlay) return;
        overlay.classList.add('is-done');
        // Removed from the DOM rather than left at opacity 0: a full-viewport fixed
        // element that stays behind is one stacking-context bug away from swallowing
        // every click on the page.
        w.setTimeout(function () {
            if (overlay && overlay.parentNode) overlay.parentNode.removeChild(overlay);
            overlay = null;
        }, FADE);
    };

    // The normal path: the document is parsed and js/main.js is about to take the
    // hero. If that happened before MIN_HOLD has elapsed, wait out the remainder of
    // the floor before lifting the curtain; if MIN_HOLD had already passed on its
    // own (a real, slower load), there is nothing left to wait for.
    var domReady = function () {
        var remaining = MIN_HOLD - (Date.now() - startedAt);
        if (remaining > 0) {
            holdTimer = w.setTimeout(remove, remaining);
        } else {
            remove();
        }
    };

    try {
        // (1) The bounded release, armed before anything can throw.
        ceilingTimer = w.setTimeout(remove, MAX);

        // A visitor who has asked for less motion still gets the overture — it is a
        // brand beat and a progress indicator, which the preference explicitly
        // permits — but it loses the bounce, the letter cascade and the ticking
        // readout, and becomes a plain, briefly-held plate.
        var calm = w.matchMedia && w.matchMedia('(prefers-reduced-motion: reduce)').matches;

        root.classList.add('pm-booting');
        if (calm) root.classList.add('pm-boot-calm');

        // Spread across roughly the first half of MIN_HOLD rather than packed
        // into the opening moment, so the name reads as assembling deliberately,
        // letter by letter, instead of a quick blur early on followed by dead air
        // while the dot field and the readout finish alone.
        var nameHtml = '';
        for (var i = 0; i < NAME.length; i++) {
            var ch = NAME.charAt(i);
            nameHtml += '<span class="pm-boot-ch" style="animation-delay:' + (480 + i * 110) + 'ms">'
                + (ch === ' ' ? '&nbsp;' : ch) + '</span>';
        }

        var css = d.createElement('style');
        css.textContent = [
            /* The page underneath must not scroll while the curtain is up: a visitor
               who flicks a trackpad during load would otherwise land mid-page with no
               idea the top existed. Released with the class. */
            '.pm-booting{overflow:hidden}',

            '.pm-boot{position:fixed;inset:0;z-index:9500;display:flex;align-items:center;',
            'justify-content:center;background:#1c1b19;',
            'transition:opacity 300ms cubic-bezier(.22,1,.36,1);}',

            /* The curtain lifts rather than dissolving in place — it clears upward off
               the top of the screen, which reads as a shutter opening on the hero
               instead of a layer being deleted. */
            '.pm-boot.is-done{opacity:0;transform:translate3d(0,-2%,0);',
            'transition:opacity 300ms cubic-bezier(.22,1,.36,1),transform 420ms cubic-bezier(.22,1,.36,1);}',
            '.pm-boot-calm .pm-boot{transition:opacity 200ms linear}',
            '.pm-boot-calm .pm-boot.is-done{transform:none;transition:opacity 200ms linear}',

            /* The dot field sits absolutely behind the mark/name/readout stack so it
               does not participate in the overlay's own flex centering. Pointer
               events pass through it to the overlay beneath — the field only ever
               reads the cursor via window-level listeners, never needs to catch a
               click, and must never be able to eat one. */
            '.pm-boot-dots{position:absolute;inset:0;display:block;pointer-events:none;}',
            '.pm-boot-calm .pm-boot-dots{display:none}',

            '.pm-boot-inner{position:relative;z-index:1;display:flex;flex-direction:column;',
            'align-items:center;gap:16px;padding:0 24px;text-align:center;}',

            '.pm-boot-mark{width:60px;height:60px;display:block;',
            'filter:brightness(0) invert(1);opacity:.96;}',
            '.pm-booting:not(.pm-boot-calm) .pm-boot-mark{animation:pm-boot-mark 680ms cubic-bezier(.16,.86,.24,1.08) both}',
            '@keyframes pm-boot-mark{from{opacity:0;transform:translate3d(0,12px,0) scale(.86)}',
            'to{opacity:.96;transform:none}}',

            /* The business name — the same monospace, tracked-out treatment as the
               nav wordmark and the mobile Menu label, so the overture reads as this
               site's identity rather than a bolted-on splash design. Each letter is
               its own inline box so it can cascade in individually; a literal margin
               stands in for letter-spacing because tracking does not reliably apply
               across sibling elements the way it does across plain text. */
            '.pm-boot-word{display:flex;font-family:\'JetBrains Mono\',ui-monospace,\'SFMono-Regular\',Menlo,Consolas,monospace;',
            'font-size:14px;font-weight:600;text-transform:uppercase;',
            'color:rgba(247,243,236,.92);}',
            '.pm-boot-ch{display:inline-block;margin-right:.16em;opacity:1}',
            '.pm-boot-ch:last-child{margin-right:0}',
            '.pm-booting:not(.pm-boot-calm) .pm-boot-ch{animation:pm-boot-ch-in 340ms cubic-bezier(.16,.86,.24,1.08) both}',
            '@keyframes pm-boot-ch-in{from{opacity:0;transform:translate3d(0,9px,0)}to{opacity:1;transform:none}}',

            '.pm-boot-tagline{font-family:\'Plus Jakarta Sans\',system-ui,-apple-system,\'Segoe UI\',sans-serif;',
            'font-size:10.5px;font-weight:600;letter-spacing:.16em;text-transform:uppercase;',
            'color:rgba(247,243,236,.5);opacity:1;}',
            '.pm-booting:not(.pm-boot-calm) .pm-boot-tagline{animation:pm-boot-tagline-in 400ms cubic-bezier(.16,.72,.24,1) 2600ms both}',
            '@keyframes pm-boot-tagline-in{from{opacity:0;transform:translate3d(0,6px,0)}to{opacity:1;transform:none}}',

            '.pm-boot-progress{display:flex;align-items:center;gap:10px;margin-top:6px}',

            /* The rule is the only continuously-moving part, and it is a real
               progress indicator: it fills once, forward, and stops, in step with
               the readout beside it. Not a looping spinner — this site does not have
               continuous motion anywhere and the overture is not the place to
               introduce it. The fill is time-based rather than tied to bytes because
               a static site has no meaningful byte-level progress to report; it
               measures the guaranteed hold, not a claim about downloads — which is
               why both are driven by the same MIN_HOLD value. */
            '.pm-boot-rule{position:relative;width:120px;height:2px;border-radius:2px;',
            'background:rgba(247,243,236,.16);overflow:hidden;}',
            '.pm-boot-rule::after{content:"";position:absolute;inset:0;border-radius:inherit;',
            'background:#96502c;transform-origin:left center;transform:scaleX(0);}',
            '.pm-booting:not(.pm-boot-calm) .pm-boot-rule::after{animation:pm-boot-fill ' + MIN_HOLD + 'ms cubic-bezier(.16,.72,.24,1) both}',
            '.pm-boot-calm .pm-boot-rule::after{transform:scaleX(.35)}',
            '@keyframes pm-boot-fill{from{transform:scaleX(0)}to{transform:scaleX(1)}}',

            '.pm-boot-pct{font-family:\'JetBrains Mono\',ui-monospace,\'SFMono-Regular\',Menlo,Consolas,monospace;',
            'font-size:11px;font-variant-numeric:tabular-nums;min-width:2.6em;text-align:right;',
            'color:rgba(247,243,236,.55);}',
            '.pm-boot-calm .pm-boot-pct{display:none}'
        ].join('');
        d.head.appendChild(css);

        overlay = d.createElement('div');
        overlay.className = 'pm-boot';
        // The overture carries no information the page does not repeat immediately
        // underneath it, and a screen reader should never be told the site is "loading"
        // for a document it can already read.
        overlay.setAttribute('aria-hidden', 'true');

        // Path is resolved from this script's own src, so the same file works from the
        // site root and from pages/ without either page passing anything in.
        var here = d.currentScript && d.currentScript.src ? d.currentScript.src : '';
        var base = here ? here.replace(/js\/boot\.js.*$/, '') : '';

        overlay.innerHTML =
            '<div class="pm-boot-inner">' +
            '<img class="pm-boot-mark" src="' + base + 'images/icon.png" alt="">' +
            '<span class="pm-boot-word">' + nameHtml + '</span>' +
            '<span class="pm-boot-tagline">' + TAGLINE + '</span>' +
            '<span class="pm-boot-progress"><span class="pm-boot-rule"></span><span class="pm-boot-pct">0%</span></span>' +
            '</div>';

        // The dot field is a real <canvas>, not markup, so it is only ever built
        // for a visitor who can actually see it move — reduced motion gets no
        // canvas at all rather than one that sits there uselessly.
        if (!calm) {
            var dotsCanvas = d.createElement('canvas');
            dotsCanvas.className = 'pm-boot-dots';
            overlay.insertBefore(dotsCanvas, overlay.firstChild);
            stopDots = setupDots(dotsCanvas);
        }

        // <head> is the only parent that exists at this point. Fixed positioning means
        // the overlay paints correctly from here, and it is moved nowhere afterwards.
        root.appendChild(overlay);
        pctEl = overlay.querySelector('.pm-boot-pct');

        // The readout ticks in step with the rule's fill, both driven by the same
        // MIN_HOLD clock so the number reaches 100% right as the curtain is free to
        // lift. Skipped entirely under reduced motion — the rule holds a static
        // partial fill there instead, and the number is hidden rather than frozen.
        if (!calm && pctEl) {
            var tick = function () {
                if (done) return;
                var pct = Math.min(100, Math.round(((Date.now() - startedAt) / MIN_HOLD) * 100));
                pctEl.textContent = pct + '%';
                if (pct < 100) w.requestAnimationFrame(tick);
            };
            w.requestAnimationFrame(tick);
        }

        // (2) The normal path.
        if (d.readyState === 'loading') {
            d.addEventListener('DOMContentLoaded', domReady);
        } else {
            domReady();
        }
    } catch (err) {
        // (3) Anything unexpected: uncover the page immediately. An overture held
        // for its full MIN_HOLD is worth nothing next to a visitor staring at a
        // graphite rectangle because something above this line threw.
        remove();
    }
}(document, window));
