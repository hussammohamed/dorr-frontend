import DS from 'ember-data';

export default DS.Model.extend({
    name: DS.attr(),
    email: DS.attr(),
    address: DS.attr(),
    mobile: DS.attr(),
    agent_id_type: DS.belongsTo('id-type'),
    agent_id_no: DS.attr(),
    agent_id_issuer: DS.belongsTo('region'),    
    agent_id_exp_date: DS.attr(),
    agent_id_issued_date: DS.attr(),
    nationality: DS.belongsTo('nationality'),
    agency_bank: DS.belongsTo('bank'),
    agency_bank_iban: DS.attr(),
    agency_instrument_issuer: DS.belongsTo('region'), 
    agency_instrument_no: DS.attr(), 
    agency_instrument_date: DS.attr(),
    agency_instrument_exp_date: DS.attr(),
    agency: DS.belongsTo('agency'),
    mproperty: DS.hasMany('mproperty'),


});
