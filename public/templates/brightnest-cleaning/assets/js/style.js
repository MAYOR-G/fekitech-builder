/* ------------------------------------- Preloader ------------------------------------- */
$(window).on("load", function () {
  setTimeout(function () {
    var preloader = document.querySelector(".preloader");
    preloader.style.opacity = "0";
    $(".preloader").fadeOut("slow");
  }, 2000);
});
/*------------------------------------- Sticky Header -------------------------------------*/
$(window).scroll(function () {
  if ($(window).scrollTop() >= 20) {
    $("#header_main").addClass("sticky");
  } else {
    $("#header_main").removeClass("sticky");
  }
});
/* ------------------------------------- Nav-Dropdown ------------------------------------- */
$(document).ready(function () {
  $(".drop-down").click(function (e) {
    e.preventDefault();
    $(this).next("ul.drop_down_menu").slideToggle(300);
    $(this).next("ul.inner_dropdown").slideToggle(300);
  });
});
/* ------------------------------------- Image Animation ------------------------------------- */
document.addEventListener("DOMContentLoaded", function () {
  const options = {
    root: null,
    rootMargin: "0px",
    threshold: 0.4,
  };
  // IMAGE ANIMATION
  let revealCallback = (entries) => {
    entries.forEach((entry) => {
      let container = entry.target;
      if (entry.isIntersecting) {
        console.log(container);
        container.classList.add("animation-img");
        return;
      }
      if (entry.boundingClientRect.top > 0) {
        container.classList.remove("animation-img");
      }
    });
  };
  let revealObserver = new IntersectionObserver(revealCallback, options);
  document.querySelectorAll(".reveal1").forEach((reveal) => {
    revealObserver.observe(reveal);
  });
  // TEXT ANIMATION
  let fadeupCallback = (entries) => {
    entries.forEach((entry) => {
      let container = entry.target;
      container.classList.add("not-fading-up");

      if (entry.isIntersecting) {
        container.classList.add("fading-up");
        return;
      }

      if (entry.boundingClientRect.top > 0) {
        container.classList.remove("fading-up");
      }
    });
  };
  let fadeupObserver = new IntersectionObserver(fadeupCallback, options);
  document.querySelectorAll(".fadeup").forEach((fadeup) => {
    fadeupObserver.observe(fadeup);
  });
});
/* ------------------------------------- Banner-Accodian ------------------------------------- */
var section = $("li.section-items");
function toggleAccordion() {
  section.removeClass("active");
  $(this).addClass("active");
}
section.on("click", toggleAccordion);
/* ------------------------------------- Header Hover Imgs Js ------------------------------------- */
function initTrion() {
  //   loader ------------------
  "use strict";
  firstLoad();
  function firstLoad() {
    setTimeout(function () {
      $(".main-loader-wrap .loader-spin").addClass("novisspin");
    }, 1500);
    setTimeout(function () {
      $(".main-loader-wrap").fadeOut(500);
    }, 2200);
    var chdpt = $(".content-holder").data("pagetitle");
    $(".breadcrumb-wrap span").text(chdpt);
  }

  // CURSOR

  $("a.header_hover_img_one").on({
    mouseenter: function () {
      $(".megic-cursor-item").addClass("header_hover_img_one");
    },
    mouseleave: function () {
      $(".megic-cursor-item").removeClass("header_hover_img_one");
    },
  });
  $("a.header_hover_img_two").on({
    mouseenter: function () {
      $(".megic-cursor-item").addClass("header_hover_img_two");
    },
    mouseleave: function () {
      $(".megic-cursor-item").removeClass("header_hover_img_two");
    },
  });
  $("a.header_hover_img_three").on({
    mouseenter: function () {
      $(".megic-cursor-item").addClass("header_hover_img_three");
    },
    mouseleave: function () {
      $(".megic-cursor-item").removeClass("header_hover_img_three");
    },
  });
  $("a.header_hover_img_four").on({
    mouseenter: function () {
      $(".megic-cursor-item").addClass("header_hover_img_four");
    },
    mouseleave: function () {
      $(".megic-cursor-item").removeClass("header_hover_img_four");
    },
  });
  $("a.header_hover_img_five").on({
    mouseenter: function () {
      $(".megic-cursor-item").addClass("header_hover_img_five");
    },
    mouseleave: function () {
      $(".megic-cursor-item").removeClass("header_hover_img_five");
    },
  });
  $("a.header_hover_img_six").on({
    mouseenter: function () {
      $(".megic-cursor-item").addClass("header_hover_img_six");
    },
    mouseleave: function () {
      $(".megic-cursor-item").removeClass("header_hover_img_six");
    },
  });

  $("a.about_video_btn").on({
    mouseenter: function () {
      $(".megic-cursor-item").addClass("about_video_btn");
    },
    mouseleave: function () {
      $(".megic-cursor-item").removeClass("about_video_btn");
    },
  });
  $("a.view-btn").on({
    mouseenter: function () {
      $(".megic-cursor-item").addClass("view-btn");
    },
    mouseleave: function () {
      $(".megic-cursor-item").removeClass("view-btn");
    },
  });

  $("a.award_img_1").on({
    mouseenter: function () {
      $(".megic-cursor-item").addClass("award_img_1");
    },
    mouseleave: function () {
      $(".megic-cursor-item").removeClass("award_img_1");
    },
  });

  $("a.award_img_2").on({
    mouseenter: function () {
      $(".megic-cursor-item").addClass("award_img_2");
    },
    mouseleave: function () {
      $(".megic-cursor-item").removeClass("award_img_2");
    },
  });

  $("a.award_img_3").on({
    mouseenter: function () {
      $(".megic-cursor-item").addClass("award_img_3");
    },
    mouseleave: function () {
      $(".megic-cursor-item").removeClass("award_img_3");
    },
  });

  $("a.award_img_4").on({
    mouseenter: function () {
      $(".megic-cursor-item").addClass("award_img_4");
    },
    mouseleave: function () {
      $(".megic-cursor-item").removeClass("award_img_4");
    },
  });

  $("a.award_img_5").on({
    mouseenter: function () {
      $(".megic-cursor-item").addClass("award_img_5");
    },
    mouseleave: function () {
      $(".megic-cursor-item").removeClass("award_img_5");
    },
  });

  $("a.award_img_6").on({
    mouseenter: function () {
      $(".megic-cursor-item").addClass("award_img_6");
    },
    mouseleave: function () {
      $(".megic-cursor-item").removeClass("award_img_6");
    },
  });

  $("  #portfolio_horizontal_container").on({
    mouseenter: function () {
      $(".element-item").addClass("slider_hover");
    },
    mouseleave: function () {
      $(".element-item").removeClass("slider_hover");
    },
  });

  // CURSOR
}

