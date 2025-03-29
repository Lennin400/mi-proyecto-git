// Código JavaScript
function playGame(userChoice) {
    const options = ['piedra', 'papel', 'tijera'];
    const computerChoice = options[Math.floor(Math.random() * options.length)];

    let result = '';

    if (userChoice === computerChoice) {
        result = `Empate 🤝. Ambos eligieron ${userChoice}.`;
    } else if (
        (userChoice === 'piedra' && computerChoice === 'tijera') ||
        (userChoice === 'papel' && computerChoice === 'piedra') ||
        (userChoice === 'tijera' && computerChoice === 'papel')
    ) {
        result = `¡Ganaste! 🎉 ${userChoice} vence a ${computerChoice}.`;
    } else {
        result = `Perdiste 😢. ${computerChoice} vence a ${userChoice}.`;
    }

    document.getElementById('result').innerText = result;
}
