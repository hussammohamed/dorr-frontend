import Route from '@ember/routing/route';

export default Route.extend({
    breadCrumb: Ember.computed('controller.model.name', 'model', {
        get() {
         
        return {
            title:"أضف عقار",
            linkable:false,
    }
          
        }
      }),
});
