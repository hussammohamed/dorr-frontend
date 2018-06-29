import Route from '@ember/routing/route';

export default Route.extend({
    breadCrumb: {
        title: "طلبات تحصيل قائمة"
    },
     model(){
        return {
            "property": this.modelFor('index.properties.show'),
            "currentUser": this.modelFor('index'),
        }
    },
    setupController: function (controller, model) {
        controller.set('property', model.property);
        controller.set('currentUser', model.currentUser);
    }
});
