import Component from '@ember/component';

export default Component.extend({
    didInsertElement() {
        var userMenu = document.querySelector('#userMenu');
        if (userMenu) {
            userMenu.addEventListener('click', function () {
              $(this).toggleClass('extended');
            });
          }
    }


});
