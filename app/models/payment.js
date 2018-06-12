import DS from 'ember-data';

export default DS.Model.extend({
    contract_id: DS.belongsTo('contract'),
    amount: DS.attr(),
    due_date: DS.attr(),
    issued_date: DS.attr(),

});
