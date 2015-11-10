/* 
*   SCROLL Listener App 
*/
/* Scroll Observer will be passed with subscribe(obj), you don't need to change any code in this file (ideal situation)  */
/* 
* example how to use it:
* Manager.ScrollController = new App.ScrollController();                --- (in common)
* Manager.ScrollController.subscribe(new MyModules.fadeInBlocks());     --- (in common or page specific)
* Manager.ScrollController.finalize();                                  --- (to add the listener)
*
*   the fire function calls the objects initialize function "init" needed for all subscribers and
*   passes in scroll information
*/

(function($, App) {

         
    App.ScrollController = function() {

        var self = this;

        this.vars = {

            scrollTop : document.body.scrollTop || document.documentElement.scrollTop,
            windowHeight : window.innerHeight,
            lastScrollTop : 0, 
            scrollDirection : "down"
        };

        // functions array of the observer
        this.arrHandlers = [];

        //#### subscribe to the scroll event
        this.subscribe = (obj) => {  this.arrHandlers.push(obj); }


        this.unsubscribe = (obj) => {

            this.arrHandlers = this.arrHandlers.filter( (item) => {
                    if (item !== obj) {
                        return item;
                    }
                }
            );
        },

     
        this.callScrollListener = function() {

            // on resize or on initalize reset
            this.vars.windowHeight = window.innerHeight;

            // notify the observer on page load or when resized
            self.fire(true);            

            $(window).off("scroll");

            $(window).on("scroll", function() { 

                self.vars.scrollTop = document.body.scrollTop || document.documentElement.scrollTop;

                if (self.vars.scrollTop > self.vars.lastScrollTop) {  self.vars.scrollDirection = "down"; } 
                else {                                                self.vars.scrollDirection = "up"; }

                self.vars.lastScrollTop = self.vars.scrollTop;
                
                // notify the observer on scroll
                self.fire(false);
            });
        };


        this.fire = function(reset) {

            if (self.arrHandlers instanceof Array) {

                this.arrHandlers.forEach( (item) => {

                    item.init.call(item, self.vars, reset);
                });
            }
        };
   
    

        // when all the observer are set (global and page specific)
        this.finalize = () => {

            if ($(window).width() > 1024) {

                $(window).load(function() { 

                    self.callScrollListener();

                    $(window).on('resize orientationChanged', () => { self.myDebouncedFunc() });        
                });
            }
        }


        this.myDebouncedFunc = debounce(() => { self.callScrollListener() }, 200);
    }



})(jQuery, App); 
