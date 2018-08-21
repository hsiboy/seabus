var seabus = {

    map: null,

    markers: {},

    initMap: function() {
        // called back by google maps api after map is initialized
        this.map = new google.maps.Map(document.getElementById('map'), {
            // centered on Liverpool, UK.
            center: {lat:53.409318, lng: -3.002714},
            zoom: 10
        });
        this.map.controls[google.maps.ControlPosition.LEFT_TOP].push(this.createAboutBox());
        this.getBoatsSocketIO();
    },

    point_has_moved: function(old_lat, old_lon, new_lat, new_lon) {
        /* determine if a boat position has actually changed, eliminates "wobble" from 
        minute changes in GPS coordinates */
        ACCURACY = 3;
        r_new_lat = new_lat.toFixed(ACCURACY);
        r_new_lon = new_lon.toFixed(ACCURACY);
        r_old_lat = old_lat.toFixed(ACCURACY);
        r_old_lon = old_lon.toFixed(ACCURACY);
        if (r_old_lat != r_new_lat || r_old_lon != r_new_lon) {
            console.log(r_old_lat, r_old_lon);
            console.log(r_new_lat, r_new_lon);
            return true
        } else {
            return false;
        }
    },

    updateMap: function(data) {
        // draw boats on the map
        for (var boat in data.boats) {
            lat = data.boats[boat].lat;
            lon = data.boats[boat].lon;
            name = data.boats[boat].name;
            id = data.boats[boat].id;
            if (id in this.markers) {
                // update an existing marker if its already on the map
                current_pos = this.markers[id].getPosition();
                if (this.point_has_moved(current_pos.lat(), current_pos.lng(), lat, lon)) {
                    console.log(name);
                    this.markers[id].setPosition(new google.maps.LatLng(lat, lon));
                } 
            } else {
                // create a new marker
                var boatLatLon = new google.maps.LatLng(lat, lon);
                icon = this.setIcon(name);
                var marker = new SlidingMarker({
                    position: boatLatLon,
                    icon: icon
                });
                marker.setMap(this.map);
                this.markers[id] = marker;
            }
        }
    },

    setIcon: function(name) {
            return '/img/vessel.png';
    },

    getBoatsSocketIO: function() {
        // establish websocket connection
        var socket = io.connect('/seabus_data')
        document.beforeUnload = function() { socket.disconnect() }
        var that = this;
        socket.on('seabus_moved', function(data) {
            that.updateMap(data);
            console.log('seabus_moved event received');
            console.log(data);
        });
    },
   
}

