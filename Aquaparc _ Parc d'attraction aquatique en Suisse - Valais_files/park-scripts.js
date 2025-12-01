/**
 *
 *
 * TABS Gridelement
 *
 *
 */

$(document).ready(function () {
  jarallax(document.querySelectorAll(".jarallax"), {
    speed: 0.5,
  });

  /* attraction detail iconbox show only 1 height for english*/
  const heightNumbers = [];
  $(".iconbox").each(function (index) {
    if (
      $(this).text().includes("Height") ||
      $(this).text().includes("Taille")
    ) {
      heightNumbers.push(
        parseFloat(
          $(this)
            .find("div.value")
            .text()
            .replace(/[^0-9.]/g, "")
        )
      );
    }
    // if (
    //   (!$(this).text().includes(Math.min.apply(Math, heightNumbers)) &&
    //     $(this).text().includes("Height"))
    // ) {
    //   $(this).css("display", "none");
    // }
  });
});

$(document).ready(function () {
  $(".event-item").click(function (event) {
    $(".event-item").removeClass("active");
    $(".event-image").removeClass("active");

    /* activate event image and item */
    for (i = 0; i < 30; i++) {
      if ($(event.delegateTarget).hasClass("counter-" + i)) {
        event.preventDefault();
        $(".counter-" + i).addClass("active");
      }
    }
  });
});

$(document).ready(function () {
  if ($.fn.fancybox && $(".fancybox").length) {
    $(".fancybox").fancybox(); //initialize the language menu in a lightbox modal
  }
});

$(document).ready(function () {
  $(".tabBody.active").show(); //initially show the `tabBody` which has active class
});

//click event to each `tabs` element
$(".tabs").on("click", function (e) {
  e.preventDefault();
  $(".tabs").removeClass("active"); //remove active class from all the tabs
  $(this).addClass("active"); //add active to current clicked element
  var target = $(this).attr("href"); //get its href attrbute
  $(".tabBody").hide("fast").removeClass("active"); //remove active from tabBody and hide all of them
  $(target).show("slow").addClass("active"); //show target tab and add active class to it
});

new WOW().init();

//Sticky Header
$(document).ready(function () {
  var offset = $(".header-main").offset();
  var sticky = document.getElementById("header-main");
  var additionalPixels = 0;
  $(window).scroll(function () {
    if ($(document).scrollTop() > offset.top - additionalPixels) {
      $(".header-main").addClass("fixed");
    } else {
      $(".header-main").removeClass("fixed");
    }
  });
});

