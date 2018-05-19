import Component from '@ember/component';

export default Component.extend({
    isRequesting: false,
    didInsertElement() {
        if(this.get('property').get('agency').get('id')){
            this.set('agency', this.get('property').get('agency'))
        }else{
            this.set('agency', {})
        }
        this.set('regions', this.store.findAll('region'));
     },
     actions:{
         saveAgency(){
            this.set('isRequesting', true);
             var self =  this;
            var createdAgency = this.store.createRecord('agency', self.get('agency'));
            var agency = createdAgency.toJSON();
            var formData = new FormData();
            agency.user_id = this.get('property').get('agent').get('id'); 
            formData.append('data', JSON.stringify(agency));
            formData.append('commercial_register_image', Ember.$('#inputFile')[0].files[0]); 
            new Ember.RSVP.Promise(function(resolve, reject) {
                self.manager.ajaxRequestFile(self, self.get('urls').getUrl('agencies'), 'POST', resolve, reject, formData);
            }).then(
                success => {
                    this.get('router').transitionTo('index.properties.property-status', this.get('property').get('id'));
                    this.set('isRequesting', false);
                },
                errors => {
                    console.log(errors)
                    this.set('isRequesting', false);
                }
            )
            
         },
         fileInputChange(file){
            this.set(file, Ember.$('#' + file)[0].files[0].name);
             
         },
         updateAgency(){
            this.set('isRequesting', true);
             var self = this;
            let agency = this.store.peekRecord('agency', this.get('agency').get('id')).toJSON({"includeId": true});
            var formData = new FormData();
            formData.append('data', JSON.stringify(agency));
            formData.append('commercial_register_image', Ember.$('#inputFile')[0].files[0]);
            new Ember.RSVP.Promise(function(resolve, reject) {
                self.manager.ajaxRequestFile(self, self.get('urls').updateAgency(agency.id), 'POST', resolve, reject, formData);
            }).then(
                success => {
                    this.get('router').transitionTo('index.properties.property-status', this.get('property').get('id'));
                    this.set('isRequesting', false);
                },
                errors => {
                    console.log(errors)
                    this.set('isRequesting', false);
                }
            )

         }
     }
});
