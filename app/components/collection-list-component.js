import Component from '@ember/component';

export default Component.extend({
    didInsertElement() {
        let self = this;
        new Ember.RSVP.Promise(function (resolve, reject) {
            self.manager.ajaxRequestFile(self, self.get('urls').getPaymentsOrderByProperty(self.get('property').id), 'GET', resolve, reject);
        }).then(
            success => {
                this.set('isRequesting', false);
                this.store.peekAll('payment-order').map(function(record){
                    record.unloadRecord();
                })
                this.store.pushPayload(success);
                this.set('orders', this.store.peekAll('payment-order'));

            },
            errors => {
               
                this.set('isRequesting', false);
            }
        )
    },
    actions:{
        statusFilter(record){
            if(record.get("status") == this.get('requestsStatus')){
                return record;
            }
        },
        editOrder(id){
            this.get('router').transitionTo("index.properties.show.collection-requests.edit", id);
        },
        deleteOrder(id){
            var self = this;
            swal({
                title: "هل أنت متأكد",
                text: "لايمكنك استرجاع هذا الطلب",
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
                       self.store.findRecord('payment-order', id, { backgroundReload: false }).then(function(maintenance) {
                        maintenance.deleteRecord();
                        maintenance.get('isDeleted');
                        maintenance.save(); 
                           self.manager.toaster(self, 'تم حذف الطلب بنجاح   ')
                           
                         });
                        
                    }
                })

        }
    
    }
});
