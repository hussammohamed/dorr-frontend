import Component from '@ember/component';
import dorrValidations from '../mixins/dorr-validations'
export default Component.extend(dorrValidations, {
    user:{},
    isRequesting: false,
    didInsertElement() {
        if(this.get('property').get('agent').get('id')){
            this.set('user', this.store.peekRecord('user', this.get('property').get('agent').get('id')));
            this.set('validationUser',this.get('property').get('agent'))
            this.set('validationProperty', this.get('property').toJSON());
        }
        this.set('nationalities', this.store.findAll('nationality'));
        this.set('banks', this.store.peekAll('bank'));
        this.set('idTypes', this.store.peekAll('id-type'));
        this.set('regions', this.store.peekAll('region'));
     },
     actions:{
        formClick(){
            this.set('isSearch', false);
        },
        userSearch(){
            var self = this;
            var data = {
                "key": this.get("userSearchValue"),
            }
            
            new Ember.RSVP.Promise(function(resolve, reject) {
                self.manager.ajaxRequest(self, self.get('urls').getUrl("searchUser"), 'POST', resolve, reject, data);
            }).then(
                success => {
                    this.set('isSearch', true);
                    this.set('searchUserResult', success.user);
                   
                   
                },
                errors =>{

                }
            )
        },
        setUser(user){
            this.store.pushPayload('user', {'user':user});
            this.set('user', this.store.peekRecord('user', user.id));
            this.set('isSearch', false);
            this.set('userSearchValue', null);
            this.set('isSearchUser', true);
            this.set('validationUser', JSON.parse(JSON.stringify(user)));
        },
        updateUser(searchUser){
            this.set('isRequesting', true);
            var self = this;
            var property = self.get('property').toJSON();
            var user =  self.get('user').toJSON();
            if(this.get('user').get('id') != this.get("currentUser").get('id')){
                delete property.createdBy
                property.agent_user_id = this.get('user').get('id');
                property.user_relation = 2;
                let data = new FormData();
                data.append('property_management_contract_image', Ember.$('#agencyFile')[0].files[0]);
                data.append('data', JSON.stringify(property));
                new Ember.RSVP.Promise(function(resolve, reject) {
                    self.manager.ajaxRequestFile(self, self.get('urls').updateProperty(self.get('property').get('id')), 'POST', resolve, reject, data);
                }).then(
                    success => {
                        this.get('router').transitionTo('index.properties.property-status', success.mproperty.id);
                        this.set('isRequesting', false);
                    },
                    errors => {
                        console.log(errors)
                        this.set('isRequesting', false);
                    }
                ) 
            }else{
            delete user.id_image;
            user.mproperty_id = this.get('property').get('id');
            user.user_relation = 2;
            var formData = new FormData();
             formData.append('data',  JSON.stringify(user));
             formData.append('id_image', Ember.$('#idFile')[0].files[0]);
            var propertyData =  new FormData();
            propertyData.append('data', JSON.stringify(property));
            propertyData.append('property_management_contract_image', Ember.$('#agencyFile')[0].files[0]);
            propertyData.append('agency_instrument_image', Ember.$('#agency_instrument_image')[0].files[0]);
            new Ember.RSVP.Promise(function(resolve, reject) {
                self.manager.ajaxRequestFile(self, self.get('urls').updateUser(self.get('user').get('id')), 'POST', resolve, reject, formData);
            }).then(
                success => {
                   
                    new Ember.RSVP.Promise(function(resolve, reject) {
                        self.manager.ajaxRequestFile(self, self.get('urls').updateProperty(self.get('property').get('id')), 'POST', resolve, reject, propertyData);
                    }).then(
                        success => {
                            this.get('router').transitionTo('index.properties.property-status', success.mproperty.id);
                            this.set('isRequesting', false);
                        },
                        errors => {
                            console.log(errors)
                            this.set('isRequesting', false);
                        }
                    ) 
                },
                errors => {
                    console.log(errors)
                    this.set('isRequesting', false);
                }
            )
        }
        },
        deleteSearch(){
            this.set('isSearchUser', false);
            this.set('user', {});
        },
        deleteUser(){
            var self = this;
            swal({
                title: "هل أنت متأكد",
                text: "سوف يتعين عليك أضافة مدير جديد",
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
                         let data = {
                            "agent_user_id": null,
                          }
                        new Ember.RSVP.Promise(function(resolve, reject) {
                            self.manager.ajaxRequest(self, self.get('urls').updateProperty(self.get('property').get('id')), 'PUT', resolve, reject, data);
                        }).then(
                            success => {
                               
                                
                            },
                            errors => {
                                console.log(errors)
                            }
                        )
                    }})

        },
        fileInputChange(file){
           this.set(file, Ember.$('#' + file)[0].files[0].name);
            
        },
        saveUser(){
            this.set('isRequesting', true);
            var self = this;
            var createdUser = this.store.createRecord('user', self.get('user'));
            var user = createdUser.toJSON();
            user.mproperty_id = this.get('property').get('id');
            user.user_relation = 2;
            user.registered = 0;
            var property = self.get('property').toJSON();
            var formData = new FormData();
            formData.append('data', JSON.stringify(user));
            formData.append('id_image', Ember.$('#idFile')[0].files[0]);
            formData.append('mproperty_id', this.get('property').get('id'));
            formData.append('user_relation', 2);
            var propertyData =  new FormData();
            propertyData.append('data', JSON.stringify(property));
            propertyData.append('property_management_contract_image', Ember.$('#agencyFile')[0].files[0]);
            propertyData.append('agency_instrument_image', Ember.$('#agency_instrument_image')[0].files[0]);
            new Ember.RSVP.Promise(function(resolve, reject) {
                self.manager.ajaxRequestFile(self, self.get('urls').getUrl('users'), 'POST', resolve, reject, formData);
            }).then(
                success => {
                    new Ember.RSVP.Promise(function(resolve, reject) {
                        self.manager.ajaxRequestFile(self, self.get('urls').updateProperty(self.get('property').get('id')), 'POST', resolve, reject, propertyData);
                    }).then(
                        success => {
                            this.get('router').transitionTo('index.properties.property-status', success.mproperty.id);
                            this.set('isRequesting', false);
                        },
                        errors => {
                            console.log(errors)
                            this.set('isRequesting', false);
                        }
                    ) 
                },
                errors => {
                    console.log(errors)
                    this.set('isRequesting', false);
                }
            )
        },
     }
});
