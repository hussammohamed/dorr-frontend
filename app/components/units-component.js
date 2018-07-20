import Component from '@ember/component';

export default Component.extend({
    didInsertElement() {
        this.set('currentUserId', this.get('session').authUserId())
    },
    actions:{
        rentAction(){
            
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
                          });
                         
                     }
                 })
 
 
         },
        unitView(id){
            this.get('router').transitionTo('index.properties.show.units.unit-show', id)
        },
        editUnit(id){
            this.get('router').transitionTo('index.properties.show.units.unit-edit', id)
        },
        addUnit(){
            this.get('router').transitionTo('index.properties.show.units.unit-add')
        },
        copyUnit(id){
            var self = this;
            let currentUnit = this.store.peekRecord('unit', id);
            let newUnit = currentUnit.toJSON();
            delete newUnit.available; delete newUnit.contract;  delete newUnit.contract_id;   delete newUnit.selected; 
            newUnit.no += 1;
            newUnit.created_by = this.get('currentUser').id;
            new Ember.RSVP.Promise(function(resolve, reject) {
                self.manager.ajaxRequest(self, self.get('urls').getUrl("units"), 'POST', resolve, reject, JSON.stringify([newUnit]));
            }).then(
                success => {
                    this.store.pushPayload('mproperty', success);
                    this.manager.toaster(self, 'تم نسخ الوحده بنجاح')
                },
                errors => {
                    console.log(errors)
                }
            )
        }
    }
});
