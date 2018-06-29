import DS from 'ember-data';

export default DS.Model.extend({
    m_property_id: DS.attr(),
    unit_id: DS.belongsTo('unit', {async: false}),
    service_type: DS.belongsTo('service-type', {async: false}),
    service: DS.attr(),
    description: DS.attr(),
    status: DS.attr(),
    min_fix_amount: DS.attr(),
    owner_response: DS.belongsTo('owner-response', {async: false}),
    matrials_price: DS.attr("number"),
    invoice_image: DS.attr(),
    laborer_pay: DS.attr("number"),
});
