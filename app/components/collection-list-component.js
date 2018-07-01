import Component from '@ember/component';

export default Component.extend({
    didInsertElement() {
        let self = this;
        new Ember.RSVP.Promise(function (resolve, reject) {
            self.manager.ajaxRequestFile(self, self.get('urls').getPaymentsOrderByProperty(self.get('property').id), 'GET', resolve, reject);
        }).then(
            success => {
                this.set('isRequesting', false);
                this.store.peekAll('payment-order').map(function(record){
                    record.unloadRecord();
                })
                this.store.pushPayload(success);
                this.set('orders', this.store.peekAll('payment-order'));

            },
            errors => {
               
                this.set('isRequesting', false);
            }
        )
    },
    actions:{
        editOrder(id){
            this.get('router').transitionTo("index.properties.show.collection-requests.edit", id);
        },
        deleteOrder(){
            
        }
    }
});
