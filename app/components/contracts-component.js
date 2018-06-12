import Component from '@ember/component';

export default Component.extend({
    tableLoading: true,
    didInsertElement() {
        var self = this;
        new Ember.RSVP.Promise(function (resolve, reject) {
            self.manager.ajaxRequest(self, self.get('urls').getContractsByMproperty(self.get('property').get('id')), 'GET', resolve, reject);
        }).then(
            success => {
                this.store.unloadAll('contract')
                this.store.pushPayload(success);
                this.set('contracts', this.store.peekAll('contract'));
                this.set('tableLoading', false);
            },
            errors => {
                console.log(errors)
                this.set('tableLoading', false);
            }
        )
    },
    actions:{
        deleteContract(id) {
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
                        self.store.findRecord('contract', id, { backgroundReload: false }).then(function(contract) {
                            contract.deleteRecord();
                            contract.get('isDeleted');
                            contract.save(); 
                            self.manager.toaster(self, 'تم حذف العقد بنجاح   ')
                          });
                         
                     }
                 })
 
 
         },
         contractEdit(id){
            this.get('router').transitionTo('index.properties.show.contracts.edit', id)
         },
         contractView(id){
            this.get('router').transitionTo('index.properties.show.contracts.contract-view', id)
        },
        editUnit(id){
            this.get('router').transitionTo('index.properties.show.units.unit-edit', id)
        },
        addContract(){
            this.get('router').transitionTo('index.properties.show.contracts.add')
        }
    }
});
