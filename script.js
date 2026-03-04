const botaoNao = document.getElementById("nao");
const botaoSim = document.getElementById("sim");
const area = document.querySelector(".area-botoes");

let escala = 1;

botaoNao.addEventListener("click", function () {

    botaoSim.innerText = "(Quando se cansar é só clicar aqui) \nAceito sair com você";

    diminuirBotao();
    moverBotao();
});

function diminuirBotao() {
    escala -= 0.15;

    if (escala <= 0.2) {
        botaoNao.style.display = "none";
        botaoSim.innerText = "Claro que aceito";
        return;
    }

    botaoNao.style.transform = `scale(${escala})`;
}

function moverBotao() {

    const larguraArea = area.clientWidth;
    const alturaArea = area.clientHeight;

    const larguraBotao = botaoNao.offsetWidth;
    const alturaBotao = botaoNao.offsetHeight;

    const larguraSim = botaoSim.offsetWidth;
    const alturaSim = botaoSim.offsetHeight;

    const simX = botaoSim.offsetLeft;
    const simY = botaoSim.offsetTop;

    let novaPosX, novaPosY;
    let sobrepoe;

    do {
        novaPosX = Math.random() * (larguraArea - larguraBotao);
        novaPosY = Math.random() * (alturaArea - alturaBotao);

        sobrepoe =
            novaPosX < simX + larguraSim &&
            novaPosX + larguraBotao > simX &&
            novaPosY < simY + alturaSim &&
            novaPosY + alturaBotao > simY;

    } while (sobrepoe);

    botaoNao.style.left = novaPosX + "px";
    botaoNao.style.top = novaPosY + "px";
}
