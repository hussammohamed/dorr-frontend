import Component from '@ember/component';

export default Component.extend({
    didInsertElement() {
        this.set('selectedUnits', this.get('property').get('units'));
        this.set('request', {})
    },
   
    actions:{
        saveRequest(){

        },
        updateRequest(){

        }
    }
});
