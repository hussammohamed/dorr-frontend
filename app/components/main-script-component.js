import Component from '@ember/component';

export default Component.extend({
    didInsertElement() {
        var self =  this;
        new Ember.RSVP.Promise(function(resolve, reject) {
            self.manager.ajaxRequest(self, self.get('urls').getUrl('getFormData'), 'GET', resolve, reject);
        }).then(
            success => {
               
            this.store.pushPayload(success);
            },
            errors => {
                console.log(errors)
            }
        )
        var userMenu = document.querySelector('#userMenu');
        if (userMenu) {
            userMenu.addEventListener('click', function () {
              $(this).toggleClass('extended');
            });
          }
    }


});
