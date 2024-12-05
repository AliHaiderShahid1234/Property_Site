
{
    class Menu {
        constructor(el) {
            this.DOM = {el: el};
            this.DOM.openCtrl = this.DOM.el.querySelector('.action--menu');
            this.DOM.closeCtrl = this.DOM.el.querySelector('.action--close');
            this.DOM.openCtrl.addEventListener('click', () => this.open());
            this.DOM.closeCtrl.addEventListener('click', () => this.close());
            this.DOM.openCtrl.addEventListener('mouseenter', () => {
                allowTilt = false;
            });
            this.DOM.openCtrl.addEventListener('mouseleave', () => {
                allowTilt = true;
            });
            this.DOM.items = Array.from(this.DOM.el.querySelectorAll('.menu__item'));
            this.itemsTotal = this.DOM.items.length;

            this.DOM.mainLinks = this.DOM.el.querySelectorAll('.mainmenu > a.mainmenu__item');
            this.DOM.sidemenuLinks = this.DOM.el.querySelectorAll('.sidemenu span.sidemenu__item-inner');
            this.DOM.menulink = this.DOM.el.querySelector('.menu__item-link');
        }
        open() {
            this.toggle('open');
        }
        close() {
            this.toggle('close');
        }
        toggle(action) {
            if ( this.isAnimating ) return;
            allowTilt = action === 'open' ? false : true;
            this.isAnimating = true;
            this.DOM.el.classList[action === 'open' ? 'add' : 'remove']('menu--open');
            const animationEnd = (pos) => {
                if ( pos === this.itemsTotal-1 ) {
                    this.isAnimating = false;
                }
            };
            this.DOM.items.forEach((el, pos) => {
                const innerEl = el.querySelector('.menu__item-inner');
                const config = {};
                const configInner = {};
                const direction = el.dataset.direction;
                if ( direction === 'bt' ) {
                    config.y = '101%';
                    configInner.y = '-101%';
                    configInner.x = '0%';
                }
                else if ( direction === 'tb' ) {
                    config.y = '-101%';
                    configInner.y = '101%';
                    configInner.x = '0%';
                }
                else if ( direction === 'lr' ) {
                    config.x = '-101%';
                    configInner.x = '101%';
                }
                else if ( direction === 'rl' ) {
                    config.x = '101%';
                    configInner.x = '-101%';
                }
                else {
                    config.x = '101%';
                    config.y = '101%';
                    configInner.x = '-101%';
                    configInner.y = '-101%';
                }
                
                if ( action === 'open' ) {
                   TweenMax.set(el, config);
                    TweenMax.set(innerEl, configInner);

                    TweenMax.to([el,innerEl], .9, {
                        ease: Quint.easeOut,
                        x: '0%',
                        y: '0%',
                        onComplete: () => animationEnd(pos)
                    });
                }
                else {
                    TweenMax.to(el, 0.6, {
                        ease: Quart.easeInOut,
                        x: config.x || 0,
                        y: config.y || 0
                    });
                    TweenMax.to(innerEl, 0.6, {
                        ease: Quart.easeInOut,
                        x: configInner.x || 0,
                        y: configInner.y || 0,
                        onComplete: () => animationEnd(pos)
                    });
                }
            });

            TweenMax.to(this.DOM.closeCtrl, 0.6, {
                ease: action === 'open' ? Quint.easeOut : Quart.easeInOut,
                startAt: action === 'open' ? {rotation: 0} : null,
                opacity: action === 'open' ? 1 : 0,
                rotation: action === 'open' ? 180 : 270
            });
            TweenMax.to(this.DOM.openCtrl, action === 'open' ? 0.6 : 0.3, {
                delay: action === 'open' ? 0 : 0.3,
                ease: action === 'open' ? Quint.easeOut : Quad.easeOut,
                opacity: action === 'open' ? 0 : 1
            });
            TweenMax.staggerTo(this.DOM.mainLinks, action === 'open' ? 0.9 : 0.2, {
                ease: action === 'open' ? Quint.easeOut : Quart.easeInOut,
                startAt: action === 'open' ? {y: '50%', opacity: 0} : null,
                y: action === 'open' ? '0%' : '50%',
                opacity: action === 'open' ? 1 : 0
            }, action === 'open' ? 0.1 : -0.1);

            TweenMax.staggerTo(this.DOM.sidemenuLinks, action === 'open' ? 0.5 : 0.2, {
                ease: action === 'open' ? Quint.easeInOut : Quart.easeInOut,
                startAt: action === 'open' ? {y: '100%'} : null,
                y: action === 'open' ? '0%' : '100%'
            }, action === 'open' ? 0.05 : -0.05);

            TweenMax.to(this.DOM.menulink, action === 'open' ? 0.9 : 0.6, {
                ease: action === 'open' ? Quint.easeOut : Quart.easeInOut,
                startAt: action === 'open' ? {x: '10%'} : null,
                x: action === 'open' ? '0%' : '10%'
            });
        }
    }
    const menu = new Menu(document.querySelector('nav.menu'));

    imagesLoaded(document.querySelector('.menu-wrapper'), {background: true}, () => document.body.classList.remove('loading'));
    
	const getMousePos = (e) => {
        let posx = 0;
        let posy = 0;
		if (!e) e = window.event;
		if (e.pageX || e.pageY) 	{
			posx = e.pageX;
			posy = e.pageY;
		}
		else if (e.clientX || e.clientY) 	{
			posx = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
			posy = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
		}
		return { x : posx, y : posy }
    };

    let allowTilt = true;

}
