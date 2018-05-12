import Component from '@ember/component';
import dorrValidations from '../mixins/dorr-validations'
export default Component.extend(dorrValidations, {
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
                created_by: 2,
            })
        }
        
       
    
 
        
     },
    actions:{
        SubmitAction(){
            console.log('true');
        },
        setNewUnit(formIsInvalid){
           if(formIsInvalid){
            this.manager.toaster(this, "يرجي إكمال بيانات الوحدات السابقة اولا")
           }else{
            this.get('units').get('lastObject').set('collapse', true);
            this.store.createRecord('unit', {
                mproperty: this.get('property'),
            })
            window.scrollTo(0, 0);
           }
          

        },
        hideUnit(unit){
            unit.toggleProperty('collapse');            
        },
        saveUnits(){
            var self = this;
            let units  =  this.get('units');
            let data = [];
            units.map(function(record){
                data.push(record.toJSON());
            })
            console.log(JSON.stringify(data))
            new Ember.RSVP.Promise(function(resolve, reject) {
                self.manager.ajaxRequest(self, self.get('urls').getUrl("units"), 'POST', resolve, reject, {data:data});
            }).then(
                success => {
                    // this.store.unloadRecord(property)
                    this.get('manager').toaster(this, 'تم اكمال بيانات العقار بنجاح')
                    // this.get('router').replaceWith('index.properties.property-status', success.mproperty.id);
                },
                errors => {
                    console.log(errors)
                    // this.store.unloadRecord(property)
                }
            )

        },
        updateUnit(){
            
        }
    }
});
