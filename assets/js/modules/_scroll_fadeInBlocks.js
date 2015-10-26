/* MODULE to just fade in elements while scrolling, VANILLA JS */
/* fadeItems : items to fade in, _vars: infos about scrolling process */


(function() {


    MyModules.Scroll_FadeInBlocks = function() {
        
        var self = this;

        this.init = (_vars, reset) => {

            // reset which is first call or when resized
            if (reset) { self.items = document.querySelectorAll(".js-fade-block"); }

            self.execute(_vars);
         };

        this.execute = (_vars) => {

            if (self.items) {

                [].forEach.call(self.items ,el => {

                    let topOffset = el.offsetTop;

                    if (_vars.scrollTop + ((_vars.windowHeight/3)*2) > topOffset) {

                        el.classList.add("js-in");
                    }
                   
                });
            }
        };
    }
        

})(); 
