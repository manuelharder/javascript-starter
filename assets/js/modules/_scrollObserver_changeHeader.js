/* MODULE to change the header while scrolling, VANILLA JS */
/* when the header (fixed header) moves over the banner change it, _vars: infos about scrolling process */
(function() {


    MyModules.ScrollObserver_ChangeHeader = function() {
        
        var self = this;

        this.header = {};

        this.init = (_vars, reset) => {

            if (reset) {

              let siteHeader = document.querySelector("#site-header");

              self.header = {

                el : siteHeader,
                scrollChange : document.querySelector("#page-content").offsetTop - siteHeader.style.height
              };
            }

            self.execute(_vars);
        };


        this.execute = (_vars) => {

            if (self.header.el) {

                if (_vars.scrollTop > self.header.scrollChange) {

                  self.header.el.classList.add("header--white");
                }
                else {

                  self.header.el.classList.remove("header--white");
                }
            }
        };

    } 
        

})(); 

