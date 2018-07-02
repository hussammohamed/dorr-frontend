import Route from '@ember/routing/route';

export default Route.extend({
    breadCrumb: Ember.computed(function(){
        return {
            title: this.controller.property.get('name'),
            linkable: true,
            path: "index.properties.show.property-data"
        }
    }),
    model(params){
        return this.store.findRecord('mproperty', params.id);
    },
    setupController: function (controller, model) {
        controller.set('property', model)
        this.get('breadCrumb').title = model.get('name');
    }
});
