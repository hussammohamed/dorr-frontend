import DS from 'ember-data';

export default DS.Model.extend({
    createdBy: DS.attr(),
    address: DS.attr(),
    location: DS.attr(),
    floors: DS.attr(),
    name: DS.attr(),
    parking: DS.attr(),
    property_instrument_date: DS.attr(),
    property_instrument_issuer: DS.attr(),
    property_instrument_no: DS.attr(),
    property_instrument_place: DS.attr(),
    units: DS.attr(),
    units_no: DS.attr(),
    type: DS.attr(),
    elevators: DS.attr(),
    region: DS.belongsTo('region'),
    district: DS.belongsTo('district'),
    owner: DS.belongsTo('owner'),
    agent: DS.belongsTo('agent'),
});
