import DS from 'ember-data';

export default DS.Model.extend({
    payment_order_id: DS.belongsTo('payment-order'),
    due_date: DS.attr(),
    amount: DS.attr('number'),
    remain: DS.attr(),
    paid: DS.attr()
});
