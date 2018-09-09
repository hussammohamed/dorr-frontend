import DS from 'ember-data';
import date from 'ember-data/transforms/date';

export default DS.Model.extend({
    contract_id: DS.belongsTo('contract'),
    amount: DS.attr(),
    due_date: DS.attr(),
    issued_date: DS.attr(),
    status: DS.attr(),
    isRequest: Ember.computed('due_date', function () {
        let due = new Date(this.get('due_date'));
        let today = new Date();
        if( today.setHours(0,0,0,0)  >= addDays(due, 15).setHours(0,0,0,0)){
            return true;
        }else{
            return false;
        }
        function addDays(startDate, numberOfDays) {
            var returnDate = new Date(
                startDate.getFullYear(),
                startDate.getMonth(),
                startDate.getDate() + numberOfDays,
                startDate.getHours(),
                startDate.getMinutes(),
                startDate.getSeconds());
            return returnDate;
        }
    }),
});
