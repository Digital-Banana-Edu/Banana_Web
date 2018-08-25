$(document).ready(function() {

  var termsApproved = false;
  
  // ====================== FORM CONTROLS ===========================

  $('.js-formBtn').click(function() {
    $('.feedBackWrapper.form-person').toggleClass('is-closed');
  });

  $('.js-freeBtn').click(function() {
    if ($(this).attr('course')) {
      var courseInput = $('.feedBackWrapperFree.form-person #fastcourse');
      var courseValue = $(this).attr('course');
      courseInput.attr('value', courseValue);
      console.log(courseInput.attr('value'));
    } else {
      console.log('this is the form on main');
    }
    $('.feedBackWrapperFree.form-person').toggleClass('is-closed');
  });

  $('.form-exit').click(function() {
    $('.feedBackWrapper.form-person').toggleClass('is-closed');
  });

  $('.form-exit-free').click(function() {
    $('.feedBackWrapperFree.form-person').toggleClass('is-closed');
  });

  $('.form-btn.form-btn__maillist').click(function() {
    $('form.form-maillist').toggleClass('is-closed');
  });

  $('.gallery-flexslider').click(function() {
    $(this).toggleClass('is-active');
  });

  $('.js-schedule').click(function() {
    $('.schedule').removeClass('is-closed');
  });

  $('.schedule-exit').click(function() {
    $('.schedule').addClass('is-closed');
  });


  // ====================== DROPDOWN ===========================

  $('.dropdown-toggle').click(function() {
    var dropdown = $(this).parent();
    if (dropdown.hasClass('is-closed')) {
      dropdown.removeClass('is-closed').addClass('is-opened');
    } else {
      dropdown.removeClass('is-opened').addClass('is-closed');
    }
  });

  $('.dropdown-menu li').click(function() {
    var pickedText = $(this).text();
    $('.dropdown-toggle').text(pickedText);
    $('.dropdown-input').val(pickedText);
    $('.dropdown').removeClass('is-opened').addClass('is-closed');
  });

  $('.header-nav_toggler').click(function () {
    $('.header-nav').toggleClass('open');
  });

  // ====================== AGE PICKER ===========================

  $('.age-picker li').click(function() {
    $('.age-picker li').removeClass('picked');
    $(this).addClass('picked');
    $('.age-input').val($(this).text());
  });

  $('.checkbox').click(function() {
    if (!termsApproved) {
      termsApproved = true;
      $('.check').prop('checked', true);
      $('.checkbox').addClass('clicked');
    } else {
      termsApproved = false;
      $('.check').prop('checked', false);
      $('.checkbox').removeClass('clicked');
    }
    
  });

  // ====================== FORM SEND ===========================

  $(document.body).on("click", ".ajaxgo", send);
   
  $(document.body).on("focus", "input", function(){$(this).css("border","");});
   


  function send(){
    if (termsApproved) {
      var wr = $(this).parents(".feedBackWrapper");
      var validate = true;
      wr.find(".isrequired").each(function(){
          if(!$(this).val().length){validate = false; $(this).addClass("border-bottom","1px solid #D22")}
      });
      if (validate){
        var need = {};
        need['header'] = "Контактная информация";
        need['fields'] = [];
        wr.find("input, select, textarea").each(function(){
          var fieldElement = {};
          //Checkbox, Radio
          //Ожидаемая семантика: <input type="checkbox" placeholder="Цвет" title="Синий"> / <input type="radio" name="radio1" placeholder="Вкус" title="Сладкий">
          if($(this).attr('type') == 'checkbox' || $(this).attr('type') == 'radio'){
            if($(this).prop('checked') == true){
              fieldElement['type'] = $(this).attr("type");
              fieldElement['title'] = $(this).attr("placeholder");
              fieldElement['value'] = $(this).attr("title");
              need['fields'][need['fields'].length] = fieldElement;
            }
            return true;
          }
          fieldElement['type'] = $(this).attr("type") || 'text';
          fieldElement['title'] = $(this).attr("placeholder");
          fieldElement['value'] = $(this).val();
          need['fields'][need['fields'].length] = fieldElement;
        });
        output = JSON.stringify(need);
        $.ajax({
          type: "POST",
          data: {data1: output},
          url:'/mail.php',
          dataType:'json',
          success: function(data){
            wr.addClass('is-closed');
            $(".successmsg").addClass('is-visible');
            wr.find("input, select, textarea").val('');
            wr.find(".picked").removeClass('picked');
            setTimeout(function() {$(".successmsg").removeClass('is-visible')}, 5000);
          },
          error: function (xhr, ajaxOptions, thrownError){
            console.log(xhr.responseText);
          }
        });
      }
    } else {
      console.log('No Terms, No Bananas!');
    }
  }

  // +++++++++++++++++++++++ AHAHAHA +++++++++++++++++++++++++++++

  $(document.body).on("click", ".ajaxgofree", sendFree);
   
  $(document.body).on("focus", "input", function(){$(this).css("border","");});
   


  function sendFree(){
    if (termsApproved) {
      var wr = $(this).parents(".feedBackWrapperFree");
      var validate = true;
      wr.find(".isrequired").each(function(){
          if(!$(this).val().length){validate = false; $(this).addClass("border-bottom","1px solid #D22")}
      });
      if (validate){
        var need = {};
        need['header'] = "Это мелкая форма - если нет темы - это запрос с главной";
        need['fields'] = [];
        wr.find("input, select, textarea").each(function(){
          var fieldElement = {};
          //Checkbox, Radio
          //Ожидаемая семантика: <input type="checkbox" placeholder="Цвет" title="Синий"> / <input type="radio" name="radio1" placeholder="Вкус" title="Сладкий">
          if($(this).attr('type') == 'checkbox' || $(this).attr('type') == 'radio'){
            if($(this).prop('checked') == true){
              fieldElement['type'] = $(this).attr("type");
              fieldElement['title'] = $(this).attr("placeholder");
              fieldElement['value'] = $(this).attr("title");
              need['fields'][need['fields'].length] = fieldElement;
            }
            return true;
          }
          fieldElement['type'] = $(this).attr("type") || 'text';
          fieldElement['title'] = $(this).attr("placeholder");
          fieldElement['value'] = $(this).val();
          need['fields'][need['fields'].length] = fieldElement;
        });
        output = JSON.stringify(need);
        $.ajax({
          type: "POST",
          data: {data1: output},
          url:'/mail.php',
          dataType:'json',
          success: function(data){
            wr.addClass('is-closed');
            $(".successmsg").addClass('is-visible');
            wr.find("input, select, textarea").val('');
            wr.find(".picked").removeClass('picked');
            setTimeout(function() {$(".successmsg").removeClass('is-visible')}, 5000);
          },
          error: function (xhr, ajaxOptions, thrownError){
            console.log(xhr.responseText);
          }
        });
      }
    } else {
      console.log('No Terms, No Bananas!');
    }
  }




  // ====================== FILTER LIST ===========================

  $('.filter-list li').click(function() {
    var num = $(this).index();
    $('.filter-list li').removeClass('is-active');
    $(this).addClass('is-active');

    $('.course-list').removeClass('is-active');

    $('.course-list:eq(' + num + ')').addClass('is-active');

  });

  $('a').click(function() {
    if ($(this).attr('href') == '/#courses') {
      console.log('to courses');
    } else if ($(this).attr('href').match(/#/) == "#") {
      event.preventDefault();

      var id = $(this).attr('href');
      var top = $(id).offset().top;

      $('body, html').animate({scrollTop: top}, 1000);
    }
  });

  $('.hero-main_about_link_it').click(function() {
    $('.filter-list li:eq(0)').click();
  });

  $('.hero-main_about_link_gamedev').click(function() {
    $('.filter-list li:eq(1)').click();
  });

  $('.hero-main_about_link_small').click(function() {
    $('.filter-list li:eq(2)').click();
  });
  

  // ========================= SLIDER ===========================

  $('.about-photos').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    fade: true,
    asNavFor: '.about-photos-nav'
  });

  $('.about-photos-nav').slick({
    slidesToShow: 3,
    slidesToScroll: 1,
    asNavFor: '.about-photos',
    dots: false,
    centerMode: true,
    focusOnSelect: true,
    centerPadding: '10px',
    adaptiveHeight: true,
    arrows: false
  });

  $('.testimonals-slider').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    dots: true
  });

  setTimeout(function () {
    if (window.location.href.match('&utm_term=courses') != null) {
      if (window.location.href.match('&utm_term=courses').length > 0) {
        $('html,body').animate({
           scrollTop: $("#courses").offset().top
        });
      }
    }
  }, 1500);

  if ($('.teacher-slider')) {
      $('.teacher-slider').slick({
          slidesToShow: 1,
          slidesToScroll: 1,
          fade: true
      });
  }

});