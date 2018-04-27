import Component from '@ember/component';

export default Component.extend({
    didInsertElement() {
        if(this.get('property').get('agent').get('agency')){
            this.set('agency', this.get('property').get('agent').get('agency'))
        }
        this.set('regions', this.store.findAll('region'));
     },
     actions:{
         basicSubmitAction(){
 
         }
     }
});
