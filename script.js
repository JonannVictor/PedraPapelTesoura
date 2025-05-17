"use strict";

const cards = window.document.querySelectorAll(".card");
const topDisplay = window.document.querySelector("#topDisplay");
const highlightedCard = window.document.querySelector("#highlightedCard");
const tableBody = window.document.querySelector("#tableBody");
const playAgainBtn = window.document.querySelector("#playAgainBtn");
const resultText = window.document.querySelector("#resultText");

//  Possíveis valores de "jogada":
//      - 🪨
//      - 📄
//      - ✂️
//
function logica(jogada) {
    // TODO: Mão na massa!!
    let jogadorVenceu = false;
    let deuEmpate = false;
    
    let maquina = Math.floor(Math.random() * 3); 
    switch (maquina) {
        case 0:
            maquina = "🪨";
            break;
        case 1:
            maquina = "📄";
            break;
        case 2:
            maquina = "✂️";
            break;
    }
    // Verifica se o jogador venceu
    if (jogada === "🪨" && maquina === "✂️") { 
        jogadorVenceu = true;
    }
    if (jogada === "📄" && maquina === "🪨") {
        jogadorVenceu = true;
    }
    if (jogada === "✂️" && maquina === "📄") {
        jogadorVenceu = true;
    }
    // Verifica se deu empate
    if (jogada === maquina) {
        deuEmpate = true;
    }
    // Verifica se o jogador perdeu
    if (jogada === "🪨" && maquina === "📄") {
        jogadorVenceu = false;
    }
    if (jogada === "📄" && maquina === "✂️") {
        jogadorVenceu = false;
    }
    if (jogada === "✂️" && maquina === "🪨") {
        jogadorVenceu = false;
    }
    // Atualiza o texto do resultado
    if (jogadorVenceu) {
        resultText.textContent = "Você venceu!";
        tableBody.innerHTML += `<tr><td>${jogada}</td><td>${maquina}</td><td>Você venceu!</td></tr>`;
    } else if (deuEmpate) {
        resultText.textContent = "Deu empate!";
        tableBody.innerHTML += `<tr><td>${jogada}</td><td>${maquina}</td><td>Deu empate!</td></tr>`;
    } else {
        resultText.textContent = "Você perdeu!";
        tableBody.innerHTML += `<tr><td>${jogada}</td><td>${maquina}</td><td>Você perdeu!</td></tr>`;
    }
    // Atualiza a tabela
    const rows = tableBody.querySelectorAll("tr");
    rows.forEach((row, index) => {
        if (index % 2 === 0) {
            row.style.backgroundColor = "#f0f0f0";
        } else {
            row.style.backgroundColor = "#ffffff"; 
        }
    });
}


cards.forEach(card => {
    card.addEventListener('click', () => {
        const char = card.dataset.char;

        highlightedCard.textContent = char;
        topDisplay.classList.remove('hidden');
        playAgainBtn.style.display = 'inline-block';

        // Remove a linha de "Sem dados no momento" se ela existir
        if (tableBody.children.length === 1 && tableBody.children[0].textContent.includes("Sem dados")) {
            tableBody.innerHTML = '';
        }

        logica(card.innerHTML);
    });
});

playAgainBtn.addEventListener('click', () => {
    topDisplay.classList.add('hidden');
    playAgainBtn.style.display = 'none';
    tableBody.innerHTML = `<tr><td colspan="3">Sem dados no momento</td></tr>`;
});
