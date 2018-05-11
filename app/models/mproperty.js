import DS from 'ember-data';

export default DS.Model.extend({
    createdBy: DS.attr(),
    address: DS.attr(),
    location: DS.attr(),
    floors: DS.attr(),
    name: DS.attr(),
    parking: DS.attr(),


    property_instrument_date: DS.attr(),
    property_instrument_issuer: DS.belongsTo('region'),
    property_instrument_no: DS.attr(),
    property_instrument_place: DS.attr(),

    agency_instrument_date: DS.attr(),
    agency_instrument_issuer: DS.belongsTo('region', { defaultValue: 1 }),
    agency_instrument_no: DS.attr(),
    agency_instrument_place: DS.attr(),
    agency_instrument_exp_date: DS.attr(),


   
    units_no: DS.attr(),
    elevators: DS.attr(),
    region: DS.belongsTo('region'),
    district: DS.belongsTo('district', {async: false}),
    type: DS.belongsTo('type'),
    year_of_construction: DS.attr(),


    units: DS.hasMany('unit'),
    owner: DS.belongsTo('user'),
    agent: DS.belongsTo('user'),
    agency: DS.belongsTo('agency'),
    data_status: DS.attr(),
    completed: Ember.computed('data_status', 'units',function() {
        let units = this.get('units');
        let dataStatus = this.get('data_status');
        if(dataStatus){
            if(dataStatus.owner && dataStatus.agent  && dataStatus.agency == 1 && (units.length > 0) ){
                return true;
            }else {
                return false;
            }  
        }
        
    }),
    long:DS.attr(),
    lat: DS.attr(),
    user_relation: DS.attr(),
    
});
