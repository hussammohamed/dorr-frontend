import Route from '@ember/routing/route';

export default Route.extend({
    breadCrumb:{
        title: "تعديل وحدة"
    },
    model(params){
        return {
            "property": this.modelFor('index.properties.show'),
            "currentUser": this.modelFor('index'),
            "unit": this.store.peekRecord('unit', params.unit_id)
        }
    },
    setupController: function (controller, model) {
        controller.set('property', model.property);
        controller.set('currentUser', model.currentUser);
        controller.set('unit', model.unit);
    }
});
