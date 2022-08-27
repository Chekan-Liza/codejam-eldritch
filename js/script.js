const ancientsContainer = document.querySelector('.ancients');
const difficultiesContainer = document.querySelector('.difficulties');

import ancientsData from './../data/ancients.js';
import difficulties from './../data/difficulties.js';

//отображение карт Древних
ancientsData.forEach(el => {
    const ancient = document.createElement('div');

    ancient.classList.add('ancient-card');
    ancient.id = el.id;
    ancient.style.backgroundImage = `url(./assets/Ancients/${el.name}.png)`;

    if(ancientsContainer) ancientsContainer.append(ancient);

    const ancientBtn = document.createElement('button');
    ancientBtn.classList.add('ancient-btn');
    ancientBtn.textContent = `${el.ru_name}`;;
    ancient.append(ancientBtn);
});

//отображение уровней сложности
difficulties.forEach(el => {
    const difficulty = document.createElement('div');

    difficulty.classList.add('difficulty-item');
    difficulty.id = el.id;
    difficulty.textContent = el.name;

    if(difficultiesContainer) difficultiesContainer.append(difficulty);
});

//анимация для карт Древних при загрузке
function showAncients(){
    if(ancientsContainer) ancientsContainer.classList.add('_active');
}
document.addEventListener('DOMContentLoaded', showAncients);

const ancientBtns = document.getElementsByClassName('ancient-btn');
const modal = document.querySelector('.modal');
const overlay = document.querySelector('#overlay-modal');
const closeButton = document.querySelector('.modal_cross');
const yourAncient = document.querySelector('.your_ancient');

//появление модального, запись в локальное хранилище выбранной карты Древнего
for(let i = 0; i < ancientBtns.length; i++){
    ancientBtns[i].addEventListener('click', function getAncient(){    
        ancientsData.forEach(ancient => {
            if(ancientBtns[i].parentNode.id == ancient.id){
                yourAncient.textContent = ancient.ru_name;
                setLocalStorage('ancient', ancientBtns[i].parentNode.id);
            }
        });
        
        modal.classList.add('active');
        overlay.classList.add('active');
    });
}

//закрытие модального окна на крестик
if(closeButton){
    closeButton.addEventListener('click', function(){
        modal.classList.remove('active');
        overlay.classList.remove('active');
    });
}

//закрытие модального окна вне его области
if(modal && ancientBtns.length != 0){
    document.addEventListener("click", function (e) {
        const target = e.target;
        const its_modal = target == modal || modal.contains(target);
        const its_btnModal_0 = target ==  ancientBtns[0];
        const its_btnModal_1 = target ==  ancientBtns[1];
        const its_btnModal_2 = target ==  ancientBtns[2];
        const its_btnModal_3 = target ==  ancientBtns[3];
    
        const modal_is_active = modal.classList.contains('active');
        if (!its_modal && modal_is_active && !its_btnModal_0 && !its_btnModal_1 && !its_btnModal_2 && !its_btnModal_3) {
            modal.classList.toggle('active');
            overlay.classList.toggle('active');
        }
    });
}

//функции для записи и чтения локального хранилища
function setLocalStorage(name, value) {
    localStorage.setItem(name, value);
}

function getLocalStorage(value) {
    return localStorage.getItem(value);
}

const difficultiesBtns = document.getElementsByClassName('difficulty-item');

//запись в локальное хранилище выбранного уровня сложности
for(let i = 0; i < difficultiesBtns.length; i++){
    difficultiesBtns[i].addEventListener('click', function getCardsPage(){    
        difficulties.forEach(el => {
            if(difficultiesBtns[i].id == el.id){
                setLocalStorage('difficulty', difficultiesBtns[i].id);
            }
        });
        //переход на страницу с колодой
        window.location.href = 'Cards.html';
    });
}

const back = document.querySelector('.back');

//возврат на главную страницу с очитской локального хранилища
if(back){
    back.addEventListener('click', function goBack(){    
        window.location.href = 'index.html';
        localStorage.clear();
    });
}

const ancient = document.querySelector('.ancient');
const difficulty = document.querySelector('.difficulty');

//отображение выбранного Древнего
if(ancient){
    ancientsData.forEach(el => {
        if(getLocalStorage('ancient') == el.id){
            ancient.textContent = `Древний: ${el.ru_name}`;
        }
    });
}

//отображение выбранного уровня сложности
if(difficulty){
    difficulties.forEach(el => {
        if(getLocalStorage('difficulty') == el.id){
            difficulty.textContent = `Сложность: ${el.name}` ;
        }
    });
}

