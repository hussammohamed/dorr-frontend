import Component from '@ember/component';

import dorrValidations from '../mixins/dorr-validations'
export default Component.extend(dorrValidations,{
    selectedUnits: Ember.computed(function(){
        return this.get('property').get('units').map(function(unit){
            return unit;
        })
    }),
    didInsertElement() {
        if(this.get('contract')){
            let contract = this.get('contract');
            this.set('isType', true);
            this.set('contract_type', contract.get('contract_type').get('id'));
            if(contract.get('contract_units').get('length')){
                this.set('units', contract.get('contract_units').map(function(unit){
                    unit.set('selected', unit);
                    return unit;
                }))
            }else{
                if (this.get('unit')) {
                    let unit = this.store.peekRecord('unit', this.get('unit').get('id'));
                    unit.set('selected', unit);
                    this.set('units', [unit]);
                } else {
                    this.set('units', [this.store.createRecord('contract-unit', {
        
                    })]);
                }
            }
            
            this.set('payments', contract.get('payments'));
            this.set('companions', contract.get('companions'))
        }else{
            this.set('contract', {});
            this.set('payments', [])
            this.set('companions', [])
            if (this.get('unit')) {
                let unit = this.store.peekRecord('unit', this.get('unit').get('id'));
                unit.set('selected', unit);
                this.set('units', [unit]);
            } else {
                this.set('units', [this.store.createRecord('contract-unit', {
    
                })]);
            }
        }
        
        this.set('contract.m_property_id', this.get('property').get('id'))
        this.set('types', this.store.peekAll('type'));
        this.set('furnished', this.store.peekAll('furnished'));
        this.set('furnished-status', this.store.peekAll('furnished-status'));
        this.set('kitchen-cabinet', this.store.peekAll('kitchen-cabinet'));
        this.set('contractTypes', this.store.peekAll('contract-type'));
        this.set('usageTypes', this.store.peekAll('usage-type'));
        this.set('regions', this.store.peekAll('region'));
        this.set('owner', this.get('property').get('owner'))
        this.set('contract.owner_user_id', this.get('property').get('owner').get('id'))
        this.set('agent', this.get('property').get('agent'))
        this.set('contract.agent_user_id', this.get('property').get('agent').get('id'))
        this.set('agency', this.get('property').get('agency'))
        this.set('nationalities', this.store.peekAll('nationality'));
        this.set('contractConditions', this.store.peekAll('contract-condition'));
        this.set('idTypes', this.store.peekAll('id-type'));
        this.set('calendarTypes', this.store.peekAll('calender-type'))
        // this.set('selectedUnits', this.get('property').get('units'));
    },
    actions: {
        submitInvalid(){

        },
        updateContract(contractStatus, id){
            var self = this;
            this.set('isRequesting', true);
            let contratct = this.get('contract').toJSON();
            contratct.contract_status = contractStatus
            delete contratct.units; delete contratct.payments; delete contratct.companions;
            let units = this.get('units').map(function (unit) {
                return { "id": unit.get('unit_id'), "electricity_measurement": unit.get('electricity_measurement'), "water_measurement": unit.get('water_measurement'), "gas_measurement": unit.get('gas_measurement') }
            })
            let companions = this.get('companions').map(function (user) {
                return user.toJSON();
            });
            let payments = this.get('payments').map(function (payment) {
                return payment.toJSON();
            });
            let data = new FormData();
            data.append("data", JSON.stringify(contratct));
            data.append("units", JSON.stringify(units));
            data.append("companions", JSON.stringify(companions));
            data.append("payments", JSON.stringify(payments));
            data.append("contract_image", Ember.$('#contractImageFile')[0].files[0])
            new Ember.RSVP.Promise(function (resolve, reject) {
                self.manager.ajaxRequestFile(self, self.get('urls').getContrarct(id), 'POST', resolve, reject, data);
            }).then(
                success => {
                    this.set('isRequesting', false);
                    this.get('router').transitionTo("index.properties.show.contracts")
                    
                },
                errors => {
                    console.log(errors)
                    this.set('isRequesting', false);
                }
            )
            
        },
        changeContractType(value) {
            this.set('contract_type', value);
            this.set('contract.contract_type', this.store.peekRecord('contract-type', value))
            this.set('isType', true);
        },
        addContract(contractStatus) {
            var self = this;
            this.set('isRequesting', true);
            let contratct = this.get('contract');
            let newContract = {};
            for (var k in contratct) {
                if (typeof contratct[k] == "object" && contratct[k].id) {
                    newContract[k] = contratct[k].id
                } else {
                    newContract[k] = contratct[k]
                }
            }
            newContract.contract_status = contractStatus
            if (this.get('renter')) {
                newContract.renter_user_id = this.get('renter').get('id');
            }else{
                newContract.renter_user_id = null;
            }
            let units = this.get('units').map(function (unit) {
                return { "id": unit.id, "electricity_measurement": unit.get('electricity_measurement'), "water_measurement": unit.get('water_measurement'), "gas_measurement": unit.get('gas_measurement') }
            })
            let companions = this.get('companions').map(function (user) {
                return user.toJSON();
            });
            let payments = this.get('payments')
            let data = new FormData();
            data.append("data", JSON.stringify(newContract));
            data.append("units", JSON.stringify(units));
            data.append("companions", JSON.stringify(companions));
            data.append("payments", JSON.stringify(payments));
            data.append("contract_image", Ember.$('#contractImageFile')[0].files[0])
            new Ember.RSVP.Promise(function (resolve, reject) {
                self.manager.ajaxRequestFile(self, self.get('urls').saveContract(), 'POST', resolve, reject, data);
            }).then(
                success => {
                    this.set('isRequesting', false);
                    this.get('router').transitionTo("index.properties.show.contracts")
                },
                errors => {
                    console.log(errors)
                    this.set('isRequesting', false);
                }
            )

        },
        hideCard(Property) {
            this.toggleProperty(Property);
        },
        hideUnit(unit) {
            unit.toggleProperty('collapse');
        },
        chooseUnit(index, selectedUnit) {
            let units = this.get('units');
            selectedUnit.set('selected', selectedUnit)
            let newUntis = [...units.splice(0, index), selectedUnit, ...units.splice(index + 1)]
            this.set('units', newUntis);
        },
        addUnit() {
            let units = this.get('units');
            units.pushObject(this.store.createRecord('contract-unit', {

            }))
        },
        addCompanion() {
            let companions = this.get('companions');
            companions.pushObject(this.store.createRecord('user', {

            }))
        },
        deleteUnit(index) {
            let units = this.get('units');
            let newUntis = [...units.splice(0, index), ...units.splice(index + 1)]
            this.set('units', newUntis);
        },
        deleteCompanion(index) {
            let companions = this.get('companions');
            let newCompanions = [...companions.splice(0, index), ...companions.splice(index + 1)]
            this.set('companions', newCompanions);
        },
        addPayment() {
            let payments = this.get('payments');
            if(this.get('contract').id){
                payments.pushObject(this.store.createRecord('payment', {

                }))
            }else{
                payments.pushObject({})
            }
            
        },
        deletePayment(index) {
            let payments = this.get('payments');
            let newPayments = [...payments.splice(0, index), ...payments.splice(index + 1)]
            this.set('payments', newPayments);
        },
        renterSearch() {
            var self = this;
            var data = {
                "key": this.get("userSearchValue"),
            }

            new Ember.RSVP.Promise(function (resolve, reject) {
                self.manager.ajaxRequest(self, self.get('urls').getUrl("searchUser"), 'POST', resolve, reject, data);
            }).then(
                success => {
                    this.set('isSearch', true);
                    this.set('searchUserResult', success.user);
                },
                errors => {

                }
            )
        },
        setRenter(user) {
            this.store.pushPayload('user', { 'user': user });
            this.set('renter', this.store.peekRecord('user', user.id));
            this.set('isSearch', false);
            this.set('validationUser', JSON.parse(JSON.stringify(user)));
        },
        fileInputChange(file) {
            this.set(file, Ember.$('#' + file)[0].files[0].name);

        },

    }

});
