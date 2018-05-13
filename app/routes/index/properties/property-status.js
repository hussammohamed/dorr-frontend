    import Route from '@ember/routing/route';
    import index from './show/units';

    export default Route.extend({
        breadCrumb: Ember.computed('controller.model.name', 'model', {
            get() {
             
            return {
                title: "أضف عقار",
                linkable:false,
        }
              
            }
          }),
        model(params){
            return {
                'propertyId':params.id, 'currenUser': this.modelFor('index'), 'property':  this.store.find('mproperty', params.id)
            }    
        },
        setupController: function (controller, model) {
            controller.set('property', model.property)
            controller.set('propertyId', model.propertyId);
            controller.set('currenUser', model.currenUser);
            
        }
    });
