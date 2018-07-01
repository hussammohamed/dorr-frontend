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
        }else{
            if(this.get('unit').get('contract_id')){
                this.set('contract', this.store.findRecord('contract', this.get('unit').get('contract_id')))
            }
        }
        
       
    
 
        
     },
    actions:{
        editUnit(id){
            this.get('router').transitionTo('index.properties.show.units.unit-edit', id)
        },
        deleteUnit(id) {
            var self = this;
             swal({
                 title: "هل أنت متأكد",
                 text: "لايمكنك استرجاع هذة الوحدة",
                 type: "warning",
                 showCancelButton: true,
                 confirmButtonColor: "#DD6B55",
                 confirmButtonText: "نعم",
                 cancelButtonText: "إلغاء",
                 closeOnConfirm: true,
                 closeOnCancel: true
             },
                 function (isConfirm) {
                     if (isConfirm) {
                        self.store.findRecord('unit', id, { backgroundReload: false }).then(function(unit) {
                            unit.deleteRecord();
                            unit.get('isDeleted');
                            unit.save(); 
                            self.manager.toaster(self, 'تم حذف الوحدة بنجاح   ')
                            self.get('router').transitionTo('index.properties.show.units')
                          });
                         
                     }
                 })
 
 
         },
        saveUnit(){
            var self = this;
            let createdUnit  =  this.store.createRecord('unit', this.get('unit'));
            let unit = createdUnit.toJSON();
            unit.m_property_id = this.get('property').get('id');
            unit.created_by = this.get('currentUser').get('id');
            new Ember.RSVP.Promise(function(resolve, reject) {
                self.manager.ajaxRequest(self, self.get('urls').getUrl("units"), 'POST', resolve, reject, JSON.stringify([unit]));
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
        addContract(){
            this.get('router').transitionTo('index.properties.show.units.add-contrarct', this.get('unit').get('id'));
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
