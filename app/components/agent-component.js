import Component from '@ember/component';
import dorrValidations from '../mixins/dorr-validations'
export default Component.extend(dorrValidations, {
    user:{},
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
            this.set('validationUser', JSON.parse(JSON.stringify(user)));
        },
        updateUser(){
            var self = this;
            var user =  self.get('user').toJSON();
            var property = self.get('property').toJSON();
            user.mproperty_id = this.get('property').get('id');
            user.user_relation = 2;
            new Ember.RSVP.Promise(function(resolve, reject) {
                self.manager.ajaxRequest(self, self.get('urls').updateUser(self.get('user').get('id')), 'PUT', resolve, reject, user);
            }).then(
                success => {
                   
                    new Ember.RSVP.Promise(function(resolve, reject) {
                        self.manager.ajaxRequest(self, self.get('urls').updateProperty(self.get('property').get('id')), 'PUT', resolve, reject, property);
                    }).then(
                        success => {
                            this.get('router').transitionTo('index.properties.property-status', success.mproperty.id);
                        },
                        errors => {
                            console.log(errors)
                        }
                    ) 
                },
                errors => {
                    console.log(errors)
                }
            )
           
        },
        deleteSearch(){
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
        
        saveUser(){
            var self = this;
            var createdUser = this.store.createRecord('user', self.get('user'));
            var user = createdUser.toJSON();
            user.mproperty_id = this.get('property').get('id');
            user.user_relation = 2;
            user.registered = 0;
            var property = self.get('property').toJSON();
            new Ember.RSVP.Promise(function(resolve, reject) {
                self.manager.ajaxRequest(self, self.get('urls').getUrl('users'), 'POST', resolve, reject, user);
            }).then(
                success => {
                    new Ember.RSVP.Promise(function(resolve, reject) {
                        self.manager.ajaxRequest(self, self.get('urls').updateProperty(self.get('property').get('id')), 'PUT', resolve, reject, property);
                    }).then(
                        success => {
                            this.get('router').transitionTo('index.properties.property-status', success.mproperty.id);
                        },
                        errors => {
                            console.log(errors)
                        }
                    ) 
                },
                errors => {
                    console.log(errors)
                }
            )
        },
     }
});
