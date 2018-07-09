var mapItem = $('.js-mapBtn');
var sidebar = $('.sidebar');
var sidebarIcon = $('.sidebar__icon');
var sidebarTitle = $('.sidebar__title');
var sidebarText = $('.sidebar__text');
var sidebarBtn = $('.sidebar__btn');
var killSidebar = $('.js-killSidebar');

var currentProfession = 0;

var professions = [
    {
        name: 'Web-разработка',
        desc: 'Web-разработчики — это специалисты, которые занимаются созданием сайтов и различных интернет-сервисов. ' +
        'Сфера web-разработки с каждым годом становится все более технологичной и интересной.',
        linkTo: '/web',
        styles: 'background-image: url(assets/img/map_icon_web.png);'
    },
    {
        name: 'Мобильная разработка',
        desc: 'Разработчики мобильных приложений под Android очень востребованы на рынке и ' +
        'решают множество интересных и сложных задач с помощью языков программирования Java и Kotlin. ' +
        'Многие из них запускают собственные мобильные проекты, которые могут масштабироваться по всему миру.',
        linkTo: '/mobile',
        styles: 'background-image: url(assets/img/map_icon_mobile.png); background-size: 30%;'
    }
];

function setSidebarInfo(itemNumber) {
    if (itemNumber > 1) {
        itemNumber = 0;
    }

    var item = professions[itemNumber];

    sidebarTitle.html(item.name);
    sidebarIcon.attr('style', item.styles);
    sidebarText.html(item.desc);
    sidebarBtn.attr('href', item.linkTo);
    sidebar.addClass('-active');
}

mapItem.click(function () {
    currentProfession = $(this).index();
    console.log(currentProfession);
    setSidebarInfo(currentProfession);
});

killSidebar.click(function () {
    sidebar.removeClass('-active');
});