import Component from '@ember/component';
import dorrValidations from '../mixins/dorr-validations'
export default Component.extend(dorrValidations, {
    didInsertElement() {
        this.set('types', this.store.peekAll('type'));
        this.set('furnished', this.store.peekAll('furnished'));
        this.set('furnished-status', this.store.peekAll('furnished-status'));
        this.set('kitchen-cabinet', this.store.peekAll('kitchen-cabinet'));
        if(!this.get("unit")){
        //     this.set('unit', this.store.createRecord('unit', 
        //     {
        //         m_property_id: this.get('property'),
        //         created_by: this.get('currentUser').get('id'),
        //     }
        // ))
        this.set('unit', {});
        }
        
       
    
 
        
     },
    actions:{
       
        saveUnit(){
            var self = this;
            let createdUnit  =  this.store.createRecord('unit', this.get('unit'));
            let unit = createdUnit.toJSON();
            unit.m_property_id = this.get('property').get('id');
            unit.created_by = this.get('currentUser').get('id');
            new Ember.RSVP.Promise(function(resolve, reject) {
                self.manager.ajaxRequest(self, self.get('urls').getUrl("units"), 'POST', resolve, reject, {data:[unit]});
            }).then(
                success => {
                    this.store.pushPayload('mproperty', success);
                    this.get('router').replaceWith('index.properties.show.units');
                },
                errors => {
                    console.log(errors)
                }
            )

        },
        updateUnit(){
            var self = this;
            let unit  =  this.get('unit').toJSON();
            new Ember.RSVP.Promise(function(resolve, reject) {
                self.manager.ajaxRequest(self, self.get('urls').updateUnit(self.get('unit').get('id')), 'PUT', resolve, reject, unit);
            }).then(
                success => {
                    this.store.pushPayload('mproperty', success);
                    this.get('router').replaceWith('index.properties.show.units');
                },
                errors => {
                    console.log(errors)
                }
            )

        },

    }
});