// Custom Codes
$(document).ready(function () {
  $(".modal-content").prepend(
    '<a href="javascript:;" class="icon-close" data-dismiss="modal"><i class="fal fa-times"></i></a>'
  );
  $(".modal").appendTo("body");

  $(".header-main .nav-wrap").append('<div class="overlay-menu"></div>');
  $(".nav-bar").wrapInner('<div class="nav-max"></div>');
  $(".nav-bar .nav-max").wrapInner('<div class="nav-inn"></div>');

  $(".menu-btn").click(function () {
    $(".menu-btn").toggleClass("active");
    // $('.nav-bar').toggleClass('active');
    // $('.overlay-menu').toggleClass('active');
    // $('body').toggleClass('hiddenscroll-menu');
    if ($(".top-nav").length > 0) {
      $(".offcanvas").css({
        top: $(".navbar").outerHeight() + $(".top-nav").outerHeight(true),
      });
      $(".offcanvas-backdrop").css({
        top: $(".navbar").outerHeight() + $(".top-nav").outerHeight(true),
      });
    } else {
      $(".offcanvas").css({ top: $(".navbar").outerHeight() });
      $(".offcanvas-backdrop").css({ top: $(".navbar").outerHeight() });
    }
  });

  $("body").on("click", ".offcanvas-backdrop", () => {
    $(".menu-btn").toggleClass("active");
  });

  $(".close-btn, .overlay-menu").click(function () {
    $(".menu-btn").removeClass("active");
    $(".nav-bar").removeClass("active");
    $(".overlay-menu").removeClass("active");
    $("body").removeClass("hiddenscroll-menu");
  });

  $(".menu-item-has-children>a")
    .focus(function () {
      $(this).parent().addClass("nav-menu-open");
    })
    .blur(function () {
      $(this).parent().removeClass("nav-menu-open");
    });
  $(".menu-item-has-children>ul>li>a")
    .focus(function () {
      $(this).parent().parent().addClass("nav-menu-open");
      $(this).parent().parent().parent().addClass("nav-menu-open");
    })
    .blur(function () {
      $(this).parent().parent().removeClass("nav-menu-open");
      $(this).parent().parent().parent().removeClass("nav-menu-open");
    });

  $(".mega-menu.mega-menu-explore")
    .clone()
    .appendTo(".primary-menu .mega-menu-item.mega-menu-explore");
  $(".mega-menu-item.mega-menu-explore a")
    .focus(function () {
      $(".mega-menu-item.mega-menu-explore").addClass("nav-menu-open");
    })
    .blur(function () {
      $(".mega-menu-item.mega-menu-explore").removeClass("nav-menu-open");
    });

  $(".mega-menu.mega-menu-hotel")
    .clone()
    .appendTo(".primary-menu .mega-menu-item.mega-menu-hotel");
  $(".mega-menu-item.mega-menu-hotel a")
    .focus(function () {
      $(".mega-menu-item.mega-menu-hotel").addClass("nav-menu-open");
    })
    .blur(function () {
      $(".mega-menu-item.mega-menu-hotel").removeClass("nav-menu-open");
    });

  $(".mega-menu-item .item > .item-link")
    .focus(function () {
      $(this).parent().addClass("nav-menu-open");
    })
    .blur(function () {
      $(this).parent().removeClass("nav-menu-open");
    });
  $(".mega-menu-item .item > .mega-sub-menu a")
    .focus(function () {
      $(this).parent().parent().parent().addClass("nav-menu-open");
    })
    .blur(function () {
      $(this).parent().parent().parent().removeClass("nav-menu-open");
    });

  $(".primary-menu>ul>.menu-item-has-children>.sub-menu").before(
    $('<div class="submenu-lv1"></div>')
  );
  $(".primary-menu>ul>.mega-menu-item>.mega-menu").before(
    $('<div class="submenu-lv1"></div>')
  );

  $(".submenu-lv1").click(function () {
    $(".submenu-lv1").removeClass("active");
    $(
      ".primary-menu>ul>.menu-item-has-children>.sub-menu, .primary-menu>ul>.mega-menu-item>.mega-menu"
    ).slideUp("normal");
    if ($(this).next().is(":hidden") == true) {
      $(this).addClass("active");
      $(this).next().slideDown("normal");
    }
  });

  $(".pre-footer h2").click(function () {
    $(".pre-footer h2").removeClass("active");
    $(".pre-footer .footer-menu").slideUp("normal");
    if ($(this).next().is(":hidden") == true) {
      $(this).addClass("active");
      $(this).next().slideDown("normal");
    }
  });

  $(".pre-footer .footer-title").click(function () {
    $(".pre-footer .footer-title").removeClass("active");
    $(".pre-footer .footer-menu").slideUp("normal");
    if ($(this).next().is(":hidden") == true) {
      $(this).addClass("active");
      $(this).next().slideDown("normal");
    }
  });

  $(".accord-link").click(function () {
    $(".accord-link").removeClass("active");
    $(".accord-cont").slideUp("normal");
    if ($(this).next().is(":hidden") == true) {
      $(this).addClass("active");
      $(this).next().slideDown("normal");
    }
  });

  $(".filter-title-sm").click(function () {
    $(".filter-title-sm").removeClass("active");
    $(".filter-item-out").slideUp("normal");
    if ($(this).next().is(":hidden") == true) {
      $(this).addClass("active");
      $(this).next().slideDown("normal");
    }
  });

  $(".menu-item-has-children>a")
    .focus(function () {
      $(this).parent().addClass("nav-menu-open");
    })
    .blur(function () {
      $(this).parent().removeClass("nav-menu-open");
    });

  $(".menu-item-has-children>ul>li>a")
    .focus(function () {
      $(this).parent().parent().addClass("nav-menu-open");
      $(this).parent().parent().parent().addClass("nav-menu-open");
    })
    .blur(function () {
      $(this).parent().parent().removeClass("nav-menu-open");
      $(this).parent().parent().parent().removeClass("nav-menu-open");
    });

  $("input,textarea")
    .focus(function () {
      $(this)
        .data("placeholder", $(this).attr("placeholder"))
        .attr("placeholder", "");
    })
    .blur(function () {
      $(this).attr("placeholder", $(this).data("placeholder"));
    });

  $(".search-box input")
    .focus(function () {
      $(".search-box").addClass("open");
    })
    .blur(function () {
      $(".search-box").removeClass("open");
    });

  // for when site is loaded
  if (window.innerWidth <= 1200) {
    $(".dropdown").on("show.bs.dropdown", function (e) {
      $(this).find(".dropdown-menu").first().stop(true, true).slideDown("fast");
    });
    $(".dropdown").on("hide.bs.dropdown", function (e) {
      $(this).find(".dropdown-menu").first().stop(true, true).slideUp("fast");
    });
  }
  // for when window is resized
  $(window).on("resize", () => {
    if (window.innerWidth <= 1200) {
      $(".dropdown").on("show.bs.dropdown", function (e) {
        $(this)
          .find(".dropdown-menu")
          .first()
          .stop(true, true)
          .slideDown("fast");
      });
      $(".dropdown").on("hide.bs.dropdown", function (e) {
        $(this).find(".dropdown-menu").first().stop(true, true).slideUp("fast");
      });
    }
  });

  $('.search-box input[type="text"]').keyup(function () {
    if ($(this).val().length) {
      $(".search-box").removeClass("btn-disabled");
    } else {
      $(".search-box").addClass("btn-disabled");
    }
  });

  $(".alert-close-button").click(function () {
    $(this).closest(".alert-closable").addClass("hidden");
  });

  $(".alert-minimize-button, .alert-box .btn").click(function () {
    $(this).closest(".alert-closable").toggleClass("minimized");
  });

  if (window.matchMedia("(max-device-width: 960px)").matches) {
    $(".alert-minimize-button, .alert-box .btn")
      .closest(".alert-closable")
      .toggleClass("minimized");
  }

  $(".nav-link.dropdown-toggle").click(function () {
    const link = $(this).closest(".nav-link").attr("href");
    window.location = link;
  });
});

//Owl Slider Control

$("#eventlist-slider").owlCarousel({
  loop: true,
  items: 1,
  margin: 30,
  nav: false,
  dots: true,
  dotsEach: true,
  autoplay: false,
});

// $('.review-slider').owlCarousel({
//     loop: true,
//     items: 1,
//     margin: 30,
//     center: $('.review-slider').hasClass("center-large"),
//     nav: false,
//     dots: true,
//     dotsEach: true,
//     autoplay: false,
//     responsive: {
//         0: {
//             margin: 0,
//             items: 1,
//         },
//
//         768: {
//             items: 2,
//             margin: 20,
//         },
//
//         992: {
//             items: 2,
//             nav: true,
//         },
//
//         1200: {
//             items: 3,
//             nav: true,
//         }
//     }
// });

