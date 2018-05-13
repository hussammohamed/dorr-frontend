import Route from '@ember/routing/route';

export default Route.extend({
    breadCrumb: Ember.computed('controller.model.name', 'model', {
    get() {
     
    return {
        title:this.controller.model.get('name'),
        linkable:true,
        path:"index.properties.show.property-data"
}
      
    }
  }),
    model(params){
        return this.store.find('mproperty', params.id);
    }
});
