const canvas = document.getElementById("fireCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];
let opacityOverlay = 0;

function createParticle() {
    return {
        x: Math.random() * canvas.width,
        y: canvas.height,
        size: Math.random() * 8 + 4,
        speedY: Math.random() * 3 + 2,
        opacity: 1
    };
}

for (let i = 0; i < 150; i++) {
    particles.push(createParticle());
}

function animateFire() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach((p, index) => {

        let gradient = ctx.createRadialGradient(
            p.x, p.y, 0,
            p.x, p.y, p.size
        );

        gradient.addColorStop(0, "rgba(255,255,200," + p.opacity + ")");
        gradient.addColorStop(0.3, "rgba(255,140,0," + p.opacity + ")");
        gradient.addColorStop(0.6, "rgba(255,69,0," + p.opacity + ")");
        gradient.addColorStop(1, "rgba(0,0,0,0)");

        ctx.fillStyle = gradient;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        p.y -= p.speedY;
        p.opacity -= 0.01;

        if (p.opacity <= 0) {
            particles[index] = createParticle();
        }
    });

    // overlay escurecendo gradualmente
    ctx.fillStyle = "rgba(0,0,0," + opacityOverlay + ")";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    requestAnimationFrame(animateFire);
}

animateFire();

const introTexto = document.getElementById("introTexto");
const btnIntro = document.getElementById("btnIntro");

setTimeout(() => {
    introTexto.style.opacity = "1";
}, 3000); // 3 segundos

setTimeout(() => {
    btnIntro.style.opacity = "1";
}, 6000); // 3s + 3s

// Fundo ficando mais escuro ao longo do tempo
let fadeInterval = setInterval(() => {
    if (opacityOverlay < 0.6) {
        opacityOverlay += 0.005;
    }
}, 100);

// Clique avança
btnIntro.addEventListener("click", () => {
    document.getElementById("tela0").classList.remove("ativa");
    document.getElementById("tela1").classList.add("ativa");
});

/* ===== TELA 1 LÓGICA ===== */

const botaoNao = document.getElementById("nao");
const botaoSim = document.getElementById("sim");
const titulo = document.getElementById("titulo");
const area = document.querySelector(".area-botoes");

let estagioNao = 0;

botaoNao.addEventListener("click", () => {

    estagioNao++;

    if (estagioNao === 1) {
        botaoNao.innerText = "Tem certeza?";
        botaoSim.innerText = "Assim que cansar é só aceitar";
    }

    if (estagioNao === 2) {
        botaoNao.innerText = "Olha vai ser legal";
    }

    if (estagioNao === 3) {
        botaoNao.innerText = "Tá ficando difícil aqui...";
    }

    if (estagioNao === 4) {
        botaoNao.innerText = "Ah é sério isso Rita?";
        botaoNao.classList.add("tremer");
    }

    if (estagioNao >= 5) {
        botaoNao.style.transition = "all 0.6s ease";
        botaoNao.style.transform = "scale(0)";
        botaoNao.style.opacity = "0";

        setTimeout(() => {
            botaoNao.style.display = "none";
        }, 600);

        botaoSim.innerText = "Claro que aceito";
        return;
    }

    moverBotao();
});

function moverBotao() {

    const larguraArea = area.clientWidth;
    const alturaArea = area.clientHeight;

    const larguraNao = botaoNao.offsetWidth;
    const alturaNao = botaoNao.offsetHeight;

    let novaX = Math.random() * (larguraArea - larguraNao);
    let novaY = Math.random() * (alturaArea - alturaNao);

    botaoNao.style.left = novaX + "px";
    botaoNao.style.top = novaY + "px";
}

/* ===== CLIQUE NO SIM ===== */

botaoSim.addEventListener("click", () => {

    titulo.classList.add("brilhar");

    let mensagemTransicao = "";

    if (estagioNao === 0) {
        mensagemTransicao = "Nossa não esperava que fosse de primeira fico feliz";
    } 
    else if (estagioNao === 3) {
        mensagemTransicao = "Demorou mais aceitou pelo menos";
    } 
    else if (estagioNao >= 5) {
        mensagemTransicao = "Tava demorando em foi por livre e espontânea pressão mas foi";
    } 
    else {
        mensagemTransicao = "Demorou mais aceitou pelo menos";
    }

    criarExplosao();

    mostrarTransicao(mensagemTransicao);

    setTimeout(() => {
        trocarTela("tela2");
    }, 2500);
});

function mostrarTransicao(texto) {

    const div = document.createElement("div");
    div.style.position = "fixed";
    div.style.top = "0";
    div.style.left = "0";
    div.style.width = "100%";
    div.style.height = "100%";
    div.style.background = "rgba(0,0,0,0.9)";
    div.style.display = "flex";
    div.style.justifyContent = "center";
    div.style.alignItems = "center";
    div.style.color = "white";
    div.style.fontSize = "20px";
    div.style.textAlign = "center";
    div.style.padding = "20px";
    div.style.zIndex = "9999";
    div.innerText = texto;

    document.body.appendChild(div);

    setTimeout(() => {
        div.remove();
    }, 2000);
}
