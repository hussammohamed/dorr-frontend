import Component from '@ember/component';
import dorrValidations from '../mixins/dorr-validations'
export default Component.extend(dorrValidations,{
    didInsertElement() {
        var self = this;
        this.set('types', this.store.peekAll('transaction-method'));
        this.set('request', {"m_property_id": this.get('property').get('id')})
       new Ember.RSVP.Promise(function(resolve, reject) {
            self.get('manager').ajaxRequest(self, self.get('urls').getBalances( self.get('property').get('id')), 'GET', resolve, reject);
        }).then(
            success => {
               let totals  = success.total[0];
               totals.balance =  parseInt(totals.income) - (parseInt(totals.outcome) + parseInt(totals.withdraws));
               this.set('totals',totals);
               this.set('balanceError',   ' لايجب ان يكون المبلغ اكبر من الرصيد' + " (" + totals.balance  + ")" )
            },
            errors => {
                console.log(errors)
            }
        )
    },
    actions:{
        saveRequest(){
            this.set('isRequesting', true);
            let requestObject = this.get('request');
            let request = {};
            let formData = new FormData();
            let self = this;
            
            for(let k in requestObject){
                if(typeof requestObject[k] == "object" &&   requestObject[k].id){
                    request[k] = requestObject[k].id;
                }else{
                    request[k] = requestObject[k];
                }
            }
            request.type = 3;
            request.name = "سحب بواسطة المالك"
            formData.append('image', Ember.$('#inputFile')[0].files[0]);
            formData.append('data', JSON.stringify(request))
            new Ember.RSVP.Promise(function(resolve, reject) {
                self.manager.ajaxRequestFile(self, self.get('urls').addTransaction(), 'POST', resolve, reject, formData);
            }).then(
                success => {
                    this.get('router').transitionTo('index.properties.show.statements', this.get('property').get('id'));
                    this.set('isRequesting', false);
                },
                errors => {
                    this.set('isRequesting', false);
                }
            )
        },
        fileInputChange(file){
            this.set(file, Ember.$('#' + file)[0].files[0].name);
             
         },
    }
});
