'use strict';


// Елементы, которые используются на всех экранах
const buttonAr = document.getElementById('buttonAr');
const buttonAr2 = document.getElementById('buttonAr2');
const shoutIc = document.getElementById('shoutIc');
const shoutIc2 = document.getElementById('shoutIc2');
const topNum = document.getElementById('topNum');
const topNum2 = document.getElementById('topNum2');
const secondScreenWordInner = document.getElementById('secondScreenWordInner');
const secondScreenWordInner2 = document.getElementById('secondScreenWordInner2');

const wordsButton = document.getElementsByClassName('wordsButton');
const wordsButtons = document.getElementById('wordsButtons');
const wordsButtonBcgr = document.getElementsByClassName('wordsButtonBcgr');
const buttonProceed = document.getElementById('buttonProceed');
const ar = document.getElementById('ar');

// Елементы 1 экрана
const firstButton = document.getElementById('firstButton');
const arInfo = document.getElementById('arInfo');
const firstScreen = document.getElementById('firstScreen');
const text = document.getElementsByClassName('text');

// Елементы 2 экрана
const secondScreen = document.getElementById('secondScreen');
const secondScreenDescr2 = document.getElementById('secondScreenDescr2');

// Елементы 3 экрана
const screenStep2 = document.getElementById('screenStep2');

// Елементы 4 экрана
const letters = document.getElementById('letters');
const lettersButton = document.getElementsByClassName('lettersButton');

// Елементы 5 экрана
const screen5inp = document.getElementById('screen5inp');
const screen5inpBg = document.getElementsByClassName('screen5inpBg');
const screen5inpMassenge = document.getElementsByClassName('screen5inpMassenge');

// Елементы последнего экрана
const lastTitle = document.getElementById('lastTitle');
const lastScreen = document.getElementById('lastScreen');
const statisticsCircles = document.getElementsByClassName('statisticsCircles');
const buttonErr = document.getElementById('buttonErr');
const buttonProceedLast = document.getElementById('buttonProceedLast');
const code = document.getElementById('code');
const lastScreenCode = document.getElementById('lastScreenCode');
const lastScreenMessage = document.getElementById('lastScreenMessage');

// Елементы стартового экрана
const zeroButtons = document.getElementsByClassName('zeroButtons');
const screenZero = document.getElementById('screenZero');

// Елементы стартового экрана повторения слов
const screenWriteCode = document.getElementById('screenWriteCode');
const firstButtonWriteCode = document.getElementById('firstButtonWriteCode');
const textareaCode = document.getElementById('textareaCode');

// Елементы экрана выбора новых слов для изучения
const screenChooseWords = document.getElementById('screenChooseWords');
const screenChooseWordsWordInner = document.getElementById('screenChooseWordsWordInner');
const screenChooseWordsTopNum = document.getElementById('screenChooseWordsTopNum');
const chooseWordsShoutIc = document.getElementById('chooseWordsShoutIc');
const screenChooseWordsBtns = document.getElementById('screenChooseWordsBtns');
const screenChooseWordsBtn1 = document.getElementById('screenChooseWordsBtn1');
const screenChooseWordsBtn2 = document.getElementById('screenChooseWordsBtn2');
const chooseWordsFirstButton = document.getElementById('chooseWordsFirstButton');
const chooseWordsMessage = document.getElementById('chooseWordsMessage');

const { speechSynthesis } = window;

let wordsEn = [];
let wordsRu = [];

let lastWordsEn;
let lastWordsRu;

let wordsErr = new Set();

let count = 1;
let switchErr = true;

let switchShewLeters;

let whatSayGlobal = wordsEn[count - 1];


chooseWordsFirstButton.style.display = 'none';
chooseWordsMessage.style.display = 'none';
lastScreenMessage.style.display = 'none';


// Функция кнопки, которая запускает программу изучения 10 слов
firstButton.onclick = function() {

    getValueFromImput();

    if(wordsEn.length > 0 && wordsRu.length > 0) start();
    else {
        alert('Вы не вибрали ни одного слова!');
        console.log(wordsEn);
        console.log(wordsRu);
    }
}


