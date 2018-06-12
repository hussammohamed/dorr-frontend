import Component from '@ember/component';

export default Component.extend({
    actions:{
        hideCard(Property) {
            this.toggleProperty(Property);
        },
        fileInputChange(file) {
            this.set(file, Ember.$('#' + file)[0].files[0].name);

        },
        renterSearch(){

        },
        hideUnit(unit) {
            unit.toggleProperty('collapse');
        },
    }
});
