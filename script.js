// =============== FUNCIONES DE MAPEO ===============
function norm(value, min, max) {
    return (value - min) / (max - min);
}

function lerp(norm, min, max) {
    return (max - min) * norm + min;
}

function map(value, sourceMin, sourceMax, destMin, destMax) {
    return lerp(norm(value, sourceMin, sourceMax), destMin, destMax);
}

function map2(value, sourceMin, sourceMax, destMin, destMax, percent) {
    return percent <= 0.5
        ? map(value, sourceMin, sourceMax, destMin, destMax)
        : map(value, sourceMin, sourceMax, destMax, destMin);
}

// =============== EFECTO FISHEYE RESPONSIVE ===============
function fisheye(el) {
    let text = el.innerText.trim();
    let numberOfChars = text.length;

    el.innerHTML = "<span>" +
        text
            .split("")
            .map(c => (c === " " ? " " : c))
            .join("</span><span>") +
        "</span>";

    el.querySelectorAll("span").forEach((c, i) => {
        const isMobile = window.innerWidth < 768;

        // 🔽 efecto MUCHO más suave en móvil
        const skew = map(i, 0, numberOfChars - 1, isMobile ? -5 : -15, isMobile ? 5 : 15);
        const scale = map2(i, 0, numberOfChars - 1, 1, isMobile ? 1.3 : 3, i / numberOfChars);
        const letterSpace = map2(i, 0, numberOfChars - 1, isMobile ? 1 : 5, isMobile ? 6 : 20, i / numberOfChars);

        c.style.transform = `skew(${skew}deg) scale(1, ${scale})`;
        c.style.letterSpacing = `${letterSpace}px`;
        c.style.display = 'inline-block';
    });
}

// =============== INICIALIZAR TODO ===============
function initPage() {
    const title = document.querySelector("#hero h1");
    if (title) {
        fisheye(title);
    }
}

// Eventos
document.addEventListener('DOMContentLoaded', initPage);

let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(initPage, 250);
});

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.getElementById('hero');
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
});
