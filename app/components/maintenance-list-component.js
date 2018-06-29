import Component from '@ember/component';

export default Component.extend({
    didInsertElement() {
        let self = this;
        new Ember.RSVP.Promise(function (resolve, reject) {
            self.manager.ajaxRequestFile(self, self.get('urls').getMaintenanceByProperty(self.get('property').id), 'GET', resolve, reject);
        }).then(
            success => {
                this.set('isRequesting', false);
                this.store.peekAll('maintenance').map(function(record){
                    record.unloadRecord();
                })
                this.store.pushPayload(success);
                this.set('requests', this.store.peekAll('maintenance'));

            },
            errors => {
                console.log(errors)
                this.set('isRequesting', false);
            }
        )
    },
    actions:{
        statusFilter(record){
            console.log(record.get("status"), this.get('requestsStatus'))
            if(record.get("status") == this.get('requestsStatus')){
                console.log(record)
                return record;
            }
        },
        requestView(id){
            this.get('router').transitionTo("index.properties.show.maintenance-requests.show", id);
        },
        editRequst(id){
            this.get('router').transitionTo("index.properties.show.maintenance-requests.edit", id);

        },
        deleteRequst(id){
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
                       self.store.findRecord('maintenance', id, { backgroundReload: false }).then(function(maintenance) {
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
