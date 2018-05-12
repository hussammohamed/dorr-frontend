import Controller from '@ember/controller';

export default Controller.extend({
    session: Ember.inject.service(),
    actions:{
        logout() {
            this.get('session').deleteUserSession();
        },
    }
});
