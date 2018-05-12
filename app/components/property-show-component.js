import Component from '@ember/component';

export default Component.extend({
    actions:{
        hideUnit(Property){
            this.toggleProperty(Property);
        }
    }
});
