const cria = document.getElementById("b");
const btn = document.getElementById("btn");

const estados = {
    normal: "b_n.png",
    puto: "b_p.png",
    morto: "b_d.png",
    comendo: "b_c.png",
    alimentado: "b_a.png",
};

let contador = 0;
let intervalo = null;
let estaMorto = false;

function controlador() {
    // Limpa qualquer intervalo anterior para evitar bugs de aceleração
    if (intervalo) clearInterval(intervalo);

    intervalo = setInterval(() => {
        if (estaMorto) return; // Se morreu, para de contar

        contador++;
        console.log("Tempo sem comer:", contador, "segundos");

        // Estado: Bravo/Faminto (30 segundos)
        if (contador === 30) {
            cria.src = estados.puto;
        }

        // Estado: Morto (60 segundos)
        if (contador === 60) {
            cria.src = estados.morto;
            estaMorto = true;
            clearInterval(intervalo);
            console.log("O pet morreu :(");
        }
    }, 1000);
}

// Função para alimentar
btn.onclick = () => {
    if (estaMorto) {
        alert("Tarde demais... o bichinho partiu.");
        return;
    }

    // Muda para animação de comendo e depois volta ao normal
    cria.src = estados.comendo;
    
    // Reseta o contador
    contador = 0;

    // Pequeno feedback visual de que ele está feliz/alimentado
    setTimeout(() => {
        if (!estaMorto) {
            cria.src = estados.alimentado;
            
            // Após 2 segundos feliz, ele volta ao estado normal
            setTimeout(() => {
                if (!estaMorto) cria.src = estados.normal;
            }, 2000);
        }
    }, 1000);
};

// Inicia o ciclo
controlador();