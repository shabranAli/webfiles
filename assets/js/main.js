$(document).ready(function() {

    /*===================================*
    01. LOADING JS
    /*===================================*/
    $(window).on('load', function() {
        setTimeout(function() {
            $(".preloader").delay(700).fadeOut(700);
        }, 800);
    });
    /*===================================*
        start window scroll
    /*===================================*/
    $(window).on('scroll', function() {
        var scroll = $(window).scrollTop();

        if (scroll >= 250) {
            $('nav.navbar').addClass('nav-fixed');
        } else {
            $('nav.navbar').removeClass('nav-fixed');
        }

    });
    /*===================================*
            end window scroll
        /*===================================*/


    // ####### start wow animtion effects ###################
    var wow = new WOW({
        boxClass: 'wow', // animated element css class (default is wow)
        animateClass: 'animated', // animation css class (default is animated)
        offset: 0, // distance to the element when triggering the animation (default is 0)
        mobile: true, // trigger animations on mobile devices (default is true)
        live: true, // act on asynchronously loaded content (default is true)
        callback: function(box) {
            // the callback is fired every time an animation is started
            // the argument that is passed in is the DOM node being animated
        },
        scrollContainer: null // optional scroll container selector, otherwise use window
    });
    wow.init();
    // ####### end wow animtion effects ###################
    // ################## start owl carousel #############


    $('#owl-carousel_1').owlCarousel({
        center: true,
        loop: true,
        margin: 10,
        nav: true,
        dots: true,
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 3
            },
            1000: {
                items: 5
            }
        }
    });
    $('#owl_center').owlCarousel({
        center: true,
        loop: true,
        margin: 10,
        nav: true,
        dots: true,
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 3
            },
            1000: {
                items: 5
            }
        }
    });
    $('#testimonial_1').owlCarousel({
        loop: true,
        margin: 10,
        nav: false,
        dots: true,
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 1
            },
            1000: {
                items: 2
            }
        }
    })
    $('#testimonial-carousel-2').owlCarousel({
        center: true,
        loop: true,
        autoplay: true,
        autoPlaySpeed: 500,
        margin: 0,
        nav: false,
        dots: false,
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 2
            },
            1000: {
                items: 2
            }
        }
    });
    $('#testimonial-carousel-3').owlCarousel({
        center: true,
        loop: true,
        autoplay: true,
        autoPlaySpeed: 800,
        smartSpeed: 1300,
        margin: 0,
        nav: true,
        dots: false,
        navText: ["<i class='fa fa-long-arrow-left'></i>", "<i class='fa fa-long-arrow-right'></i>"],
        animateOut: 'slideOutUp',
        animateIn: 'slideInUp',
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 1
            },
            1000: {
                items: 1
            }
        }
    });
    // ################### end owl carousel #################
    // ################### start morhing fancybox #################


    $.fn.fancyMorph = function(opts) {

        var Morphing = function($btn, opts) {
            var self = this;

            self.opts = $.extend({
                animationEffect: false,
                infobar: false,
                buttons: ['close'],
                smallBtn: false,
                touch: false,
                baseClass: 'fancybox-morphing',
                afterClose: function() {
                    self.close();
                }
            }, opts);

            self.init($btn);
        };

        Morphing.prototype.init = function($btn) {
            var self = this;

            self.$btn = $btn.addClass('morphing-btn');

            self.$clone = $('<div class="morphing-btn-clone" />')
                .hide()
                .insertAfter($btn);

            // Add wrapping element and set initial width used for positioning
            $btn.wrap('<span class="morphing-btn-wrap"></span>').on('click', function(e) {
                e.preventDefault();

                self.start();
            });

        };

        Morphing.prototype.start = function() {
            var self = this;

            if (self.$btn.hasClass('morphing-btn_circle')) {
                return;
            }

            // Set initial width, because it is not possible to start CSS transition from "auto"
            self.$btn.width(self.$btn.width()).parent().width(self.$btn.outerWidth());

            self.$btn.off('.fm').on("transitionend.fm webkitTransitionEnd.fm oTransitionEnd.fm MSTransitionEnd.fm", function(e) {

                if (e.originalEvent.propertyName === 'width') {
                    self.$btn.off('.fm');

                    self.animateBg();
                }

            }).addClass('morphing-btn_circle');

        };

        Morphing.prototype.animateBg = function() {
            var self = this;

            self.scaleBg();

            self.$clone.show();

            // Trigger repaint
            self.$clone[0].offsetHeight;

            self.$clone.off('.fm').on("transitionend.fm webkitTransitionEnd.fm oTransitionEnd.fm MSTransitionEnd.fm", function(e) {
                self.$clone.off('.fm');

                self.complete();

            }).addClass('morphing-btn-clone_visible');
        };

        Morphing.prototype.scaleBg = function() {
            var self = this;

            var $clone = self.$clone;
            var scale = self.getScale();
            var $btn = self.$btn;
            var pos = $btn.offset();

            $clone.css({
                top: pos.top + $btn.outerHeight() * 0.5 - ($btn.outerHeight() * scale * 0.5) - $(window).scrollTop(),
                left: pos.left + $btn.outerWidth() * 0.5 - ($btn.outerWidth() * scale * 0.5) - $(window).scrollLeft(),
                width: $btn.outerWidth() * scale,
                height: $btn.outerHeight() * scale,
                transform: 'scale(' + (1 / scale) + ')'
            });
        };

        Morphing.prototype.getScale = function() {
            var $btn = this.$btn,
                radius = $btn.outerWidth() * 0.5,
                left = $btn.offset().left + radius - $(window).scrollLeft(),
                top = $btn.offset().top + radius - $(window).scrollTop(),
                windowW = $(window).width(),
                windowH = $(window).height();

            var maxDistHor = (left > windowW / 2) ? left : (windowW - left),
                maxDistVert = (top > windowH / 2) ? top : (windowH - top);

            return Math.ceil(Math.sqrt(Math.pow(maxDistHor, 2) + Math.pow(maxDistVert, 2)) / radius);
        };

        Morphing.prototype.complete = function() {
            var self = this;
            var $btn = self.$btn;

            $.fancybox.open({
                src: $btn.data('src') || $btn.attr('href')
            }, self.opts);

            $(window).on('resize.fm', function() {
                //self.scaleBg();
            });
        };

        Morphing.prototype.close = function() {
            var self = this;
            var $clone = self.$clone;

            self.scaleBg();

            $clone.one('transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd', function(e) {
                $clone.hide();

                self.$btn.removeClass('morphing-btn_circle');
            });

            $clone.removeClass('morphing-btn-clone_visible');

            $(window).off('resize.fm');
        };

        // Init
        this.each(function() {
            var $this = $(this);

            if (!$this.data("morphing")) {
                $this.data("morphing", new Morphing($this, opts));
            }

        });

        return this;
    };


    // Step 2: Start using it!
    // =======================

    $("[data-morphing]").fancyMorph({
        hash: 'morphing'
    });

    // ################### end morhing fancybox #################
    // ################### start select option #################


    var x, i, j, selElmnt, a, b, c;
    /*look for any elements with the class "custom-select":*/
    x = document.getElementsByClassName("custom-select");
    for (i = 0; i < x.length; i++) {
        selElmnt = x[i].getElementsByTagName("select")[0];
        /*for each element, create a new DIV that will act as the selected item:*/
        a = document.createElement("DIV");
        a.setAttribute("class", "select-selected");
        a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
        x[i].appendChild(a);
        /*for each element, create a new DIV that will contain the option list:*/
        b = document.createElement("DIV");
        b.setAttribute("class", "select-items select-hide");
        for (j = 1; j < selElmnt.length; j++) {
            /*for each option in the original select element,
            create a new DIV that will act as an option item:*/
            c = document.createElement("DIV");
            c.innerHTML = selElmnt.options[j].innerHTML;
            c.addEventListener("click", function(e) {
                /*when an item is clicked, update the original select box,
                and the selected item:*/
                var y, i, k, s, h;
                s = this.parentNode.parentNode.getElementsByTagName("select")[0];
                h = this.parentNode.previousSibling;
                for (i = 0; i < s.length; i++) {
                    if (s.options[i].innerHTML == this.innerHTML) {
                        s.selectedIndex = i;
                        h.innerHTML = this.innerHTML;
                        y = this.parentNode.getElementsByClassName("same-as-selected");
                        for (k = 0; k < y.length; k++) {
                            y[k].removeAttribute("class");
                        }
                        this.setAttribute("class", "same-as-selected");
                        break;
                    }
                }
                h.click();
            });
            b.appendChild(c);
        }
        x[i].appendChild(b);
        a.addEventListener("click", function(e) {
            /*when the select box is clicked, close any other select boxes,
            and open/close the current select box:*/
            e.stopPropagation();
            closeAllSelect(this);
            this.nextSibling.classList.toggle("select-hide");
            this.classList.toggle("select-arrow-active");
        });
    }

    function closeAllSelect(elmnt) {
        /*a function that will close all select boxes in the document,
        except the current select box:*/
        var x, y, i, arrNo = [];
        x = document.getElementsByClassName("select-items");
        y = document.getElementsByClassName("select-selected");
        for (i = 0; i < y.length; i++) {
            if (elmnt == y[i]) {
                arrNo.push(i)
            } else {
                y[i].classList.remove("select-arrow-active");
            }
        }
        for (i = 0; i < x.length; i++) {
            if (arrNo.indexOf(i)) {
                x[i].classList.add("select-hide");
            }
        }
    }
    /*if the user clicks anywhere outside the select box,
    then close all select boxes:*/
    document.addEventListener("click", closeAllSelect);

    // ################### end select option #################
    // ################### start toggle menu button #################
    $('.toggle').click(function() {
        $('.toggle').toggleClass('active')
        $('.slidebar').toggleClass('active')
    });
    // ################### end toggle menu button #################
    // ################### start image effects title #################

    VanillaTilt.init(document.querySelectorAll(".image-effects1"), {
        max: 25,
        speed: 400
    });

    // ################### start image effects title #################
    // ################### start team members #################

    VanillaTilt.init(document.querySelectorAll(".title-effect"), {
        max: 25,
        speed: 400
    });
    // ################### end team members #################
    $('select .auto-width-select').change(function() {
        var text = $(this).find('option:selected').text()
        var $aux = $('<select/>').append($('<option/>').text(text))
        $(this).after($aux)
        $(this).width($aux.width())
        $aux.remove()
    }).change()

});