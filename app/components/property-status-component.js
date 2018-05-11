import Component from '@ember/component';

export default Component.extend({
    didInsertElement() {
        this.store.unloadAll('unit');
        this.set('property', this.store.find('mproperty', this.get('propertyId')))
        
     },
     actions:{
        cardClick(route, id){
            this.get('router').transitionTo(route, id);
        },
        goHome(){
            this.get('router').transitionTo('index.properties')
        },
        fullAgent(){
            this.manager.toaster(this, "يرجي إدخال بيانات المدير")
        },
     }
});
