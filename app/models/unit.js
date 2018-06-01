import DS from 'ember-data';

export default DS.Model.extend({
    no: DS.attr(),
    floor: DS.attr(),
    bed_rooms: DS.attr(),
    living_rooms: DS.attr(),
    reception_rooms: DS.attr(),
    bath_rooms: DS.attr(),
    split_air_conditioner: DS.attr(),
    window_air_conditioner: DS.attr(),
    electricity_meter: DS.attr(),
    water_meter: DS.attr(),
    gas_meter: DS.attr(),
    created_by: DS.attr(),


    type: DS.belongsTo('type', {async: false}),
    furnished: DS.belongsTo('furnished'),
    furnished_status: DS.belongsTo('furnished_status'),
    kitchen_cabinet: DS.belongsTo('kitchen_cabinet', {async: false}),
    m_property_id: DS.belongsTo('mproperty'),


    selected: DS.attr(),

});
