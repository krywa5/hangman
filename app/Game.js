import { Quote } from "./Quote.js";

class Game {
    currentStep = 0;
    lastStep = 7;

    quotes = [{
        text: "pan tadeusz",
        category: "Utwór literacki",
    },
    {
        text: "janko muzykant",
        category: "Utwór literacki",
    },
    {
        text: "akademia pana kleksa",
        category: "Film",
    },
    {
        text: "ogniem i mieczem",
        category: "Film",
    },
    ];

    constructor({
        lettersWrapper,
        categoryWrapper,
        wordWrapper,
        outputWrapper,
    }) {
        this.lettersWrapper = lettersWrapper;
        this.categoryWrapper = categoryWrapper;
        this.wordWrapper = wordWrapper;
        this.outputWrapper = outputWrapper;

        const { text, category } = this.quotes[Math.floor(Math.random() * this.quotes.length)];

        this.categoryWrapper.innerHTML = category;
        this.quote = new Quote(text);
    }

    guess(letter, event) {
        event.target.disabled = true;
        if (this.quote.guess(letter)) {
            this.drawQuote();
        } else {
            this.currentStep++;
            this.updateStepImg();
            if (this.currentStep === this.lastStep) this.loosing();
        };
    }

    updateStepImg() {
        document.getElementsByClassName('step')[this.currentStep].style.opacity = 1;
    }

    endGame(gameResult = 'loss') {
        let message = 'NIESTETY PRZEGRAŁEŚ! SPRÓBUJ PONOWNIE!';

        if (gameResult === 'win') message = 'GRATULACJE! WYGRAŁEŚ! KONIEC GRY!';
        if (this.currentStep === 0) message = 'WOW! JESTEŚ BEZBŁĘDNY JAK SŁOWNIK JĘZYKA POLSKIEGO! GRATULACJE!';

        this.wordWrapper.innerText = message;
        this.lettersWrapper.innerHTML = "";
        this.categoryWrapper.innerHTML = "";
    }

    winning() {
        this.endGame('win');
    }

    loosing() {
        this.endGame();
    }

    createLetters() {
        for (let i = 0; i < 26; i++) {
            const label = (i + 10).toString(36);
            const button = document.createElement('button');
            button.innerHTML = label;
            button.addEventListener('click', (event) => {
                this.guess(label, event);
            });
            this.lettersWrapper.appendChild(button);
        }
    }

    drawQuote() {
        const content = this.quote.getContent();
        this.wordWrapper.innerHTML = content;
        if (!content.includes('_')) this.winning();
    }

    start() {
        this.updateStepImg();
        this.createLetters();
        this.drawQuote();
    }
}

const game = new Game({
    lettersWrapper: document.getElementById('letters'),
    categoryWrapper: document.getElementById('category'),
    wordWrapper: document.getElementById('word'),
    outputWrapper: document.getElementById('output'),
});
game.start();