function getValueFromImput() {

    for (let i = 1; i <= 10; i++) {
        let localEn = document.getElementById(`wordEn${i}`);
        let localRu = document.getElementById(`wordRu${i}`);

        if (localEn.value.endsWith(' ')) {
            let arr = localEn.value.split('');
            arr.pop();
            localEn.value = arr.join('');
        }
        if (localRu.value.endsWith(' ')) {
            let arr = localRu.value.split('');
            arr.pop();
            localRu.value = arr.join('');
        }

        if (localEn.value != '') wordsEn.push(localEn.value.toLowerCase());
        if (localEn.value != '') wordsRu.push(localRu.value.toLowerCase());
    }

}


// Функция запуска изучения слов
function start() {

    console.log(wordsEn);
    console.log(wordsRu);

    if(!startAlready) {

        lastWordsEn = wordsEn;
        lastWordsRu = wordsRu;

    }else if (!switchChooseRandomWord) {

        let wordsEnLoc = [];
        let wordsRuLoc = [];

        for(let i = 0; i < wordsErr.length; i++) {

            let a = wordsErr[i];

            wordsEnLoc.push(wordsEn[a - 1]);
            wordsRuLoc.push(wordsRu[a - 1]);
        }

        discharge();

        wordsEn = wordsEnLoc;
        wordsRu = wordsRuLoc;

    }

    switchChooseRandomWord = null;

    firstScreen.style.display = 'none';
    secondScreen.style.display = 'block';

    secondScreenWordInner.innerHTML = wordsEn[count - 1] + ' - ' + wordsRu[count - 1];
    topNum.innerHTML = count;

    speaking();
}


// функция, которая меняет слова, которые нужно запоминать
function changeWord() {
    count++;
    secondScreenWordInner.innerHTML = wordsEn[count - 1] + ' - ' + wordsRu[count - 1];
    topNum.innerHTML = count;
    speaking();
}

// запуск функции, которая меняет слова (или переход на следующий экран)
buttonAr.onclick = function () {
    if (wordsEn[count]) changeWord();
    else toStep2();
};


// говорилка
function speaking() {

    let whatSay = wordsEn[count - 1];
    if (switchChooseRandomWord) whatSay = whatSayGlobal;

    const ssUterance = new SpeechSynthesisUtterance(whatSay);

    ssUterance.lang = 'en-GB';

    speechSynthesis.speak(ssUterance);

}
shoutIc.addEventListener('click', speaking);


let positionWord;

// переводит на экран (шаг 2)
function toStep2() {

    count = 0;

    secondScreen.style.display = 'none';
    screenStep2.style.display = 'block';

    shewNextWordStep2(wordsEn, wordsRu, 1);

}

let activeButton;
let openSpeaker;

// Функции, которые отыскивают активную кнопку
wordsButton[0].onclick = function () {
    activeButton = 0;
};
wordsButton[1].onclick = function () {
    activeButton = 1;
};
wordsButton[2].onclick = function () {
    activeButton = 2;
};
wordsButton[3].onclick = function () {
    activeButton = 3;
};
wordsButton[4].onclick = function () {
    activeButton = 4;
};
wordsButton[5].onclick = function () {
    activeButton = 5;
};


let buttonProceedBreak;

// кнопка "Продолжить" (шаг 2 и 3)
buttonProceed.onclick = function () {

    if (swButtonProceed) {
        checkStepFive();
    }

    let nowWord = wordsRu;
    if (enToRuCheck) nowWord = wordsEn; // ---

    if (!repeatWords) {
        if (wordsButton[activeButton].innerHTML == nowWord[count - 1]) {
            wordsButtonBcgr[activeButton].style.background = '#2CB416';
        } else if (!buttonProceedBreak) {
            wordsButtonBcgr[activeButton].style.background = '#FF1C0E';
            wordsButtonBcgr[positionWord].style.background = '#2CB416';

            if(switchErr) wordsErr.add(count);

            switchErr = false;
        }
    }

    buttonProceed.style.display = 'none';
    buttonAr2.style.display = 'inline';
    speaking();
    openSpeaker = true;
};

shoutIc2.onclick = function () {
    if (openSpeaker) speaking();
};


// Функция, выводящяя рандомные цыфры в заданном диапазоне
function randomMinMax(min, max) {
    return (min + Math.random() * (max - min)).toFixed();
}


let enToRu = 0,
    enToRuBreak = true,
    enToRuCheck;


