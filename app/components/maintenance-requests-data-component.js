import Component from '@ember/component';

import dorrValidations from '../mixins/dorr-validations'
export default Component.extend(dorrValidations, {
    didInsertElement() {
        let currentUserID = this.get('currentUser').id
        let ownerId = this.get("property").get('owner').get('id')
        let agentId = this.get('property').get('agent').get('id')
        if(currentUserID == ownerId || currentUserID == agentId){
            this.set('isNotRenter', true);
        }else{
            this.set('isNotRenter', false);
        }
        var self = this;
        this.set('selectedUnits', this.get('property').get('units'));
        this.set('ownerResponses', this.store.peekAll('owner-response'));
        this.set('types', this.store.peekAll('service-type'));
        if(!this.get('request')){
            this.set('request', this.store.createRecord('maintenance', {
                m_property_id: self.get('property').get('id'),
            }));
        }
    },
   
    actions:{
        fileInputChange(file){
            this.set(file, Ember.$('#' + file)[0].files[0].name);
             
         },
        saveRequest(){
        this.set('isRequesting', true);
        var self = this;
        let request = this.get('request');
        let data = new FormData();
            data.append("data", JSON.stringify(request));
            new Ember.RSVP.Promise(function (resolve, reject) {
                self.manager.ajaxRequestFile(self, self.get('urls').saveMaintenance(), 'POST', resolve, reject, data);
            }).then(
                success => {
                    this.set('isRequesting', false);
                    this.get('router').transitionTo("index.properties.show.maintenance-requests.lists.pending")
                },
                errors => {
                    console.log(errors)
                    this.set('isRequesting', false);
                }
            )

        },
        updateRequest(status){
            this.set('isRequesting', true);
            var self = this;
            let request = this.get('request').toJSON();
            if(request.owner_response == 4){
                request.status =  4;
            }else{
                request.status =  status;
            }
            
            let data = new FormData();
            data.append("data", JSON.stringify(request));
            data.append('invoice_image', Ember.$('#inputFile')[0].files[0]);
            new Ember.RSVP.Promise(function (resolve, reject) {
                self.manager.ajaxRequestFile(self, self.get('urls').updateMaintenance(self.get("request").get("id")), 'POST', resolve, reject, data);
            }).then(
                success => {
                    this.set('isRequesting', false);
                    this.get('router').transitionTo("index.properties.show.maintenance-requests.lists.pending")
                },
                errors => {
                    console.log(errors)
                    this.set('isRequesting', false);
                }
            )

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
                           self.get('router').transitionTo("index.properties.show.maintenance-requests.lists.pending");
                           
                         });
                        
                    }
                })

        }
    }
});
