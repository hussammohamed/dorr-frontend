import DS from 'ember-data';

export default DS.Model.extend({
    amount:DS.attr(),
    created_at:DS.attr(),
    image:DS.attr(),
    m_property_id:DS.attr(),
    method:DS.belongsTo('transaction-method'),
    name:DS.attr(),
    notes:DS.attr(),
    status:DS.attr(),
});
