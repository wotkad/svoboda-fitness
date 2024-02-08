export default function animationHero() {
    function TextScramble(el) {
        const chars = "!<>-_\\/[]{}—=+*^?#________";
        let frameRequest;
        let frame = 0;
        let queue = [];
        let resolve;

        function setText(newText) {
            if (el) {
                const oldText = el.innerText;
                const length = Math.max(oldText.length, newText.length);
                const promise = new Promise((res) => (resolve = res));
                queue = [];
                for (let i = 0; i < length; i++) {
                    const from = oldText[i] || "";
                    const to = newText[i] || "";
                    const start = Math.floor(Math.random() * 20);
                    const end = start + Math.floor(Math.random() * 20);
                    queue.push({ from, to, start, end });
                }
                cancelAnimationFrame(frameRequest);
                frame = 0;
                update();
                return promise;
            }
        }

        function update() {
            let output = "";
            let complete = 0;
            for (let i = 0, n = queue.length; i < n; i++) {
                let { from, to, start, end, char } = queue[i];
                if (frame >= end) {
                    complete++;
                    output += to;
                } else if (frame >= start) {
                    if (!char || Math.random() < 0.28) {
                        char = randomChar();
                        queue[i].char = char;
                    }
                    output += `<span class="dud">${char}</span>`;
                } else {
                    output += from;
                }
            }
            el.innerHTML = output;
            if (complete === queue.length) {
                resolve();
            } else {
                frameRequest = requestAnimationFrame(update);
                frame++;
            }
        }

        function randomChar() {
            return chars[Math.floor(Math.random() * chars.length)];
        }

        return { setText };
    }

    const phrases = [
        'СВОБОДНОЕ',
        'СИЛЬНОЕ',
        'КРЕПКОЕ',
        'АКТИВНОЕ',
        'КРАСИВОЕ',
        'ЭСТЕТИЧНОЕ',
        'БЕЗУПРЕЧНОЕ',
        'АТЛЕТИЧНОЕ'
    ];

    const el = document.querySelector(".output");

    const fx = TextScramble(el);

    let counter = 0;
    const next = () => {
        if (fx.setText(phrases[counter])) {
            fx.setText(phrases[counter]).then(() => {
                setTimeout(next, 2200);
            });
            counter = (counter + 1) % phrases.length;
        }
    };

    next();
}

animationHero();