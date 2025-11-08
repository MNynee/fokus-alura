const html = document.querySelector('html');

const languageSelector = document.querySelector('.app__language-title');
const arrowMenu = document.getElementById('arrow-menu');
const languageList = document.querySelector('.app__language-list');

const titulo = document.querySelector('.app__title');
const imgBanner = document.querySelector('.app__image');

const btnFoco = document.querySelector('.app__card-button--foco');
const btnCurto = document.querySelector('.app__card-button--curto');
const btnLongo = document.querySelector('.app__card-button--longo');
const btns = document.querySelectorAll('.app__card-button');

const musicToggle = document.getElementById('alternar-musica');
const musica = new Audio('/sons/luna-rise-part-one.mp3');
musica.loop = true;

const btnStartPause = document.getElementById('start-pause');
const btnStartPauseText = document.querySelector('#start-pause span');
const btnStartPauseImg = document.querySelector('.app__card-primary-butto-icon');

const timerContainer = document.getElementById('timer');

const playSound = new Audio('/sons/play.wav');
const pauseSound = new Audio('/sons/pause.mp3');
const endSound = new Audio('/sons/beep.mp3');

let timeInSeconds = 1500;
let timerInterval = null;

languageSelector.addEventListener('click', () => {
    if (languageList.style.transform === 'scaleY(1)') {
        languageList.style.transform = 'scaleY(0)';
        arrowMenu.style.transform = 'rotate(0deg)';
    } else {
        languageList.style.transform = 'scaleY(1)'
        arrowMenu.style.transform = 'rotate(-90deg)';
    }
})

btnFoco.addEventListener('click', () => {
    timeInSeconds = 1500;
    mudarContexto('foco');
    btnFoco.classList.add('active');
})

btnCurto.addEventListener('click', () => {
    timeInSeconds = 300;
    mudarContexto('descanso-curto');
    btnCurto.classList.add('active');
})

btnLongo.addEventListener('click', () => {
    timeInSeconds = 900;
    mudarContexto('descanso-longo');
    btnLongo.classList.add('active');
})

musicToggle.addEventListener('change', () => {
    if (musica.paused) {
        musica.play();
    } else {
        musica.pause();
    }
})

function mudarContexto(contexto) {
    showTimer();
    btns.forEach((btn) => {
        btn.classList.remove('active');
    });
    html.setAttribute('data-contexto', contexto);
    imgBanner.setAttribute('src', `/imagens/${contexto}.png`);

    if (html.lang === 'pt-br') {
        switch (contexto) {
            case 'foco':
                titulo.innerHTML = `Otimize sua produtividade,<br>
                <strong class="app__title-strong">mergulhe no que importa.</strong>`;
                break;
            case 'descanso-curto':
                titulo.innerHTML = `Que tal dar uma respirada?<br>
                <strong class="app__title-strong">Faça uma pausa curta.</strong>`;
                break;
            case 'descanso-longo':
                titulo.innerHTML = `Hora de voltar à superfície.<br>
                <strong class="app__title-strong">Faça uma pausa longa.</strong>`;
                break;

            default:
                break;
        }
    } else if (html.lang === 'en') {
        switch (contexto) {
            case 'foco':
                titulo.innerHTML = `Optimize your productivity,<br>
                <strong class="app__title-strong">dive into what matters.</strong>`;
                break;
            case 'descanso-curto':
                titulo.innerHTML = `How about a little breather?<br>
                <strong class="app__title-strong">Take a short break.</strong>`;
                break;
            case 'descanso-longo':
                titulo.innerHTML = `Time to return to the surface.<br>
                <strong class="app__title-strong">Take a long break.</strong>`;
                break;

            default:
                break;
        }
    } else if (html.lang === 'fr') {
        switch (contexto) {
            case 'foco':
                titulo.innerHTML = `Optimisez votre productivité,<br>
                <strong class="app__title-strong">plongez dans ce qui compte.</strong>`;
                break;
            case 'descanso-curto':
                titulo.innerHTML = `Et si on prenait un peu de répit?<br>
                <strong class="app__title-strong">Une petite pause.</strong>`;
                break;
            case 'descanso-longo':
                titulo.innerHTML = `Il est temps de remonter à la surface.<br>
                <strong class="app__title-strong">Prenez une longue pause.</strong>`;
                break;

            default:
                break;
        }
    } else if (html.lang === 'pl') {
        switch (contexto) {
            case 'foco':
                titulo.innerHTML = `Zoptymalizuj swoją produktywność,<br>
                <strong class="app__title-strong">zanurz się w tym, co ważne.</strong>`;
                break;
            case 'descanso-curto':
                titulo.innerHTML = `A może chwila wytchnienia?<br>
                <strong class="app__title-strong">Zrób sobie krótką przerwę.</strong>`;
                break;
            case 'descanso-longo':
                titulo.innerHTML = `Czas wrócić na powierzchnię.<br>
                <strong class="app__title-strong">Zrób sobie długą przerwę.</strong>`;
                break;

            default:
                break;
        }
    }
}

const countDown = () => {
    if (timeInSeconds <= 0) {
        endSound.play();
        if (html.lang === 'pt-br') {
            alert('Tempo finalizado!');
        } else if (html.lang === 'en') {
            alert('Time is over!');
        } else if (html.lang === 'fr') {
            alert('Le temps est fini!');
        } else if (html.lang === 'pl') {
            alert('Czas się skończył!');
        }

        const activeFocus = html.getAttribute('data-contexto') == 'foco';
        if (activeFocus) {
            const event = new CustomEvent('focusFinished');
            document.dispatchEvent(event);
        }
        resetTimer();
        return;
    }
    timeInSeconds -= 1;
    showTimer();
}

btnStartPause.addEventListener('click', startPauseTimer);

function startPauseTimer() {
    if (timerInterval) {
        resetTimer();
        pauseSound.play();
        btnStartPauseImg.src = '/imagens/play_arrow.png';
        if (html.lang === 'pt-br') {
            btnStartPauseText.textContent = 'Continuar';
        } else if (html.lang === 'en') {
            btnStartPauseText.textContent = 'Continue';
        } else if (html.lang === 'fr') {
            btnStartPauseText.textContent = 'Continuer';
        } else if (html.lang === 'pl') {
            btnStartPauseText.textContent = 'Kontynuuj';
        }
        return;
    }
    playSound.play();
    timerInterval = setInterval(countDown, 1000);
    btnStartPauseImg.src = '/imagens/pause.png';
    if (html.lang === 'pt-br') {
        btnStartPauseText.textContent = 'Pausar';
    } else if (html.lang === 'en') {
        btnStartPauseText.textContent = 'Pause';
    } else if (html.lang === 'fr') {
        btnStartPauseText.textContent = 'Pauser';
    } else if (html.lang === 'pl') {
        btnStartPauseText.textContent = 'Pauza';
    }

}

function resetTimer() {
    clearInterval(timerInterval);
    timerInterval = null;
}

function showTimer() {
    const time = new Date(timeInSeconds * 1000);
    const formatedTime = time.toLocaleTimeString('pt-Br', { minute: '2-digit', second: '2-digit' });
    timerContainer.innerHTML = `${formatedTime}`;
}

showTimer();