// функция переключения английских слов (шаг 2)
function shewNextWordStep2(word1, word2, y) {

    count++;
    openSpeaker = null;
    switchErr = true;

    for (let i = 0; i < 6; i++) {
        wordsButton[i].innerHTML = '';
        wordsButtonBcgr[i].style.background = null;
    }

    if (enToRu == 1 && enToRuBreak) {
        count = 1;
        secondScreenDescr2.innerHTML = 'Шаг 3 - выберите подходящий перевод из списка';
        enToRuBreak = false;
    }

    secondScreenWordInner2.innerHTML = word1[count - 1];
    topNum2.innerHTML = count;
    wordsButton[randomMinMax(0, 5)].innerHTML = word2[count - 1];

    for (let i = 0; i < 6; i++) {
        if (wordsButton[i].innerHTML == '') {
            let a = wordsLib[randomMinMax(0, 4999)];
            wordsButton[i].innerHTML = a[y];
        } else positionWord = i;
    }

    buttonProceed.style.display = 'inline';
    buttonAr2.style.display = 'none';

    if (!wordsEn[count]) {
        enToRu++;
    }
}


// Кнопка "стрелочка" (переключает между словами)
buttonAr2.onclick = function () {

    if(swButtonProceed && !wordsEn[count]) {
        screenStep2.style.display = 'none';
        shawLastScreen();
    } else if (swButtonProceed) {
        stepFive();
    } else if (switchShewLeters && !wordsEn[count]) {

        if(screen5inpMassenge[0].style.display == 'block') {
            count = 0;
            stepFive();
        }

    } else if (switchShewLeters) {
        itWord = 0;

        if(screen5inpMassenge[0].style.display == 'block') shewLetters();
        
    } else if (enToRu == 1) {
        shewNextWordStep2(wordsRu, wordsEn, 0);
        enToRuCheck = true;
    } else if (enToRu == 2) {
        buttonProceedBreak = true;
        shewScreen4();
    } else shewNextWordStep2(wordsEn, wordsRu, 1);

};


// функция, которая выводит 4 экран
function shewScreen4() {
    count = 0;
    openSpeaker = null;
    wordsButtons.style.display = 'none';
    secondScreenDescr2.innerHTML = 'Шаг 4 - соберите слово из предложенных ниже букв';
    shewLetters();
}


let oneWord;
let arrRandom; // массив цыфр, указывающих порядок добавления букв в html документ

// функция, которая выводит буквы слова (шаг 4)
function shewLetters() {

    count++;
    openSpeaker = null;
    checkWordsBreak = null;
    erLetter = 0;

    if (switchShewLeters) {

        for (let i = 0; i < arrRandom.length; i++) {
            lettersButton[i].style.background = null;
            lettersButton[i].style.display = 'none';
        }
    }

    screen5inpMassenge[0].style.display = 'none';
    screen5inpMassenge[0].style.color = '#2CB416';
    screen5inpMassenge[0].innerHTML = '';

    topNum2.innerHTML = count;
    secondScreenWordInner2.innerHTML = wordsRu[count - 1];

    oneWord = wordsEn[count - 1].split(' ').join('');
    let localWord = new Set();

    for (let i = 0; i < oneWord.length; i++) {
        localWord.add(oneWord[i]);
    }

    let arrWord = Array.from(localWord);
    arrRandom = [];

    for (let i = 0; i < arrWord.length; i++) {

        let r = randomMinMax(0, arrWord.length - 1);

        for (let i = 0; i < arrRandom.length; i++) {
            if (r == arrRandom[i]) {
                r = randomMinMax(0, arrWord.length - 1);
                i = -1;
            }
        }

        arrRandom.push(r);

        lettersButton[i].style.display = 'inline';
        lettersButton[i].innerHTML = arrWord[r];

        switchShewLeters = true;

    }

}


let itWord = 0;
let erLetter = 0;
let checkWordsBreak;

// функция, отслеживающая нажатие на кнопки-буквы
function checkWords(pos) {

    if (lettersButton[pos].innerHTML == oneWord[itWord] && screen5inpMassenge[0].style.display == 'none') {

        setTimeout(function () {
            lettersButton[pos].style.background = '#2CB416';
        }, 200);

        lettersButton[pos].style.background = '#74FE5D';

    } else if(!checkWordsBreak) {

        if(erLetter < 3) {

            if(switchErr) wordsErr.add(count);
            switchErr = false;

            lettersButton[pos].style.background = '#FF1C0E';

            erLetter++;
            itWord--;
        } else {
            erLetter++;
            screen5inpMassenge[0].style.display = 'block';
            screen5inpMassenge[0].style.color = '#FF1C0E';
            screen5inpMassenge[0].innerHTML = wordsEn[count - 1];
            speaking();
            openSpeaker = true;
            switchErr = true;
            checkWordsBreak = true;
        }
    }
    itWord++;

    if (itWord == oneWord.length && !checkWordsBreak) {
        speaking();
        openSpeaker = true;
        switchErr = true;
        checkWordsBreak = true;

        screen5inpMassenge[0].style.display = 'block';
        screen5inpMassenge[0].style.color = '#2CB416';
        screen5inpMassenge[0].innerHTML = wordsEn[count - 1];

    }
}


