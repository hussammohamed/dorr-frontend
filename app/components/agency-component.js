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
            agency.phone = 444444;
            agency.commercial_register_address = 'dddd';  
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

         }
     }
});
