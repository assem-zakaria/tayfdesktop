/*
Website Name: KAII Lab | Creative Agency
Website URL: ?????????
Version: 1.0
Author: N/A
Author URL: N/A

1.  Basics
2.  Header
3.  Footer
4.  Elements
5.  Portfolio
6.  Pages
7.  Blog
8.  Transitions
9.  Media Quieries
*/



(function($){
"use strict";

$(document).ready(function() {


	var win_h 						= $(window).height(),
		win_w 						= $(window).width(),
		mouseX 						= win_w/2,
		mouseY 						= win_h/2,
		mouseNewX 					= win_w/2,
		mouseNewY 					= win_h/2,
		resizeTimer,
		scrollBar,
		is_desktop 					= true,
		is_small_desktop 			= false,
		is_tablet 					= false,
		is_mobile 					= false,
		is_full_screen				= $("html").hasClass("fullscreen"),
		is_full_width				= $("html").hasClass("fullwidth"),
		form_sending 				= false,
		overlayPath = document.querySelector('.overlay__path'),
		tayf_locmotive;

	//	Tayf Color Palette
		let tayf_pure_black		= "#000000",
			tayf_pure_white 	= "#ffffff",
			tayf_darker_white	= "#ececec",
			tayf_green 			= "#3d4d4d",
			tayf_brown 			= "#77655b",
			tayf_light_brown 	= "#d2c1b9";

	//	Body Transition
		let body_transition_duration = 1,
			body_transition_ease = Power3.easeOut;

	//	Scroll Section Targets
		var	section_who_we_are 	= document.querySelector('.who-we-are'),
			section_services 	= document.querySelector('.our-services'),
			section_projects 	= document.querySelector('.our-projects'),
			section_news 		= document.querySelector('.our-news');

	//	Global Timelines	(TLs needs to be global, since they are called in the scrollTrigger Function)
		var hero_appear_tl,
			who_we_are_TL,
			our_partners_text_appear_TL,
			our_services_text_appear_TL,
			our_services_colors_enter,
			our_services_colors_leave,
			our_services_rotating_logo_TL,
			your_opportunity_appear_TL,
			our_projects_text_appear_TL,
			our_mission_text_appear_TL,
			footer_appear_TL,
			our_values_text_appear_TL,
			our_news_text_appear_TL,
			our_news_colors_enter,
			our_news_colors_leave,
			crs_hero_TL,
			crs_how_we_can_TL,
			crs_guide_TL,
			crs_next_TL,
			crs_llvia_logo_TL;



		// Math Helpers Functions Object
	        const math_helpers = {
		        //	Range Conversion Style 1
		        	map: (x, a, b, c, d) => (x - a) * (d - c) / (b - a) + c,

		        //	Range Conversion Style 2
			        convertRange: (oldValue, oldRangeMin, oldRangeMax, newRangeMin, newRangeMax) => {
			        		var oldRange = oldRangeMax - oldRangeMin,
								newRange = newRangeMax - newRangeMin,
								newValue = (((Math.abs(oldValue) - oldRangeMin)*newRange)/oldRange + newRangeMin);

							return newValue;
			        },

		        // Linear Interpolation LERP
		        	lerp: (a, b, n) => (1 - n) * a + n * b,

		        // Random float
		        	getRandomFloat: (min, max) => (Math.random() * (max - min) + min).toFixed(2),

		        //	Clamp
		        	clamp: (num, min, max) => num <= min ? min : num >= max ? max : num,

	        	//	Throttle
	        		throttle: (method, scope, duration) => {		//	fire resize every 50, or ever 200, instead of high speed
	        			clearTimeout(method._tId);
					    method._tId= setTimeout(function(){
					        method.call(scope);
					    }, duration);
	        		},

	    		//	Debounce
	    			debounce: (method, delay) => {				//	dont show his writing text, untill he stops writing for 2sec
					    clearTimeout(method._tId);
					    method._tId= setTimeout(function(){
					        method();
					    }, delay);
	    			}
		    };



	// ----------------------
	// Global
	// ----------------------
		


		//	Images Loaded Preloading
			$('body').imagesLoaded().always( function( instance ) {
				// Drawing layouts after loading all images.
				draw(false);

				console.log("Images Loaded Done");

				//	Locomotive Object
					tayf_locmotive = new LocomotiveScroll({
						el: document.querySelector('.inner-body'),
						getSpeed: true,
						getDirection: true,
						lerp: 0.06,
						multiplier: 1.5,
						smooth: true,
						smartphone: {
							smooth: true
						},
						tablet: {
							smooth: true
						}
					});

					tayf_locmotive.stop();		// Disable locomotive from working

					gsap.registerPlugin(ScrollTrigger, DrawSVGPlugin, MotionPathPlugin);

					gsap.config({
					  autoSleep: 60,
					  force3D: true,
					  nullTargetWarn: false,
					  trialWarn: false,
					});

					//	Linking Locomotive Scroll with GSAP scrollTrigger and scrollerProxy
						tayf_locmotive.on("scroll", ScrollTrigger.update);
						ScrollTrigger.scrollerProxy(".inner-body", {
						  scrollTop(value) {
						    return arguments.length ? tayf_locmotive.scrollTo(value, 0, 0) : tayf_locmotive.scroll.instance.scroll.y;
						  }, 
						  getBoundingClientRect() {
						 return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
						  },
						  pinType: document.querySelector(".inner-body").style.transform ? "transform" : "fixed"
						});

						ScrollTrigger.defaults({  
						  scroller: '.inner-body'  
						})

						ScrollTrigger.addEventListener("refresh", () => tayf_locmotive.update());	// update things and refresh since pinning may added padding
						window.addEventListener('resize', () => ScrollTrigger.refresh());	

					//	Hide Scroll To Top Button If No Enough Scroll
						tayf_locmotive.on("scroll", function(argument) {

							//	tayf_locmotive.scroll.instance.limit.y howa le max scroll
							//	tayf_locmotive.scroll.instance.scroll.y howa el current scoll
							//	if current scoll is more than 10% of the total scroll, show eh scroll up button

							if (tayf_locmotive.scroll.instance.scroll.y > (tayf_locmotive.scroll.instance.limit.y * 10 / 100)) {
								$("button.scroll-up").removeClass('hidden-by-scroll');						
							} else {
								$("button.scroll-up").addClass('hidden-by-scroll');
							}

						});


				//	Barba Init
					barba.init({
						transitions: [
							{
								name: 'home-page-transition',
								to: {
									namespace: ['home-page']
								},
								beforeOnce(){
									console.log("Home Page beforeOnce")
									home_page_func();
									footer_func();
									home_page_scrollTrigger_objects();
									footer_scrollTrigger_objects();
									ScrollTrigger.refresh();	// (must)always refresh scrolltrigger after calling his objects
								},
								once(){
									console.log("Home Page once")
									setTimeout(function(){
										$("body").removeClass('hide_locomotive_scrollbar');
										$(".loader-overlay").addClass('hide_overlay');
										hero_appear_tl.play();
										tayf_locmotive.start();		// Allow locomotive to work
										custom_cursor();
									}, 1500);
								},
								before(){
									console.log("Home Page before");
								},
								beforeLeave(){
									console.log("Home Page beforeLeave");
								},
								async leave(data) {
									console.log("Home Page leave")
								  await barba_leave_animation();	//	make it sync, dont go to afterleave only if barba_leave_animation is done
								},
								afterLeave(){
									console.log("Home Page afterLeave");
								},
								beforeEnter(){
									console.log("Home Page beforeEnter");
								},
								enter(){
									console.log("Home Page enter");
								},
								afterEnter(){
									console.log("Home Page afterEnter");
									barba_enter_animation();
								},
								after() {
									console.log("Home Page after")
									$(document).off("mousemove");	// disable mousemove events from homepage
									$("body").removeClass('white-body');
									// ScrollTrigger.kill();
									tayf_locmotive.scrollTo(0,{
										duration: 0,
										'disableLerp': true,	// disable easing, so scrollTo is instant
										callback: function() {	// ba3d ma el loco ykoon top, 3ashan fe khelal el scrollTo 0 momken yefdal y check el scrotlltriggers
											console.log("Loco scrollTo Finished")
											tayf_locmotive.update();
											home_page_func();
											footer_func();
											home_page_scrollTrigger_objects();
											footer_scrollTrigger_objects();
											ScrollTrigger.refresh();
											//	update the selector, so locomotive can recognize locations of targets when footer nav are clicked
											section_who_we_are 	= document.querySelector('.who-we-are');
											section_services 	= document.querySelector('.our-services');
											section_projects 	= document.querySelector('.our-projects');
											section_news 		= document.querySelector('.our-news');
											hero_appear_tl.play();
											custom_cursor();
										}
									});
								}
							},
							{
								name: 'commercial-real-estate-page-transition',
								to: {
									namespace: ['crs-page']
								},
								beforeOnce(){
									console.log("CRS beforeOnce")
									crs_func();
									footer_func();
									crs_page_scrollTrigger_objects();
									footer_scrollTrigger_objects();
									ScrollTrigger.refresh();	// (must)always refresh scrolltrigger after calling his objects
								},
								once(){
									console.log("CRS once")
									setTimeout(function(){
										$("body").removeClass('hide_locomotive_scrollbar');
										$(".loader-overlay").addClass('hide_overlay');
										crs_hero_TL.play();
										tayf_locmotive.start();		// Allow locomotive to work
										custom_cursor();
									}, 1500);
								},
								before(){
									console.log("CRS before");
								},
								beforeLeave(){
									console.log("CRS beforeLeave");
								},
								// leave: () => barba_leave_animation(),// arrow function make it sync, wait for the animation to finish then proceed
								async leave(data) {
									console.log("CRS leave")
								  await barba_leave_animation();	//	dont go to afterleave only if barba_leave_animation is done
								},
								afterLeave(){
									console.log("CRS afterLeave");
								},
								beforeEnter(){
									console.log("CRS beforeEnter");
								},
								enter(){
									console.log("CRS enter");
								},
								afterEnter(){
									console.log("CRS afterEnter");
									barba_enter_animation();
								},
								after() {
									console.log("CRS after");
									$(document).off("mousemove");	// disable mousemove events from homepage
									$("body").removeClass('white-body');
									tayf_locmotive.scrollTo(0,{
										duration: 0,
										'disableLerp': true,	// disable easing, so scrollTo is instant
										callback: function() {	// ba3d ma el loco ykoon top, 3ashan fe khelal el scrollTo 0 momken yefdal y check el scrotlltriggers
											console.log("Loco scrollTo Finished")
											tayf_locmotive.update();
											crs_func();
											footer_func();
											crs_page_scrollTrigger_objects();
											footer_scrollTrigger_objects();
											ScrollTrigger.refresh();
											crs_hero_TL.play();
											custom_cursor();
										}
									});
									
								}
							}
						]
					});



			});

		//	Resizing Event
			$(window).resize(function() {

				win_h = $(window).height();
				win_w = $(window).width();

				clearTimeout(resizeTimer);	// tewa22afo el setTimeout ely ta7to da(draw every 100ms)
				resizeTimer = setTimeout(function() {
					draw(true);
				}, 100);

			});

		//	Custom Cursor
			$("a, button").hover(function() {
				gsap.to(".CC-1,.CC-2,.CC-3,.CC-4,.CC-5",
						{
							autoAlpha: 0,
							ease: Expo.easeOut,
							duration: 0.2,
							overwrite: true,
							stagger: {
								from: "end",
								amount: 1
							}
						}
					);

			}, function() {
				gsap.to(".CC-1,.CC-2,.CC-3,.CC-4,.CC-5",
						{
							autoAlpha: 1,
							ease: Expo.easeOut,
							duration: 0.2,
							overwrite: true,
							stagger: {
								from: "end",
								amount: 0.5
							}
						}
					);
			});
	


			function custom_cursor() {
				var x_value 			= null,
					y_value 			= null,
					custom_cursor_easing = "power3.easeOut";

				$(document).on('mousemove', function(event) {

					event.preventDefault();
					x_value = event.clientX;	// min = 0, max = win_w
					y_value = event.clientY;	// min = 0, max = win_h

					gsap.to(".CC-1", {
							duration: 0.3,
							ease: custom_cursor_easing,
							force3D: true,
							overwrite: "auto",
							x: x_value - 3,
							y: y_value - 3,
						});

					gsap.to(".CC-2", {
							duration: 0.5,
							// ease: custom_cursor_easing,
							force3D: true,
							overwrite: "auto",
							x: x_value - 2,
							y: y_value - 2,
						});

					gsap.to(".CC-3", {
							duration: 0.7,
							// ease: custom_cursor_easing,
							force3D: true,
							overwrite: "auto",
							x: x_value - 2,
							y: y_value - 2,
						});
					
					gsap.to(".CC-4", {
							duration: 0.9,
							// ease: custom_cursor_easing,
							force3D: true,
							overwrite: "auto",
							x: x_value - 2,
							y: y_value - 2,
						});

					gsap.to(".CC-5", {
							duration: 1.1,
							// ease: custom_cursor_easing,
							force3D: true,
							overwrite: "auto",
							x: x_value - 2,
							y: y_value - 2,
						});



					
				});

			}

		//	Barba Transition Animations (All Pages, no specific animation for each page)
			gsap.set(".barba-tr-lyrs svg",
					{
						xPercent: -25,
						autoAlpha: 0,
					}
				);

			gsap.set(".barba-tr-lyrs > div",
					{
						xPercent: -100
					}
				);


			const barba_leave_animation = () => {	//	This format makes it sync

				let br_leave_TL = gsap.timeline({paused: true});

				br_leave_TL.to(".barba-tr-lyrs > div, .barba-tr-lyrs svg",
						{
							duration:  1,
							xPercent: 0,
							autoAlpha: 1,
							ease: Power3.easeInOut,
							stagger:
							{
							    from: "start",
							    amount: 0.2,
						  	}
						}
					);



				return br_leave_TL.play();

			}

			const barba_enter_animation = () => {

				let br_enter_TL = gsap.timeline({paused: true});

				br_enter_TL.to(".barba-tr-lyrs > div, .barba-tr-lyrs svg",
						{
							duration: 1,
							xPercent: 100,
							autoAlpha: function(i, target, targets){
								console.log(target)
								if (target.tagName == "DIV") {	// law el layers, ana mosh 3awez 2a3mel 7aga fel autoAlpha aslan
									return;
								} else  {
									return 0;
								}
							},
							ease: Power3.easeInOut,
							stagger:
							{
							    from: "end",
							    amount: 0.2,
						  	},
						  	onComplete: function(){
						  		gsap.set(".barba-tr-lyrs > div",
						  				{
						  					xPercent: -100,
						  				}
						  			);
						  		gsap.set(".barba-tr-lyrs svg",
						  				{
						  					xPercent: -25,
						  				}
						  			);
						  	}
						}
					);

				return br_enter_TL.play();


			}

		//	Events

			//	Menu Button Click (All Pages)
				$("header button").click(function() {

					console.log("hero!!!")

					$("header").toggleClass('show_drop_menu');				

					$("button.scroll-up").toggleClass('hidden-by-drop-down');

					if ($("header").hasClass('show_drop_menu')) {
						$("body").addClass('hide_locomotive_scrollbar');
						$("header nav").addClass('enable-pointer-events');
						tayf_locmotive.stop();
			      		btn_letters_tl.timeScale(1).play();
			      		
			      		menu_down_tl.timeScale(1).play();
			      	} else {
			      		$("body").removeClass('hide_locomotive_scrollbar');
			      		$("header nav").removeClass('enable-pointer-events');
			      		tayf_locmotive.start();
			      		btn_letters_tl.timeScale(2.5).reverse();
			      		
			      		menu_down_tl.timeScale(4).reverse();	//	making the reverse animating with double speed, which means 2.5 x faster
			      	}

				});


			//	Event Footer Nav Click (All Pages)

				$("footer .footer-nav a").click(function(event) {

					console.log("footer NAV")

					if ($(this).hasClass('about')) {
						tayf_locmotive.scrollTo(section_who_we_are);
					} else if ($(this).hasClass('services')) {
						tayf_locmotive.scrollTo(section_services);
					} else if ($(this).hasClass('projects')) {
						tayf_locmotive.scrollTo(section_projects);
					} else if ($(this).hasClass('news')) {
						tayf_locmotive.scrollTo(section_news);
					}
				});

			//	Event Scroll To Top Button (All Pages)
				$("button.scroll-up").click(function(event) {
					tayf_locmotive.scrollTo(0,{duration: 500});
				});

			//	Menu (All Pages)
				gsap.set("header button p:nth-of-type(1) span",
								{
									y: "0%",
									autoAlpha: 1,
								}
							);

				gsap.set("header button p:nth-of-type(2) span",
								{
									y: "-100%",
									autoAlpha: 0,
								}
							);

				gsap.set("header .green-layer #g94",
						{
							attr: {
								cx: "380%"
							}
						}
					);

				gsap.set("nav ul li",
						{
							y: -100,
							autoAlpha: 0
						}
					);

				gsap.set("nav svg.islamic-shape",
						{
							scale: 0.2,
							autoAlpha: 0,
							rotation: 0
						}
					);



				let btn_letters_tl = gsap.timeline({paused: true});

					btn_letters_tl.to("header button p:nth-of-type(1) span",
								{
									duration: 2,
									y: "100%",
									autoAlpha: 0,
									ease: Expo.easeOut,
									stagger:
									{
									    from: "start",
									    amount: 0.15,
								  	}
								}
							);

					btn_letters_tl.to("header button p:nth-of-type(2) span",
								{
									duration: 2,
									y: "0%",
									autoAlpha: 1,
									ease: Expo.easeOut,
									stagger:
									{
									    from: "start",
									    amount: 0.15,
								  	}
								}, 0
							);

				let menu_down_tl = gsap.timeline({paused: true});

					//	Colored Layers
					menu_down_tl.to("header [class*='layer']",
								{
									duration: 1.5,
									y: 0,
									ease: Power3.easeInOut,
									stagger:
									{
									    from: "start",
									    amount: 0.3,
								  	}
								}
							);

					menu_down_tl.to("header nav",
								{
									duration: 1.5,
									y: 0,
									autoAlpha: 1,
									ease: Power3.easeInOut,
									overwrite: true,
									immediateRender: false
								}, 0.5
							);

					menu_down_tl.to("header .green-layer #g94",	// gradient
								{
									duration: 5,
									attr: {
										cx: "290%"
									},
									ease: Expo.easeOut,
									overwrite: true,
									immediateRender: false
								}, 0.5
							);

					menu_down_tl.to("nav ul li",
								{
									duration: 2.5,
									y: 0,
									autoAlpha: 1,
									ease: Expo.easeOut,
									stagger:
									{
									    from: "start",
									    amount: 0.4
								  	}
								}, 1.5
							);

					menu_down_tl.to("nav svg.islamic-shape",
								{
									duration: 6,
									scale: 1,
									autoAlpha: 0.05,
									x: "-50%",
									y: "-50%",
									rotation: 55,
									ease: Expo.easeOut,
								}, 1.5
							);

		//	Home Page Function
			function home_page_func() {

				console.log("Home Setter & TL");

				//	Events
					//	Event Hero Contact Us Link Hover (Home Page)
						$(".hero a").hover(function() {

							gsap.to("#g148",
								{
									duration: 3,
									ease: Expo.easeOut,
									overwrite: true,
									attr:{
										cx: "50%",
										r: "550%",
									},
								});


						}, function() {

							gsap.to("#g148",
								{
									duration: 2,
									ease: Expo.easeOut,
									overwrite: true,
									attr:{
										cx: "150%",
										r: "400%",
									},
								});

						});

					//	Event Our Services Links Hover (Home Page)
						var service_link_index = null;
						$(".our-services .service-item a").hover(function() {
							service_link_index = $(this).closest(".service-item").index();
							$(".our-services .services-icons svg").eq(service_link_index).addClass('hovered');
						}, function() {
							$(".our-services .services-icons svg").eq(service_link_index).removeClass('hovered');
						});

					//	Event Our News Link Hover (Home Page)
						$(".our-news .blog-post .post-text a").hover(function() {
							$(this).closest('.blog-post').find('.post-img a').addClass('hovered');
						}, function() {
							$(this).closest('.blog-post').find('.post-img a').removeClass('hovered');
						});

					//	Event Mouse Interaction (Home Page)
						function mouse_interaction() {
							var x_value 			= null,
								y_value 			= null,
								x_change 			= null,
								y_change 			= null,
								scale_change 		= null,
								opacity_change 		= null,
								rotation_change		= null,
								svg_gradient_cx_change = null,
								svg_gradient_cy_change = null,
								requestID,
								vertical_svg_change_value 	= 0.1*win_h,
								horizontal_svg_change_value	= 0.1*win_w,
								gradient_color = null;

							$(document).on('mousemove', function(event) {

								event.preventDefault();
								x_value = event.clientX;	// min = 0, max = win_w
								y_value = event.clientY;	// min = 0, max = win_h

								x_change = math_helpers.convertRange(x_value, 0, win_w, -horizontal_svg_change_value, horizontal_svg_change_value);
								y_change = math_helpers.convertRange(y_value, 0, win_h, -vertical_svg_change_value, vertical_svg_change_value);
								scale_change = math_helpers.convertRange(y_value, 0, win_h, 1, 1.5);
								opacity_change = math_helpers.convertRange(x_value, 0, win_w, 0, 1);
								rotation_change = math_helpers.convertRange(x_value, 0, win_h, -20, 20);
								svg_gradient_cx_change = math_helpers.convertRange(x_value, 0, win_w, 0, 100);
								svg_gradient_cy_change = math_helpers.convertRange(y_value, 0, win_h, 0, 100);


								//	Hero Circles
									gsap.to(".hero .large-rotating-logos", {
											duration: 1,
											x: x_change/5, 
											y: y_change/5,
										});

								//	Your Opportunity Circles
									gsap.to("#g465",0.5,
											{
												attr:{
													cx: svg_gradient_cx_change + "%",
													cy: svg_gradient_cy_change + "%"
												}
											});

									gsap.to("#g656",0.5,
											{
												attr:{
													cx: svg_gradient_cx_change + "%",
													cy: svg_gradient_cy_change + "%"
												}
											});

								//	Footer
									gsap.to("footer svg.footer-lines path", {
											duration: 1,
											x: x_change/3, 
											y: y_change/3,
											stagger:{
												from: "start",
												amount: 1
											}
										});

								// switch (true) {	//	true to be able to use boolean comparisons in cases
								//   case (0 < x_value && x_value < win_w/5):
								//     console.log("First Fifth From Left");
								//     gradient_color = "red";
								//     break;
								//   case (win_w/5 < x_value && x_value < (win_w*2/5)):
								//     console.log("Second Fifth");
								//     gradient_color = "blue";
								//     break;
								//   case ((win_w*2/5) < x_value && x_value < (win_w*3/5)):
								//     console.log("Third Fifth");
								//     gradient_color = "green";
								//     break;
								//   case ((win_w*3/5) < x_value && x_value < (win_w*4/5)):
								//     console.log("Fourth Fifth");
								//     gradient_color = "orange";
								//     break;
								//   case ((win_w*4/5) < x_value && x_value < win_w):
								//     console.log("Fifth Fifth, Last One");
								//     gradient_color = "pink";
								//     break;
								// }
								

							});

						}

						mouse_interaction();

				//	Split Text (Home Page)
					jQuery.each($('.hero h1, .who-we-are h2, .our-partners h2, .our-services h2, .your-opportunity h2, .our-projects h2, .our-news h2'), function(index, val) {
						$(this).splitText({
										'type':'words',
									});
					});

					jQuery.each($('.hero h1 .word-measure'), function(index, val) {
						$(this).splitText({
									'type':'letters',
								});
					});

				//	Hero Section (Home Page)
					var large_circle = $(".hero .large-rotating-logos .circle"),
						medium_circle = $(".hero .medium-rotating-logos .circle");

					function add_items_to_circle(num_of_items, circle_element) {

						var space = 360/num_of_items,
							image_source = null;

						if (circle_element.parent().hasClass('large-rotating-logos')) {
							image_source = "images/ferris_logo.svg";
						} else {
							image_source = "images/ferris_logo_stroked.svg";
						}


						for (var i = 0; i < num_of_items; i++){

							var large_circle_img = $("<img>", {
														src: image_source
													}).appendTo(circle_element);
							
							gsap.set(large_circle_img, 
										{
											rotation:i*space,
											opacity: 0,
										}
									);

						}   
					}

					add_items_to_circle(25, large_circle);
					add_items_to_circle(25, medium_circle);



					gsap.set($(".hero .large-rotating-logos .circle img, .hero .medium-rotating-logos .circle img"),
							{
								yPercent: 100,
								xPercent: 100,
								scale: 0.5,
								autoAlpha: 0,
							}
						);

					gsap.set(".hero .large-rotating-logos .full-logos-container .inner-wrapper svg",
						{
							xPercent: 250,
							autoAlpha: 0,
							rotationY: "-90deg",
							transformOrigin: "left center",
							force3D: true
						}
					);

					gsap.set(".hero h1 .letter-measure, .hero a, .hero p",
							{
								yPercent: -100,
								autoAlpha: 0
							}
						);

					gsap.set('.hero svg.hero-solid-circle',
							{
								width: "0vw",
							}
					);


					let large_circle_TL = gsap.timeline({paused: true});

						large_circle_TL.to($(".hero .large-rotating-logos .circle img"),
								{
									duration: 2,
									yPercent: 0,
									xPercent: 0,
									scale: 1,
									autoAlpha: 0.1,
									ease: Expo.easeOut,
									stagger:
									{
									    from: "start",
									    amount: 1,
								  	}
								}
							);

						large_circle_TL.to(large_circle, 
								{
									duration: 40,
									rotation: 360,  
									ease: Linear.easeNone,
									repeat: -1, // for infinity
								}, 0
								);


					let medium_circle_TL = gsap.timeline({paused: true});

						medium_circle_TL.to($(".hero .medium-rotating-logos .circle img"),
								{
									duration: 2,
									yPercent: 0,
									xPercent: 0,
									scale: 1,
									autoAlpha: 0.1,
									ease: Expo.easeOut,
									stagger:
									{
									    from: "start",
									    amount: 1,
								  	}
								}
							);

						medium_circle_TL.to(medium_circle, 
								{
									duration: 40,
									rotation: -360,  
									ease: Linear.easeNone,
									repeat: -1, // for infinity
								}, 0
								);


					let hero_full_logo_TL = gsap.timeline({paused: true});

						hero_full_logo_TL.to(".hero .large-rotating-logos .full-logos-container .inner-wrapper svg",
								{
									duration: 4,
									xPercent: function(i, target, targets){
											if (i == 0) {
												return 10;	//	3ashan el logo dakhel gowa ba3do, fa they should intersect, not 0%
											} else  {
												return -10;
											}
										},
									autoAlpha: 0.1,
									rotationY: "0deg",
									ease: Expo.easeOut,
									stagger:
									{
									    from: "start",
									    amount: 0.4,
								  	}
								}
							);

						

					hero_appear_tl = gsap.timeline({paused: true, delay: 1});

						hero_appear_tl.to(".hero svg.hero-solid-circle",
								{
									duration: 2,
									width: "33vw",
									ease: Expo.easeOut,
								}, 0
							);

						hero_appear_tl.to("#g148",
								{
									duration: 5,
									ease: Expo.easeOut,
									attr:{
										cx: "150%",
									}
								}, 0
									);

						hero_appear_tl.add(large_circle_TL.play(), 0).add(medium_circle_TL.play(), 0).add(hero_full_logo_TL.play(), 0);

						hero_appear_tl.to(".hero h1 .letter-measure",
								{
									duration: 2,
									yPercent: 0,
									autoAlpha: 1,
									force3D: true,
									ease: Expo.easeOut,
									stagger:
									{
									    from: "start",
									    amount: 0.4,
								  	}
								}, "<+=40%"
							);

						hero_appear_tl.to(".hero p",
								{
									duration: 2.5,
									yPercent: 0,
									autoAlpha: 1,
									ease: Expo.easeOut,
									stagger:
									{
									    from: "start",
									    amount: 1,
								  	}
								}, "<"
							);

						hero_appear_tl.to(".hero a",
								{
									duration: 2,
									yPercent: 0,
									autoAlpha: 1,
									ease: Expo.easeOut
								}, "<"
							);

				//	Who We Are Appear (Home Page)
					gsap.set(".who-we-are h2 .word-measure, .who-we-are p, .who-we-are .wwa-img",
						{
							autoAlpha: 0,
							x: -200
						}
					);


					who_we_are_TL = gsap.timeline({paused: true});

						who_we_are_TL.to(".who-we-are h2 .word-measure, .who-we-are p, .who-we-are .wwa-img",
								{
									duration: 4,
									x: 0,
									autoAlpha: 1,
									ease: Expo.easeOut,
									stagger:
									{
									    from: "start",
									    amount: 0.5,
								  	}
								}
							);

				//	Our Partners Appear (Home Page)
					gsap.set(".our-partners h2 .word-measure, .our-partners img",
						{
							autoAlpha: 0,
							x: -150
						}
					);


					our_partners_text_appear_TL = gsap.timeline({paused: true});

						our_partners_text_appear_TL.to(".our-partners h2 .word-measure, .our-partners img",
								{
									duration: 4,
									x: 0,
									autoAlpha: 1,
									ease: Expo.easeOut,
									stagger:
									{
									    from: "start",
									    amount: 0.5,
								  	}
								}
							);

				//	Our Services Appear (Home Page)
					gsap.set("body",
						{
							backgroundColor: tayf_green
						}
					);

					gsap.set(".our-services h2 .word-measure, .our-services h3, .our-services p, .our-services a",
						{
							autoAlpha: 0,
							x: -150
						}
					);

					our_services_text_appear_TL = gsap.timeline({paused: true});

						our_services_text_appear_TL.to(".our-services h2 .word-measure, .our-services h3, .our-services p, .our-services a",
								{
									duration: 4,
									x: "0",
									autoAlpha: 1,
									ease: Expo.easeOut,
									stagger:
									{
									    from: "start",
									    amount: 0.5,
								  	}
								}
							);

						our_services_text_appear_TL.to(".our-services .service-item .vertical-line",
								{
									duration: 4,
									height: "100%",
									x: "0%",
									ease: Expo.easeOut
								}, 1.5
							);

				//	Our Services Colors Enter/Leave Functions (Home Page)


					our_services_colors_enter = function () {

							$("body").addClass('white-body');

							gsap.to("body",
								{
									backgroundColor: tayf_darker_white,
									duration: body_transition_duration,
									ease: body_transition_ease,
									overwrite: true
								}
							);

							gsap.to(".who-we-are h2",
									{
										color: tayf_green,
										duration: body_transition_duration,
										ease: body_transition_ease,
										overwrite: "auto",
									}
								);

							gsap.to(".who-we-are p",
									{
										color: "black",
										duration: body_transition_duration,
										ease: body_transition_ease,
										overwrite: "auto",
									}
								);


							gsap.to(".our-partners h2",
									{
										color: tayf_green,
										duration: body_transition_duration,
										ease: body_transition_ease,
										overwrite: true,
									}
								);

							gsap.to(".our-services h2",
									{
										color: tayf_green,
										duration: body_transition_duration,
										ease: body_transition_ease
									}
								);

							gsap.to(".our-services .service-item h3, .our-services .service-item p",
									{
										color: tayf_pure_black,
										duration: body_transition_duration,
										ease: body_transition_ease
									}
								);

							gsap.to(".our-services .service-item a",
									{
										color: tayf_brown,
										duration: body_transition_duration,
										ease: body_transition_ease
									}
								);

							gsap.to(".our-services svg",
									{
										fill: tayf_pure_black,
										duration: body_transition_duration,
										ease: body_transition_ease
									}
								);

							gsap.to(".our-services svg.services-rotating-logo path",
									{
										stroke: tayf_green,
										duration: body_transition_duration,
										ease: body_transition_ease
									}
								);
					}


					our_services_colors_leave = function () {

							$("body").removeClass('white-body');

							gsap.to("body",
								{
									backgroundColor: tayf_green,
									duration: body_transition_duration,
									ease: body_transition_ease,
									overwrite: true
								}
							);

							gsap.to(".who-we-are h2",
									{
										color: tayf_pure_white,
										duration: body_transition_duration,
										ease: body_transition_ease,
										overwrite: "auto",
									}
								);

							gsap.to(".who-we-are p",
									{
										color: tayf_pure_white,
										duration: body_transition_duration,
										ease: body_transition_ease,
										overwrite: "auto",
									}
								);


							gsap.to(".our-partners h2",
									{
										color: tayf_darker_white,
										duration: body_transition_duration,
										ease: body_transition_ease,
										overwrite: true,
									}
								);

							gsap.to(".our-services h2",
									{
										color: tayf_light_brown,
										duration: body_transition_duration,
										ease: body_transition_ease
									}
								);

							gsap.to(".our-services .service-item h3, .our-services .service-item p",
									{
										color: tayf_darker_white,
										duration: body_transition_duration,
										ease: body_transition_ease
									}
								);

							gsap.to(".our-services .service-item a",
									{
										color: tayf_light_brown,
										duration: body_transition_duration,
										ease: body_transition_ease
									}
								);

							gsap.to(".our-services svg",
									{
										fill: tayf_pure_white,
										duration: body_transition_duration,
										ease: body_transition_ease
									}
								);

							gsap.to(".our-services svg.services-rotating-logo path",
									{
										stroke: tayf_light_brown,
										duration: body_transition_duration,
										ease: body_transition_ease
									}
								);
					}

				//	Our Services Rotating Y Letters Timeline (Home Page)
					let our_services_infinite_rotate_TL = gsap.timeline();

						our_services_infinite_rotate_TL.to(".our-services svg.services-rotating-logo",
								{
									rotation: 360, 
									duration: 40,
									ease: "linear",
									repeat: -1
								}
							);


					our_services_rotating_logo_TL = gsap.timeline({paused: true});

						our_services_rotating_logo_TL.fromTo(".our-services svg.services-rotating-logo path",
								{
									drawSVG: "50% 50%"
								},
								{
									drawSVG: "100%", 
									duration: 8,
									ease: Sine.easeOut,
								}
							);
						//	start the infinite rotation animation (our_services_infinite_rotate_TL) fast, then slow it to infninty

						our_services_rotating_logo_TL.add(gsap.fromTo(our_services_infinite_rotate_TL, {timeScale: 40}, {timeScale: 1, duration: 6}), 0);

				//	Your Opportunity Appear (Home Page)
					gsap.set(".your-opportunity .word-measure",
							{
								y: 100,
								rotateX: "-35deg",
								autoAlpha: 0,
								transformOrigin: "bottom center"
							}
						);

					gsap.set(".your-opportunity svg.yo-large-circle, .your-opportunity svg.yo-medium-circle, .your-opportunity svg.yo-small-circle",
							{
								width: "0vh",
								height: "0vh"
							}
						);

					gsap.set(".your-opportunity svg.rotating-rings path",
							{
								scale: 0
							}
						);


					your_opportunity_appear_TL = gsap.timeline({paused: true});

						your_opportunity_appear_TL.to(".your-opportunity svg.yo-large-circle",
								{
									duration: 1.2,
									width: "40vh",
									height: "40vh",
									ease: Power3.easeOut,
								}
							);

						your_opportunity_appear_TL.to(".your-opportunity svg.yo-medium-circle",
								{
									duration: 1.2,
									width: "30vh",
									height: "30vh",
									ease: Power3.easeOut,
								}, "<+0.1"
							);

						your_opportunity_appear_TL.to(".your-opportunity svg.yo-small-circle",
								{
									duration: 1.2,
									width: "20vh",
									height: "20vh",
									ease: Power3.easeOut,
								}, "<+0.1"
							);

						your_opportunity_appear_TL.to(".your-opportunity .word-measure",
								{
									duration: 3,
									y: "0",
									rotateX: "0deg",
									autoAlpha: 1,
									force3D: true,
									ease: Expo.easeOut,
									stagger:
									{
									    from: "start",
									    amount: 0.7,
								  	}
								}, "<+0.3"
							);

						your_opportunity_appear_TL.to(".your-opportunity svg.rotating-rings path",
								{
									duration: 2,
									scale: 1,
									ease: Expo.easeOut,
									stagger:
									{
									    from: "start",
									    amount: 0.6,
								  	}
								}, 0.2
							);

				//	Our Projects Appear (Home Page)
					gsap.set(".our-projects h2 .word-measure, .our-projects h3, .our-projects p, .our-projects a",
							{
								x: -150,
								autoAlpha: 0,
							}
						);


					gsap.set(".our-projects .project-item .project-number",
							{
								xPercent: -150,
								autoAlpha: 0
							}
						);


					our_projects_text_appear_TL = gsap.timeline({paused: true});

						our_projects_text_appear_TL.to(".our-projects h2 .word-measure",
								{
									duration: 4,
									x: "0",
									autoAlpha: 1,
									ease: Expo.easeOut,
									stagger:
									{
									    from: "start",
									    amount: 0.2,
								  	}
								}
							);

						our_projects_text_appear_TL.to(".our-projects h3, .our-projects p, .our-projects a",
								{
									duration: 4,
									x: "0",
									autoAlpha: 1,
									ease: Expo.easeOut,
									stagger:
									{
									    from: "start",
									    amount: 0.5,
								  	}
								}, 0
							);

						our_projects_text_appear_TL.to(".our-projects .project-item .project-number",
								{
									duration: 4,
									xPercent: 0,
									autoAlpha: 0.4,
									ease: Expo.easeOut,
									stagger:
									{
									    from: "start",
									    amount: 0.5,
								  	}
								}, "<"
							);

				//	Our Mission Statement Text/Circle Appear (Home Page)
					gsap.set(".our-mission h2, .our-mission p",
							{
								x: -200,
								autoAlpha: 0
							}
						);

					gsap.set(".our-mission svg.brown-bg-circle",
							{
								width: "0vw",
								height: "0vw"
							}
						);

					gsap.set(".our-mission svg.graph line, .our-mission svg.graph polyline",
							{
								drawSVG: 0
							}
						);


					our_mission_text_appear_TL = gsap.timeline({paused: true});

						our_mission_text_appear_TL.to(".our-mission h2, .our-mission p",
								{
									duration: 4,
									x: 0,
									autoAlpha: 1,
									ease: Expo.easeOut,
									stagger:
									{
									    from: "start",
									    amount: 0.1,
								  	}
								}
							);

						our_mission_text_appear_TL.to(".our-mission svg.graph line",
							{
								duration: 3,
								drawSVG: "100%",
								ease: Expo.easeOut,
								stagger: {
									from: "start",
									amount: 0.5
								}
							}, 0.2
						);

						our_mission_text_appear_TL.to(".our-mission svg.graph polyline",
							{
								duration: 4,
								drawSVG: "100%",
								ease: Power2.easeInOut,
							}, 0.2
						);

						our_mission_text_appear_TL.to(".our-mission svg.brown-bg-circle",
								{
									duration: 4,
									width: "100vw",
									height: "100vw",
									ease: Expo.easeOut,
								}, "<"
							);

				//	Our Values (Home Page)
					gsap.set(".our-values h2",
							{
								autoAlpha: 0,
								x: -200
							}
						);

					gsap.set(".our-values p:first-of-type",
							{
								autoAlpha: 0
							}
						);


					gsap.set(".our-values svg.ov-left-rotating-rings path , .our-values svg.ov-right-rotating-rings path",
						{
							scale: 0,
							transformOrigin: "center center",
						}
					);

					gsap.set(".our-values svg.centered-logo path",
						{
							// x: function () {
							// 	return gsap.utils.random(-500, 500, 5);
							// },
							y: function () {
								return gsap.utils.random(-800, -300, 100);
							},
							// scale: 0.5,
							autoAlpha: 0
						}
					);

					our_values_text_appear_TL	= gsap.timeline({paused: true});

					our_values_text_appear_TL.to(".our-values h2",
							{
								duration: 2,
								ease: Expo.easeOut,
								autoAlpha: 1,
								x: 0
							}
						);

					our_values_text_appear_TL.to(".our-values p:first-of-type",
							{
								duration: 4,
								ease: Expo.easeOut,
								autoAlpha: 1,
							}, 0
						);

				//	Our News Appear (Home Page)
					gsap.set(".our-news h2 .word-measure, .our-news .blog-post .post-img, .our-news .blog-post .post-text, .our-news .blog-post .post-tags",
						{
							y: 150,
							autoAlpha: 0,
						}
					);


					our_news_text_appear_TL = gsap.timeline({paused: true});

					our_news_text_appear_TL.to(".our-news h2 .word-measure, .our-news .blog-post .post-img, .our-news .blog-post .post-text, .our-news .blog-post .post-tags",
							{
								duration: 4,
								y: 0,
								autoAlpha: 1,
								ease: Expo.easeOut,
								stagger:
								{
								    from: "start",
								    amount: 1,
							  	}
							}
						);


						//	Body/Font Color Changing Function

						///////////////////////
							our_news_colors_enter = function () {

								$("body").addClass('white-body');

								gsap.to("body",
									{
										backgroundColor: tayf_darker_white,
										duration: body_transition_duration,
										ease: body_transition_ease,
										overwrite: true
									}
								);

								gsap.to(".our-news h2 .word-measure",
										{
											color: tayf_green,
											duration: body_transition_duration,
											ease: body_transition_ease,
											overwrite: "auto"
										}
									);

								gsap.to(".our-news .blog-post .post-text h5, .our-news .blog-post .post-text p.post-summary, .our-news .blog-post .post-text p.post-summary a, .our-news .blog-post .post-meta p",
										{
											color: tayf_pure_black,
											duration: body_transition_duration,
											ease: body_transition_ease,
											overwrite: "auto"
										}
									);


								gsap.to(".our-mission svg.brown-bg-circle stop:nth-of-type(1)",
										{
											duration: body_transition_duration,
											ease: body_transition_ease,
											overwrite: "auto",
											attr:{
												"stop-color": "#ffffff"
											}
										}
									);

							}

							our_news_colors_leave = function () {

								$("body").removeClass('white-body');

								gsap.to("body",
									{
										backgroundColor: tayf_green,
										duration: body_transition_duration,
										ease: body_transition_ease,
										overwrite: true
									}
								);


								gsap.to(".our-news h2 .word-measure",
										{
											color: tayf_light_brown,
											duration: body_transition_duration,
											ease: body_transition_ease,
											overwrite: "auto"
										}
									);

								gsap.to(".our-news .blog-post .post-text h5, .our-news .blog-post .post-text p.post-summary, .our-news .blog-post .post-text p.post-summary a, .our-news .blog-post .post-meta p",
										{
											color: tayf_pure_white,
											duration: body_transition_duration,
											ease: body_transition_ease,
											overwrite: "auto"
										}
									);

								gsap.to(".our-mission svg.brown-bg-circle stop:nth-of-type(1)",
										{
											duration: body_transition_duration,
											ease: body_transition_ease,
											overwrite: "auto",
											attr:{
												"stop-color": "#3d4d4d"
											}
										}
									);

						

					}
			
			}

		//	Commercial Real Estate Function
			function crs_func() {

				console.log("CRS setter and TL")

				gsap.set("body", 
						{
							backgroundColor: tayf_green
						}
					);

				gsap.set(".crs-hero h1, .crs-hero p, .crs-hero a",
						{
							x: -150,
							autoAlpha: 0
						}
					);

				gsap.set(".crs-hero svg.rotating-logos path",
						{
							scale: 0,
							autoAlpha: 0
						}
					);

				gsap.set(".crs-process h2, .crs-process p, .crs-process .item-img",
						{
							x: -150,
							opacity: 0
						}
					);

				gsap.to(".crs-process .process-item .text svg",
						{
							scale: 0.1,
							autoAlpha: 0
						}
					);


				gsap.to(".crs-process .process-item .text svg g path",
						{
							scale: 6,
							transformOrigin: "center center"
						}
					);


				gsap.set(".crs-how h2", 
						{
							x: -150,
							autoAlpha: 0
						}
					);

				gsap.set(".crs-how .how-item h5", 
						{
							yPercent: -50,
							autoAlpha: 0
						}
					);

				gsap.set(".crs-how .how-item img",
						{
							scale: 0.2,
							autoAlpha: 0
						}
					);

				gsap.set(".crs-guide h2, .crs-guide .guides-container .item",
						{
							x: -150,
							autoAlpha: 0
						}
					);

				gsap.set(".crs-guide svg path",
						{
							scale: 0.5,
							transformOrigin: "center center",
							autoAlpha: 0
						}
					);

				jQuery.each($('.crs-next h2'), function(index, val) {
						$(this).splitText({
										'type':'letters',
									});
					});

				gsap.set(".crs-next h2 .letter-measure, .crs-next a",
						{
							y: 100,
							autoAlpha: 0
						}
					);

				gsap.set(".crs-latest-project h2,.crs-latest-project h3, .crs-latest-project p, .crs-latest-project a",
						{
							x: -150,
							autoAlpha: 0
						}
					);

				gsap.set(".crs-latest-project svg.llivia-stroked-logo",
						{
							autoAlpha: 0,
							rotation: "180deg",
						}
					);


				crs_hero_TL = gsap.timeline({paused: true, delay: 0.8});

				crs_hero_TL.to($(".crs-hero h1, .crs-hero p, .crs-hero a"),
						{
							duration: 3.5,
							x: 0,
							autoAlpha: 1,
							ease: Expo.easeOut,
							stagger:
							{
							    from: "start",
							    amount: 1,
						  	}
						}
					);

				crs_hero_TL.to($(".crs-hero svg.rotating-logos path"),
						{
							duration: 4,
							scale: 1,
							autoAlpha: 1,
							ease: Expo.easeOut,
							stagger:
							{
							    from: "start",
							    amount: 0.7,
						  	}
						}, 0
					);

				crs_how_we_can_TL = gsap.timeline({paused: true});

				crs_how_we_can_TL.to(".crs-how h2",
						{
							duration: 3.5,
							x: 0,
							autoAlpha: 1,
							ease: Expo.easeOut,
							stagger:
							{
							    from: "start",
							    amount: 1,
						  	}
						}
					);

				crs_how_we_can_TL.to(".crs-how .how-item h5",
						{
							delay: 0.5,
							duration: 2,
							yPercent: 0,
							autoAlpha: 1,
							ease: Expo.easeOut,
							stagger:
							{
							    from: "start",
							    amount: 0.5,
						  	}
						}, 0
					);

				crs_how_we_can_TL.to(".crs-how .how-item img",
						{
							delay: 0.5,
							duration: 6,
							scale: 1,
							autoAlpha: 0.1,
							ease: Expo.easeOut,
							force3D: true,
							stagger:
							{
							    from: "start",
							    amount: 0.5,
						  	}
						}, 0
					);

				crs_guide_TL = gsap.timeline({paused: true});

				crs_guide_TL.to(".crs-guide h2, .crs-guide .guides-container .item",
						{
							delay: 0.3,
							duration: 3.5,
							x: 0,
							autoAlpha: 1,
							ease: Expo.easeOut,
							stagger:
							{
							    from: "start",
							    amount: 0.5,
						  	}
						}
					);

				crs_guide_TL.to(".crs-guide svg path",
						{
							duration: 1.5,
							scale: 1,
							autoAlpha: 1,
							ease: Expo.easeOut,
							stagger:
							{
							    from: "start",
							    amount: 0.5,
						  	}
						}, 0
					);

				crs_next_TL = gsap.timeline({paused: true});

				crs_next_TL.to($(".crs-next h2 .letter-measure, .crs-next a"),
						{
							duration: 2,
							y: 0,
							autoAlpha: 1,
							ease: Expo.easeOut,
							stagger:
							{
							    from: "start",
							    amount: 0.3,
						  	}
						}
					);

				crs_llvia_logo_TL = gsap.timeline({paused: true});

				crs_llvia_logo_TL.to(".crs-latest-project h2,.crs-latest-project h3, .crs-latest-project p, .crs-latest-project a",
						{
							x: 0,
							autoAlpha: 1,
							duration: 2,
							ease: Expo.easeOut,
							stagger: {
								from: "start",
								amount:0.5
							}
						}
					);

				crs_llvia_logo_TL.to($(".crs-latest-project svg.llivia-stroked-logo"),
						{
							duration: 4,
							autoAlpha: 0.2,
							rotation: "0deg",
							ease: Expo.easeOut,
						}, 0
					);

			}

		//	Footer Function
			function footer_func() {

				console.log("Footer Setter and TL")

				//	Footer Appear (All Pages)
				gsap.set("footer svg.footer-lines path",
						{
							drawSVG: "0%"
						},
					);

				gsap.set("footer h2, footer form, footer ul, footer p",
						{
							y: 150,
							autoAlpha: 0,
						}
					);


				footer_appear_TL = gsap.timeline({paused: true});

					footer_appear_TL.to("footer h2, footer form, footer ul, footer p",
							{
								duration: 4,
								y: 0,
								autoAlpha: 1,
								ease: Expo.easeOut,
								stagger:
								{
								    from: "start",
								    amount: 0.7,
							  	}
							}
						);

					footer_appear_TL.to("footer svg.footer-lines path",
							{
								duration: 6,
								drawSVG: "100%",
								ease: Power3.easeOut,
								stagger:
								{
								    from: "start",
								    amount: 0.5,
							  	}
							}, 0.2
						);

			}


		//	VIP:  locotmoive smooth scroll container (inner-body), its height depend on the loading contents, so dont create locomotive object, unless all imagesloaded are done, ALSO,,,	 gsap scroll trigger and scrollerproxy, depeneds on locomotive, so the linking function, and any scrolltrigger object, should be created after all imagesloaded and locomotive stuff are being calculated totalty




		//	Home Page Scroll Trigger Objects
			function home_page_scrollTrigger_objects() {

				console.log("Home ScrollTrigger")

				//	Who We Are (Home Page)
					ScrollTrigger.create({
						// markers: true,
						scroller: ".inner-body",
						trigger: ".who-we-are h2",
						start: "top 100%",
						end: "bottom 0%",
						onEnter: function(){
							who_we_are_TL.play();
						}
					});

				//	Our Partners Text Appear (Home Page)
					ScrollTrigger.create({
						// markers: true,
						scroller: ".inner-body",
						trigger: ".our-partners",
						start: "20% 80%",
						end: "bottom 0%",
						onEnter: function() { 
							// console.log("Partners Enter");
							our_partners_text_appear_TL.play();
							our_services_colors_enter();
						}, 
						onEnterBack: function() {
							// console.log("Partners Enter Back"); 
							// our_services_colors_enter();
						},
						onLeave: function(direction) {
							// console.log("Partners Leave");
							// our_services_colors_leave();
						},
						onLeaveBack: function(direction) {
							// console.log("Partners Leave Back");
							our_services_colors_leave(-1);
						},
					});

				//	Our Services Text Appear (Home Page)
					ScrollTrigger.create({
						// markers: true,
						scroller: ".inner-body",
						trigger: ".our-services",
						start: "20% 80%",
						end: "bottom 0%",
						onEnter: function() { 
							our_services_text_appear_TL.play();
							our_services_rotating_logo_TL.play();
						}, 
					});

				//	Our Services Body and Font Change (Home Page)
					ScrollTrigger.create({
						// markers: true,
						scroller: ".inner-body",
						trigger: ".our-services",
						start: "40% 80%",		// element trigger start and end are the same
						end: "40% 30%",
						onEnter: function() { 
							// console.log("Services Enter");
							// our_services_colors_enter();
						}, 
						onEnterBack: function() {
							// console.log("Services Enter Back"); 
							our_services_colors_enter();
						},
						onLeave: function(direction) {
							// console.log("Services Leave");
							our_services_colors_leave();
						},
						onLeaveBack: function(direction) {
							// console.log("Services Leave Back");
							// our_services_colors_leave(-1);
						},
					});

				//	Your Opportunity Appear (Home Page)
					ScrollTrigger.create({
						// markers: true,
						scroller: ".inner-body",
						trigger: ".your-opportunity h2",
						start: "0% 80%",
						end: "100% 0%",
						onEnter: function() { 
							// console.log("Your Opportunity Enter");
							your_opportunity_appear_TL.play();
						}, 
						onEnterBack: function() {
							// console.log("Your Opportunity Enter Back"); 
						},
						onLeave: function(direction) {
							// console.log("Your Opportunity Leave");
						},
						onLeaveBack: function(direction) {
							// console.log("Your Opportunity Leave Back");
						},
					});

					// Scrub

						let oppurt_ring_scrub_TL = gsap.timeline({paused: true});

							oppurt_ring_scrub_TL.to(".your-opportunity svg.rotating-rings",
									{
										rotation: 1080,
									}
								);

						ScrollTrigger.create({
							// markers: true,
							scroller: ".inner-body",
							trigger: ".inner-body",
							scrub: true,
							animation: oppurt_ring_scrub_TL
						});

				//	Our Projects Text Appear (Home Page)
					ScrollTrigger.create({
						// markers: true,
						scroller: ".inner-body",
						trigger: ".our-projects",
						start: "30% 70%",
						end: "bottom 0%",
						onEnter: function() { 
							our_projects_text_appear_TL.play();
						}, 
					});

				//	Our Mission Statement Appear (Home Page)
					ScrollTrigger.create({
						// markers: true,
						scroller: ".inner-body",
						trigger: ".our-mission",
						start: "20% 80%",
						onEnter: function() { 
							// console.log("Services Enter");
							our_mission_text_appear_TL.play();
						}, 
						onEnterBack: function() {
							// console.log("Services Enter Back"); 
						},
						onLeave: function(direction) {
							// console.log("Services Leave");
						},
						onLeaveBack: function(direction) {
							// console.log("Services Leave Back");
						},
					});

				//	Our Values (Home Page)
					let	values_paragraphs 	= gsap.utils.toArray('.our-values p'),
						totalDuration 		= win_h*4*values_paragraphs.length,
						singleDuration 		= totalDuration / values_paragraphs.length;

					//	Text Appear
						ScrollTrigger.create({
							// markers: true,
							invalidateOnRefresh: true,
							scroller: ".inner-body",
							trigger: ".our-values",
							start: "top 80%",
							animation: our_values_text_appear_TL
						});



					//	Paraghraphs Scrub
						ScrollTrigger.saveStyles(".our-values, .values-layers");

						ScrollTrigger.matchMedia({
							"(min-width : 1024px)": () => {


							let our_values_scrub_timeline_FW = gsap.timeline({paused: true});

							   our_values_scrub_timeline_FW.to(".our-values .values-layers",
											{
												x: -(win_w - 200)*3,
											}
										);

							   our_values_scrub_timeline_FW.to(".our-values svg.ov-left-rotating-rings",
												{
													rotation: -720,
												}, 0
											);

								our_values_scrub_timeline_FW.to(".our-values svg.ov-right-rotating-rings",
												{
													rotation: 720,
												}, 0
											);

								our_values_scrub_timeline_FW.to(".our-values svg.centered-logo path",
												{
													// x: 0,
													y: 0,
													autoAlpha: 1,
													// scale: 1
												}, 0
											);


							let scale_values_rings_TL = gsap.timeline({paused: true});

								scale_values_rings_TL.to(".our-values svg.ov-left-rotating-rings path, .our-values svg.ov-right-rotating-rings path",
										{
											scale: 1,
											duration: 3,
											ease: Expo.easeOut,
											immediateRender: true,
											overwrite: true
										}
									);

							ScrollTrigger.create({
									// markers: true,
									invalidateOnRefresh: true,
									scroller: ".inner-body",
									trigger: ".our-values",
									start: "top 15%",
									end: "+=" + singleDuration,
									animation: our_values_scrub_timeline_FW,
									pin: true,
									pinSpacing: true,
									scrub: 1,
									onEnter: function() {
										scale_values_rings_TL.play();
									},
									onEnterBack: function() {
										scale_values_rings_TL.play();
									},
									onLeave: function() {
										scale_values_rings_TL.reverse();
									},
									onLeaveBack: function() {
										scale_values_rings_TL.reverse();
									}
								});


						  },
						  "(max-width : 1024px)": () => {
						    let our_values_paraghraph_scrub_timeline_Mobile = gsap.timeline(
						    			{
						    				scrollTrigger:
						    					{
					    							// markers: true,
													scroller: ".inner-body",
													invalidateOnRefresh: true,
													trigger: ".our-values",
													start: "top 30%",
													end: "+=" + singleDuration,
													pin: true,
													pinSpacing: true,
													scrub: 1,
						    					}
						    			});


									    our_values_paraghraph_scrub_timeline_Mobile
											.to(".our-values .values-layers",
												{
													x: -(win_w - 60)*3,
												}
											);



						  }
						});

				//	Our News Text Appear (Home Page)
					ScrollTrigger.create({
						// markers: true,
						scroller: ".inner-body",
						trigger: ".our-news",
						start: "20% 90%",
						onEnter: function() { 
							// console.log("Services Enter");
							our_news_text_appear_TL.play();
						}, 
						onEnterBack: function() {
							// console.log("Services Enter Back"); 
						},
						onLeave: function(direction) {
							// console.log("Services Leave");
						},
						onLeaveBack: function(direction) {
							// console.log("Services Leave Back");
						},
					});

				//	Our News Body/Color Change (Home Page)
					ScrollTrigger.create({
						// markers: true,
						scroller: ".inner-body",
						trigger: ".our-news",
						start: "20% 50%",
						end: "80% 50%",
						onEnter: function() { 
							console.log("Blog Enter");
							our_news_colors_enter();
						}, 
						onEnterBack: function() {
							console.log("Blog Enter Back"); 
							our_news_colors_enter();
						},
						onLeave: function(direction) {
							console.log("Blog Leave");
							our_news_colors_leave();
						},
						onLeaveBack: function(direction) {
							console.log("Blog Leave Back");
							our_news_colors_leave();
						},
					});

			}

		//	CRS Scroll Trigger Object
			function crs_page_scrollTrigger_objects() {

				console.log("CRS ScrollTrigger")

				function animate_process_item(elem) {

					gsap.to(elem.querySelectorAll("h2, p, .item-img"),
							{
								duration: 3,
								x: 0,
								opacity: 1,
								ease: Expo.easeOut,
								stagger: {
									from: "start",
									amount: 0.2
								}
							}
						);

					gsap.to(elem.querySelectorAll(".crs-process .process-item .text svg"),
							{
								duration: 3,
								scale: 1,
								autoAlpha: 0.07,
								ease: Expo.easeOut,
							}
						);


					gsap.to(elem.querySelectorAll(".crs-process .process-item .text svg g path"),
							{
								duration: 2,
								scale: 1,
								ease: Expo.easeOut,
								stagger: {
									from: "start",
									amount: 0.2
								}
							}
						);

					

				}

				gsap.utils.toArray(".crs-process .process-item").forEach(function(elem) {

					ScrollTrigger.create({
						// markers: true,
						scroller: ".inner-body",
						trigger: elem,
						start: "20% 70%",
						end: "100% 0%",
						onEnter: function() { 
							elem.classList.add("in-view");
							animate_process_item(elem);

							console.log("CRS Process In View")
						}, 
					});
				});

				//	Process Text SVG Rotation Srub
					gsap.to('.crs-process .process-item .text svg', {
						scrollTrigger: {
							// markers: true,
							trigger: ".inner-body",
							scroller: ".inner-body",
							scrub: true,
						},
						rotation: -180,
					});

				//	Hero Logo Rotate Scrub
					gsap.to('.crs-hero svg.rotating-logos', {
						scrollTrigger: {
							// markers: true,
							trigger: ".inner-body",
							scroller: ".inner-body",
							scrub: true,
						},
						rotation: 180,
					});

				//	How We Can Help
					ScrollTrigger.create({
						// markers: true,
						scroller: ".inner-body",
						trigger: ".crs-how",
						start: "20% 70%",
						end: "bottom 0%",
						onEnter: function(){

							crs_how_we_can_TL.play();

							console.log("CRS How In View")
						}
					});

				//	Guide
					ScrollTrigger.create({
						// markers: true,
						scroller: ".inner-body",
						trigger: ".crs-guide",
						start: "20% 70%",
						end: "bottom 0%",
						onEnter: function(){
							crs_guide_TL.play();
							console.log("CRS Guide In View")
						}
					});


					gsap.to('.crs-guide svg', {
						scrollTrigger: {
							// markers: true,
							trigger: ".inner-body",
							scroller: ".inner-body",
							scrub: true,
						},
						rotation: 1440,
					});




				//	Latest Project
					ScrollTrigger.create({
						// markers: true,
						scroller: ".inner-body",
						trigger: ".crs-latest-project",
						start: "20% 70%",
						end: "bottom 0%",
						onEnter: function(){
							crs_llvia_logo_TL.play();
							console.log("CRS Latest Project In View")
						}
					});



				//	Next
					ScrollTrigger.create({
						// markers: true,
						scroller: ".inner-body",
						trigger: ".crs-next",
						start: "20% 70%",
						end: "bottom 0%",
						onEnter: function(){
							crs_next_TL.play();
							console.log("CRS Next In View")
						}
					});


			}

		//	Footer Scroll Trigger Object
			function footer_scrollTrigger_objects() {

				console.log("Footer ScrollTrigger")

				//	Footer Text Appear (All Pages)
					ScrollTrigger.create({
						// markers: true,
						scroller: ".inner-body",
						trigger: "footer",
						start: "20% 80%",
						end: "100% 0%",
						onEnter: function() { 
							// console.log("Services Enter");
							footer_appear_TL.play();
						}, 
					});
			}





	/*
	===========================================================
	===========================================================
		Functions
	===========================================================
	===========================================================
	*/

		// Drawing layouts after loading all images.
			function draw(resize = false) {


				// ----------------------
				// Global
				// ----------------------
					win_h 			= $(window).height();
					win_w 			= $(window).width();


					if(win_w > 1680) {
						console.log("Device:: Wide Desktop");
						is_desktop 			= true;
						is_small_desktop 	= false;
						is_tablet 			= false;
						is_mobile 			= false;
					}
					else if(win_w <= 1680 && win_w > 1300) {
						console.log("Device:: Small Desktop");
						is_desktop 			= false;
						is_small_desktop 	= true;
						is_tablet 			= false;
						is_mobile 			= false;
					}
					else if(win_w <= 1300 && win_w > 1024) {
						console.log("Device:: Tablet");
						is_desktop 			= false;
						is_small_desktop 	= false;
						is_tablet 			= true;
						is_mobile 			= false;
					}
					else if(win_w <= 1024) {
						console.log("Device:: Mobile");
						is_desktop 			= false;
						is_small_desktop 	= false;
						is_tablet 			= false;
						is_mobile 			= true;
					}

			}

		


});
})(jQuery);