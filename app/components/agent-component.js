import Component from '@ember/component';

export default Component.extend({
    didInsertElement() {
        if(this.get('property').get('agent')){
            this.set('user', this.get('property').get('agent'))
        }
        this.set('nationalities', this.store.findAll('nationality'));
        this.set('banks', this.store.findAll('bank'));
        this.set('idTypes', this.store.findAll('id-type'));
        this.set('regions', this.store.findAll('region'));
     },
     actions:{
         basicSubmitAction(){
 
         }
     }
});
