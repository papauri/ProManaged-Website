/* boot.js — the load overture.

   THIS IS NOT A SPLASH SCREEN. The design contract rules out a splash delay, and
   nothing here adds one: the overlay covers only the time the page was already going
   to spend getting ready, and it leaves the moment the document is parsed. On a warm
   cache that is a couple of frames and the visitor sees a flicker of the mark at most.
   It can never make the site slower to use — it has no minimum duration anywhere in
   it, only a maximum.

   It is loaded SYNCHRONOUSLY in <head>, before the stylesheets have painted anything,
   which is the only place it can be: an overlay that appears after first paint is a
   flash of content followed by a curtain, which is worse than no curtain at all.
   Because of that it must stay small and must not touch layout.

   VISIBILITY IS MONOTONIC, exactly as it is for the hero in global_styles.css. Four
   independent guarantees that the curtain always lifts:
     1. The removal timer is armed BEFORE the overlay is inserted, so even if every
        line after it throws, the page is uncovered on a bounded clock.
     2. Removal is also bound to DOMContentLoaded, which is the normal path.
     3. The whole body is wrapped in try/catch, and the catch removes the overlay.
     4. It only ever exists at all if this script ran; no JavaScript means no overlay,
        because there is no markup for one anywhere in the HTML.

   The mark, the rule and the readout are drawn from the page's own tokens, so the
   overture is the same design system as everything behind it. */
(function (d, w) {
    'use strict';

    // The hard ceiling. Nothing waits for this on a healthy load — DOMContentLoaded
    // gets there long first. It exists for the pathological case: a stylesheet that
    // never resolves, a font request hanging on a dead CDN, a parse error in a script
    // above this one. The visitor gets the page regardless.
    var MAX = 2200;

    // Matches the fade below. Kept as one value so the class removal and the DOM
    // removal cannot drift apart.
    var FADE = 420;

    var root = d.documentElement;
    var overlay = null;
    var done = false;
    var timer = 0;

    var remove = function () {
        if (done) return;
        done = true;
        w.clearTimeout(timer);
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

    try {
        // (1) The bounded release, armed before anything can throw.
        timer = w.setTimeout(remove, MAX);

        // A visitor who has asked for less motion still gets the overture — it is a
        // progress indicator, which the preference explicitly permits — but it loses
        // the sweep and the assembly and becomes a plain, briefly-held plate.
        var calm = w.matchMedia && w.matchMedia('(prefers-reduced-motion: reduce)').matches;

        root.classList.add('pm-booting');
        if (calm) root.classList.add('pm-boot-calm');

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

            '.pm-boot-inner{display:flex;flex-direction:column;align-items:center;gap:22px;',
            'padding:0 24px;text-align:center;}',

            '.pm-boot-mark{width:52px;height:52px;display:block;',
            'filter:brightness(0) invert(1);opacity:.94;}',
            '.pm-booting:not(.pm-boot-calm) .pm-boot-mark{animation:pm-boot-mark 620ms cubic-bezier(.16,.86,.24,1.08) both}',
            '@keyframes pm-boot-mark{from{opacity:0;transform:translate3d(0,10px,0) scale(.88)}',
            'to{opacity:.94;transform:none}}',

            '.pm-boot-word{font-family:\'Plus Jakarta Sans\',system-ui,-apple-system,\'Segoe UI\',sans-serif;',
            'font-size:11px;font-weight:600;letter-spacing:.34em;text-transform:uppercase;',
            'color:rgba(247,243,236,.62);}',

            /* The rule is the only moving part, and it is a real progress indicator:
               it fills once, forward, and stops. Not a looping spinner — this site
               does not have continuous motion anywhere and the overture is not the
               place to introduce it. The fill is time-based rather than tied to bytes
               because a static site has no meaningful byte-level progress to report;
               it is a measure of the wait, not a claim about downloads. */
            '.pm-boot-rule{position:relative;width:132px;height:2px;border-radius:2px;',
            'background:rgba(247,243,236,.16);overflow:hidden;}',
            '.pm-boot-rule::after{content:"";position:absolute;inset:0;border-radius:inherit;',
            'background:#96502c;transform-origin:left center;transform:scaleX(0);}',
            '.pm-booting:not(.pm-boot-calm) .pm-boot-rule::after{animation:pm-boot-fill 2000ms cubic-bezier(.16,.72,.24,1) both}',
            '.pm-boot-calm .pm-boot-rule::after{transform:scaleX(.35)}',
            '@keyframes pm-boot-fill{from{transform:scaleX(0)}to{transform:scaleX(1)}}'
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
            '<span class="pm-boot-word">ProManaged IT</span>' +
            '<span class="pm-boot-rule"></span>' +
            '</div>';

        // <head> is the only parent that exists at this point. Fixed positioning means
        // the overlay paints correctly from here, and it is moved nowhere afterwards.
        root.appendChild(overlay);

        // (2) The normal path. The document is parsed, the stylesheets have resolved,
        // and js/main.js is about to take the hero — so the curtain goes now and the
        // assembly happens in front of the visitor rather than behind a screen.
        if (d.readyState === 'loading') {
            d.addEventListener('DOMContentLoaded', remove);
        } else {
            remove();
        }
    } catch (err) {
        // (3) Anything unexpected: uncover the page. An overture is worth nothing
        // next to a visitor staring at a graphite rectangle.
        remove();
    }
}(document, window));