// $(document).ready(function () {
//
//
//
//
//     $('#hero-slider').owlCarousel({
//         items: 1,
//         margin: 0,
//         loop: true,
//         nav: false,
//         dots: true,
//         autoplay: false
//     });
//
//     $('#offers-slider').owlCarousel({
//         items: 1,
//         margin: 0,
//         loop: true,
//         nav: true,
//         dots: true,
//         dotsEach: true,
//         autoplay: false,
//         responsive: {
//             0: {
//                 items: 1,
//                 margin: 20,
//             },
//
//             768: {
//                 items: 2,
//                 margin: 20,
//             },
//
//             992: {
//                 items: 2,
//                 margin: 20,
//             },
//
//             1200: {
//                 items: 3,
//                 margin: 24,
//             }
//         }
//     });
//
//     $('#reviews-slider').owlCarousel({
//         loop: true,
//         items: 1,
//         margin: 30,
//         center: $('#reviews-slider').hasClass("center-large"),
//         nav: false,
//         dots: true,
//         dotsEach: true,
//         autoplay: false,
//         responsive: {
//             0: {
//                 margin: 0,
//                 items: 1,
//             },
//
//             768: {
//                 items: 2,
//                 margin: 20,
//             },
//
//             992: {
//                 items: 2,
//                 nav: true,
//             },
//
//             1200: {
//                 items: 3,
//                 nav: true,
//             }
//         }
//     });
//
// });

// Grid Layout
$(window).on("load", function () {
  var $grid = $(".grid-boxes").isotope({
    itemSelector: ".grid-boxes>div",
    layoutMode: "fitRows",
    percentPosition: true,
    masonry: {
      columnWidth: ".grid-boxes>div",
    },
  });

  var $grid2 = $(".grid-items").isotope({
    itemSelector: ".grid-items>div",
    percentPosition: true,
    masonry: {
      columnWidth: ".grid-items>div",
    },
  });

  $(".filters ul li a").click(function () {
    $(".filters ul li a").removeClass("active");
    $(this).addClass("active");

    var data = $(this).attr("data-filter");
    $grid.isotope({
      filter: data,
    });
  });
});

//Custom SelectBox
$(document).ready(function () {
  enableSelectBoxes();
});

function enableSelectBoxes() {
  $(".selectbox").each(function () {
    $(".selectbox ul").addClass("selectoptions");
    $(".selectbox ul li").addClass("selectoption");

    $(this)
      .children(".current-item")
      .html(
        $(this)
          .children(".selectoptions")
          .children(".selectoption:first")
          .text()
      );

    $(this)
      .children(".current-item")
      .click(function () {
        $(this).toggleClass("active");
        $(".selectoptions").slideToggle("fast");
        $(".selectoptions2").slideUp(10);
        $(".selectoptions3").slideUp(10);
      });

    $(this)
      .find(".selectoption")
      .click(function () {
        $(".current-item").removeClass("active");
        $(".selectoptions").slideUp(10);
        $(this).closest(".selectbox").attr("value", $(this).attr("value"));
        $(this)
          .parent()
          .siblings(".selectbox .current-item")
          .html($(this).text());
      });
  });
} //-->

//Custom SelectBox
$(document).ready(function () {
  enableSelectBoxes2();
});

function enableSelectBoxes2() {
  $(".selectbox2").each(function () {
    $(".selectbox2 ul").addClass("selectoptions2");
    $(".selectbox2 ul li").addClass("selectoption2");

    $(this)
      .children(".current-item2")
      .html(
        $(this)
          .children(".selectoptions2")
          .children(".selectoption2:first")
          .text()
      );

    $(this)
      .children(".current-item2")
      .click(function () {
        $(this).toggleClass("active");
        $(".selectoptions2").slideToggle("fast");
        $(".selectoptions").slideUp(10);
        $(".selectoptions3").slideUp(10);
      });

    $(this)
      .find(".selectoption2")
      .click(function () {
        $(".current-item2").removeClass("active");
        $(".selectoptions2").slideUp(10);
        $(this).closest(".selectbox2").attr("value", $(this).attr("value"));
        $(this).parent().siblings(".current-item2").html($(this).text());
      });
  });
} //-->

//Custom SelectBox
$(document).ready(function () {
  enableSelectBoxes3();
});

function enableSelectBoxes3() {
  $(".selectbox3").each(function () {
    $(".selectbox3 ul").addClass("selectoptions3");
    $(".selectbox3 ul li").addClass("selectoption3");

    $(this)
      .children(".current-item3")
      .html(
        $(this)
          .children(".selectoptions3")
          .children(".selectoption3:first")
          .text()
      );

    $(this)
      .children(".current-item3")
      .click(function () {
        $(this).toggleClass("active");
        $(".selectoptions3").slideToggle("fast");
        $(".selectoptions").slideUp(10);
        $(".selectoptions2").slideUp(10);
      });

    $(this)
      .find(".selectoption3")
      .click(function () {
        $(".current-item3").removeClass("active");
        $(".selectoptions3").slideUp(10);
        $(this).closest(".selectbox3").attr("value", $(this).attr("value"));
        $(this).parent().siblings(".current-item3").html($(this).text());
      });
  });
} //-->

//Onload
$(document).ready(function () {
  $(".wow").css("opacity", "1");
});

// Dropdown Menu Outer Close
var mouse_is_inside2 = false;
$(document).ready(function () {
  $(".dropdown-menu").hover(
    function () {
      mouse_is_inside2 = true;
    },
    function () {
      mouse_is_inside2 = false;
    }
  );

  $("body").mouseup(function () {
    if (!mouse_is_inside2) $(".dropdown-toggle").removeClass("active");
  });
});
$(".dropdown-menu").on("click", function (event) {
  event.stopPropagation();
});

