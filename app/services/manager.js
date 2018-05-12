import Ember from 'ember';
export default Ember.Service.extend({
    ajaxRequest(self, url, method, resolve, reject, data){
          Ember.$.ajax({
                 url: url,
                 method: method,
                 content: 'application/x-www-form-urlencoded',
                 headers: {
                     "Authorization": self.get('session').authToken(),
                 },
                 
                 crossDomain: true,
                 data: data,
                 timeout: 60000,
                 success: Ember.run.bind(null, resolve),
                 error: Ember.run.bind(null, reject)
             }).fail(function() { console.log("failed") });
     },
     ajaxRequestFile(self, url, method, resolve, reject, data){
        Ember.$.ajax({
               url: url,
               method: method,
               contentType: false, // NEEDED, DON'T OMIT THIS (requires jQuery 1.6+)
               processData: false, // NEEDED, DON'T OMIT THIS
               headers  : {
                   "Authorization": self.get('session').authToken(),
               },
               
               crossDomain: true,
               data: data,
               timeout: 60000,
               success: Ember.run.bind(null, resolve),
               error: Ember.run.bind(null, reject)
           }).fail(function() { console.log("failed") });
   },
     toaster(self, text){
        self.get('paperToaster').show(text, {
            duration: 4000,
            escapeToClose: true,
          });
    },
});