//   load animation------------------
$.fn.duplicate = function (a, b) {
  var c = [];
  for (var d = 0; d < a; d++) $.merge(c, this.clone(b).get());
  return this.pushStack(c);
};

var a = {
  Android: function () {
    return navigator.userAgent.match(/Android/i);
  },
  BlackBerry: function () {
    return navigator.userAgent.match(/BlackBerry/i);
  },
  iOS: function () {
    return navigator.userAgent.match(/iPhone|iPad|iPod/i);
  },
  Opera: function () {
    return navigator.userAgent.match(/Opera Mini/i);
  },
  Windows: function () {
    return navigator.userAgent.match(/IEMobile/i);
  },
  any: function () {
    return a.Android() || a.BlackBerry() || a.iOS() || a.Opera() || a.Windows();
  },
};
trueMobile = a.any();
if (null == trueMobile) {
  $(function () {
    $.coretemp({
      reloadbox: "#wrapper",
      outDuration: 1200,
      inDuration: 100,
    });
    readyFunctions();
    $(document).on({
      ksctbCallback: function () {
        readyFunctions();
      },
    });
  });
  function readyFunctions() {
    initTrion();
  }
}
if (trueMobile) {
  $(document).ready(function () {
    initTrion();
  });

  $("html, body").animate(
    {
      scrollTop: 0,
    },
    1
  );
}
$("head").append(
  '<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">'
);
document.addEventListener("gesturestart", function (e) {
  e.preventDefault();
});