// Box Equalheight
try {
  equalheight = function (container) {
    var currentTallest = 0,
      currentRowStart = 0,
      rowDivs = new Array(),
      $el,
      topPosition = 0;
    $(container).each(function () {
      $el = $(this);
      $($el).height("auto");
      topPostion = $el.position().top;

      if (currentRowStart != topPostion) {
        for (currentDiv = 0; currentDiv < rowDivs.length; currentDiv++) {
          rowDivs[currentDiv].height(currentTallest);
        }
        rowDivs.length = 0; // empty the array
        currentRowStart = topPostion;
        currentTallest = $el.height();
        rowDivs.push($el);
      } else {
        rowDivs.push($el);
        currentTallest =
          currentTallest < $el.height() ? $el.height() : currentTallest;
      }
      for (currentDiv = 0; currentDiv < rowDivs.length; currentDiv++) {
        rowDivs[currentDiv].height(currentTallest);
      }
    });
  };

  /*$(window).load(function () {
        equalheight('.article-box2 .txt-wrap');
    });
    $(window).resize(function () {
        equalheight('.article-box2 .txt-wrap');
    });

    $(window).load(function () {
        equalheight('.article-box2 .price-wrap .price-out .price');
    });
    $(window).resize(function () {
        equalheight('.article-box2 .price-wrap .price-out .price');
    });

    $(window).load(function () {
        equalheight('.grid-boxes > div .box');
    });
    $(window).resize(function () {
    $(window).resize(function () {
        equalheight('.grid-boxes > div .box');
    });*/
} catch (e) {}

// Select
(function ($) {
  // Color the empty select
  $.fn.selectColored = function (options) {
    var defaults = {
      def: -1,
      classSel: "colorize",
      classEmpty: "empty",
      classDef: "def",
    };
    // extend default options with those provided
    var opts = $.extend(defaults, options);

    // implementation code
    return this.each(function () {
      var $select = $(this);
      $select
        .addClass(opts.classSel)
        .find('option[value="' + opts.def + '"]')
        .addClass(opts.classDef);

      function color() {
        $select.toggleClass(opts.classEmpty, $select.val() == opts.def);
      }

      $select.bind("change", function () {
        color();
      });

      // initialize
      color();
    });
  }; // end plugin definition
})(jQuery);
$(document).ready(function () {
  $("select").selectColored();
});

$(document).ready(function () {
  // Flying Focus - http://n12v.com/focus-transition/
  (function () {
    if (document.getElementById("flying-focus")) return;

    var flyingFocus = document.createElement("flying-focus"); // use uniq element name to decrease the chances of a conflict with website styles
    flyingFocus.id = "flying-focus";
    document.body.appendChild(flyingFocus);

    var DURATION = 100;
    flyingFocus.style.transitionDuration =
      flyingFocus.style.WebkitTransitionDuration = DURATION / 1000 + "s";

    function offsetOf(elem) {
      var rect = elem.getBoundingClientRect();
      var docElem = document.documentElement;
      var win = document.defaultView;
      var body = document.body;

      var clientTop = docElem.clientTop || body.clientTop || 0,
        clientLeft = docElem.clientLeft || body.clientLeft || 0,
        scrollTop = win.pageYOffset || docElem.scrollTop || body.scrollTop,
        scrollLeft = win.pageXOffset || docElem.scrollLeft || body.scrollLeft,
        top = rect.top + scrollTop - clientTop,
        left = rect.left + scrollLeft - clientLeft;

      return { top: top, left: left };
    }

    var movingId = 0;
    var prevFocused = null;
    var isFirstFocus = true;
    var keyDownTime = 0;

    document.documentElement.addEventListener(
      "keydown",
      function (event) {
        var code = event.which;
        // Show animation only upon Tab or Arrow keys press.
        if (code === 9 || (code > 36 && code < 41)) {
          keyDownTime = now();
        }
      },
      false
    );

    document.documentElement.addEventListener(
      "focus",
      function (event) {
        var target = event.target;
        if (target.id === "flying-focus") {
          return;
        }
        var offset = offsetOf(target);
        flyingFocus.style.left = offset.left + "px";
        flyingFocus.style.top = offset.top + "px";
        flyingFocus.style.width = target.offsetWidth + "px";
        flyingFocus.style.height = target.offsetHeight + "px";

        // Would be nice to use:
        //
        //   flyingFocus.style['outline-offset'] = getComputedStyle(target, null)['outline-offset']
        //
        // but it always '0px' in WebKit and Blink for some reason :(

        if (isFirstFocus) {
          isFirstFocus = false;
          return;
        }

        if (now() - keyDownTime > 42) {
          return;
        }

        onEnd();
        target.classList.add("flying-focus_target");
        flyingFocus.classList.add("flying-focus_visible");
        prevFocused = target;
        movingId = setTimeout(onEnd, DURATION);
      },
      true
    );

    document.documentElement.addEventListener(
      "blur",
      function () {
        onEnd();
      },
      true
    );

    function onEnd() {
      if (!movingId) {
        return;
      }
      clearTimeout(movingId);
      movingId = 0;
      flyingFocus.classList.remove("flying-focus_visible");
      prevFocused.classList.remove("flying-focus_target");
      prevFocused = null;
    }

    function now() {
      return new Date().valueOf();
    }
  })();
});

/**
 * Filters a list of element by given filters.
 *
 * @param {array<object>} elements an array ob objects with: {element: jqueryElement, data: FeaturesArray}
 * @param {array<object>} activeOptions an array of active filters.
 */

function filterElements(elements, activeOptions) {
  elements.forEach(function (element) {
    fullfilledGroups = {};
    activeOptions.forEach((option) => {
      fullfilledGroups[option.group] = false;
    });
    // check every filter. Means, for each filter the function has to return true
    activeOptions.forEach(function (filter) {
      // check every datapoint of the current element. Means, the function has to retorn true al least one time.
      if (!element.data) {
        return false;
      }
      return element.data.forEach(function (datapoint) {
        var filterFullfilled =
          datapoint.group === filter.group && datapoint.value === filter.value;
        if (filterFullfilled) {
          fullfilledGroups[filter.group] = true;
        }
        // check if group and value match
        return filterFullfilled;
      });
    });
    var allGroupsFUllfilled = Object.values(fullfilledGroups).every(
      (group) => group === true
    );
    if (activeOptions.length === 0 || allGroupsFUllfilled) {
      element.element.parent().removeClass("disabled");
    } else {
      element.element.parent().addClass("disabled");
    }
  });
}