let swButtonProceed;

function stepFive() {

    buttonAr2.style.display = 'none';
    secondScreenDescr2.innerHTML = 'Шаг 5 - напечатайте слово на клавиатуре';
    letters.style.display = 'none';

    count++;
    openSpeaker = null;

    if(swButtonProceed) {
        screen5inpBg[0].style.background = null;
        screen5inp.value = '';
    }

    switchErr = true;
    swButtonProceed = true;

    buttonAr2.style.display = 'none';
    screen5inpMassenge[0].style.display = 'none';
    screen5inpMassenge[1].style.display = 'none';
    screen5inpMassenge[1].innerHTML = '';

    topNum2.innerHTML = count;
    secondScreenWordInner2.innerHTML = wordsRu[count - 1];
    buttonProceed.innerHTML = 'Подтвердить';
    buttonProceed.style.display = 'inline';
    screen5inp.style.display = 'inline';
}


function checkStepFive() {

    let youWord = screen5inp.value.toLowerCase();

    if (youWord.endsWith(' ')) {
        let arr = youWord.split('');
        arr.pop();
        youWord = arr.join('');
    }

    if(youWord == wordsEn[count - 1]) {
        screen5inpBg[0].style.background = '#2CB416';
        screen5inpMassenge[1].style.display = 'block';
        screen5inpMassenge[1].style.color = '#2CB416';
        screen5inpMassenge[1].innerHTML = wordsEn[count - 1];
    } else {
        screen5inpBg[0].style.background = '#FF1C0E';
        screen5inpMassenge[1].style.display = 'block';
        screen5inpMassenge[1].style.color = '#FF1C0E';
        screen5inpMassenge[1].innerHTML = wordsEn[count - 1];

        if(switchErr) wordsErr.add(count);
        switchErr = false;
    }
    
}


let startAlready;

// Функция, которая выводит последний экран
function shawLastScreen() {

    lastScreen.style.display = 'block';
    wordsErr = Array.from(wordsErr);

    let a = 'ых';
    let b = '';
    if ( (wordsEn.length - wordsErr.length) == 1 ) {
        a = 'ое';
        b = 'о';
    } else if ((wordsEn.length - wordsErr.length) > 1 && (wordsEn.length - wordsErr.length) <= 4) {
        b = 'а';
    }

    lastTitle.innerHTML = `Поздравляем, вы выучили ${wordsEn.length - wordsErr.length} нов${a} слов${b}!`;

    for(let i = 0; i < wordsEn.length; i++) {
        statisticsCircles[i].style.display = 'flex';
    }

    for(let i = 0; i < wordsErr.length; i++) {
        let a = wordsErr[i];
        statisticsCircles[a - 1].style.background = '#FF1C0E';
    }

}


buttonErr.onclick = function() {

    if (wordsErr.length > 0) {
        lastScreen.style.display = 'none';
        secondScreen.style.display = 'block';

        startAlready = true;
        start();
    } else {
        lastScreenMessage.style.color = '#2CB416';
        lastScreenMessage.style.display = 'block';
    }
};



function discharge() {

    if(arrRandom) { 
        for (let i = 0; i < arrRandom.length; i++) {
            lettersButton[i].style.background = null;
            lettersButton[i].style.display = 'none';
        }
    }

    for(let i = 0; i < 10; i++) {
        statisticsCircles[i].style.display = 'none';
        statisticsCircles[i].style.background = '#2CB416';
    }

    // wordsEn = [];
    // wordsRu = [];
    wordsErr = new Set();
    count = 1;
    switchErr = true;
    switchShewLeters = null;
    positionWord = null;
    buttonProceedBreak = null;
    enToRu = 0;
    enToRuBreak = true;
    enToRuCheck = null;
    oneWord = null;
    arrRandom = null; 
    itWord = 0;
    swButtonProceed = null;
    startAlready = null;
    checkWordsBreak = null;
    switchChooseRandomWord = null;
    repeatWords = null;

    secondScreenDescr2.innerHTML = ' Шаг 2 - выберите подходящий перевод из списка';
    buttonProceed.innerHTML = 'Продолжить';
    screen5inpMassenge[0].style.display = 'none';
    screen5inpMassenge[1].style.display = 'none';
    wordsButtons.style.display = 'flex';
    screen5inp.style.display = 'none';
    screen5inpBg[0].style.background = null;
    screen5inp.value = '';
    letters.style.display = 'flex';
}


