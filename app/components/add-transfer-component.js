import Component from '@ember/component';

export default Component.extend({
    actions:{
        saveRequest(){

        },
        fileInputChange(file){
            this.set(file, Ember.$('#' + file)[0].files[0].name);
             
         },
    }
});
