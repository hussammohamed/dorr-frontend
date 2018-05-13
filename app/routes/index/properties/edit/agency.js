import Route from '@ember/routing/route';

export default Route.extend({
    breadCrumb:{
        title: "تعديل بيانات السجل التحاري   "
    },
    model(){
        return this.modelFor('index.properties.edit');
    },
    setupController: function (controller, model) {
        controller.set('property', model);
    }
});