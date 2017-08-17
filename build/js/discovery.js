module.exports = {
    sw: require('swiper'),
    fsv: require('./fullscreenVideo.js'),
    lql: require('./localQueryLinks.js'),
    newElement: require('./newElement.js').newElement,
    toggleClass: require('./toggleClass.js'),
    queryParser: require('./queryParser.js'),

    preInit() {
        window.discovery = this;
        this.container = this.newElement({
            name: 'div',
            id: 'discovery',
            className: 'swiper-container',
            appendTo: document.body,
        });

        this.wrapper = this.newElement({
            name: 'div',
            className: 'swiper-wrapper',
            appendTo: this.container,
        });

        this.pagination = this.newElement({
            name: 'div',
            className: 'swiper-pagination',
            appendTo: this.container,
        });

        this.prevButton = this.newElement({
            name: 'div',
            className: 'swiper-button-prev swiper-button-white',
            appendTo: this.container,
        });
        this.prevButton.onclick = function(){
            window.ga('send', {
                hitType: 'event',
                eventCategory: 'Slide',
                eventAction: 'prev-button-clicked',
                eventLabel: 'Our Gainesville'
            });
        };

        this.nextButton = this.newElement({
            name: 'div',
            className: 'swiper-button-next swiper-button-white',
            appendTo: this.container,
        });
        this.nextButton.onclick = function(){
            window.ga('send', {
                hitType: 'event',
                eventCategory: 'Slide',
                eventAction: 'next-button-clicked',
                eventLabel: 'Our Gainesville'
            });
        };

        this.slides = [];

        // this.initSwiper();
        this.touchHandler.init(this);

        const self = this;
        window.addEventListener('wheel', (e) => {
            const activeSlide = self.slides[self.swiper.activeIndex];
            if (activeSlide.content !== undefined) {
                const toggleOnCondition = !activeSlide.contentOn && e.wheelDeltaY < -50 && activeSlide.content.scrollTop === 0;
                const toggleOffCondition = activeSlide.contentOn && e.wheelDeltaY > 50 && activeSlide.content.scrollTop === 0;
                if (toggleOnCondition){
                    window.ga('send', {
                        hitType: 'event',
                        eventCategory: 'Slide',
                        eventAction: 'vertical-scroll-open',
                        eventLabel: 'Our Gainesville'
                    });
                }
                if (toggleOffCondition){
                    window.ga('send', {
                        hitType: 'event',
                        eventCategory: 'Slide',
                        eventAction: 'vertical-scroll-close',
                        eventLabel: 'Our Gainesville'
                    });
                }
                if (toggleOnCondition || toggleOffCondition) {
                    activeSlide.toggleContent(2);
                }
            }
        });

        // initliaze fullscreen video plugin
        this.fsv.init(this.container);
    },

    postInit() {
        this.initSwiper();

        // route to proper story if in url paramater
        const queryObj = this.queryParser(window.location.search);
        if(queryObj !== null)
            this.slideTo(queryObj.s);
    },

    addSlide(config) {
        const self = this;

        // creating base elements
        const slide = this.newElement({
            name: 'div',
            className: 'swiper-slide',
            attrs: {
                'data-hash': config.name,
            },
            appendTo: this.wrapper,
        });

        const cover = this.newElement({
            name: 'div',
            className: 'slide-cover',
            appendTo: slide,
        });

        cover.addEventListener('click', (e) => {
            const pageWidth = window.innerWidth;
            if (e.clientX > pageWidth / 2) { self.swiper.slideNext(true, 150); } else { self.swiper.slidePrev(true, 150); }
        });

        const coverBkgnd = this.newElement({
            name: 'div',
            className: 'slide-cover-bkgnd',
            appendTo: cover,
        });

        // creating base properties
        const contentOn = false;
        const translationY = 100;


        // creating base functionction
        const setTranslateY = function (val) {
            val = Math.round(val);
            const translateString = `translate(0, ${val}%)`;
            this.content.style.webkitTransform = translateString;
            this.content.style.MozTransform = translateString;
            this.content.style.msTransform = translateString;
            this.content.style.OTransform = translateString;
            this.content.style.transform = translateString;
            this.translationY = val;
        };

        const loadContent = function() {
            if(this.content !== undefined && !this.contentLoaded){
                this.content.innerHTML = this.contentHTML;
                this.contentLoaded = true;

                // resize the videos
                window.longform.rv.resize();

                // handle local query links
                self.lql.reroute(self.handleLocalQueryLink());
            }
        };

        const openContent = function (speed) {
            this.loadContent();

            const startValue = this.translationY;
            const totalChange = 0 - startValue;
            const overflow = 'scroll';

            if (speed !== undefined) {
                this.animateContent(startValue, totalChange, overflow, speed);
            } else {
                this.setTranslateY(0);
                this.content.scrollTop = 0;
                this.content.style.overflowY = overflow;
            }

            if (this.vidBkgnd !== undefined) {
                this.vidBkgnd.pause();
            }


            this.contentOn = true;
            window.ga('send', 'screenview', {screenName: `${ this.name }-content`});
        };

        const closeContent = function (speed) {
            const startValue = this.translationY;
            const totalChange = 100 - startValue;
            const overflow = 'scroll';

            if (speed !== undefined) {
                this.animateContent(startValue, totalChange, overflow, speed);
            } else {
                this.setTranslateY(100);
                this.content.scrollTop = 0;
                this.content.style.overflowY = overflow;
            }

            this.contentOn = false;
        };

        const animateContent = function (startValue, totalChange, overflow, speed) {
            const easeOutQt = require('./easeOutQt');
            const self = this;

            const duration = Math.abs(totalChange * speed);

            if (this.scrollInterval !== undefined) { clearInterval(this.scrollInterval); }

            self.content.scrollTop = 0;
            self.content.style.overflowY = 'hidden';

            let curPos = 0;
            this.scrollInterval = setInterval(() => {
                // calculating new Y position
                const deltaY = easeOutQt(curPos, startValue, totalChange, duration);

                // setting new Y position
                self.setTranslateY(deltaY);

                curPos += 1;

                // checking finality to clear interval
                if (curPos >= duration) {
                    clearInterval(self.scrollInterval);
                    self.content.style.overflowY = overflow;
                }
            }, 5);
        };

        const toggleContent = function (speed) {
            if (this.contentOn) {
                this.closeContent(speed);
                if (window.innerWidth > 400 || self.swiper.activeIndex === 0) {
                    self.toggleSwiperButtons(true);
                }
                if (this.vidBkgnd !== undefined) {
                    this.vidBkgnd.currentTime = 0;
                    this.vidBkgnd.play();
                }
            } else {
                this.openContent(speed);
                self.toggleSwiperButtons(false);
                if (this.vidBkgnd !== undefined) {
                    this.vidBkgnd.pause();
                }
            }
        };

        // creating base object
        const slideObj = {
            name: config.name,
            slide,
            cover,
            contentOn,
            translationY,
            setTranslateY,
            loadContent,
            animateContent,
            openContent,
            closeContent,
            toggleContent,
        };

        // inserting variable content
        if (config.headline !== undefined) {
            coverBkgnd.style.backgroundColor = 'rgba(0, 0, 0, 0.35)';
            if (config.headlineType === undefined) { config.headlineType = 'center'; }

            // headline
            this.newElement({
                name: 'h2',
                className: `slide-headline ${config.headlineType}`,
                appendTo: cover,
                innerHTML: config.headline,
            });
        }

        const backgroundType = config.backgroundType === undefined ?
            'center' : config.backgroundType;

        const backPosOverride = config.backPosOverride === undefined ?
            '' : config.backPosOverride;

        if (config.vidBkgnd !== undefined) {
            const vidBkgnd = this.newElement({
                name: 'video',
                className: `fullscreen ${ backgroundType }`,
                appendTo: coverBkgnd,
                attrs: {
                    src: config.vidBkgnd,
                    loop: 'true',
                    playsinline: 'true',
                },
            });
            vidBkgnd.muted = true;

            if (config.imgBkgnd !== undefined) {
                vidBkgnd.setAttribute('poster', config.imgBkgnd);
            }

            slideObj.vidBkgnd = vidBkgnd;
        } else if (config.imgBkgnd !== undefined) {
            // image background
            this.newElement({
                name: 'div',
                className: `img ${ backgroundType }`,
                appendTo: coverBkgnd,
                styles: {
                    backgroundImage: `url("${ config.imgBkgnd }")`,
                    backgroundPosition: `${ backPosOverride }`
                },
            });
        }

        if (config.content !== undefined) {
            const content = this.newElement({
                name: 'div',
                className: 'longform',
                appendTo: slide,
                innerHTML: '<p>Loading...</p>',
            });
            slideObj.content = content;
            slideObj.contentLoaded = false;
            slideObj.contentHTML = config.content;

            const more = this.newElement({
                name: 'div',
                className: 'more',
                innerHTML: `
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52.68 20.08">
                        <path
                            d="
                                M0.84,19.2a1.58,1.58,0,0,0,0,2.8,3.87,3.87,0,0,0,4.08,0L26.33,7.29,47.75,22a3.87,
                                3.87,0,0,0,4.08,0,1.58,1.58,0,0,0,0-2.8h0L28.33,3.08a3.87,3.87,0,0,0-4.07,0h0Z
                            "
                            transform="translate(0 -2.51)"
                        />
                    </svg>`,
                appendTo: slide,
            });

            const moreText = this.newElement({
                name: 'p',
                className: 'more-text',
                innerHTML: 'READ',
                appendTo: more,
            });

            const moreClickHandler = function (e) {
                e.preventDefault();
                slideObj.openContent(true);
                self.toggleSwiperButtons(false);
                window.ga('send', {
                    hitType: 'event',
                    eventCategory: 'Slide',
                    eventAction: 'more-button-clicked',
                    eventLabel: 'Our Gainesville'
                });
            };
            for (let i = more.children.length - 1; i >= 0; i--) {
                more.children[i].addEventListener('click', moreClickHandler);
            }

            if (config.moreText !== undefined) {
                moreText.innerHTML = config.moreText;
            }
        }

        // adding created obj to parent array
        this.slides.push(slideObj);

        // load the first slide's content
        if(this.slides.length == 1){
            slideObj.loadContent();
        }

        // resize the fullscreen video
        this.fsv.handleHeightWidth(this.container);

    },

    initSwiper() {
        const self = this;
        this.swiper = new this.sw(this.container, {
            nextButton: this.nextButton,
            prevButton: this.prevButton,
            pagination: this.pagination,
            paginationType: 'progress',
            paginationClickable: false,
            keyboardControl: true,
            mousewheelControl: false,
            mousewheelInvert: true,
            mousewheelForceToAxis: true,
            preloadImages: false,
            lazyLoading: true,
            lazyLoadingInPrevNext: true,
            lazyLoadingInPrevNextAmount: 2,
            replaceState: true,
            spaceBetween: 10,
            onInit(swiper) {
                if (self.slides.length > 0) {
                    const slide = self.slides[swiper.activeIndex];
                    if (slide.vidBkgnd !== undefined) {
                        slide.vidBkgnd.play();
                    }
                }
            },
            onSlideChangeStart(swiper) {
                if (swiper.activeIndex > 0 && window.innerWidth < 400) {
                    self.toggleSwiperButtons(false);
                } else {
                    self.toggleSwiperButtons(true);
                }
            },
            onSlideChangeEnd(swiper) {
                const curSlide = self.slides[swiper.activeIndex];
                if (curSlide.vidBkgnd !== undefined) {
                    curSlide.vidBkgnd.play();
                }

                const previousSlide = self.slides[swiper.activeIndex - 1];
                const nextSlide = self.slides[swiper.activeIndex + 1];

                if (previousSlide !== undefined) {
                    if (previousSlide.content !== undefined) {
                        previousSlide.closeContent();
                    }
                    if (previousSlide.vidBkgnd !== undefined) {
                        previousSlide.vidBkgnd.pause();
                        previousSlide.vidBkgnd.currentTime = 0;
                    }
                }

                if (nextSlide !== undefined) {
                    if (nextSlide.content !== undefined) {
                        nextSlide.closeContent();
                    }
                    if (nextSlide.vidBkgnd !== undefined) {
                        nextSlide.vidBkgnd.pause();
                        nextSlide.vidBkgnd.currentTime = 0;
                    }
                }

                if(self.lastSlideIndex !== swiper.activeIndex ){
                    self.lastSlideIndex = swiper.activeIndex;
                    window.ga('send', 'screenview', {screenName: `${ curSlide.name }-cover`});
                }

            },
            onSliderMove(){
                window.ga('send', {
                    hitType: 'event',
                    eventCategory: 'Slide',
                    eventAction: 'horizontal-slide-swipe',
                    eventLabel: 'Our Gainesville'
                });
            },
            onScroll(){
                window.ga('send', {
                    hitType: 'event',
                    eventCategory: 'Slide',
                    eventAction: 'horizontal-slide-scroll',
                    eventLabel: 'Our Gainesville'
                });
            }
        });

        // track hash entries into the page
        if(this.swiper.activeIndex != 0){
            const curSlide = this.slides[this.swiper.activeIndex];
            window.ga('send', 'screenview', {screenName: `${ curSlide.name }-cover`});
            window.ga('send', {
                hitType: 'event',
                eventCategory: 'Slide',
                eventAction: `hash-entry-${ curSlide.name }`,
                eventLabel: 'Our Gainesville'
            });
        }

    },

    toggleSwiperButtons(forceState) {
        const self = this;
        const turnOff = function () {
            self.prevButton.style.opacity = '0';
            self.nextButton.style.opacity = '0';
            setTimeout(() => {
                self.prevButton.style.display = 'none';
                self.nextButton.style.display = 'none';
            }, 500);
        };
        const turnOn = function () {
            self.prevButton.style.display = '';
            self.nextButton.style.display = '';
            setTimeout(() => {
                self.prevButton.style.opacity = '0.6';
                self.nextButton.style.opacity = '0.6';
            }, 10);
        };

        if (forceState === undefined) {
            if (this.prevButton.style.display === '' && this.prevButton.style.display === '') {
                turnOff();
            } else {
                turnOn();
            }
        } else if (forceState) {
            turnOn();
        } else {
            turnOff();
        }
    },

    touchHandler: {
        init(discovery) {
            this.SWIPE_THRESHOLD_PERCENTAGE = 60;

            this.discovery = discovery;
            const self = this;

            window.addEventListener('touchstart', function (e) {
                self.activeSlide = this.discovery.slides[this.discovery.swiper.activeIndex];
                if (self.activeSlide.content !== undefined) {
                    self.startMouseY = null;
                    self.direction = null;
                    self.deltaMouseY = 0;
                    self.startMouseY = e.targetTouches[0].clientY;
                    self.startContentY = self.activeSlide.translationY;
                }
            });

            window.addEventListener('touchmove', function (e) {
                if (self.activeSlide.content !== undefined) {
                    self.deltaMouseY = (Math.abs(self.startMouseY - e.targetTouches[0].clientY) / window.innerHeight) * 100;
                    // if the content is at the top
                    if (self.activeSlide.content.scrollTop === 0) {
                        // if scrolling up
                        if (self.startMouseY - e.targetTouches[0].clientY > 0) {
                            this.direction = 1;
                            // if content is toggle off
                            if (!self.activeSlide.contentOn) {
                                e.preventDefault();
                                self.handleDrag(100 - self.deltaMouseY);
                            }
                        }
                        // if scrolling down
                        else {
                            this.direction = 0;
                            // if content is toggled on
                            if (self.activeSlide.contentOn) {
                                e.preventDefault();
                                self.handleDrag(self.deltaMouseY);
                            }
                        }
                    }
                }
            });

            window.addEventListener('touchend', function () {
                if (self.activeSlide.content !== undefined) {
                    if (self.activeSlide.content.scrollTop === 0 && self.deltaMouseY > 20) {
                        if (!self.activeSlide.contentOn && this.direction == 1) {
                            self.activeSlide.toggleContent(1);
                            window.ga('send', {
                                hitType: 'event',
                                eventCategory: 'Slide',
                                eventAction: 'vertical-swipe-open',
                                eventLabel: 'Our Gainesville'
                            });
                        }
                        else if (self.activeSlide.contentOn && this.direction === 0) {
                            self.activeSlide.toggleContent(1);
                            window.ga('send', {
                                hitType: 'event',
                                eventCategory: 'Slide',
                                eventAction: 'vertical-swipe-close',
                                eventLabel: 'Our Gainesville'
                            });
                        }
                    } else {
                        self.activeSlide.setTranslateY(self.startContentY);
                    }
                }
            });
        },

        handleDrag(offset) {
            this.activeSlide.setTranslateY(offset);
        },
    },

    slideTo: function(slugOrIndex){
        let index;
        if (typeof(slugOrIndex) == 'number'){
            index = slugOrIndex;
        }
        else if (typeof (slugOrIndex) == 'string'){
            this.slides.forEach((s, i) => {
                if(s.name == slugOrIndex)
                    index = i;
            });
        }
        else{
            throw new Error('discovery: slideTo paramter must be a number or string.');
        }

        this.swiper.slideTo(index, null, false);
    },

    handleLocalQueryLink: function(){
        let self = this;
        return function(queryObj){
            if (queryObj !== null){
                const slug = queryObj.s;
                self.slideTo(slug);
            }
            else{
                self.slideTo(0);
            }
        };
    }
};