const scheme = document.querySelector('.scheme');

//формирование трекера текущего состояния колоды на основе данных из ancientsData
if(scheme){
    let blueCount = 0;
    let brownCount = 0;
    let greenCount = 0;

    const stage1 = document.createElement('div');
    const stage_p1 = document.createElement('p');
    stage1.classList.add('stage1');
    stage_p1.textContent = 'Этап I:';
    scheme.append(stage1);
    stage1.append(stage_p1);

    ancientsData.forEach(el => {
        if(getLocalStorage('ancient') == el.id){
            for(let k in el.firstStage){
                const firstStage = document.createElement('div');
                firstStage.classList.add('stage-box');
                firstStage.textContent = el.firstStage[k];
                stage1.append(firstStage);

                switch(k) {
                    case 'greenCards': 
                    firstStage.style.backgroundColor = 'rgb(43, 117, 4, 0.8)';
                    if(el.firstStage[k] != 0) greenCount += el.firstStage[k];
                    setLocalStorage('firstStage-greenCards', el.firstStage[k]);
                    firstStage.id = 'green';
                      break;
                    case 'blueCards':
                        firstStage.style.backgroundColor = 'rgb(23, 46, 144, 0.8)';
                        if(el.firstStage[k] != 0) blueCount += el.firstStage[k];
                        setLocalStorage('firstStage-blueCards', el.firstStage[k]);
                        firstStage.id = 'blue';
                      break;
                    case 'brownCards':
                        firstStage.style.backgroundColor = 'rgb(110, 53, 19, 0.8)';
                        if(el.firstStage[k] != 0) brownCount += el.firstStage[k];
                        setLocalStorage('firstStage-brownCards', el.firstStage[k]);
                        firstStage.id = 'brown';
                      break;
                    default: firstStage.style.backgroundColor = 'rgb(0, 0, 0, 0.8)';  
                      break;
                  }
            }
        }
    });

    const stage2 = document.createElement('div');
    const stage_p2 = document.createElement('p');
    stage2.classList.add('stage2');
    stage_p2.textContent = 'Этап II:';
    scheme.append(stage2);
    stage2.append(stage_p2);

    ancientsData.forEach(el => {
        if(getLocalStorage('ancient') == el.id){
            for(let k in el.secondStage){
                const secondStage = document.createElement('div');
                secondStage.classList.add('stage-box');
                secondStage.textContent = el.secondStage[k];
                stage2.append(secondStage);

                switch(k) {
                    case 'greenCards':
                        secondStage.style.backgroundColor = 'rgb(43, 117, 4, 0.8)';
                        if(el.secondStage[k] != 0) greenCount += el.secondStage[k]; 
                        setLocalStorage('secondStage-greenCards', el.secondStage[k]);
                        secondStage.id = 'green';
                      break;
                    case 'blueCards':
                        secondStage.style.backgroundColor = 'rgb(23, 46, 144, 0.8)';  
                        if(el.secondStage[k] != 0) blueCount += el.secondStage[k];
                        setLocalStorage('secondStage-blueCards', el.secondStage[k]);
                        secondStage.id = 'blue';
                      break;
                    case 'brownCards':
                        secondStage.style.backgroundColor = 'rgb(110, 53, 19, 0.8)';
                        if(el.secondStage[k] != 0) brownCount += el.secondStage[k]; 
                        setLocalStorage('secondStage-brownCards', el.secondStage[k]); 
                        secondStage.id = 'brown';  
                      break;
                    default: secondStage.style.backgroundColor = 'rgb(0, 0, 0, 0.8)';  
                      break;
                  }
            }
        }
    });

    const stage3 = document.createElement('div');
    const stage_p3 = document.createElement('p');
    stage3.classList.add('stage3');
    stage_p3.textContent = 'Этап III:';
    scheme.append(stage3);
    stage3.append(stage_p3);

    ancientsData.forEach(el => {
        if(getLocalStorage('ancient') == el.id){
            for(let k in el.thirdStage){
                const thirdStage = document.createElement('div');
                thirdStage.classList.add('stage-box');
                thirdStage.textContent = el.thirdStage[k];
                stage3.append(thirdStage);

                switch(k) {
                    case 'greenCards':
                        thirdStage.style.backgroundColor = 'rgb(43, 117, 4, 0.8)';
                        if(el.thirdStage[k] != 0) greenCount += el.thirdStage[k];
                        setLocalStorage('thirdStage-greenCards', el.thirdStage[k]);  
                        thirdStage.id = 'green'; 
                      break;
                    case 'blueCards':
                        thirdStage.style.backgroundColor = 'rgb(23, 46, 144, 0.8)';
                        if(el.thirdStage[k] != 0) blueCount += el.thirdStage[k];  
                        setLocalStorage('thirdStage-blueCards', el.thirdStage[k]);   
                        thirdStage.id = 'blue'; 
                      break;
                    case 'brownCards':
                        thirdStage.style.backgroundColor = 'rgb(110, 53, 19, 0.8)';
                        if(el.thirdStage[k] != 0) brownCount += el.thirdStage[k];    
                        setLocalStorage('thirdStage-brownCards', el.thirdStage[k]); 
                        thirdStage.id = 'brown';    
                      break;
                    default: thirdStage.style.backgroundColor = 'rgb(0, 0, 0, 0.8)';  
                      break;
                  }
            }
        }
    });
}

