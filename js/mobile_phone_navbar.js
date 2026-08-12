/* Bento navigation panel.
   The logo tile is the only navigation control; it opens a full-viewport panel of
   destination blocks. Same interaction on desktop and mobile.

   Filename kept as mobile_phone_navbar.js because every page references this path.

   Owns: aria-expanded, focus trap, Escape, background scroll lock, and returning
   focus to the trigger on close. */
document.addEventListener('DOMContentLoaded', () => {
    const trigger = document.querySelector('#nav-trigger');
    const panel = document.querySelector('#nav-panel');
    const closeBtn = document.querySelector('#nav-close');

    if (!trigger || !panel) return;

    const FOCUSABLE = 'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])';
    let isOpen = false;
    let closeTimer = null;

    const focusable = () =>
        [...panel.querySelectorAll(FOCUSABLE)].filter(el => el.offsetParent !== null);

    const open = () => {
        if (isOpen) return;
        isOpen = true;
        window.clearTimeout(closeTimer);

        // Lock the background without letting the page jump sideways as the
        // scrollbar disappears.
        const scrollbar = window.innerWidth - document.documentElement.clientWidth;
        if (scrollbar > 0) document.body.style.paddingRight = scrollbar + 'px';
        document.body.style.overflow = 'hidden';
        document.documentElement.classList.add('nav-is-open');

        // Anchor the unfold to the control the visitor actually pressed, so the panel
        // grows out of it the way an app opens from its icon. Measured at open time
        // rather than hard-coded because the control moves with --rail-pad across
        // breakpoints. Percentages keep the origin correct if the viewport is
        // resized while the panel is open.
        const box = trigger.getBoundingClientRect();
        if (box.width) {
            panel.style.setProperty('--nav-origin-x', ((box.left + box.width / 2) / window.innerWidth * 100) + '%');
            panel.style.setProperty('--nav-origin-y', ((box.top + box.height / 2) / window.innerHeight * 100) + '%');
        }

        panel.hidden = false;
        trigger.setAttribute('aria-expanded', 'true');
        // The label described the ACTION but never changed, so a screen reader
        // announced "Open navigation menu" on a menu that was already open.
        trigger.setAttribute('aria-label', 'Close navigation menu');

        // Two frames: the first paints the pre-open state, the second flips it —
        // without this the assembly transition is skipped entirely.
        requestAnimationFrame(() => requestAnimationFrame(() => panel.classList.add('is-open')));

        // Move focus into the panel so keyboard and screen-reader users land there.
        const first = focusable()[0];
        if (first) first.focus();
    };

    const close = ({ restoreFocus = true } = {}) => {
        if (!isOpen) return;
        isOpen = false;

        panel.classList.remove('is-open');
        trigger.setAttribute('aria-expanded', 'false');
        trigger.setAttribute('aria-label', 'Open navigation menu');
        document.documentElement.classList.remove('nav-is-open');
        document.body.style.overflow = '';
        document.body.style.paddingRight = '';

        // Keep the panel in the layout until its fade-out has finished, then remove
        // it from the accessibility tree and tab order entirely.
        closeTimer = window.setTimeout(() => { panel.hidden = true; }, 280);

        if (restoreFocus) trigger.focus();
    };

    trigger.addEventListener('click', () => (isOpen ? close() : open()));
    if (closeBtn) closeBtn.addEventListener('click', () => close());

    // Following a destination should not restore focus to the trigger — the browser
    // is navigating away, and for an in-page anchor focus belongs at the target.
    panel.querySelectorAll('a[href]').forEach(link => {
        link.addEventListener('click', () => close({ restoreFocus: false }));
    });

    document.addEventListener('keydown', (e) => {
        if (!isOpen) return;

        if (e.key === 'Escape') {
            e.preventDefault();
            close();
            return;
        }

        if (e.key !== 'Tab') return;

        // Focus trap: cycle within the panel while it is open.
        const items = focusable();
        if (!items.length) return;
        const first = items[0];
        const last = items[items.length - 1];

        if (e.shiftKey && document.activeElement === first) {
            e.preventDefault();
            last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
            e.preventDefault();
            first.focus();
        } else if (!panel.contains(document.activeElement)) {
            // Focus escaped the panel (e.g. from the browser chrome) — pull it back.
            e.preventDefault();
            first.focus();
        }
    });
});