if ($(".megic-cursor-item").length > 0) {
  var mouse = {
    x: 0,
    y: 0,
  };
  var pos = {
    x: 0,
    y: 0,
  };
  var ratio = 0.15;
  var active = false;
  var ball = document.querySelector(".megic-cursor-item");
  TweenLite.set(ball, {
    xPercent: -50,
    yPercent: -50,
  });
  document.addEventListener("mousemove", mouseMove);
  function mouseMove(e) {
    var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    mouse.x = e.pageX;
    mouse.y = e.pageY - scrollTop;
  }
  TweenMax.ticker.addEventListener("tick", updatePosition);
  function updatePosition() {
    if (!active) {
      pos.x += (mouse.x - pos.x) * ratio;
      pos.y += (mouse.y - pos.y) * ratio;
      TweenMax.set(ball, {
        x: pos.x,
        y: pos.y,
      });
    }
  }
}
/* ------------------------------------- Full-Width Counter ------------------------------------- */
function inVisible(element) {
  var WindowTop = $(window).scrollTop();
  var WindowBottom = WindowTop + $(window).height();
  var ElementTop = element.offset().top;
  var ElementBottom = ElementTop + element.height();
  if (ElementBottom <= WindowBottom && ElementTop >= WindowTop)
    animate(element);
}
function animate(element) {
  if (!element.hasClass("ms-animated")) {
    var maxval = element.data("max");
    var html = element.html();
    element.addClass("ms-animated");
    $({
      countNum: element.html(),
    }).animate(
      {
        countNum: maxval,
      },
      {
        duration: 1500,
        easing: "linear",
        step: function () {
          element.html(Math.floor(this.countNum) + html);
        },
        complete: function () {
          element.html(this.countNum + html);
        },
      }
    );
  }
}
$(function () {
  $(window).scroll(function () {
    $("h3[data-max]").each(function () {
      inVisible($(this));
    });
  });
});
/* ------------------------------------- Slider Area ------------------------------------- */
/* -------------------- Clean-Plan Slider -------------------- */
$(document).ready(function () {
  $(".clean_slider_list").slick({
    centerMode: true,
    centerPadding: "15px",
    slidesToShow: 6,
    slidesToScroll: 1,
    dots: false,
    arrows: false,
    infinite: true,
    speed: 1000,
    cssEase: "linear",
    variableWidth: true,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 580,
        settings: {
          centerMode: false,
          centerPadding: "0px",
          slidesToShow: 1,
          variableWidth: false,
        },
      },
    ],
  });
  /* -------------------- Client-Testimonials Slider -------------------- */
  $(".client_testimonials_list").slick({
    centerMode: true,
    centerPadding: "0px",
    slidesToShow: 3,
    slidesToScroll: 1,
    dots: false,
    arrows: true,
    infinite: true,
    speed: 1000,
    cssEase: "linear",
    variableWidth: true,
    nextArrow:
      '<div class="slick-custom-arrow slick-custom-arrow-right"><svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 80 80" fill="none"><circle cx="40" cy="40" r="40" fill="#F7C02D"/><mask id="mask0_288_64" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="16" y="16" width="48" height="48"><path d="M16 16H64V64H16V16Z" fill="white"/></mask><g mask="url(#mask0_288_64)"><path d="M26 40H54" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M46 48L54 40" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M46 32L54 40" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></g></svg></div>',
    prevArrow:
      '<div class="slick-custom-arrow slick-custom-arrow-left"><svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 80 80" fill="none"><circle cx="40" cy="40" r="40" fill="#F7C02D"/><mask id="mask0_288_72" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="16" y="16" width="48" height="48"><path d="M16 16H64V64H16V16Z" fill="white"/></mask><g mask="url(#mask0_288_72)"><path d="M54 40L26 40" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M34 32L26 40" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M34 48L26 40" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></g></svg></div>',
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 500,
        settings: {
          centerMode: false,
          centerPadding: "0px",
          slidesToShow: 1,
          slidesToScroll: 1,
          variableWidth: false,
        },
      },
    ],
  });
  /* -------------------- Our-Work Slider -------------------- */
  $(".work_slider_1_list").slick({
    dots: false,
    arrows: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    infinite: true,
    speed: 1000,
    cssEase: "linear",
    nextArrow:
      '<div class="slick-custom-arrow slick-custom-arrow-right"><svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" fill="none"><circle cx="24" cy="24" r="24" fill="white"/><mask id="mask0_801_26520" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="12" y="12" width="24" height="24"><path d="M12 12H36V36H12V12Z" fill="white"/></mask><g mask="url(#mask0_801_26520)"><path d="M17 24H31" stroke="#1239AC" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M27 28L31 24" stroke="#1239AC" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>  <path d="M27 20L31 24" stroke="#1239AC" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></g></svg></div>',
    prevArrow:
      '<div class="slick-custom-arrow slick-custom-arrow-left"><svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" fill="none"><circle cx="24" cy="24" r="24" fill="white"/><mask id="mask0_801_26528" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="12" y="12" width="24" height="24"><path d="M12 12H36V36H12V12Z" fill="white"/></mask><g mask="url(#mask0_801_26528)"><path d="M31 24L17 24" stroke="#1239AC" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M21 20L17 24" stroke="#1239AC" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M21 28L17 24" stroke="#1239AC" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></g></svg></div>',
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 1100,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 650,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 426,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  });
  $(".work_slider_2_list").slick({
    dots: false,
    arrows: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    infinite: true,
    speed: 1000,
    cssEase: "linear",
    nextArrow:
      '<div class="slick-custom-arrow slick-custom-arrow-right"><svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" fill="none"><circle cx="24" cy="24" r="24" fill="white"/><mask id="mask0_801_26520" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="12" y="12" width="24" height="24"><path d="M12 12H36V36H12V12Z" fill="white"/></mask><g mask="url(#mask0_801_26520)"><path d="M17 24H31" stroke="#1239AC" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M27 28L31 24" stroke="#1239AC" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>  <path d="M27 20L31 24" stroke="#1239AC" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></g></svg></div>',
    prevArrow:
      '<div class="slick-custom-arrow slick-custom-arrow-left"><svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" fill="none"><circle cx="24" cy="24" r="24" fill="white"/><mask id="mask0_801_26528" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="12" y="12" width="24" height="24"><path d="M12 12H36V36H12V12Z" fill="white"/></mask><g mask="url(#mask0_801_26528)"><path d="M31 24L17 24" stroke="#1239AC" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M21 20L17 24" stroke="#1239AC" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M21 28L17 24" stroke="#1239AC" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></g></svg></div>',
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 1100,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 850,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 550,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  });
  /* -------------------- Home_2 Banner Slider -------------------- */
  $(".banner_slider_area").slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: false,
    arrows: true,
    infinite: true,
    speed: 2000,
    cssEase: "linear",
    fade: true,
    autoplay: true,
    autoplaySpeed: 1500,
    nextArrow:
      '<div class="slick-custom-arrow slick-custom-arrow-right"><svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 60 60" fill="none"><mask id="mask0_801_26200" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="60" height="60"><path d="M0 0H60V60H0V0Z" fill="white"/></mask><g mask="url(#mask0_801_26200)"><path d="M22.5 15L37.5 30L22.5 45" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></g></svg></div>',
    prevArrow:
      '<div class="slick-custom-arrow slick-custom-arrow-left"><svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 60 60" fill="none"><mask id="mask0_801_26203" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="60" height="60"><path d="M0 0H60V60H0V0Z" fill="white"/></mask><g mask="url(#mask0_801_26203)"><path d="M37.5 15L22.5 30L37.5 45" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></g></svg></div>',
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          adaptiveHeight: false,
        },
      },
    ],
  });
  /* -------------------- Client-Testimonials-3 Slider -------------------- */
  $(".client_slider_3_list").slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: true,
    arrows: false,
    infinite: true,
    speed: 2000,
    cssEase: "linear",
    slidesPerRow: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  });
  /* -------------------- Single-Project-2 Slider -------------------- */
  $('.single_project_img_slider_item_sub').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    dots: false,
    fade: true,
    nextArrow:
      '<div class="slick-custom-arrow slick-custom-arrow-right"><svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" fill="none"><circle cx="24" cy="24" r="24" fill="white"/><mask id="mask0_801_26520" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="12" y="12" width="24" height="24"><path d="M12 12H36V36H12V12Z" fill="white"/></mask><g mask="url(#mask0_801_26520)"><path d="M17 24H31" stroke="#1239AC" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M27 28L31 24" stroke="#1239AC" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>  <path d="M27 20L31 24" stroke="#1239AC" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></g></svg></div>',
    prevArrow:
      '<div class="slick-custom-arrow slick-custom-arrow-left"><svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" fill="none"><circle cx="24" cy="24" r="24" fill="white"/><mask id="mask0_801_26528" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="12" y="12" width="24" height="24"><path d="M12 12H36V36H12V12Z" fill="white"/></mask><g mask="url(#mask0_801_26528)"><path d="M31 24L17 24" stroke="#1239AC" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M21 20L17 24" stroke="#1239AC" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M21 28L17 24" stroke="#1239AC" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></g></svg></div>',
    asNavFor: '.single_project_img_slider_item_nav'
  });
  $('.single_project_img_slider_item_nav').slick({
    slidesToShow: 3,
    slidesToScroll: 1,
    asNavFor: '.single_project_img_slider_item_sub',
    dots: false,
    arrows: false,
    focusOnSelect: true,
    responsive: [
      {
        breakpoint: 650,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  });
  /* -------------------- Blogs Slider -------------------- */
  $(".our_blogs_box_slider_list").slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: false,
    arrows: true,
    infinite: true,
    speed: 2000,
    cssEase: "linear",
    autoplay: true,
    autoplaySpeed: 2000,
    nextArrow:
      '<div class="slick-custom-arrow slick-custom-arrow-right"><svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 60 60" fill="none"><mask id="mask0_801_26200" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="60" height="60"><path d="M0 0H60V60H0V0Z" fill="white"/></mask><g mask="url(#mask0_801_26200)"><path d="M22.5 15L37.5 30L22.5 45" stroke="#1239AC" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></g></svg></div>',
    prevArrow:
      '<div class="slick-custom-arrow slick-custom-arrow-left"><svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 60 60" fill="none"><mask id="mask0_801_26203" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="60" height="60"><path d="M0 0H60V60H0V0Z" fill="white"/></mask><g mask="url(#mask0_801_26203)"><path d="M37.5 15L22.5 30L37.5 45" stroke="#1239AC" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></g></svg></div>',
  });
});
/* -------------------- Client-Testimonials-2 Slider -------------------- */
$(document).ready(function () {
  $(".client_testimonials_list_2").slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: false,
    arrows: true,
    infinite: true,
    speed: 1000,
    cssEase: "linear",
    slidesPerRow: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  });
  let clientX = -100;
  let clientY = -100;
  const cursorArrow = document.querySelector(".megic-cursor-item");
  const initCursor = () => {
    document.addEventListener("mousemove", (e) => {
      clientX = e.clientX;
      clientY = e.clientY;
    });
    const render = () => {
      TweenMax.to(cursorArrow, {
        duration: 0.3,
        x: clientX,
        y: clientY,
        ease: Power2.easeOut,
      });
      requestAnimationFrame(render);
    };
    requestAnimationFrame(render);
  };
  initCursor();
  const slickPrev = document.querySelector(
    ".client_testimonials_list_2 .slick-prev"
  );
  const slickNext = document.querySelector(
    ".client_testimonials_list_2 .slick-next"
  );
  if (slickPrev) {
    slickPrev.addEventListener("mouseenter", () => {
      cursorArrow.classList.add("cursor-prev");
      cursorArrow.classList.remove("cursor-next");
    });
    slickNext.addEventListener("mouseenter", () => {
      cursorArrow.classList.add("cursor-next");
      cursorArrow.classList.remove("cursor-prev");
    });

    const slider = document.querySelector(".client_testimonials_list_2");
    slider.addEventListener("mouseenter", () => {
      cursorArrow.classList.add("cursor-show");
    });
    slider.addEventListener("mouseleave", () => {
      cursorArrow.classList.remove("cursor-show");
    });
  }
});
/* -------------------- Home-FAQS -------------------- */
$(document).ready(function () {
  $(".home_faq_accodian_title").click(function () {
    $(this)
      .toggleClass("active")
      .next(".home_faq_accodian_tab")
      .slideToggle()
      .parent()
      .siblings()
      .find(".home_faq_accodian_tab")
      .slideUp()
      .prev()
      .removeClass("active");
  });
});
/* -------------------- FAQS-Accodian -------------------- */
$(document).ready(function () {
  $(".faqs_accodian_title").click(function () {
    $(this)
      .toggleClass("active")
      .next(".faqs_accodian_tab")
      .slideToggle()
      .parent()
      .siblings()
      .find(".faqs_accodian_tab")
      .slideUp()
      .prev()
      .removeClass("active");
  });
});
/* -------------------- Home_2 Banner Slider Video-Player -------------------- */
$(".js-overlay-start")
  .unbind("click")
  .bind("click", function (e) {
    e.preventDefault();
    var src = $(this).attr("data-url");
    $(".overlay-video").show();

    $(".overlay-video").addClass("o1");
    $("#player").attr("src", src);
  });
