const btnControlador = document.querySelector("#controlador");
const btnAvancar = document.querySelector("#avancar");

const btnsTempo = document.querySelectorAll(".btns__tempo");

const btnConfiguracoes = document.querySelector(".configuracoes");
const btnSalvar = document.querySelector("#salvar");

btnControlador.addEventListener("click", () => {
    let deveIniciar, devePausar, deveDespausar;
    deveIniciar = btnControlador.classList.contains("iniciar");
    devePausar = btnControlador.classList.contains("pausar");
    deveDespausar = btnControlador.classList.contains("despausar");

    if (deveIniciar) {
        btnControlador.classList.remove("iniciar");
        btnControlador.classList.add("pausar");

        btnControlador.textContent = "Pausar";

        pomodoro.reset();
        pomodoro.iniciar();
    } else if (devePausar) {
        btnControlador.classList.remove("pausar");
        btnControlador.classList.add("despausar");

        btnControlador.textContent = "Despausar";

        pomodoro.pausar();
    } else if (deveDespausar) {
        btnControlador.classList.remove("despausar");
        btnControlador.classList.add("pausar");

        btnControlador.textContent = "Pausar";

        pomodoro.iniciar();
    }
});

btnConfiguracoes.addEventListener('click', () => {
    input_pomodoro.value = milesegundosParaMinutos(tempos[0]);
    input_pausaCurta.value = milesegundosParaMinutos(tempos[1]);
    input_pausaLonga.value = milesegundosParaMinutos(tempos[2]);

});

btnSalvar.addEventListener('click', () => {
    t_pomodoro = minutosParaMilesegundos(Number(input_pomodoro.value));
    t_pausaCurta = minutosParaMilesegundos(Number(input_pausaCurta.value));
    t_pausaLonga = minutosParaMilesegundos(Number(input_pausaLonga.value));
    tempos = [t_pomodoro, t_pausaCurta, t_pausaLonga];
    storage.set(tempos);
    pomodoro.reset();
    pomodoro.attPomodoro();
});

function mudarControladorIniciar() {
    if (btnControlador.classList.contains("pausar"))
        btnControlador.classList.remove("pausar");
    else if (btnControlador.classList.contains("despausar"))
        btnControlador.classList.remove("despausar");
    btnControlador.classList.add("iniciar");
    btnControlador.textContent = "Iniciar";
    pomodoro.attPomodoro();
}

function mudarTempo(id) {
    pomodoro.pausar();
    idTempo = id;
    pomodoro.reset();
    mudarControladorIniciar();
}

btnAvancar.addEventListener("click", () => {
    pomodoro.avancar();
    mudarControladorIniciar();
});

function attPeriodo() {
    btnsTempo.forEach((btn, id) => {
        if (id != idTempo && btn.classList.contains("tempo_atual"))
            btn.classList.remove("tempo_atual");
        else if (id === idTempo && !btn.classList.contains("tempo_atual"))
            btn.classList.add("tempo_atual");
    });
}

attPeriodo();
pomodoro.attPomodoro();