$(document).ready(function () {
  // find each filter and element section
  $(".filter-elements").each(function () {
    // get all boxed that should be filtered
    var elements = $(this).find(".filter-element");
    // read out and save groups and values
    var elementsProcessed = [];
    elements.each(function () {
      // the data attribute data-features should look like this:
      // [ { group: "1", value: "a"},
      //   { group: "1", value: "b"},
      //   { group: "2", value: "a"} ]
      var data = $(this).data("features");
      elementsProcessed.push({
        element: $(this),
        data: data,
      });
    });
    // save all active filters for filtering
    var activeFilter = [];
    // get the container where the active filter badges should be placed
    var activeOptionContainer = $(this).find(".filter-active-options");
    // get the tempalte badge and clone it
    var templateElement = $(this).find(".filter-active-options > div");
    var template = templateElement.clone();
    // it was display: none - remove it
    template.removeAttr("style");
    templateElement.remove();
    // get each dropdown
    $(this)
      .find(".btn-filter")
      .each(function () {
        $(this).click(function () {
          $(this).find(".filter-options").toggleClass("show");
          $(this).find(".icon-select").toggleClass("toggle-icon-filter");

          $(".btn-filter")
            .not(this)
            .find(".filter-options")
            .removeClass("show");
          $(".btn-filter")
            .not(this)
            .find(".icon-select")
            .removeClass("toggle-icon-filter");
        });

        // save the group of the dropdown
        var group = $(this).data("group").toString();
        // get each option of the current dropdown
        $(this)
          .find(".filter-options > div, .filter-category-options")
          .each(function () {
            // save current value and group in this function
            var optionGroup = group;
            var optionValue = $(this).data("value").toString();
            // save the current option in the dropdown
            var optionInDropdown = $(this);
            // add a click event to the option
            $(this).click(function () {
              // only execute the click, if the option is not already active
              if (
                activeFilter.findIndex(
                  (option) =>
                    option.group === optionGroup && option.value === optionValue
                ) === -1
              ) {
                // copy the template
                var option = template.clone();
                // replace the text with the text of the current option
                option.find(".label").text($(this).text());
                // add it to the container of the active options
                activeOptionContainer.append(option);
                // save the option in the active filters array
                activeFilter.push({
                  value: optionValue,
                  group: optionGroup,
                });
                // disable option in dropdown to indicate that is was taken already
                optionInDropdown.addClass("disabled");
                // update the listing
                filterElements(elementsProcessed, activeFilter);
                // add a click event to the active option badge to disable it again
                option.click(function () {
                  // remove ooption from active filter array
                  activeFilter = activeFilter.filter(
                    (activeOption) =>
                      !(
                        activeOption.group === optionGroup &&
                        activeOption.value === optionValue
                      )
                  );
                  // remove badge
                  $(this).remove();
                  // remove disabled class in the option  in the dropdown
                  optionInDropdown.removeClass("disabled");
                  // update the listing
                  filterElements(elementsProcessed, activeFilter);
                });
              }
            });
          });
      });
  });
  $(document).on("click", function (event) {
    if (!$(event.target).closest(".filter-elements .btn-filter").length) {
      $(".filter-elements .btn-filter .filter-options").removeClass("show");
      $(".filter-elements .btn-filter span.icon-select").removeClass(
        "toggle-icon-filter"
      );
    }
  });
});

var youtubeIframeAPIReadyStack = [];
/**
 * Fonction appelé lorsque l'API YouTube est chargée dans le DOM.
 *
 * On indique alors que pour toutes les vidéos en arrière plan, on coupe le son.
 */
youtubeIframeAPIReadyStack.push(function () {
  var videos = document.getElementsByClassName("slider__background--video");

  var i;
  for (i = 0; i < videos.length; i++) {
    new YT.Player(videos[i].id, {
      events: {
        onReady: function (event) {
          event.target.mute();
          event.target.playVideo();
          event.target.loop();
        },
      },
    });
  }
});

function onYouTubeIframeAPIReady() {
  if (typeof YT !== "undefined" && typeof YT.Player !== "undefined") {
    while (youtubeIframeAPIReadyStack.length > 0) {
      youtubeIframeAPIReadyStack.shift()();
    }
  }
}

onYouTubeIframeAPIReady();

$(document).ready(function () {
  $(".navbar .nav-item.dropdown").each(function (i) {
    parentItem = $(this).find(".dropdown-toggle");
    parentNonLinked = parentItem.clone();
    parentNonLinked.attr("href", "");
    parentNonLinked.addClass("non-linked-menu-item");
    parentItem.addClass("linked-menu-item");
    parentItem.before(parentNonLinked);
    parentText = parentItem.find(".nav-text").text();
    parentLink = parentItem.attr("href");
    dropdownMenu = $(this).find(".dropdown-menu");
    allLinks = [];
    dropdownMenu.find(".dropdown-item a").each(function (j) {
      allLinks.push($(this).attr("href"));
    });
    if (!allLinks.includes(parentLink)) {
      dropdownItemTemplate = dropdownMenu.find(".dropdown-item").first();
      newDropdownItem = dropdownItemTemplate.clone();
      newDropdownItem.addClass("duplicated-parent");
      newDropdownLink = newDropdownItem.find("a");
      newDropdownLink.attr("href", parentLink);
      newDropdownLink.text(parentText);
      dropdownItemTemplate.before(newDropdownItem);
    }

    /**
     *
     * Apple iOS toggle fix @05.04.2022: 1st menu items should not redirect to target page AND duplicated 1st for 2nd level should be visible
     *
     */
    if (window.innerWidth < 1200) {
      jQuery(
        ".navbar .nav-item.dropdown a.nav-link.dropdown-toggle.linked-menu-item"
      ).attr("href", "javascript:void(0)");
    }
    /**
     * End of iOS fix
     */
  });
});

