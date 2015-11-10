/*
*   Author: Manuel Harder
*   date: Oct 2015
*   vendor and custom-plugins gets included and then
*   modules in module folder go first
*   then the apps
*
*/


(function($) {

    var Manager = {};
    
    var Router = {

        // All pages
        common: {
            
            init: function() {
                // Javascript to be fired on every page

                Manager.ScrollController = new App.ScrollController();
                
                Manager.ScrollController.subscribe(new MyModules.ScrollObserver_FadeInBlocks());
            },
            // calls event listener or other elements, when common and the page specific stuff is handled
            finalize: function() {

                Manager.ScrollController.finalize();
            }
        },

        
        
        home: {
            init: function() {

                Manager.ScrollController.subscribe(new MyModules.ScrollObserver_ChangeHeader());  
                
                Manager.GoogleMaps = new App.GoogleMapsController();            
            }
        }

    };

    // The routing fires all common scripts, followed by the page specific scripts.
    // Add additional events for more control over timing e.g. a finalize event
    var UTIL = {

        fire: function(func, funcname, args) {
            var namespace = Router;
            funcname = (funcname === undefined) ? 'init' : funcname;
            if (func !== '' && namespace[func] && typeof namespace[func][funcname] === 'function') {
                namespace[func][funcname](args);
            }
        },
        loadEvents: function() {
            UTIL.fire('common');

            $.each(document.body.className.replace(/-/g, '_').split(/\s+/), function(i, classnm) {

                UTIL.fire(classnm);
            });

            UTIL.fire('common', 'finalize');
        }

    };

    $(document).ready(UTIL.loadEvents);

})(jQuery); 



