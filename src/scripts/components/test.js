var content = $('.js-content');
var defaultPositive = 'Да';
var defaultNegative = 'Нет';
currentPositive = 'start';
currentNegative = '';

setVariablesAndInteractions();

var testData = [
    {
        id: 'start',
        text: 'Вам хотелось бы создавать игры?',
        isFinal: false,
        positiveValue: defaultPositive,
        negativeValue: defaultNegative,
        positiveCallback: 'gameOlder13',
        negativeCallback: 'itOlder13'
    },
    {
        id: 'gameOlder13',
        text: 'Вам больше 13 лет?',
        isFinal: false,
        positiveValue: 'Больше',
        negativeValue: 'Меньше',
        positiveCallback: 'gameCodeOrVisual',
        negativeCallback: 'gamedevBasicsFinal'
    },
    {
        id: 'itOlder13',
        text: 'Вам больше 13 лет?',
        isFinal: false,
        positiveValue: 'Больше',
        negativeValue: 'Меньше',
        positiveCallback: 'itCodeOrVisual',
        negativeCallback: 'itOopFinal'
    },
    {
        id: 'gameCodeOrVisual',
        text: 'Вам больше нравится визуальная часть игры (как выглядят герои, красивый ли свет и карты) или \n' +
        ' интереснее узнать о том, как в играх можно применять программирование?',
        isFinal: false,
        positiveValue: 'Код',
        negativeValue: 'Визуальная часть',
        positiveCallback: 'gameCodeFinal',
        negativeCallback: 'gameLikeDraw'
    },
    {
        id: 'gameCodeFinal',
        name: 'Игровой разработчик',
        desc: 'Это программист, занимающийся созданием программного кода и визуализацией игры, ' +
        'а также выбором средств для реализации поставленных задач.',
        isFinal: true,
        icon: 'gamecoding',
        pics: [
            'concept-3'
        ],
        linkTo: 'gamecoding'
    },
    {
        id: 'itOopFinal',
        name: 'Основы объектно-ориентированного программирования',
        desc: 'Для того, чтобы стать хорошим программистом необходимо ' +
        'изучить основы объектно ориентированного программирования — ' +
        'это хороший старт для дальнейшего изучения любой области IT.',
        isFinal: true,
        icon: 'oop',
        pics: [
            'concept-3'
        ],
        linkTo: 'oop'
    },
    {
        id: 'gamedevBasicsFinal',
        name: 'Основы создания игр',
        desc: 'Рынок игровой разработки растет и развивается с каждым годом. ' +
        'Как найти в нем место для себя? Ответ на этот вопрос поможет найти базовый курс по созданию игр.',
        isFinal: true,
        icon: 'gamedev',
        pics: [
            'concept-3'
        ],
        linkTo: 'game-development'
    },
    {
        id: 'gameLikeDraw',
        text: 'Вы любите рисовать?',
        isFinal: false,
        positiveValue: defaultPositive,
        negativeValue: defaultNegative,
        positiveCallback: 'gameDrawOr3D',
        negativeCallback: 'gameLikeLogic'
    },
    {
        id: 'gameDrawOr3D',
        text: 'Вы бы выбрали рисовать на планшете или придумывать 3d-модели в программе?',
        isFinal: false,
        positiveValue: 'Рисовать',
        negativeValue: '3D',
        positiveCallback: 'gameConceptFinal',
        negativeCallback: 'game3DFinal'
    },
    {
        id: 'gameConceptFinal',
        name: 'Концепт-художник',
        desc: 'Это художник, который визуализирует вымышленные миры, ' +
        'создает облик персонажей и окружения - все для того, чтобы вдохнуть жизнь в будущий проект.',
        isFinal: true,
        icon: 'concept',
        pics: [
            'concept-3'
        ],
        linkTo: 'concept-art'
    },
    {
        id: 'game3DFinal',
        name: '3D-моделлер',
        desc: 'Специалист, который занимается созданием объемных фигур, ' +
        'используемых в играх и кино.',
        isFinal: true,
        icon: 'level',
        pics: [
            'concept-3'
        ],
        linkTo: 'level-design'
    },
    {
        id: 'gameLikeLogic',
        text: 'Вам нравится придумывать логические задачи?',
        isFinal: false,
        positiveValue: defaultPositive,
        negativeValue: defaultNegative,
        positiveCallback: 'gameLevelFinal',
        negativeCallback: 'game3DFinal'
    },
    {
        id: 'gameLevelFinal',
        name: 'Дизайнер игровых уровней',
        desc: 'Это специалист, который занимается созданием и продумыванием игровых уровней, ' +
        'а так же созданием 3D-моделей для их наполнения.',
        isFinal: true,
        icon: 'level',
        pics: [
            'concept-3'
        ],
        linkTo: 'level-design'
    },
    {
        id: 'itCodeOrVisual',
        text: 'Вам важно видеть визуальные результаты своей работы:\n' +
        'Красивые картинки и анимации?\n',
        isFinal: false,
        positiveValue: defaultPositive,
        negativeValue: defaultNegative,
        positiveCallback: 'itCodeOrDrawSite',
        negativeCallback: 'itLikeMath'
    },
    {
        id: 'itLikeMath',
        text: 'Вы любите математику?',
        isFinal: false,
        positiveValue: defaultPositive,
        negativeValue: defaultNegative,
        positiveCallback: 'itMathGoDeeper',
        negativeCallback: 'itWebOrMobile'
    },
    {
        id: 'itMathGoDeeper',
        text: 'Вы готовы углубляться в знаниях по  математике?',
        isFinal: false,
        positiveValue: defaultPositive,
        negativeValue: defaultNegative,
        positiveCallback: 'itMLFinal',
        negativeCallback: 'itWebOrMobile'
    },
    {
        id: 'itMLFinal',
        name: 'Специалист по машинному обучению',
        desc: 'Это специалист, который занимается обработкой и анализом большого количества информации. ' +
        'Строит на ее основе прогнозы и гипотезы.',
        isFinal: true,
        icon: 'ml',
        pics: [
            'concept-3'
        ],
        linkTo: 'data-science'
    },
    {
        id: 'itCodeOrDrawSite',
        text: 'Представьте, что вам предстоит в течении 5 часов писать код для сайта.\n' +
        'А теперь представьте, что вам необходимо 5 часов проектировать и отрисовывать сайт.\n' +
        'Чтобы вы выбрали?',
        isFinal: false,
        positiveValue: 'Заниматься дизайном',
        negativeValue: 'Писать код',
        positiveCallback: 'itDesignFinal',
        negativeCallback: 'itWebOrMobile'
    },
    {
        id: 'itDesignFinal',
        name: 'Дизайн',
        desc: 'Дизайнер создаёт внешний вид и интерфейсы различных IT-продуктов. ' +
        'Он определят, как пользователи будут взаимодействовать с ними.',
        isFinal: true,
        icon: 'design',
        pics: [
            'concept-3'
        ],
        linkTo: 'design'
    },
    {
        id: 'itWebOrMobile',
        text: 'Что кажется интереснее: делать\n' +
        'сайты или мобильные приложения?',
        isFinal: false,
        positiveValue: 'Сайты',
        negativeValue: 'Мобильные приложения',
        positiveCallback: 'itFrontOrBack',
        negativeCallback: 'itMobileFinal'
    },
    {
        id: 'itFrontOrBack',
        text: 'Для вас интереснее делать анимированные иконки, крутые кнопки и слайдеры или вас больше интересует работа сайта изнутри - работа с базами данных и сервером?',
        isFinal: false,
        positiveValue: 'Внешняя часть',
        negativeValue: 'Внутренняя часть',
        positiveCallback: 'itFrontFinal',
        negativeCallback: 'itBackFinal'
    },
    {
        id: 'itFrontFinal',
        name: 'Разработка Web-интерфейсов',
        desc: 'Это программист, который отвечает за всю визуальную часть сайтов. ' +
        'Он делает так, чтобы красиво смотрелись картинки, нажимались кнопочки и плавно листались страницы.',
        isFinal: true,
        icon: 'front',
        pics: [
            'concept-3'
        ],
        linkTo: 'web'
    },
    {
        id: 'itBackFinal',
        name: 'Серверный разработчик',
        desc: 'Это программист, который занимается созданием серверной частью веб-приложений ' +
        'и отвечает за внутреннее содержание системы, ' +
        'работает с базами данных, архитектурой и программной логикой.',
        isFinal: true,
        icon: 'back',
        pics: [
            'concept-3'
        ],
        linkTo: 'back'
    },
    {
        id: 'itMobileFinal',
        name: 'Мобильный разработчик Android',
        desc: 'Это специалист, разрабатывающий приложения для различных мобильных устройств. ' +
        'Профессия на данный момент одна из самых перспективных и востребованных, ' +
        'ведь количество мобильных устройств каждый день увеличивается.',
        isFinal: true,
        icon: 'android',
        pics: [
            'concept-3'
        ],
        linkTo: 'android'
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
        showFinalMarkup(question);
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

function showFinalMarkup(course) {
    var finalMarkup =
        '<div class="content-header"><h2>' + course.name + '</h2></div>' +
        '<div class="content-left">' + prepareImages(course.pics) + '</div>' +
        '<div class="content-right">' + prepareCourseInfo(course) + '</div>';

    content.html(finalMarkup);
}

function prepareImages(pics) {
    var result = '<div class="test__pics">';
    pics.forEach(function (pic, index) {
        result += '<img class="test__pic -num-' + index + '" src="./assets/img/test-pics/test-' + pic + '.jpg">'
    });
    result += '</div>';

    return result;
}

function prepareCourseInfo(course) {
    return '<div class="about-desc">' + course.desc + '</div>' +
        '<div class="about-title">Запишитесь на курс или пройдите тест еще раз</div>' +
        '<div class="ui-btn-container">' +
            '<a class="ui-btn test__btn" href="/' + course.linkTo + '">Подробнее о курсе</a>' +
            '<div class="ui-btn test__btn js-restartPage">Пройти заново</div>' +
        '</div>';
}

function setVariablesAndInteractions() {
    testHeader = content.find('.test__header');
    testBody = content.find('.test__body');

    testBody.on('click', '.js-positiveAnswer', function () {
        prepareQuestionData(getQuestionById(currentPositive));
    });

    testBody.on('click', '.js-negativeAnswer', function () {
        prepareQuestionData(getQuestionById(currentNegative));
    });
}

content.on('click', '.js-startBtn', function () {
    prepareQuestionData(getQuestionById('start'));
});

content.on('click', '.js-restartPage', function () {
    content.html(
        '<div class="test">' +
        '<div class="test__header">' +
            '<h1 class="test__title">Тест:</h1>' +
            '<h2 class="test__subtitle">Какая профессия вам больше подходит</h2>' +
        '</div><div class="test__body">' +
            '<div class="test__text">Пройдите тест и узнайте, какой из курсов Digital Banana будет интереснее для вас' +
                '<span class="test__extratext"> (меньше 5 минут)</span></div>' +
        '<div class="btn main-btn js-startBtn">Приступить!</div></div></div>'
    );

    setVariablesAndInteractions();
    currentPositive = 'start';
});