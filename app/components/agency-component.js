import Component from '@ember/component';

export default Component.extend({
    agency:{},
    didInsertElement() {
        if(this.get('property').get('agency')){
            this.set('agency', this.get('property').get('agency'))
        }
        this.set('regions', this.store.findAll('region'));
     },
     actions:{
         saveAgency(){
             var self =  this;
            var createdAgency = this.store.createRecord('agency', self.get('agency'));
            var agency = createdAgency.toJSON();
            var formData = new FormData();
            agency.user_id = this.get('property').get('agent').get('id'); 
            for ( var key in agency ) {
                formData.append(key, agency[key]);
            }
            formData.append('commercial_register_image', Ember.$('#inputFile')[0].files[0]); 
            new Ember.RSVP.Promise(function(resolve, reject) {
                self.manager.ajaxRequestFile(self, self.get('urls').getUrl('agencies'), 'POST', resolve, reject, formData);
            }).then(
                success => {
                   
                    
                },
                errors => {
                    console.log(errors)
                }
            )
            
         },
         updateAgency(){
             var self = this;
            let agency = this.store.peekRecord('agency', this.get('agency').get('id')).toJSON({"includeId": true});
            var formData = new FormData();
            for ( var key in agency ) {
                formData.append(key, agency[key]);
            }
            // formData.append('commercial_register_image', Ember.$('#inputFile')[0].files[0]);
            new Ember.RSVP.Promise(function(resolve, reject) {
                self.manager.ajaxRequest(self, self.get('urls').updateAgency(agency.id), 'put', resolve, reject, agency);
            }).then(
                success => {
                    this.get('router').transitionTo('index.properties.property-status', this.get('property').get('id'));
                    
                },
                errors => {
                    console.log(errors)
                }
            )

         }
     }
});
