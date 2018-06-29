import Route from '@ember/routing/route';

export default Route.extend({
    breadCrumb: Ember.computed('controller.model.name', 'model', {
        get() {
         
        return {
            title:this.controller.requestId,
    }
          
        }
      }),
        model(params){
            return {
                "property": this.modelFor('index.properties.show'),
                "currentUser": this.modelFor('index'),
                "request": this.store.find('maintenance', params.maintenance_id),
                "requestId": params.maintenance_id
            }
        },
        setupController: function (controller, model) {
            controller.set('requestId', model.requestId);
            controller.set('request', model.request);
            controller.set('property', model.property);
            controller.set('currentUser', model.currentUser);
        }
});
