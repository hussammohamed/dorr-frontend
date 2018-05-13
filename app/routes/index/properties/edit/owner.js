import Route from '@ember/routing/route';

export default Route.extend({
    breadCrumb:{
        title: "تعديل بيانات  صاحب العقار "
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
