import Route from '@ember/routing/route';

export default Route.extend({
    breadCrumb: Ember.computed('controller.model.name', 'model', {
        get() {
         
        return {
            title:this.controller.requestId,
    }
          
        }
      }),
        model(params){
            return this.store.find('payment-order', params.payment_order_id).then(
                succsess =>{
                    return {
                        "property": this.modelFor('index.properties.show'),
                        "currentUser": this.modelFor('index'),
                        "order": succsess,
                        "requestId": params.payment_order_id
                    }
                }
            )
           
        },
        setupController: function (controller, model) {
            controller.set('requestId', model.requestId);
            controller.set('order', model.order);
            controller.set('property', model.property);
            controller.set('currentUser', model.currentUser);
        }
});
