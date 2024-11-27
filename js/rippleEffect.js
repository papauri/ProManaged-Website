document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', function (e) {
            const circle = document.createElement('span');
            const diameter = Math.max(this.clientWidth, this.clientHeight);
            const radius = diameter / 2;

            circle.style.width = circle.style.height = `${diameter}px`;
            circle.style.left = `${e.clientX - this.offsetLeft - radius}px`;
            circle.style.top = `${e.clientY - this.offsetTop - radius}px`;
            circle.classList.add('ripple');

            const ripple = this.getElementsByClassName('ripple')[0];
            if (ripple) {
                ripple.remove();
            }

            this.appendChild(circle);
        });
    });
});
