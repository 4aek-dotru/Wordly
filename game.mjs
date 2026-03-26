const SETTINGS = {
    "WORDS": ["АБЗАЦ", "АВАНС", "АВТОР", "АГЕНТ", "АДРЕС", "АЗАРТ", "АКТЕР", "АКЦИЯ", "АЛМАЗ", "АМБАР", "АНГЕЛ", "АРБУЗ", "АРЕНА", "АРЕСТ", "АРХИВ", "БАЗАР", "БАЙКА", "БОКАЛ", "БАЛЕТ", "БАЛКА", "БАНКА", "БАРАН"],
    "KEYBOARD": {
        "А": "KeyF",
        "Б": "Comma",
        "В": "KeyD",
        "Г": "KeyU",
        "Д": "KeyL",
        "Е": "KeyT",
        "Ё": "Backquote",
        "Ж": "Semicolon",
        "З": "KeyP",
        "И": "KeyB",
        "Й": "KeyQ",
        "К": "KeyR",
        "Л": "KeyK",
        "М": "KeyV",
        "Н": "KeyY",
        "О": "KeyJ",
        "П": "KeyG",
        "Р": "KeyH",
        "С": "KeyC",
        "Т": "KeyN",
        "У": "KeyE",
        "Ф": "KeyA",
        "Х": "BracketLeft",
        "Ц": "KeyW",
        "Ч": "KeyX",
        "Ш": "KeyI",
        "Щ": "KeyO",
        "Ъ": "BracketRight",
        "Ы": "KeyS",
        "Ь": "KeyM",
        "Э": "Quote",
        "Ю": "Period",
        "Я": "KeyZ",
        "Бэкспейс": "Backspace"
    }
}

export default class Game {
    WORD;
    X = -1;
    Y = 0;
    isChecking = 0;

    constructor(){
        this.generateWord();
        document.addEventListener('keydown', e => {
            if(this.isChecking) return;
            const currentLetter = Object.keys(SETTINGS['KEYBOARD']).find(key => SETTINGS['KEYBOARD'][key] === e.code);
            this.processingKey(currentLetter, e);
        })
    }

    generateWord() {
        const Words = SETTINGS['WORDS'];
        const randomNumber = Math.floor((Math.random() * (Words.length - 1)) + 1)
        this.WORD = Words[randomNumber];
        console.log(Words)
    }

    processingKey(letter, event) {
        if(letter == undefined) return;
        if(letter == 'Ё') letter = 'Е';
        if(event.code == 'Backspace') {
            if(this.X == -1) return;
            document.querySelector(`td[data-x='${this.X}'][data-y='${this.Y}']`).innerHTML = '';
            this.X--;
            return
        }
        if(this.X == 4) return; 
        else this.X++;
        document.querySelector(`td[data-x='${this.X}'][data-y='${this.Y}']`).innerHTML = letter;
        if(this.X == 4) this.checkRow();
    }

    checkRow() {
        setTimeout(() =>{
            this.isChecking = true;
            const WORDS = SETTINGS['WORDS'];
            let wordInStroke;
            for(let i = 0; i < 5; i++) {
                const checkedTd = document.querySelector(`td[data-x='${i}'][data-y='${this.Y}']`);
                checkedTd.classList.add('check')
                if(i == 0) {
                    wordInStroke = checkedTd.innerHTML;
                    continue
                }
                    wordInStroke = wordInStroke + checkedTd.innerHTML;
            }
            let wordExist = 0;
            WORDS.forEach(word => {
                if(word === wordInStroke) wordExist = 1;
            });
            if(wordExist == 0){
                setTimeout(() => {
                    alert('Данного слова не существет')
                }, 300)
            } else {
                this.checkWord(wordInStroke);
                this.X = -1;
                this.Y++;
            }
            setTimeout(() => {
                for(let i = 0; i < 5; i++) {
                    const checkedTd = document.querySelector(`td[data-x='${i}'][data-y='${this.Y}']`);
                    checkedTd.classList.remove('check')
                }
                this.isChecking = false;
            }, 600)

        }, 100)
    }
    checkWord(word) {
        let currentLet = [];
        for(let i = 0; i < 5; i++) {
            for(let k = 0; k < 5; k++) {
                if(k == i){
                    if(word[i] == this.WORD[k]) {
                        document.querySelector(`td[data-x='${i}'][data-y='${this.Y}']`).style.color = 'green';
                        currentLet.push(k);
                        break;
                    }
                }
                if(word[i] == this.WORD[k]) {
                    if(currentLet.includes(k)) continue
                    document.querySelector(`td[data-x='${i}'][data-y='${this.Y}']`).style.color = 'yellow';
                    continue;
                }
            }
        }
        setTimeout(() => {

        }, 300)
    }
}