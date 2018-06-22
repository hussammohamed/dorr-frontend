import Component from '@ember/component';

export default Component.extend({
    didInsertElement() {
        var self = this;
        this.set('selectedUnits', this.get('property').get('units'));
        this.set('types', this.store.peekAll('service-type'));
        if(!this.get('request')){
            this.set('request', this.store.createRecord('maintenance', {
                m_property_id: self.get('property').get('id'),
                status: 1
            }));
        }
    },
   
    actions:{
        saveRequest(){
        var self = this;
        let request = this.get('request');
        let data = new FormData();
            data.append("data", JSON.stringify(request));
            new Ember.RSVP.Promise(function (resolve, reject) {
                self.manager.ajaxRequestFile(self, self.get('urls').saveMaintenance(), 'POST', resolve, reject, data);
            }).then(
                success => {
                    this.set('isRequesting', false);
                    // this.get('router').transitionTo("index.properties.show.contracts")
                },
                errors => {
                    console.log(errors)
                    this.set('isRequesting', false);
                }
            )

        },
        updateRequest(){

        }
    }
});