// Custom Codes
$(document).ready(function () {
  $("#accelerate-slider").owlCarousel({
    items: 1,
    margin: 0,
    loop: true,
    nav: true,
    dots: false,
    autoplay: true,
  });

  $("#ourrides-slider").owlCarousel({
    items: 1,
    margin: 30,
    loop: true,
    nav: false,
    dots: true,
    dotsEach: false,
    autoplay: false,
    responsive: {
      0: {
        items: 1,
        autoWidth: false,
      },
      768: {
        items: 1,
        autoWidth: true,
      },
      992: {
        items: 2,
        nav: true,
        autoWidth: false,
      },
      1200: {
        items: 3,
        nav: true,
        autoWidth: false,
      },
      1700: {
        items: 4,
        nav: true,
        autoWidth: false,
      },
    },
  });

  $("#attr-image-slider").owlCarousel({
    items: 1,
    margin: 30,
    loop: true,
    nav: false,
    dots: true,
    dotsEach: false,
    autoplay: false,
    responsive: {
      0: {
        items: 1,
        autoWidth: false,
      },
      768: {
        items: 1,
        autoWidth: true,
      },
      992: {
        items: 2,
        autoWidth: false,
      },
      1200: {
        items: 3,
        autoWidth: false,
      },
      1700: {
        items: 4,
        autoWidth: false,
      },
    },
  });

  $("#more-news-slider").owlCarousel({
    items: 1,
    margin: 30,
    loop: true,
    nav: false,
    dots: true,
    dotsEach: true,
    autoplay: false,
    responsive: {
      0: {
        items: 1,
        autoWidth: true,
      },
      768: {
        items: 1,
        autoWidth: true,
      },
      992: {
        items: 2,
        nav: true,
        autoWidth: false,
      },
      1200: {
        items: 3,
        nav: true,
        autoWidth: false,
      },
      1700: {
        items: 3,
        nav: true,
        autoWidth: false,
      },
    },
  });

  // $('#news-slider').owlCarousel({
  //     items: 1,
  //     margin: 30,
  //     loop: true,
  //     nav: false,
  //     dots: true,
  //     dotsEach: true,
  //     autoplay: false,
  //     responsive: {
  //         0: {
  //             items: 1,
  //         },
  //         768: {
  //             items: 1,
  //         },
  //         992: {
  //             items: 2,
  //             nav: true,
  //             autoWidth: false,
  //         },
  //         1200: {
  //             items: 3,
  //             nav: true,
  //             autoWidth: false,
  //         },
  //         1700: {
  //             items: 3,
  //             nav: true,
  //             autoWidth: false,
  //         }
  //     }
  // });

  $("#animal-slider").owlCarousel({
    items: 1,
    margin: 30,
    loop: true,
    nav: false,
    dots: true,
    dotsEach: true,
    autoplay: false,
    responsive: {
      0: {
        items: 1,
        autoWidth: false,
      },
      768: {
        items: 1,
        autoWidth: true,
      },
      992: {
        items: 2,
        nav: true,
        autoWidth: false,
      },
      1200: {
        items: 3,
        nav: true,
        autoWidth: false,
      },
      1700: {
        items: 3,
        nav: true,
        autoWidth: false,
      },
    },
  });

  $(function () {
    $('[data-toggle="tooltip"]').tooltip();
  });
});

jQuery(document).ready(function () {
  if (jQuery(".fixed-icon a.scrolltop").length > 0) {
    // Der Button wird ausgeblendet
    jQuery(".fixed-icon a.scrolltop").hide();
    jQuery(".fixed-icon a.scrolltop").attr("href", "javascript:void(0)");

    // Funktion für das Scroll-Verhalten
    jQuery(function () {
      jQuery(window).scroll(function () {
        if (jQuery(this).scrollTop() > 100) {
          // Wenn 100 Pixel gescrolled wurde
          jQuery(".fixed-icon a.scrolltop").fadeIn();
        } else {
          jQuery(".fixed-icon a.scrolltop").fadeOut();
        }
      });

      jQuery(".fixed-icon a.scrolltop").click(function (event) {
        // Klick auf den Button
        event.stopPropagation();
        jQuery("body,html").animate(
          {
            scrollTop: 0,
          },
          1000
        );
        return false;
      });
    });
  }
});

/* 2022-05-04: HOTFIX for extension "calenderize"; currentlich there are some situations with multiple calender entries of same date (redundant) */
jQuery(document).ready(function () {
  if (jQuery(".events-cont#calendar").length > 0) {
    let calEntryCounter = 0;
    jQuery(".events-cont .events-articles").each(function (
      calEntryIndex,
      calEntry
    ) {
      if (jQuery(calEntry).is(":visible")) {
        if (calEntryCounter >= 1) {
          jQuery(calEntry).hide();
        }
        calEntryCounter += 1;
      }
    });
  }
});
/*************************************************************************************************************************************************/

jQuery(document).ready(function () {
  if (jQuery(".news-single .frame-type-form_formframework form").length > 0) {
    // get rewrited url title of the current news article (like e.g., "whats-new-this-summer")
    let newsDetailUrlTitle = window.location.pathname.split("/").pop();
    // get full form action -> without the single new article in url :( and remove everything before "?" in url sting
    let oldAction = jQuery(".news-single .frame-type-form_formframework form")
      .attr("action")
      .split("?")
      .pop();
    let newAction = newsDetailUrlTitle + "?" + oldAction;
    // set new action url for the form inside a news article
    jQuery(".news-single .frame-type-form_formframework form").attr(
      "action",
      newAction
    );
  }
});

