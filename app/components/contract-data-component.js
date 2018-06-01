import Component from '@ember/component';

export default Component.extend({ 
    didInsertElement() {
        
        this.set('types', this.store.peekAll('type'));
        this.set('furnished', this.store.peekAll('furnished'));
        this.set('furnished-status', this.store.peekAll('furnished-status'));
        this.set('kitchen-cabinet', this.store.peekAll('kitchen-cabinet'));
        this.set('contractTypes', this.store.peekAll('contract-type'));
        this.set('usageTypes', this.store.peekAll('usage-type'));
        this.set('regions', this.store.peekAll('region'));
        this.set('owner', this.get('property').get('owner'))
        this.set('agent', this.get('property').get('agent'))
        this.set('agency', this.get('property').get('agency'))
        this.set('nationalities', this.store.peekAll('nationality'));
        this.set('contractConditions', this.store.peekAll('contract-condition'));
        this.set('idTypes', this.store.peekAll('id-type'));
        this.set('calendarTypes', [{'id': 1, 'name': "التقويم الميلادي"}, {'id': 2, 'name': 'التقويم الهجري'}])
        this.set('contract', {});
        this.set('payments', [])
        this.set('companions', [])
        if(this.get('unit')){
            let unit = this.store.peekRecord('unit', this.get('unit').get('id'));
            unit.set('selected', unit);
            this.set('units', [unit]);  
        } else {
            this.set('units', [this.store.createRecord('unit', {

            })]);
        }
        this.set('selctedUnits', this.get('property').get('units'));
     },
     actions:{
        changeContractType(value){

            this.set('contract_type_id', value);
            this.set('contract.contract_type_id', this.store.peekRecord('contract-type', value))
            this.set('isType', true);
        },
        addContract(){

        },
        hideCard(Property){
            this.toggleProperty(Property);
        },
        hideUnit(unit){
            unit.toggleProperty('collapse');            
        },
        chooseUnit(index, selectedUnit){
            let units = this.get('units');
            selectedUnit.set('selected', selectedUnit)
            let newUntis = [...units.splice(0, index), selectedUnit, ...units.splice(index+1)]
            this.set('units', newUntis);           
        },
        addUnit(){
            let units = this.get('units');
            units.pushObject(this.store.createRecord('unit', {

            }))
        },
        addCompanion(){
            let companions = this.get('companions');
            companions.pushObject(this.store.createRecord('user', {

        }))
        },
        deleteUnit(index){
            let units = this.get('units');
            let newUntis = [...units.splice(0, index), ...units.splice(index+1)]
            this.set('units', newUntis);         
        },
        deleteCompanion(index){
            let companions = this.get('companions');
            let newCompanions = [...companions.splice(0, index), ...companions.splice(index+1)]
            this.set('companions', newCompanions);    
        },
        addPayment(){
            let payments = this.get('payments');
            payments.pushObject({})
        },
        renterSearch(){
            var self = this;
            var data = {
                "key": this.get("userSearchValue"),
            }
            
            new Ember.RSVP.Promise(function(resolve, reject) {
                self.manager.ajaxRequest(self, self.get('urls').getUrl("searchUser"), 'POST', resolve, reject, data);
            }).then(
                success => {
                    this.set('isSearch', true);
                    this.set('searchUserResult', success.user);
                },
                errors =>{

                }
            )
        },
        setRenter(user){
            this.store.pushPayload('user', {'user':user});
            this.set('renter', this.store.peekRecord('user', user.id));
            this.set('isSearch', false);
            this.set('validationUser', JSON.parse(JSON.stringify(user)));
        },
        fileInputChange(file){
            this.set(file, Ember.$('#' + file)[0].files[0].name);
             
         },

     }
    
});
