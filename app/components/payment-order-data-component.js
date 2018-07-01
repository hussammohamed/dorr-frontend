import Component from '@ember/component';

export default Component.extend({
    didInsertElement() {
        this.paid();
        this.set('collects', this.get('order').get('payment_collects'));
        this.set('currentRemain', this.get('order').get('payment_collects').get('lastObject').get('remain'))
    },
    paid() {
        let order = this.get('order');
        let paid = 0;
        this.get('order').get('payment_collects').map(function (record) {
                paid += record.get('amount');
                record.set('remain', (order.get('amount') - paid));
        })
    },
    actions: {
        changeAmount(collect, amount) {

            collect.set('amount', new Number(amount));
            this.paid();
        },
        addCollect() {
            let paymentOrder = this.get('order');
            let order = this.get('order');
            this.store.createRecord('payment-collect', {
                payment_order_id: order,
                amount: 0
            });
            this.paid();
            this.set('isNewCollect', true);
        },
        deleteCollect(index, collect) {
            collect.unloadRecord();
            this.set('isNewCollect', false);
        },
        saveOrder() {
            this.set('isRequesting', true);
            let self = this;
            let collect;
            this.store.peekAll('payment-collect').map(function (record) {
                if (!record.id) {
                    collect = record.toJSON();
                }
            })
            if (collect) {
                let formData = new FormData();
                formData.append('data', JSON.stringify(collect));
                new Ember.RSVP.Promise(function (resolve, reject) {
                    self.manager.ajaxRequestFile(self, self.get('urls').createPaymentCollect(), 'POST', resolve, reject, formData);
                }).then(
                    success => {
                        this.set('isRequesting', false);
                        this.get('router').transitionTo('index.properties.show.collection-requests.lists.pending')
                    },
                    errors => {
                        console.log(errors)
                        this.store.unloadRecord(property)
                        this.set('isRequesting', false);
                    }
                )
            } else {
                this.set('isRequesting', false);
            }
        },
        closeOrder() {
            let self = this;
            this.set('isRequesting', true);
            let data = new FormData();
            data.append('data', JSON.stringify({
               "status": 1,
            }))
            new Ember.RSVP.Promise(function (resolve, reject) {
                self.manager.ajaxRequestFile(self, self.get('urls').updatedPaymentOrder(self.get('order').id), 'POST', resolve, reject, data);
            }).then(
                success => {
                    this.set('isRequesting', false);
                    this.store.pushPayload(success)    
                    this.get('router').transitionTo('index.properties.show.collection-requests.lists.pending')
                },
                errors => {
                    this.set('isRequesting', false);
                    console.log(errors)
                }
            )
        }
    }
});
