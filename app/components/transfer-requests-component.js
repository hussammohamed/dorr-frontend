import Component from '@ember/component';

export default Component.extend({
    didInsertElement() {

    },
    
    actions:{
        requestAgree(id){
            var self = this;
            this.set('isRequesting', true);
            new Ember.RSVP.Promise(function(resolve, reject) {
                self.manager.ajaxRequest(self, self.get('urls').agreeTransferRequest(id), 'POST', resolve, reject);
            }).then(
                success => {
                    self.manager.toaster(self, 'تم قبول الطلب بنجاح')
                    this.store.pushPayload('transfer-request', success);
                    let requests = [];
                     this.store.peekAll('transfer-request').map(function(record){ 
                        if(record.get('status') == 0) 
                        requests.push(record);
                    });
                    this.set('transferRequests',requests);
                    this.set('isRequesting', false);
                },
                errors => {
                    this.set('isRequesting', false);
                }
            )
        }
    }

});