function getRandom(min, max) {
    return Math.random() * (max - min) + min;
}

//подсчет количества нужных карт для каждого цвета
const greenCount = +getLocalStorage('firstStage-greenCards') + +getLocalStorage('secondStage-greenCards') + +getLocalStorage('thirdStage-greenCards');
const blueCount = +getLocalStorage('firstStage-blueCards') + +getLocalStorage('secondStage-blueCards') + +getLocalStorage('thirdStage-blueCards');
const brownCount = +getLocalStorage('firstStage-brownCards') + +getLocalStorage('secondStage-brownCards') + +getLocalStorage('thirdStage-brownCards');

import blueMythicCards from './../data/mythicCards/blue/index.js';
import brownMythicCards from './../data/mythicCards/brown/index.js';
import greenMythicCards from './../data/mythicCards/green/index.js';

//массивы для выбранных карт по цветам
const greenCardsArr = [];
const blueCardsArr = [];
const brownCardsArr = [];

//функция для выбора карт по цветам
    /*
      генерируется случайное число от 0 до количества карт конкретного цвета (например, в blueMythicCards и т.д.).
      Если этой карты в массиве нет, она добавляется. Иначе функция вызывается
      снова для формирования другого случайного числа.
      В правилах говорится о разбиении всех карт по цвету и перетасовке мини-колод по цветам.
      Данные о картах разделены по цвету изначально. Пункт перетасовки выполняется посредством случайной
      выборки элементов, со случайными индексами.
      */
function getRandomCard(cards, arr){
    let num = Math.floor(getRandom(0, cards.length), 1);
    
    if(!arr.includes(cards[num])){
        arr.push(cards[num]);
    } else {
        getRandomCard(cards, arr);
    }
}

//сложность средняя - набор остается нетронутым
if(getLocalStorage('difficulty') == 'normal'){
    for(let p = 0; p < blueCount; p++){
        getRandomCard(blueMythicCards, blueCardsArr);
    }

    for(let p = 0; p < brownCount; p++){
        getRandomCard(brownMythicCards, brownCardsArr);
    }

    for(let p = 0; p < greenCount; p++){
        getRandomCard(greenMythicCards, greenCardsArr);
    }
}

//сложность низкая - отбираем из набора все карты со сложностью НЕ hard
if(getLocalStorage('difficulty') == 'easy'){
    for(let p = 0; p < blueCount; p++){
        getRandomCard(blueMythicCards.filter(card => card.difficulty != 'hard'), blueCardsArr);
    }

    for(let p = 0; p < brownCount; p++){
        getRandomCard(brownMythicCards.filter(card => card.difficulty != 'hard'), brownCardsArr);
    }

    for(let p = 0; p < greenCount; p++){
        getRandomCard(greenMythicCards.filter(card => card.difficulty != 'hard'), greenCardsArr);
    }
}

//сложность высокая - отбираем из набора все карты со сложностью НЕ easy
if(getLocalStorage('difficulty') == 'hard'){
    for(let p = 0; p < blueCount; p++){
        getRandomCard(blueMythicCards.filter(card => card.difficulty != 'easy'), blueCardsArr);
    }

    for(let p = 0; p < brownCount; p++){
        getRandomCard(brownMythicCards.filter(card => card.difficulty != 'easy'), brownCardsArr);
    }

    for(let p = 0; p < greenCount; p++){
        getRandomCard(greenMythicCards.filter(card => card.difficulty != 'easy'), greenCardsArr);
    }
}

