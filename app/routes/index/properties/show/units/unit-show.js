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
            return this.store.find('unit', params.unit_id).then(
                succsess => {
                    return{
                        "unit": succsess,
                        "currentUser": this.modelFor('index'),
                    }
                }
            );
        },
        setupController: function (controller, model) {
            controller.set('unit', model.unit);
            controller.set('currentUser', model.currentUser)
        }

});
