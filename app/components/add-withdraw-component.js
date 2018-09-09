import Component from '@ember/component';

export default Component.extend({
    didInsertElement() {
        this.set('types', this.store.peekAll('transaction-method'));
        this.set('request', {"m_property_id": this.get('property').get('id')})
    },
    actions:{
        saveRequest(){
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
                    // this.get('router').transitionTo('index.properties.property-status', this.get('property').get('id'));
                    // this.set('isRequesting', false);
                    console.log(success)
                },
                errors => {
                    console.log(errors)
                    this.set('isRequesting', false);
                }
            )
        },
        fileInputChange(file){
            this.set(file, Ember.$('#' + file)[0].files[0].name);
             
         },
    }
});
