import Route from '@ember/routing/route';

export default Route.extend({
    breadCrumb: Ember.computed('controller.model.name', 'model', {
        get() {
         
        return {
            title:this.controller.unit.get('no'),
            linkable:true,
            path:"index.properties.show.units.unit-show"
    }
          
        }
      }),
        model(params){
            return this.store.find('unit', params.unit_id);
        },
        setupController: function (controller, model) {
            controller.set('unit', model);
        }

});
