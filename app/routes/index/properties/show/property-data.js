import Route from '@ember/routing/route';

export default Route.extend({
    breadCrumb: {
        title: 'بيانات العقار',
        linkable: true,
        path: 'index.properties'
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
