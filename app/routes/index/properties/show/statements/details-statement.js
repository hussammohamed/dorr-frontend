import Route from '@ember/routing/route';

export default Route.extend({
    breadCrumb: {
        title: "تفاصيل الحساب",
        linkable: false,
    },
    manager: Ember.inject.service(),
    model(){
        let property = this.modelFor('index.properties.show');
        let self = this;
        return Ember.RSVP.hash({
            "property": this.modelFor('index.properties.show'),
            "currentUser": this.modelFor('index'),
            "transactions": new Ember.RSVP.Promise(function(resolve, reject) {
                self.get('manager').ajaxRequest(self, self.get('urls').getTransaction(property.id), 'GET', resolve, reject);
            }).then(
                success => {
                    let transactions = [];
                    let balance = 0;
                    this.store.pushPayload('transaction', success);
                    this.store.peekAll('transaction').map(function(record){
                        if(property.id == record.get('m_property_id')){
                            if(record.get('type') == 1){
                                balance = balance + record.get('amount');
                            }else{
                                balance = balance - record.get('amount');
                            }
                            record.set('balance', balance)
                           
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
        controller.set('transactions', model.transactions);
    }
});
