import Component from '@ember/component';
import swal from 'sweetalert';

export default Component.extend({
    user: {},
    didInsertElement() {
       if(this.get('property').get('owner').get('id')){
           this.set('user', this.store.peekRecord('user', this.get('property').get('owner').get('id')));
           this.set('validationUser',this.get('property').get('owner'))

       }
       this.set('nationalities', this.store.findAll('nationality'));
       this.set('banks', this.store.findAll('bank'));
       this.set('idTypes', this.store.findAll('id-type'));
       this.set('regions', this.store.findAll('region'));
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
            console.log(user)
            this.store.pushPayload('user', {'user':user});
            this.set('user', this.store.peekRecord('user', user.id));
            this.set('isSearch', false);
            this.set('validationUser', JSON.parse(JSON.stringify(user)));
        },
        saveUser(){
            var self = this;
            var createdUser = this.store.createRecord('user', self.get('user'));
            var user = createdUser.toJSON();
            user.mproperty_id = this.get('property').get('id');
            user.user_relation = 1;
            user.registered = 0;
            new Ember.RSVP.Promise(function(resolve, reject) {
                self.manager.ajaxRequest(self, self.get('urls').getUrl('users'), 'POST', resolve, reject, user);
            }).then(
                success => {
                   
                    
                },
                errors => {
                    console.log(errors)
                }
            )
        },
        deleteUser(){
            var self = this;
            swal({
                title: "هل أنت متأكد",
                text: "سوف يتعين عليك أضافة مالك جديد",
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
                          self.store.findRecord('mproperty', self.get('property').get('id')).then(function(property) {
                            property.set('owner', null);
                            property.save(); // => PATCH to '/posts/1'
                          });
                    }})

        },
        updateUser(){
            var self = this;
            var user =  self.get('user').toJSON();
            user.mproperty_id = this.get('property').get('id');
            user.user_relation = 1;
            new Ember.RSVP.Promise(function(resolve, reject) {
                self.manager.ajaxRequest(self, self.get('urls').updateUser(self.get('user').get('id')), 'PUT', resolve, reject, user);
            }).then(
                success => {
                   
                    
                },
                errors => {
                    console.log(errors)
                }
            )
        },
    }
});
