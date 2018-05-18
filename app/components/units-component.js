import Component from '@ember/component';

export default Component.extend({
    didInsertElement() {
        this.set('currentUserId', this.get('session').authUserId())
    },
    actions:{
        rentAction(){
            
        },
        unitView(id){
            this.get('router').transitionTo('index.properties.show.units.unit-show', id)
        },
        editUnit(id){
            this.get('router').transitionTo('index.properties.show.units.unit-edit', id)
        },
        addUnit(){
            this.get('router').transitionTo('index.properties.show.units.unit-add')
        }
    }
});
