/* 
*   Google Maps  
*/


(function($, App) {

         
    App.GoogleMapsController = function() {

        var self = this;

        this.settings   = new MyModules.Maps_Settings();
        this.createMap  = new MyModules.Maps_CreateMap();

        self.geocoder   = new google.maps.Geocoder(), 
        self.map        = new google.maps.Map( self.settings.mapCanvas , self.settings.mapOptions );

        this.createMap.loadMap(self);

        
        this.mapLoaded = (marker) => {

            self.marker = marker;

            console.log(marker);
        }


    }



})(jQuery, App); 
