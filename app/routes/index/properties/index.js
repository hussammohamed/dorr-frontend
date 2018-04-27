import Route from '@ember/routing/route';

export default Route.extend({
    model(){
        return this.store.findAll('MProperty');
    },
    setupController: function (controller, model) {
        controller.set('properties', model);
    }
});
