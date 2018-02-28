(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-60556005-3', 'auto');
ga('send', 'pageview');

setTimeout(function() {
  ga('send', 'event', 'timer', 'read');
}, 30000);

// ================================== EVENTS SLIDER ===================================

$(document).on('click', '.ga_slide_newyear', function() {
  ga('send', 'event', 'slider_click', 'slide_newyear', 'slide_newyear');
})

$(document).on('click', '.ga_slide_openlesson', function() {
  ga('send', 'event', 'slider_click', 'slide_openlesson', 'slide_openlesson');
})

// ================================== FORM ACTIVATIONS ===================================

$(document).on('click', '.ga_sign_desktop', function() {
  ga('send', 'event', 'forms', 'sign_desktop', 'sign_desktop');
})

$(document).on('click', '.ga_sign_mobile', function() {
  ga('send', 'event', 'forms', 'sign_mobile', 'sign_mobile');
})

$(document).on('click', '.ga_subscribe', function() {
  ga('send', 'event', 'forms', 'subscribe', 'subscribe');
})

// ================================== PROJECTS AND COURSES ===================================

$(document).on('click', '.ga_jungle', function() {
  ga('send', 'event', 'project', 'jungle', 'jungle');
})

$(document).on('click', '.ga_literacy', function() {
  ga('send', 'event', 'project', 'literacy', 'literacy');
})

$(document).on('click', '.ga_web', function() {
  ga('send', 'event', 'course-click', 'course-web', 'course-web');
})

$(document).on('click', '.ga_math', function() {
  ga('send', 'event', 'course-click', 'course-math', 'course-math');
})

$(document).on('click', '.ga_scratch', function() {
  ga('send', 'event', 'course-click', 'course-scratch', 'course-scratch');
})

$(document).on('click', '.ga_design', function() {
  ga('send', 'event', 'course-click', 'course-design', 'course-design');
})

$(document).on('click', '.ga_concept', function() {
  ga('send', 'event', 'course-click', 'course-concept', 'course-concept');
})

$(document).on('click', '.ga_games', function() {
  ga('send', 'event', 'course-click', 'course-games', 'course-games');
})

$(document).on('click', '.ga_lvl', function() {
  ga('send', 'event', 'course-click', 'course-level', 'course-level');
})

// ================================== SOCIAL TAGS ===================================

$(document).on('click', '.ga_vk', function() {
  ga('send', 'event', 'socials', 'go_vk', 'go_vk');
})

$(document).on('click', '.ga_fb', function() {
  ga('send', 'event', 'socials', 'go_fb', 'go_fb');
})

$(document).on('click', '.ga_ins', function() {
  ga('send', 'event', 'socials', 'go_inst', 'go_inst');
})

$(document).on('click', '.ga_bananatag', function() {
  ga('send', 'event', 'socials', 'bananatag', 'bananatag');
})

// ================================== STUFF ===================================

$(document).on('click', '.ga_phone_header', function() {
  ga('send', 'event', 'contacts', 'phone_header', 'phone_header');
})

$(document).on('click', '.ga_phone_footer', function() {
  ga('send', 'event', 'contacts', 'phone_footer', 'phone_footer');
})

$(document).on('click', '.ga_mail_footer', function() {
  ga('send', 'event', 'contacts', 'mail_footer', 'mail_footer');
})

$(document).on('click', '.ga_mail_photos', function() {
  ga('send', 'event', 'photo', 'photos', 'photos');
})

// ================================== STUFF ===================================

$(document).on('click', '.ga_summer', function() {
  ga('send', 'event', 'hint_click', 'summer', 'summer');
})

$(document).on('click', '.ga_open', function() {
  ga('send', 'event', 'hint_click', 'open', 'open');
})

$(document).on('click', '.ga_hint_lvl', function() {
  ga('send', 'event', 'hint_click', 'hint_lvl', 'hint_lvl');
})