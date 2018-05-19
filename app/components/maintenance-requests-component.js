import Component from '@ember/component';

export default Component.extend({
    didRender(){
        this.set('currentRouteName', this.router.currentRouteName)
       
    },
    didInsertElement() {
       
    },
    actions:{
        addRequest(){

        }
    }

});
