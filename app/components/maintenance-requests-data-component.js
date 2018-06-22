import Component from '@ember/component';

export default Component.extend({
    didInsertElement() {
        var self = this;
        this.set('selectedUnits', this.get('property').get('units'));
        this.set('types', this.store.peekAll('service-type'));
        if(!this.get('request')){
            this.set('request', this.store.createRecord('maintenance', {
                m_property_id: self.get('property').id,
                status: 1
            }));
        }
    },
   
    actions:{
        saveRequest(){
        let request = this.get('request');
        request.save();

        },
        updateRequest(){

        }
    }
});
