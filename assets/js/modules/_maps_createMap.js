/* MODULE to add google maps options and more, VANILLA JS */


(function() {


    MyModules.Maps_CreateMap = function() {

        var self = this;

        this.loadMap = (mapsApp) => {

            this.mapsApp = mapsApp;

            $(window).load(() => {
                    
                if (this.mapsApp.settings.markerImgSrc) { self.loadMarkerAndLocation(); }

                else { self.loadLocation(false); }
            });
        };



        this.loadMarkerAndLocation = () => {

                let downloadingImage = new Image();

                downloadingImage.src = self.mapsApp.settings.markerImgSrc;

                downloadingImage.onload = () => {
       
                    let w = this.width,
                        h = this.height;

                    let markerIcon =    new google.maps.MarkerImage( downloadingImage.src ,
                                        new google.maps.Size(w/2, h/2), //size
                                        new google.maps.Point(0, 0), //origin point
                                        new google.maps.Point(w/4, h/4 )); // offset point 

                    self.loadLocation(markerIcon);
                };
                
                downloadingImage.onerror = () => { self.loadLocation(false); }
        };


        this.loadLocation = (markerIcon) => {

            self.mapsApp.geocoder.geocode( { 'address': self.mapsApp.settings.address}, function(results, status) {

                if (status === google.maps.GeocoderStatus.OK) {
                    
                    self.mapsApp.map.setCenter(results[0].geometry.location);

                    self.loadMarker(results[0].geometry.location, markerIcon);

                }   
            });
        };


        this.loadMarker = (location, markerIcon) => {

            let markerOptions = {
                map: self.mapsApp.map, 
                position: location
            }

            if (markerIcon) {
                Object.assign(markerOptions.prototype, {icon: markerIcon});
            }

            var marker = new google.maps.Marker(markerOptions);

            self.mapsApp.mapLoaded(marker);

        };


    }
        

})(); 
