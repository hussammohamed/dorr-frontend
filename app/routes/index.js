import Route from '@ember/routing/route';

export default Route.extend({
    manager: Ember.inject.service(),
    model(){
        var self = this;
        return new Ember.RSVP.Promise(function(resolve, reject) {
            self.get('manager').ajaxRequest(self, self.get('urls').get('user'), 'GET', resolve, reject);
        }).then(
            success => {
                this.store.pushPayload('user', success);
                return this.store.peekRecord('user', success.user.id);
            },
            errors => {
                console.log(errors);
            }
        )

    },
    beforeModel(){
        
        this.get('session').ensureAuthenticated();
    },
    setupController: function (controller, model) {
        controller.set('user', model);
    }
});
