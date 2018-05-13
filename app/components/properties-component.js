import Component from '@ember/component';

export default Component.extend({
    didInsertElement() {
        this.set('currentUser', this.get('currentUser'))
    },
    actions:{
        rentAction(){
            
        },
        propertyView(id){
            this.get('router').transitionTo('index.properties.show.property-data', id)
        },
        editProperty(id){
            this.get('router').transitionTo('index.properties.property-status', id)
        },
        addProperty(){
            this.get('router').transitionTo('index.properties.add.property-data')
        }
    }
});
