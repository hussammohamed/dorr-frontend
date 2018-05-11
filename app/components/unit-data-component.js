import Component from '@ember/component';

export default Component.extend({
    didInsertElement() {
        this.set('types', this.store.peekAll('type'));
        this.set('furnished', this.store.peekAll('furnished'));
        this.set('furnished-status', this.store.peekAll('furnished-status'));
        this.set('kitchen-cabinet', this.store.peekAll('kitchen-cabinet'));
        let units =  this.get('property').get('units');
        this.set('units', units);
        if(!units.linght){
            this.store.createRecord('unit', {
                mproperty: this.get('property'),
            })
        }
        
       
    
 
        
     },
    actions:{
        SubmitAction(){
            console.log('true');
        },
        setNewUnit(){
            Ember.$('form').submit();
            console.log(this)
            // this.store.createRecord('unit', {
            //     mproperty: this.get('property'),
            // })

        },
        hideUnit(unit){
            unit.toggleProperty('collapse');            
        },
        saveUnit(){

        },
        updateUnit(){
            
        }
    }
});