//сложность очень низкая - ВСЕ easy, если не хватает - добавляем normal
if(getLocalStorage('difficulty') == 'very-easy'){
    let blueLength =  blueMythicCards.filter(card => card.difficulty == 'easy').length;
    let brownLength =  brownMythicCards.filter(card => card.difficulty == 'easy').length;
    let greenLength =  greenMythicCards.filter(card => card.difficulty == 'easy').length;

    if(blueCount > blueLength){
        for(let p = 0; p < blueLength; p++){
            getRandomCard(blueMythicCards.filter(card => card.difficulty == 'easy'), blueCardsArr);
        }
        for(let p = blueLength; p < blueCount; p++){
            getRandomCard(blueMythicCards.filter(card => card.difficulty == 'normal'), blueCardsArr);
        }
    } else {
        for(let p = 0; p < blueCount; p++){
            getRandomCard(blueMythicCards.filter(card => card.difficulty == 'easy'), blueCardsArr);
        }
    }

    if(brownCount > brownLength){
        for(let p = 0; p < brownLength; p++){
            getRandomCard(brownMythicCards.filter(card => card.difficulty == 'easy'), brownCardsArr);
        }
        for(let p = brownLength; p < brownCount; p++){
            getRandomCard(brownMythicCards.filter(card => card.difficulty == 'normal'), brownCardsArr);
        }
    } else {
        for(let p = 0; p < brownCount; p++){
            getRandomCard(brownMythicCards.filter(card => card.difficulty == 'easy'), brownCardsArr);
        }
    }
    
    if(greenCount > greenLength){
        for(let p = 0; p < greenLength; p++){
            getRandomCard(greenMythicCards.filter(card => card.difficulty == 'easy'), greenCardsArr);
        }
        for(let p = greenLength; p < greenCount; p++){
            getRandomCard(greenMythicCards.filter(card => card.difficulty == 'normal'), greenCardsArr);
        }
    } else {
        for(let p = 0; p < greenCount; p++){
            getRandomCard(greenMythicCards.filter(card => card.difficulty == 'easy'), greenCardsArr);
        }
    }
}

//сложность очень высокая - ВСЕ hard, если не хватает - добавляем normal
if(getLocalStorage('difficulty') == 'very-hard'){
    let blueLength =  blueMythicCards.filter(card => card.difficulty == 'hard').length;
    let brownLength =  brownMythicCards.filter(card => card.difficulty == 'hard').length;
    let greenLength =  greenMythicCards.filter(card => card.difficulty == 'hard').length;

    if(blueCount > blueLength){
        for(let p = 0; p < blueLength; p++){
            getRandomCard(blueMythicCards.filter(card => card.difficulty == 'hard'), blueCardsArr);
        }
        for(let p = blueLength; p < blueCount; p++){
            getRandomCard(blueMythicCards.filter(card => card.difficulty == 'normal'), blueCardsArr);
        }
    } else {
        for(let p = 0; p < blueCount; p++){
            getRandomCard(blueMythicCards.filter(card => card.difficulty == 'hard'), blueCardsArr);
        }
    }

    if(brownCount > brownLength){
        for(let p = 0; p < brownLength; p++){
            getRandomCard(brownMythicCards.filter(card => card.difficulty == 'hard'), brownCardsArr);
        }
        for(let p = brownLength; p < brownCount; p++){
            getRandomCard(brownMythicCards.filter(card => card.difficulty == 'normal'), brownCardsArr);
        }
    } else {
        for(let p = 0; p < brownCount; p++){
            getRandomCard(brownMythicCards.filter(card => card.difficulty == 'hard'), brownCardsArr);
        }
    }
    
    if(greenCount > greenLength){
        for(let p = 0; p < greenLength; p++){
            getRandomCard(greenMythicCards.filter(card => card.difficulty == 'hard'), greenCardsArr);
        }
        for(let p = greenLength; p < greenCount; p++){
            getRandomCard(greenMythicCards.filter(card => card.difficulty == 'normal'), greenCardsArr);
        }
    } else {
        for(let p = 0; p < greenCount; p++){
            getRandomCard(greenMythicCards.filter(card => card.difficulty == 'hard'), greenCardsArr);
        }
    }
}

//массивы для выбранных карт по этапам
var CardsThirdStage = [];
var CardsSecondStage = [];
var CardsFirstStage = [];

//функция для перетасовки карт для каждого этапа
const shuffle = (arr) => [...arr].sort(() => Math.random() - 0.5);

