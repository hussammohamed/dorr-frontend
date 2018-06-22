import DS from 'ember-data';

export default DS.Model.extend({
    m_property_id:DS.belongsTo('mproperty'),
    unit_id: DS.belongsTo('unit'),
    service_type: DS.belongsTo('service-type'),
    service: DS.attr(),
    description: DS.attr(),
    status: DS.attr()
});
