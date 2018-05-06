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
    units: DS.hasMany('unit'),
    units_no: DS.attr(),
    type: DS.attr(),
    elevators: DS.attr(),
    region: DS.belongsTo('region'),
    district: DS.belongsTo('district'),
    owner: DS.belongsTo('user'),
    agent: DS.belongsTo('user'),
    data_status: DS.attr(),
    completed: Ember.computed('data_status', 'units',function() {
        let units = this.get('units');
        let dataStatus = this.get('data_status');
        if(dataStatus.owner && dataStatus.agent  && dataStatus.agency == 1 && (units.length > 0) ){
            return true;
        }else {
            return false;
        }  
    })
});
