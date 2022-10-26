const timer = document.querySelector("timer");

const input_pomodoro = document.querySelector("#tempo_pomodoro");
const input_pausaCurta = document.querySelector("#tempo_pausa_curta");
const input_pausaLonga = document.querySelector("#tempo_pausa_longa");

const alarme = new Audio('assets/audios/alarme.mp3');

var t_pomodoro,
    t_pausaCurta,
    t_pausaLonga,
    tempos,
    idTempo,
    ehPausaLonga,
    fim,
    atual,
    intervalo,
    contagem;

tempos = storage.get('tempos');
idTempo = 0;
ehPausaLonga = false;
fim = 0;
atual = null;
intervalo = 0;
contagem = null;

function formatarMilisegundos(tempo) {
    if (tempo < 0) return { s: `00`, m: `00` };

    let segundos, minutos;
    segundos = String(Math.floor(tempo / 1000) % 60);
    if (segundos < 10) segundos = `0${segundos}`;

    minutos = Math.floor(tempo / 1000 / 60);
    if (minutos < 10) minutos = `0${minutos}`;

    return { s: segundos, m: minutos };
}

function minutosParaMilesegundos(minutos) {
    return minutos * 60 * 1000;
}

function milesegundosParaMinutos(milesegundos) {
    return milesegundos/60/1000;
}

const pomodoro = {
    reset: () => {
        tempos = storage.get('tempos');
        intervalo = tempos[idTempo] + 999;
        atual = tempos[idTempo] + 999;
        attPeriodo();
    },

    iniciar: () => {
        fim = Date.parse(new Date()) + intervalo;
        contagem = setInterval(() => {
            atual = fim - new Date();
            pomodoro.attPomodoro();
            pomodoro.seDeveEncerrar();
        }, 0);
    },

    pausar: () => {
        if (contagem) {
            clearInterval(contagem);
            intervalo = fim - new Date();
        }
    },

    attPomodoro: () => {
        let aux, txt;
        aux = atual
            ? formatarMilisegundos(atual)
            : formatarMilisegundos(tempos[idTempo]);
        txt = `${aux.m}:${aux.s}`;
        timer.textContent = txt;
        attPeriodo();
    },

    seDeveEncerrar: () => {
        if (atual <= 0) {
            clearInterval(contagem);
            pomodoro.proximoTempo();
            pomodoro.reset();
            alarme.play()
            setTimeout(() => {
                pomodoro.iniciar();
            }, 1000);
        }
    },

    avancar: () => {
        clearInterval(contagem);
        pomodoro.proximoTempo();
        pomodoro.reset();
    },

    proximoTempo: () => {
        idTempo++;
        if (idTempo === 2 && !ehPausaLonga) {
            ehPausaLonga = true;
            idTempo = 0;
        } else if (idTempo === 1 && ehPausaLonga) {
            ehPausaLonga = false;
            idTempo = 2;
        } else if (idTempo > 2) {
            idTempo = 0;
        }
    },
};