jQuery(document).ready(function () {
  $(".tab-wrapper .nav-link.active").parent().css("overflow", "visible");
  $(".tab-wrapper .nav-link").on("click", clickToggle);
  function clickToggle() {
    $(this).parent().css("overflow", "visible");
    $(".tab-wrapper .nav-link:not(.active)").parent().css("overflow", "hidden");
  }
});

// jQuery(document).ready(function() {
// if ($(".container-fluid").find('.container').length > 0) {
//     $('.container-fluid').addClass('mobile-padding');
// }
[].forEach.call(document.querySelectorAll(".container-fluid"), (e) => {
  let elements = e.querySelectorAll(".container");
  if (!elements.length > 0) {
    e.classList.add("mobile-padding");
    // e.classList.addClass('test');
  }
});

jQuery(document).ready(function () {
  $(".toggleElement").click(function (e) {
    e.preventDefault();
    e.stopPropagation();
  });

  $(".toggle-wrapper").on("show.bs.collapse", function () {
    $(this).siblings(".toggleElement").addClass("active");
    if ($(this).siblings(".toggleElement").hasClass("active")) {
      $(this)
        .siblings(".toggleElement")
        .children(".textbutton-active")
        .css("display", "block");
      $(this)
        .siblings(".toggleElement")
        .children(".textbutton")
        .css("display", "none");
    }
  });

  $(".toggle-wrapper").on("hide.bs.collapse", function () {
    $(this).siblings(".toggleElement").removeClass("active");
    if ($(this).siblings(".toggleElement").not("active")) {
      $(this)
        .siblings(".toggleElement")
        .children(".textbutton-active")
        .css("display", "none");
      $(this)
        .siblings(".toggleElement")
        .children(".textbutton")
        .css("display", "block");
    }
  });

  $(".toggleText").on("show.bs.collapse", function () {
    $(this).siblings(".toggleElement").addClass("active");
    if ($(this).siblings(".toggleElement").hasClass("active")) {
      $(this)
        .siblings(".toggleElement")
        .children(".textbutton-active")
        .css("display", "block");
      $(this)
        .siblings(".toggleElement")
        .children(".textbutton")
        .css("display", "none");
    }
  });

  $(".toggleText").on("hide.bs.collapse", function () {
    $(this).siblings(".toggleElement").removeClass("active");
    if ($(this).siblings(".toggleElement").not("active")) {
      $(this)
        .siblings(".toggleElement")
        .children(".textbutton-active")
        .css("display", "none");
      $(this)
        .siblings(".toggleElement")
        .children(".textbutton")
        .css("display", "block");
    }
  });

  $(".text.toggleText").each(function () {
    $(this).parent().css({
      position: "relative",
      display: "flex",
      "flex-direction": "column",
    });
  });
});

jQuery(document).ready(function () {
  if ($(window).width() < 1199) {
    if ($(".card .content .btn-out")) {
      // $('.mb-3').addClass('mb-5');
      $(".row .item").css("padding-bottom", "50px");
    }
    if ($(".feature-items .fourcol-25-25-25-25")) {
      $(".row .col-6").removeClass("mb-3");
    }
  }
});

jQuery(document).ready(function () {
  if (
    $("a.card.cardtype-price.customBackgroundColor").find($("[class*='#']"))
  ) {
    $("a.card.cardtype-price.customBackgroundColor[class*='#']").each(
      function () {
        var classList = $(this).attr("class");
        var classArr = classList.split(/\s+/);
        var lastClassNameArr = classArr.slice(-1);
        var lastClassName = lastClassNameArr.toString();
        $(this).css("background-color", lastClassName);
      }
    );
  }
});

$(document).ready(function () {
  function initializeSlider() {
    const $slider = $(".card-carsl-item-list");
    const $bannerSlider = $(".hero-banner-holder");

    // Initialize hero banner slider
    if ($.fn && $.fn.slick && !$bannerSlider.hasClass("slick-initialized")) {
      $bannerSlider.slick({
        dots: false,
        arrows: false,
        infinite: true,
        centerMode: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        speed: 300,
        accessibility: false,
        draggable: false,
        swipe: false,
        touchMove: false,
        adaptiveHeight: true,
      });
    }

    // Initialize card carousel slider for smaller screens
    if (window.matchMedia("(max-width: 1023px)").matches) {
      if ($.fn && $.fn.slick && !$slider.hasClass("slick-initialized")) {
        $slider.slick({
          dots: true,
          arrows: false,
          infinite: true,
          speed: 300,
          centerMode: true,
          slidesToShow: 3,
          slidesToScroll: 1,
          centerPadding: "0px",
          dotsClass: "slick-dots custom_paging",
          asNavFor: ".hero-banner-holder",
          variableWidth: true,
          customPaging: function (slider, i) {
            return i + 1 + "/" + slider.slideCount;
          },
          responsive: [
            {
              breakpoint: 768,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
              },
            },
            {
              breakpoint: 640,
              settings: {
                centerPadding: "0px",
              },
            },
          ],
        });
      }
    } else {
      if ($slider.hasClass("slick-initialized")) {
        $slider.slick("unslick");
      }
    }

    // Reattach click functionality after resize
    attachCardClickEvent();
  }

  function attachCardClickEvent() {
    $(".card-carsl-item")
      .off("click")
      .on("click", function () {
        // Get the index of the clicked card
        let cardIndex = 0;
        if (window.matchMedia("(max-width: 1023px)").matches) {
          cardIndex = $(this).closest(".slick-slide").data("slick-index");
        } else {
          cardIndex = $(this).index();

          // Reset all elements with 'card-carous-list-trans-2x' to 'card-carous-list-trans-1x'
          $(".card-carous-list-trans-2x")
            .removeClass("card-carous-list-trans-2x")
            .addClass("card-carous-list-trans-1x");

          // Replace class of the clicked element
          $(this)
            .removeClass("card-carous-list-trans-1x")
            .addClass("card-carous-list-trans-2x");
          // Move the hero banner slider to the corresponding slide
          $(".hero-banner-holder").slick("slickGoTo", cardIndex);
        }
      });
  }

  // Reinitialize slider on window resize
  $(window).on("resize", function () {
    initializeSlider();
  });

  //  -------- 5 col mobile slider---------
  function initMobileCarousels() {
    $(
      ".mobile-slider-five-col .row, .mobile-slider-four-col .row, .mobile-slider-three-col .row"
    ).each(function () {
      var $carousel = $(this);

      if ($(window).width() <= 768) {
        // Add owl-carousel class if missing
        if (!$carousel.hasClass("owl-carousel")) {
          $carousel.addClass("owl-carousel");
        }

        // Default settings
        var settings = {
          loop: true,
          margin: 10,
          nav: false,
          dots: false,
          items: 1.2,
        };

        // Init
        $carousel.owlCarousel(settings);
      } else {
        // Destroy on desktop
        if ($carousel.hasClass("owl-carousel")) {
          $carousel.trigger("destroy.owl.carousel");
          $carousel.removeClass("owl-carousel owl-loaded");
          $carousel.find(".owl-stage-outer").children().unwrap();
        }
      }
    });
  }

  $(document).ready(initMobileCarousels);
  $(window).on("resize", initMobileCarousels);
});

