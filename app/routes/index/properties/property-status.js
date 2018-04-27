import Route from '@ember/routing/route';

export default Route.extend({
    model(params){
        return {
            'propertyId':params.id, 'currenUser': this.modelFor('index')
        }    
    },
    setupController: function (controller, model) {
        controller.set('propertyId', model.propertyId);
        controller.set('currenUser', model.currenUser);
        
    }
});
