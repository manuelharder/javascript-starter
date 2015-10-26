/* 
*   SCROLL Listener App 
*/
/* Created Modules will be passed with setModule(obj), you don't need to change any code in this file (ideal situation)  */
/* 
* example how to use it:
* Manager.ScrollController = new App.ScrollController();                --- (in common)
* Manager.ScrollController.setModule(new MyModules.fadeInBlocks());     --- (in common or page specific)
* Manager.ScrollController.finalize();                                  --- (to add the listener)
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

        // function name array of function strings
        this.arrFn = [];

        //#### you need to call that function to set the Module Obj that has an init function!!!!!!!
        this.setModule = (fnName) => {  this.arrFn.push(fnName); }

     
        this.callScrollListener = function() {

            // on resize or on initalize reset
            this.vars.windowHeight = window.innerHeight;

            // the functions that need to be called + initialize elements.
            // true to do the resets
            self.callFunctions(true);            

            $(window).off("scroll");

            $(window).on("scroll", function() { 

                self.vars.scrollTop = document.body.scrollTop || document.documentElement.scrollTop;

                if (self.vars.scrollTop > self.vars.lastScrollTop) {  self.vars.scrollDirection = "down"; } 
                else {                                                self.vars.scrollDirection = "up"; }

                self.vars.lastScrollTop = self.vars.scrollTop;
                
                self.callFunctions(false);
             
            });
        };
   
      

        this.callFunctions = function(reset) {
   
            if (self.arrFn instanceof Array) {
           
                self.arrFn.map( fn => fn.init(self.vars, reset) );
            }
        }


        // when all the scroll event listener functions are set
        this.finalize = () => {

            if ($(window).width() > 1024) {

                $(window).load(function() { 

                    self.callScrollListener();

                    $(window).on('resize orientationChanged', () => { self.myDebouncedFunc() });        
                });
            }
        }


        this.myDebouncedFunc = debounce(() => { self.callScrollListener() });

    }



})(jQuery, App); 