//функция для формирования колод каждого этапа (сколько карт, откуда взять, в колоду какого этапа добавить)
    /*
      Например, в 3 этапе используется 3 коричневые карты. Число 3 я получаю из локального хранилища, куда
      поместила это значение при формировании трекера текущего состояния колоды на основе данных из ancientsData.
      Далее источником является миниколода, которая состоит из некоторого количества карт, уже подготовленных ранее.
      То есть в игре понадобится всего 7 коричневых карт. Этот массив уже сформирован в строках 310-322. 
      Я из этого массива случаным образом выбираю 3 коричневых карты. Они помещаются в массив для 3 этапа.
      Оставшиеся 4 таким же образом будут добавлены в массив 2 и 1 этапов.
      */
function getSetsStages(count, source, add){
    for(let i = 0; i < count; i++){
        let num = Math.floor(getRandom(0, source.length), 1);
        let removedCard = source.splice(num, 1);
        add.push(removedCard[0]);
    }
}

console.log('3 этап');
console.log(CardsThirdStage);
console.log('2 этап');
console.log(CardsSecondStage);
console.log('1 этап');
console.log(CardsFirstStage);

//thirdStage
getSetsStages(+getLocalStorage('thirdStage-brownCards'), brownCardsArr, CardsThirdStage);
getSetsStages(+getLocalStorage('thirdStage-blueCards'), blueCardsArr, CardsThirdStage);
getSetsStages(+getLocalStorage('thirdStage-greenCards'), greenCardsArr, CardsThirdStage);

//secondStage
getSetsStages(+getLocalStorage('secondStage-brownCards'), brownCardsArr, CardsSecondStage);
getSetsStages(+getLocalStorage('secondStage-blueCards'), blueCardsArr, CardsSecondStage);
getSetsStages(+getLocalStorage('secondStage-greenCards'), greenCardsArr, CardsSecondStage);

//firstStage
getSetsStages(+getLocalStorage('firstStage-brownCards'), brownCardsArr, CardsFirstStage);
getSetsStages(+getLocalStorage('firstStage-blueCards'), blueCardsArr, CardsFirstStage);
getSetsStages(+getLocalStorage('firstStage-greenCards'), greenCardsArr, CardsFirstStage);

//формирование всей колоды
    /*
      В начале массива оказывается перетасованный внутри 3 этап, далее добавляется перетасованный 2 этап,
      за ним - перетасованный первый этап. Таким образом, элементы 1 этапа находятся в конце массива.
      */
const mainDeck = shuffle(CardsThirdStage).concat(shuffle(CardsSecondStage).concat(shuffle(CardsFirstStage)));
const cards = document.querySelector('.cards');

//отображение рубашки колоды, если колода была собрана успешно
if(cards && mainDeck.length != 0){
    const deck = document.createElement('div');
    deck.classList.add('inverted');
    deck.style.background = 'url(./assets/mythicCardBackground.png)';
    cards.append(deck);
}

const inverted = document.querySelector('.inverted');

console.log('Вся колода');
console.log(mainDeck);

const boxStage1 = document.querySelector('.stage1');
const boxStage2 = document.querySelector('.stage2');
const boxStage3 = document.querySelector('.stage3');

//функция обновления данных трекера состояния колоды 
function changeCount(source, card, box){
    if(source.includes(card)){
        let stageChildren = box.childNodes;
        for(let i = 0; i < stageChildren.length; i++){
            if(stageChildren[i].id == card.color){
                +stageChildren[i].textContent--;
            }
        }
    }
}

//функция отображения карт при клике на рубашку колоды
if(inverted){
    const card = document.createElement('div');
    card.classList.add('current-card');
    cards.append(card);
    if(mainDeck.length != 0){
        inverted.addEventListener('click', function showCard(){   
            //извлечение последнего элемента массива всей колоды
            let currentCard = mainDeck.pop(); 
            if(currentCard.color && currentCard.id){
                card.style.background = `url(./assets/MythicCards/${currentCard.color}/${currentCard.id}.png)`;
            }
            
            changeCount(CardsFirstStage, currentCard, boxStage1);
            changeCount(CardsSecondStage, currentCard, boxStage2);
            changeCount(CardsThirdStage, currentCard, boxStage3);

            console.log(currentCard);
            console.log(mainDeck.length);

            if(mainDeck.length == 0){
                inverted.style.opacity = '0';
                inverted.removeEventListener('click', showCard);
            }
        });
    }
}
