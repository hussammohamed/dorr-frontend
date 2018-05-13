import Route from '@ember/routing/route';

export default Route.extend({
    breadCrumb:{
        title: "أضف وحدات"
    },
    model(){
        return {
            "property": this.modelFor('index.properties.edit'),
            "currentUser": this.modelFor('index'),
        }
    },
    setupController: function (controller, model) {
        controller.set('property', model.property);
        controller.set('currentUser', model.currentUser);
    }
});
