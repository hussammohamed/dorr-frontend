import Component from '@ember/component';

export default Component.extend({
    actions:{
        hideUnit(Property){
            this.toggleProperty(Property);
        },
        editProperty(){
            this.get('router').transitionTo('index.properties.edit.status', this.get('property').get('id'))
        },
    }
});