$(".our-video").click(function (event) {
  $(".overlay-video").show();
  let a = $(this).find("a").attr("data-url");
  $(".overlay-video").find("iframe").attr("src", a);
});
$(".close").click(function (event) {
  var PlayingVideoSrc = $("#player").attr("src").replace("&autoplay=1", "");
  $("#player").attr("src", PlayingVideoSrc);
  $(".overlay-video").removeClass("o1");
  setTimeout(function () {
    $(".overlay-video").hide();
  }, 600);
});

/* -------------------------------------  Timeline Button ------------------------------------- */
$(document).ready(function () {
  $(".timelinetab_slider_tabs").slick({
    slidesToShow: 4,
    slidesToScroll: 1,
    dots: false,
    arrows: true,
    infinite: true,
    loop: false,
    speed: 1000,
    cssEase: "linear",
    nextArrow:
      '<div class="slick-custom-arrow slick-custom-arrow-right"><svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="20" cy="20" r="19" fill="white" stroke="#1239AC" stroke-width="2"/><mask id="mask0_801_24490" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="8" y="8" width="24" height="24"><path d="M8 8H32V32H8V8Z" fill="white"/></mask><g mask="url(#mask0_801_24490)"><path d="M13 20H27" stroke="#1239AC" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M23 24L27 20" stroke="#1239AC" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M23 16L27 20" stroke="#1239AC" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></g></svg></div>',
    prevArrow:
      '<div class="slick-custom-arrow slick-custom-arrow-left"><svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="20" cy="20" r="19" fill="white" stroke="#1239AC" stroke-width="2"/><mask id="mask0_801_24482" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="8" y="8" width="24" height="24"><path d="M8 8H32V32H8V8Z" fill="white"/></mask><g mask="url(#mask0_801_24482)"><path d="M27 20L13 20" stroke="#1239AC" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M17 16L13 20" stroke="#1239AC" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M17 24L13 20" stroke="#1239AC" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></g></svg></div>',
    responsive: [
      {
        breakpoint: 995,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 650,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 431,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  });
});
$(".timelinetab_slider_tabs_content div").hide().css("opacity", 0);
$(".timelinetab_slider_tabs_content div:first")
  .show()
  .animate({ opacity: 1 }, 1000);
$(".timelinetab_slider_tabs li:first").addClass("tab-active");
$(".timelinetab_slider_tabs a").on("click", function (event) {
  event.preventDefault();
  var target = $($(this).attr("href"));
  $(".timelinetab_slider_tabs li").removeClass("tab-active");
  $(this).parent().addClass("tab-active");
  $(".timelinetab_slider_tabs_content div").hide().css("opacity", 0);
  target.show().animate({ opacity: 1 }, 1000);
});
/* -------------------------------------  Timeline Button ------------------------------------- */
$(document).ready(function () {
  $(".our_services_slider_tabs").slick({
    slidesToShow: 4,
    slidesToScroll: 1,
    dots: false,
    arrows: true,
    infinite: true,
    loop: false,
    speed: 1000,
    cssEase: "linear",
    nextArrow:
      '<div class="slick-custom-arrow slick-custom-arrow-left"><svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="40" cy="40" r="39" stroke="#1239AC" stroke-width="2"/><mask id="mask0_801_17717" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="16" y="16" width="48" height="48"><path d="M16 16H64V64H16V16Z" fill="white"/></mask><g mask="url(#mask0_801_17717)"><path d="M26 40H54" stroke="#1239AC" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M46 48L54 40" stroke="#1239AC" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M46 32L54 40" stroke="#1239AC" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></g></svg></div>',
    prevArrow:
      '<div class="slick-custom-arrow slick-custom-arrow-right"><svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="40" cy="40" r="39" stroke="#1239AC" stroke-width="2"/><mask id="mask0_801_17709" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="16" y="16" width="48" height="48"><path d="M16 16H64V64H16V16Z" fill="white"/></mask><g mask="url(#mask0_801_17709)"><path d="M54 40L26 40" stroke="#1239AC" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M34 32L26 40" stroke="#1239AC" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M34 48L26 40" stroke="#1239AC" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></g></svg></div>',
    responsive: [
      {
        breakpoint: 995,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 431,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  });
});
$(".our_services_slider_content_tab").hide().css("opacity", 0);
$(".our_services_slider_content_tab:first")
  .show()
  .animate({ opacity: 1 }, 1000);
$(".our_services_slider_tabs li:first").addClass("active");
$(".our_services_slider_tabs li a").on("click", function (event) {
  event.preventDefault();
  var target = $($(this).attr("href"));
  $(".our_services_slider_content_tab").hide().css("opacity", 0);
  $(".our_services_slider_tabs li").removeClass("active");
  $(this).parent().addClass("active");
  target.show().animate({ opacity: 1 }, 1000);
});
/* -------------------------------------  Pricing Button ------------------------------------- */
$(".pricing_content_tabs").hide().css("opacity", 0);
$(".pricing_content_tabs:first").show().animate({ opacity: 1 }, 1000);
$(".pricing_tabs li:first").addClass("active");
$(".pricing_tabs li a").on("click", function (event) {
  event.preventDefault();
  var target = $($(this).attr("href"));
  $(".pricing_content_tabs").hide().css("opacity", 0);
  $(".pricing_tabs li").removeClass("active");
  $(this).parent().addClass("active");
  target.show().animate({ opacity: 1 }, 1000);
});
/* -------------------------------------  Portfolio-Gallery Filter ------------------------------------- */
$(document).ready(function () {
   $(".gallery_fillter_btn").click(function () { 
    var value = $(this).attr("data-filter");
  if (value == "all") { 
    $(".filter").show("1000"); 
  } 
  else { 
    $(".filter") .not("." + value) .hide("3000"); $(".filter") .filter("." + value) .show("3000"); 
  }
   $(".gallery_fillter_btn").removeClass("active"); 
   $(this).addClass("active"); 
  }); 
});
/*------------------------------------- Pagenation Active Class -------------------------------------*/
$(".project_pagenation_list a").click(function () {
  $(".project_pagenation_list a").each(function () {
    $(this).parent("li").removeClass("active");
  });
  $(this).parent("li").addClass("active");
});
/* -------------------------------------  Scroll To Top Button ------------------------------------- */
var scrollToTopBtn = document.querySelector(".scrollToTopBtn");
var rootElement = document.documentElement;
function handleScroll() {
  var scrollTotal = rootElement.scrollHeight - rootElement.clientHeight;
  if (rootElement.scrollTop / scrollTotal > 0) {
    scrollToTopBtn.classList.add("showBtn");
  } else {
    scrollToTopBtn.classList.remove("showBtn");
  }
}
function scrollToTop() {
  rootElement.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}
scrollToTopBtn.addEventListener("click", scrollToTop);
document.addEventListener("scroll", handleScroll);
