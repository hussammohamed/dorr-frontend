import Component from '@ember/component';
import dorrValidations from '../mixins/dorr-validations'
import json from 'ember-data/serializers/json';
export default Component.extend(dorrValidations, {
    isRequesting: false,
    didInsertElement() {
        this.set('types', this.store.peekAll('type'));
        this.set('furnished', this.store.peekAll('furnished'));
        this.set('furnished-status', this.store.peekAll('furnished-status'));
        this.set('kitchen-cabinet', this.store.peekAll('kitchen-cabinet'));
        let units =  this.get('property').get('units');
        this.set('units', units);
        if(!units.linght){
            this.store.createRecord('unit', {
                m_property_id: this.get('property'),
                created_by: this.get('currentUser').get('id'),
            })
        }
        
       
    
 
        
     },
    actions:{
        SubmitAction(){
            console.log('true');
        },
        setNewUnit(formIsInvalid){
           if(formIsInvalid){
               Ember.$('form').submit();
            this.manager.toaster(this, "يرجي إكمال بيانات الوحدات السابقة اولا")
           }else{
            this.get('units').get('lastObject').set('collapse', true);
            this.store.createRecord('unit', {
                m_property_id: this.get('property'),
                created_by: this.get('currentUser').get('id'),
            })
            let app = document.getElementById('app');
            if(app){
              app.scrollTop = 0;
            }
           }
          

        },
        hideUnit(unit){
            unit.toggleProperty('collapse');            
        },
        saveUnits(){
            this.set('isRequesting', true);
            var self = this;
            let units  =  this.get('units');
            let data = [];
            units.map(function(record){
                data.push(record.toJSON());
            })
            
            new Ember.RSVP.Promise(function(resolve, reject) {
                self.manager.ajaxRequest(self, self.get('urls').getUrl("units"), 'POST', resolve, reject, JSON.stringify(data));
            }).then(
                success => {
                    // this.store.unloadRecord(property)
                    this.set('isRequesting', false);
                    this.get('router').replaceWith('index.properties.property-status', this.get('property').get('id'));
                },
                errors => {
                    console.log(errors)
                    this.set('isRequesting', false);
                    // this.store.unloadRecord(property)
                }
            )

        },
        updateUnit(){
            
        }
    }
});
