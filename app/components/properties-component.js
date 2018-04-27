import Component from '@ember/component';

export default Component.extend({
    didInsertElement() {
    },
    actions:{
        rentAction(){
            
        },
        addProperty(){
            this.get('router').transitionTo('index.properties.add.property-data')
        }
    }
});