$(document).ready(function () {
  const carouselContainers = $(".mobile-slider-multi-row");
  const rowSelector =
    ".threecol-33-33-33 .row, .fourcol-25-25-25-25 .row, .fivecol-20-20-20-20-20  .row";

  const breakpoint = 768;

  // Store original rows HTML per container so we can restore only the rows later
  carouselContainers.each(function () {
    const $container = $(this);
    const $allRows = $container.find(rowSelector);
    const originalRowsHtml = $allRows
      .map(function () {
        return $(this).prop("outerHTML");
      })
      .get()
      .join("");
    $container.data("originalRowsHtml", originalRowsHtml);
  });

  function toggleMultiRowCarousel() {
    carouselContainers.each(function () {
      const $container = $(this);
      const $existingOwl = $container.find(".owl-carousel");

      if ($(window).width() <= breakpoint) {
        // If carousel not initialized for this container
        if (!$existingOwl.length) {
          const $allRows = $container.find(rowSelector);
          // Collect all .col slides from the rows and clone them
          const allSlides = $allRows.find('[class*="col-"]').clone();

          // Create the owl wrapper and insert it where the rows were, keeping other siblings intact
          const $owl = $("<div class='owl-carousel owl-theme'></div>");
          $owl.append(allSlides);
          $allRows.first().before($owl);
          $allRows.remove();

          // Initialize Owl Carousel on the created element
          $owl.owlCarousel({
            items: 1.2,
            loop: true,
            margin: 10,
            nav: false,
            dots: false,
            autoplay: true,
            autoplayTimeout: 4000,
          });
        }
      } else {
        // Restore original rows HTML if returning to desktop
        if ($existingOwl.length) {
          // Destroy owl on the actual owl element
          $existingOwl.trigger("destroy.owl.carousel");
          const originalRowsHtml = $container.data("originalRowsHtml") || "";
          // Replace the owl element with the saved rows markup
          $existingOwl.replaceWith(originalRowsHtml);
        }
      }
    });
  }

  // Initial run
  toggleMultiRowCarousel();

  // Re-run on resize (debounced)
  let resizeTimer;
  $(window).on("resize", function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(toggleMultiRowCarousel, 250);
  });
});

/**
 * Dynamically converts the four-column grid into an Owl Carousel on mobile devices,
 * correctly handling multiple frames per column.
 */
$(document).ready(function () {
  const carouselContainer = $(".photo-gallery-elem");
  const targetRow = carouselContainer.find(".row");

  // Store the original grid HTML to restore it on desktop
  const originalGridHtml = targetRow.html();

  const breakpoint = 767;

  function toggleFourColCarousel() {
    if ($(window).width() < breakpoint) {
      // If the carousel hasn't been initialized yet...
      if (!targetRow.hasClass("owl-loaded")) {
        // 1. Find all individual frames from the original HTML
        const slides = $(originalGridHtml).find(".frame-type-image");

        // 2. Replace the row's content with just the slide frames
        targetRow.html(slides);

        // 3. Initialize Owl Carousel
        targetRow.addClass("owl-carousel").owlCarousel({
          items: 1,
          loop: true,
          margin: 20,
          nav: true,
          dots: true,
        });
      }
    } else {
      // If the carousel is active...
      if (targetRow.hasClass("owl-loaded")) {
        // 1. Destroy the carousel instance
        targetRow.trigger("destroy.owl.carousel");

        // 2. Remove the carousel class
        targetRow.removeClass("owl-carousel");

        // 3. Restore the original grid structure from the saved HTML
        targetRow.html(originalGridHtml);
      }
    }
  }

  // Run the function on page load
  toggleFourColCarousel();

  // Re-run the function on window resize
  let resizeTimer;
  $(window).on("resize", function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(toggleFourColCarousel, 250);
  });
});

// Disable AOS on sliders and carousels
$(document).ready(function () {
  const sliderSelectors = [
    ".mobile-slider-five-col",
    ".mobile-slider-four-col",
    ".mobile-slider-three-col",
    ".mobile-slider-multi-row",
  ].join(",");

  function removeAosOnSmallScreens() {
    if (window.innerWidth < 768) {
      const $sliders = $(sliderSelectors);
      $sliders.each(function () {
        const $slider = $(this);
        if ($slider.attr("data-aos")) {
          $slider.removeAttr("data-aos");
        }
        $slider.find("[data-aos]").removeAttr("data-aos");
      });
    }
  }

  // run on load
  removeAosOnSmallScreens();

  // re-run on resize (debounced)
  let resizeTimer;
  $(window).on("resize", function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(removeAosOnSmallScreens, 150);
  });
});
