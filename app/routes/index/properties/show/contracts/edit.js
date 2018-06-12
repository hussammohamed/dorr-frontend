import Route from '@ember/routing/route';

export default Route.extend({
    breadCrumb:{
        title: "أكمال العقد"
    },
    manager: Ember.inject.service(),
    model(params){
        var self = this;
        return Ember.RSVP.hash({
            "property": this.modelFor('index.properties.show'),
            "currentUser": this.modelFor('index'),
            "contract": new Ember.RSVP.Promise(function(resolve, reject) {
                self.get('manager').ajaxRequest(self, self.get('urls').getContrarct(params.contract_id), 'GET', resolve, reject);
            }).then(
                success => {
                    this.store.pushPayload('contract', success);
                    return this.store.peekRecord('contract', params.contract_id);
                },
                errors => {
                    console.log(errors);
                }
            )
        });
    },
    setupController: function (controller, model) {
        controller.set('contract', model.contract)
        controller.set('property', model.property);
        controller.set('currentUser', model.currentUser);
    }
});
