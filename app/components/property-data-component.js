import Component from '@ember/component';
import json from 'ember-data/serializers/json';

export default Component.extend({
    isRelation: false,
    property: {},
    markersArray: Array(),
    deleteOverlays() {
        var self = this;
        if (this.get('markersArray')) {
            self.get('markersArray').forEach(function(marker) {
                marker.setMap(null);
            });
            self.set('markersArray', Array());
        }
    },
    placeMarker(location) {
        var self = this;
        // first remove all markers if there are any
        self.deleteOverlays();

        var marker = new google.maps.Marker({
            position: location,
            map: self.get('map')
        });

        // add marker in markers array
        // markersArray.push(marker);
        self.get('markersArray').push(marker);

        //map.setCenter(location);
    },
    geocodeLatLng(map, latlong) {
        var self = this;
        let lng = latlong.lng()
        let lat = latlong.lat()
        self.set('property.long', lng); 
        self.set('property.lat', lat);
        var geocoder = new google.maps.Geocoder;
        var infowindow = new google.maps.InfoWindow;
        geocoder.geocode({
            'location': latlong
        }, function(results, status) {
            if (status === 'OK') {
                if (results[0]) {
                    // map.setZoom(12);
                    var marker = new google.maps.Marker({
                        position: latlong,
                        map: map
                    });
                    map.setCenter(latlong)
                    map.setZoom(14)
                    self.deleteOverlays();
                    self.get('markersArray').push(marker);
                    infowindow.setContent(results[0].formatted_address);
                    infowindow.open(map, marker);
                    self.set('property.address', results[0].formatted_address);
                }
            }
        });
    },
    initMap() {
        var self = this;
        if(this.get('currentProperty')){
            this.set('property.lat', this.get('property').get('location').lat);
            this.set('property.long', this.get('property').get('location').long);
            this.set('zoom', 14);
            
        }else{
            this.set('property.lat', 23.128363);
            this.set('property.long', 45.199707);
            this.set('zoom', 6);
        }
     
        var map = new google.maps.Map(document.getElementById('map'), {
            zoom: self.get('zoom'),
            center: new google.maps.LatLng(self.get('property.lat'), self.get('property.long')),
        });


        /***************search box****************/
        var searchBox = new google.maps.places.SearchBox(document.getElementById('input-pac-input'));
    
        /***************map click*********/
        google.maps.event.addListener(map, "click", function(event) {
            // place a marker
             var latlng = event.latLng

            self.placeMarker(latlng);
                        
            self.geocodeLatLng(map, latlng);

            // display the lat/lng 
           
        });

        self.set('map', map);
        if(this.get('currentProperty')){
        self.placeMarker(new google.maps.LatLng(self.get('property.lat'), self.get('property.long')));
        }

    },
    didInsertElement() {
       this.set('types', this.store.peekAll('type'));
       this.set('regions', this.store.peekAll('region'));
       if(this.get('currentProperty')){
        this.set('isRelation', true);
        
        setTimeout(() => {
            this.initMap();
        }, 10);
        this.set('property', this.get('currentProperty'))
        this.set("districts", this.get('currentProperty').get('region').get('districts'))
       }

       
    },
    actions:{
        propertyEdit(){
            this.get('router').transitionTo('index.properties.edit.property-data', this.get('property').get('id'));
        },
        changeRelation(value){
            this.set('property.user_relation', value);
            this.set('isRelation', true);
            setTimeout(() => {
                this.initMap();
            }, 10);
           
        },
        regionChange(value){
            this.set('property.region', value);
            this.set('districts', value.get('districts'))
            this.set('property.district', null);
            this.get('map').setCenter( new google.maps.LatLng(value.get('location').lat, value.get('location').long));
            this.get('map').setZoom(10);
        },
        districtChange(value){
            this.set('property.district', value);
            this.get('map').setCenter( new google.maps.LatLng(value.get('location').lat, value.get('location').long));
            this.get('map').setZoom(14);
        },
        updateProperty(){
            let self = this;
            let property = this.get('property').toJSON();
            delete property.agency_instrument_issuer;  delete property.agency_instrument_date; delete property.agency_instrument_no; delete property.agency_instrument_exp_date; delete property.agent; delete property.location; delete property.owner; delete property.agency; 
            delete property.createdBy; 
            console.log(property)
            var formData = new FormData();
            formData.append('property_instrument_image', Ember.$('#inputFile')[0].files[0]);
            formData.append('data', JSON.stringify(property))
            new Ember.RSVP.Promise(function(resolve, reject) {
                self.manager.ajaxRequestFile(self, self.get('urls').updateProperty(self.get('property').get('id')), 'POST', resolve, reject, formData);
            }).then(
                success => {
                   
                    this.get('router').transitionTo('index.properties.property-status', success.mproperty.id);
                },
                errors => {
                    console.log(errors)
                }
            )

        },
        fileInputChange(file){
            this.set(file, Ember.$('#' + file)[0].files[0].name);
             
         },
        saveProperty(){
            let self = this;
            let property = this.store.createRecord('mproperty', this.get('property'));
            let propertyToJson =  property.toJSON();
            delete propertyToJson.agency_instrument_date; delete propertyToJson.agency_instrument_issuer; delete propertyToJson.agency_instrument_no; delete propertyToJson.agency_instrument_place; delete propertyToJson.agency_instrument_exp_date;
            var formData = new FormData();
            formData.append('property_instrument_image', Ember.$('#inputFile')[0].files[0]);
            formData.append('data', JSON.stringify(propertyToJson))
            new Ember.RSVP.Promise(function(resolve, reject) {
                self.manager.ajaxRequestFile(self, self.get('urls').getUrl("mproperty"), 'POST', resolve, reject, formData);
            }).then(
                success => {
                    this.store.unloadRecord(property)
                    this.get('manager').toaster(this, 'تم اكمال بيانات العقار بنجاح')
                    this.get('router').replaceWith('index.properties.property-status', success.mproperty.id);
                },
                errors => {
                    console.log(errors)
                    this.store.unloadRecord(property)
                }
            )
        }

    }
});
