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
        }
    }
});
