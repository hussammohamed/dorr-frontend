import Route from '@ember/routing/route';

export default Route.extend({
    manager: Ember.inject.service(),
    model (){
        let property = this.modelFor('index.properties.show');
        let self = this;
        return Ember.RSVP.hash({
            "property": this.modelFor('index.properties.show'),
            "currentUser": this.modelFor('index'),
            "total": new Ember.RSVP.Promise(function(resolve, reject) {
                self.get('manager').ajaxRequest(self, self.get('urls').getBalances(property.id), 'GET', resolve, reject);
            }).then(
                success => {
                   let totals  = success.total[0];
                   totals.balance =  parseInt(totals.income) - (parseInt(totals.outcome) + parseInt(totals.withdraws));
                   return totals;
                },
                errors => {
                }
            ),
            "withdraws": new Ember.RSVP.Promise(function(resolve, reject) {
                self.get('manager').ajaxRequest(self, self.get('urls').getTransaction(property.id), 'GET', resolve, reject);
            }).then(
                success => {
                    let transactions = [];
                    this.store.pushPayload('transaction', success);
                    this.store.peekAll('transaction').map(function(record){
                        if(property.id == record.get('m_property_id') && record.get('type') == 3){
                            transactions.push(record);
                        }
                      
                    });
                    return  transactions;
                },
                errors => {
                }
            )
        });
    },
    setupController: function (controller, model) {
        controller.set('property', model.property);
        controller.set('currentUser', model.currentUser);
        controller.set('withdraws', model.withdraws);
        controller.set('total', model.total)
    }
   

});
