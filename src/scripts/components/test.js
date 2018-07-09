var startBtn = $('.js-startBtn');
var testHeader = $('.test__header');
var testBody = $('.test__body');

var defaultPositive = 'Да';
var defaultNegative = 'Нет';
currentPositive = 'start';
currentNegative = '';

var testData = [
    {
        id: 'start',
        text: 'Хотите ли вы создавать компьютерные игры?',
        isFinal: false,
        positiveValue: defaultPositive,
        negativeValue: defaultNegative,
        positiveCallback: 'gameCodeOrVisual',
        negativeCallback: 'itCodeOrVisual'
    },
    {
        id: 'gameCodeOrVisual',
        text: 'Вам больше нравится визуальная часть игры, или программирование?',
        isFinal: false,
        positiveValue: 'Код',
        negativeValue: 'Визуалка',
        positiveCallback: 'gameCodeOlder13',
        negativeCallback: 'gameLikeDraw'
    },
    {
        id: 'gameCodeOlder13',
        text: 'Вам больше 13 лет?',
        isFinal: false,
        positiveValue: 'Больше',
        negativeValue: 'Меньше',
        positiveCallback: 'gameCodeFinal',
        negativeCallback: 'gamedevBasicsFinal'
    },
    {
        id: 'gameCodeFinal',
        text: 'Программирование игр!',
        isFinal: true,
        linkTo: 'gamecoding'
    },
    {
        id: 'gamedevBasicsFinal',
        text: 'Основы создания игр',
        isFinal: true,
        linkTo: '2games'
    },
    {
        id: 'gameLikeDraw',
        text: 'Любите рисовать?',
        isFinal: false,
        positiveValue: defaultPositive,
        negativeValue: defaultNegative,
        positiveCallback: 'gameDrawOr3D',
        negativeCallback: 'gameLikeLogic'
    },
    {
        id: 'gameLikeDraw',
        text: 'А больше на планшете или в 3D пространстве?',
        isFinal: false,
        positiveValue: 'Планшет',
        negativeValue: '3D',
        positiveCallback: 'gameConceptFinal',
        negativeCallback: 'game3Dage13'
    },
    {
        id: 'gameConceptFinal',
        text: 'Концепт Арт!',
        isFinal: true,
        linkTo: 'concept-art'
    },
    {
        id: 'game3Dage13',
        text: 'Вам больше 13 лет?',
        isFinal: false,
        positiveValue: 'Больше',
        negativeValue: 'Меньше',
        positiveCallback: 'game3DFinal',
        negativeCallback: 'gamedevBasicsFinal'
    },
    {
        id: 'game3DFinal',
        text: '3D Моделирование',
        isFinal: true,
        linkTo: '3d-modeling'
    },
    {
        id: 'gameLikeLogic',
        text: 'Любите придумывать логические задачи и сюжет?',
        isFinal: false,
        positiveValue: defaultPositive,
        negativeValue: defaultNegative,
        positiveCallback: 'gameLevelage13',
        negativeCallback: 'game3Dage13'
    },
    {
        id: 'gameLevelage13',
        text: 'Вам больше 13 лет?',
        isFinal: false,
        positiveValue: 'Больше',
        negativeValue: 'Меньше',
        positiveCallback: 'gameLevelFinal',
        negativeCallback: 'gamedevBasicsFinal'
    },
    {
        id: 'gameLevelFinal',
        text: 'Level Design',
        isFinal: true,
        linkTo: 'level'
    },
    {
        id: 'itCodeOrVisual',
        text: 'Вам важно видеть визуальные результаты своей работы, красивые картинки, анимации?',
        isFinal: false,
        positiveValue: 'Не особо',
        negativeValue: 'Уии! Визуальщина!',
        positiveCallback: 'itLikeMath',
        negativeCallback: 'itCodeOrDrawSite'
    },
    {
        id: 'itLikeMath',
        text: 'Любите математику?',
        isFinal: false,
        positiveValue: defaultPositive,
        negativeValue: defaultNegative,
        positiveCallback: 'itMathGoDeeper',
        negativeCallback: 'itWebOrMobile'
    },
    {
        id: 'itMathGoDeeper',
        text: 'Готовы сильно углубиться в математику?',
        isFinal: false,
        positiveValue: defaultPositive,
        negativeValue: defaultNegative,
        positiveCallback: 'itMLFinal',
        negativeCallback: 'itWebOrMobile'
    },
    {
        id: 'itMLFinal',
        text: 'Машинное обучение',
        isFinal: true,
        linkTo: 'data-science'
    },
    {
        id: 'itCodeOrDrawSite',
        text: 'Писать код сайта или проектировать его?',
        isFinal: false,
        positiveValue: 'Проектировать',
        negativeValue: 'Писать код!',
        positiveCallback: 'itDesignFinal',
        negativeCallback: 'itWebOrMobile'
    },
    {
        id: 'itDesignFinal',
        text: 'Дезигн',
        isFinal: true,
        linkTo: 'data-science'
    },
    {
        id: 'itWebOrMobile',
        text: 'Разрабатывать сайты или мобильные приложения?',
        isFinal: false,
        positiveValue: 'Сайты',
        negativeValue: 'Мобильные приложения',
        positiveCallback: 'itFrontOrBack',
        negativeCallback: 'itMobileFinal'
    },
    {
        id: 'itFrontOrBack',
        text: 'Интереснее делать внешнюю часть сайта, или базы данных, где хранится информация, до которой нельзя добраться извне?',
        isFinal: false,
        positiveValue: 'Внешняя часть',
        negativeValue: 'Хранение данных',
        positiveCallback: 'itFrontFinal',
        negativeCallback: 'itBackFinal'
    },
    {
        id: 'itFrontFinal',
        text: 'Фронтенд!',
        isFinal: true,
        linkTo: 'data-science'
    },
    {
        id: 'itBackFinal',
        text: 'Бэкенд!',
        isFinal: true,
        linkTo: 'data-science'
    },
    {
        id: 'itMobileFinal',
        text: 'Мобильная разработка!',
        isFinal: true,
        linkTo: 'data-science'
    }
];

function prepareQuestionData(question) {
    if (!question.isFinal) {
        testHeader.html('<h4>' + question.text + '</h4>');

        testBody.html('<div class="test__actions"><div class="test__btn ui-btn js-positiveAnswer">' +
            question.positiveValue + '</div><div class="test__btn ui-btn js-negativeAnswer">' +
            question.negativeValue + '</div></div>');

        currentPositive = question.positiveCallback;
        currentNegative = question.negativeCallback;

    } else {
        testHeader.html('<h1>' + question.text + '</h1>');

        testBody.html('<p class="test__text">Круто — это отличное направление! Бла-бла-бла.</p>' +
            '<p class="test__text">Запишитесь на курс или пройдите тест еще раз!</p>' +
            '<a class="ui-btn test__btn" href="/' + question.linkTo + '">Подробнее о курсе</a>' +
            '<div class="ui-btn test__btn js-positiveAnswer">Пройти заново</div>');

        currentPositive = 'start';
    }
}

function getQuestionById(id) {
    var result = {};
    for (var i = 0; i < testData.length; ++i) {
        if (testData[i].id === id) {
            result = testData[i];
        }
    }
    return result;
}

startBtn.click(function () {
    prepareQuestionData(getQuestionById('start'));
});

testBody.on('click', '.js-positiveAnswer', function () {
    prepareQuestionData(getQuestionById(currentPositive));
});

testBody.on('click', '.js-negativeAnswer', function () {
    prepareQuestionData(getQuestionById(currentNegative));
});