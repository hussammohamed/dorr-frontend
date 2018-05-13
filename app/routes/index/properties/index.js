import Route from '@ember/routing/route';

export default Route.extend({
    model(){
        return {
            'currenUser': this.modelFor('index'),
            'properties': this.store.findAll('MProperty'),
        }  
    },
    setupController: function (controller, model) {
        controller.set('properties', model.properties);
        controller.set('currentUser', model.currenUser);
    }
});
