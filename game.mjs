const SETTINGS = {
    "WORDS": ["ШЛЮХА", "НИГЕР", "ПИДОР", "МОРЯК", "АКЦИЯ", "ПОСОЛ", "БАБКА", "",],
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
    BUTTONS = document.querySelectorAll('#keyboard > div > button');
    constructor(){
        this.generateWord();
        this.BUTTONS.forEach(button => {
            button.addEventListener('click', e => {
                if(this.isChecking) return;
                this.processingKey(button.innerHTML, button.dataset.value)
            })
        })
        document.addEventListener('keydown', this.keyDown) 
    }
    keyDown = (e) => {
        if(this.isChecking) return;
        const currentLetter = Object.keys(SETTINGS['KEYBOARD']).find(key => SETTINGS['KEYBOARD'][key] === e.code);
        this.processingKey(currentLetter, e.code);
    }
    

    generateWord() {
        const Words = SETTINGS['WORDS'];
        const randomNumber = Math.floor((Math.random() * (Words.length - 1)) + 1)
        this.WORD = Words[randomNumber];
    }

    processingKey(letter, event) {
        if(letter == undefined) return;
        if(letter == 'Ё') letter = 'Е';
        if(event == 'Backspace') {
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
        let wordInStroke;
        setTimeout(() =>{
            this.isChecking = true;
            const WORDS = SETTINGS['WORDS'];
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
                    const alertContainer = document.getElementById('alert-container');
                    const rowAlert = document.createElement('div');
                    const rowText = document.createElement('p');
                    rowAlert.classList.add('alert');
                    rowText.innerHTML = 'Данного слова нет в общем списке <br> Сотрите текущее слово';
                    rowAlert.appendChild(rowText);
                    alertContainer.appendChild(rowAlert);
                    setTimeout(() => {
                        rowAlert.classList.add('remove');
                        setTimeout(() => {
                            rowAlert.remove();
                        }, 400)
                    }, 2600)
                }, 300)
            } else {
                setTimeout(() => {
                    if(this.X == 4 && this.Y == 4){
                        document.getElementById('lose-game-contaner').style.display = 'flex';
                    }
                    this.checkWord(wordInStroke);
                    this.X = -1;
                    this.Y++;
                }, 300)
            }
            setTimeout(() => {
                for(let i = 0; i < 5; i++) {
                    for(let k = 0; k < 5; k++){
                        const checkedTd = document.querySelector(`td[data-x='${k}'][data-y='${i}']`);
                        checkedTd.classList.remove('check')
                    }
                }
                this.isChecking = false;
                if(wordInStroke === this.WORD) {
                    document.removeEventListener('keydown', this.keyDown);
                    document.getElementById('win-game-contaner').style.display = 'flex';
                }
            }, 600)

        }, 100)
    }
    checkWord(word) {
        let currentLet = [];
        for(let i = 0; i < 5; i++) {
            for(let k = 0; k < 5; k++) {
                if(k == i){
                    if(word[i] == this.WORD[k]) {
                        document.querySelector(`td[data-x='${i}'][data-y='${this.Y}']`).style.color = '#10B981';
                        currentLet.push(k);
                        break;
                    }
                }
                if(word[i] == this.WORD[k]) {
                    if(currentLet.includes(k)) continue
                    document.querySelector(`td[data-x='${i}'][data-y='${this.Y}']`).style.color = '#F59E0B';
                    continue;
                }
            }
        }
        setTimeout(() => {

        }, 300)
    }
}