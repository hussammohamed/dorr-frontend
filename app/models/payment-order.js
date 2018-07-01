import DS from 'ember-data';

export default DS.Model.extend({
    amount: DS.attr(),
    contract_calender_type: DS.belongsTo('calender-type'),
    contract_id: DS.belongsTo('contract'),
    due_date: DS.attr(),
    m_property_id: DS.belongsTo('mproperty'),
    notification: DS.attr(),
    payment_collects: DS.hasMany('payment-collect'),
    payment_id: DS.belongsTo('payment'),
    status: DS.attr(),
    units: DS.attr()

});
