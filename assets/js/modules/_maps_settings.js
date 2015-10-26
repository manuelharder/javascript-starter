/* MODULE to add google maps options and more, VANILLA JS */


(function() {


    MyModules.Maps_Settings = function() {

        let IS_MOBILE = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        
        var self = this;

        self.mapCanvas     = document.querySelector("#map"); 
        self.address       = self.mapCanvas.getAttribute('data-address');
        self.markerImgSrc  = self.mapCanvas.getAttribute('data-marker');

        self.mapOptions = {

            center: { lat: 0, lng: 0}, 
            zoom: self.mapCanvas.getAttribute('zoom') ? self.mapCanvas.getAttribute('zoom') : 14,
            draggable: IS_MOBILE ? false : true,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            disableDefaultUI: true

        }

        
    }
        

})(); 
