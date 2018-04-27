import Component from '@ember/component';

export default Component.extend({
    didInsertElement() {
        this.set('property', this.store.find('mproperty', this.get('propertyId')))
        
     },
     actions:{
        cardClick(route, id){
            this.get('router').transitionTo(route, id);
        }
     }
});