// Кнопка, показывающая код
buttonProceedLast.onclick = function() {
    if (code.innerHTML == '') {

        if (lastWordsEn) {
            lastScreenCode.style.display = 'block';
            code.innerHTML = shawCode();
            buttonProceedLast.innerHTML = 'Скрыть код';
        } else {
            lastScreenCode.style.display = 'block';
            code.innerHTML = 'Код не доступен! Вы сейчас в режиме повторения!';
            buttonProceedLast.innerHTML = 'Скрыть код';
        }

    } else {
        lastScreenCode.style.display = 'none';
        code.innerHTML = '';
        buttonProceedLast.innerHTML = 'Показать код';
    }
};


function shawCode() {
    let codeEn = [];
    let codeRu = [];

    for(let i = 0; i < lastWordsEn.length; i++) {
        codeEn.push(lastWordsEn[i]);
        if (lastWordsEn[i + 1]) codeEn.push('---');
        codeRu.push(lastWordsRu[i]);
        if (lastWordsRu[i + 1]) codeRu.push('---');
    }

    return codeEn.join('') + '-/-' + codeRu.join('');

}



let switchChooseRandomWord;


firstButtonWriteCode.onclick = function() {
    getYorCode();
};


let repeatWords;
let imitEnWords;
let imitRuWords;

function getYorCode() {
    repeatWords = true;
    let code = textareaCode.value;
    let spl = code.split('-/-');
    imitEnWords = spl[0].split('---');
    imitRuWords = spl[1].split('---');

    count--;
    screenWriteCode.style.display = 'none';
    screenStep2.style.display = 'block';
    wordsButtons.style.display = 'none';

    wordsEn = imitEnWords;
    wordsRu = imitRuWords;

    startAlready = true;

    stepFive();
}


zeroButtons[1].onclick = function() {
    screenZero.style.display = 'none';
    firstScreen.style.display = 'block';
};


zeroButtons[0].onclick = function() {
    screenZero.style.display = 'none';
    screenWriteCode.style.display = 'block';
};

zeroButtons[2].onclick = function() {
    switchChooseRandomWord = true;
    screenZero.style.display = 'none';
    screenChooseWords.style.display = 'block';
    chooseWordsToLear();
};



let chooseWcaunt = 1;

function chooseWordsToLear() {
    screenChooseWordsTopNum.innerHTML = chooseWcaunt;
    changeRandomWord();
}

function changeRandomWord() {
    screenChooseWordsWordInner.innerHTML = getRandomWords();
    let en_ruLoc = screenChooseWordsWordInner.innerHTML.split(' - ');
    whatSayGlobal = en_ruLoc[0];
    speaking();
}

function chooseWordsToLearNext() {
    chooseWcaunt++;

    screenChooseWordsTopNum.innerHTML = chooseWcaunt;
    changeRandomWord();
    
}


function getRandomWords() {
    return wordsLib[randomMinMax(0, 4999)].join(' - ');
}


chooseWordsShoutIc.onclick = function() {
    speaking();
};

screenChooseWordsBtn2.onclick = function() {
    changeRandomWord();

};

screenChooseWordsBtn1.onclick = function() {

    let en_ruLoc = screenChooseWordsWordInner.innerHTML.split(' - ');

    wordsEn.push(en_ruLoc[0]);
    wordsRu.push(en_ruLoc[1]);

    if (chooseWcaunt < 10) chooseWordsToLearNext();
    else {
        console.log(wordsEn);
        console.log(wordsRu);
        screenChooseWordsBtns.style.display = 'none';
        chooseWordsFirstButton.style.display = 'inline';
        chooseWordsMessage.style.display = 'block';
    }
};

chooseWordsFirstButton.onclick = function() {
    screenChooseWords.style.display = 'none';
    start();
};