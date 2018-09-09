import Component from '@ember/component';

export default Component.extend({
    isOwnerAndNeedAprroved: false,
    isRenterAndNeedAprroved: false,
    noNeedAprroved: false,
    didInsertElement() {
        let currentUserId = this.get('currentUser').id
        let contractStatus = this.get('contract.contract_status');
        let renterId = this.get('contract.renter_user_id');
        let ownerId = this.get('contract.owner_user_id');
        if((currentUserId == ownerId) && [1, 3].includes(contractStatus)){
            this.set("isOwnerAndNeedAprroved", true);
        }else if( (currentUserId == renterId) && [1, 2].includes(contractStatus)){
            this.set("isRenterAndNeedAprroved", true);
        }else{
            this.set('noNeedAprroved', true);
        }
    },
    actions:{
        paymentCollection(id){
            let self = this;
            new Ember.RSVP.Promise(function (resolve, reject) {
                self.manager.ajaxRequest(self, self.get('urls').paymentCollection(id), 'POST', resolve, reject);
            }).then(
                success => { 
                    // this.store.peekRecord('payment', id).unloadRecord();
                    this.store.pushPayload('payment', success)   
                    self.manager.toaster(self, 'تم تحصيل الدفعة')
                   
                },
                errors => {
                    this.set('isRequesting', false);
                    
                }
            )
        },
        createPaymentOrder(id){
            var self = this;
            let data = new FormData();
            data.append('data', JSON.stringify({
                "payment_id": id,
                " m_property_id": self.get('property').get('id')
            }))
            new Ember.RSVP.Promise(function (resolve, reject) {
                self.manager.ajaxRequestFile(self, self.get('urls').createPaymentOrder(), 'POST', resolve, reject, data);
            }).then(
                success => {    
                    self.manager.toaster(self, 'تم استلام طلب')
                   
                },
                errors => {
                    this.set('isRequesting', false);
                    console.log(errors)
                }
            )
        },
        backToContracts(){
            this.get('router').transitionTo('index.properties.show.contracts')
        },
        hideCard(Property) {
            this.toggleProperty(Property);
        },
        fileInputChange(file) {
            this.set(file, Ember.$('#' + file)[0].files[0].name);

        },
        hideUnit(unit) {
            unit.toggleProperty('collapse');
        },
        cancelContract(id){
            
        },
        contractAgree(value){
            var self = this;
            this.set('isRequesting', true);
            new Ember.RSVP.Promise(function (resolve, reject) {
                self.manager.ajaxRequestFile(self, self.get('urls').changeContractStatus(self.get('contract').id, value), 'POST', resolve, reject);
            }).then(
                success => {
                    this.set('isRequesting', false);
                    this.manager.toaster(self, 'تم الموافقة على العقد')
                    this.set("isOwnerAndNeedAprroved", false);
                    this.set("isRenterAndNeedAprroved", false);
                    this.set('noNeedAprroved', true);
                },
                errors => {
                    console.log(errors)
                    this.set('isRequesting', false);
                }
            )
        },
        contractDisagree(value){
            var self = this;
            swal({
                title: "هل أنت متأكد",
                text: "سيتم رفض العقد",
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
                        new Ember.RSVP.Promise(function (resolve, reject) {
                            self.manager.ajaxRequestFile(self, self.get('urls').changeContractStatus(self.get('contract').id, value), 'POST', resolve, reject);
                        }).then(
                            success => {    
                                self.manager.toaster(self, 'تم رفض العقد')
                                this.set("isOwnerAndNeedAprroved", false);
                                this.set("isRenterAndNeedAprroved", false);
                                this.set('noNeedAprroved', true);
                            },
                            errors => {
                                console.log(errors)
                                this.set('isRequesting', false);
                            }
                        ) 
                    }
                })
            console.log(value)
        },
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
                            self.get('router').transitionTo('index.properties.show.contracts')
                          });
                         
                     }
                 })
 
 
         },
    }
});
