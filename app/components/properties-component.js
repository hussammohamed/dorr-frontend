import Component from '@ember/component';

export default Component.extend({
    didInsertElement() {
    },
    actions:{
        rentAction(){
            
        },
        propertyView(id){

        },
        editProperty(id){
            this.get('router').transitionTo('index.properties.property-status', id)
        },
        addProperty(){
            this.get('router').transitionTo('index.properties.add.property-data')
        }
    }
});
