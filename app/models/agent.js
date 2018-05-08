import DS from 'ember-data';

export default DS.Model.extend({
    name: DS.attr(),
    email: DS.attr(),
    address: DS.attr(),
    mobile: DS.attr(),
    id_type: DS.belongsTo('id-type'),
    id_no: DS.attr(),
    id_issuer: DS.belongsTo('region'),    
    id_exp_date: DS.attr(),
    id_issued_date: DS.attr(),
    nationality: DS.belongsTo('nationality'),
    bank: DS.belongsTo('bank'),
    bank_iban: DS.attr(),
    instrument_issuer: DS.belongsTo('region'), 
    instrument_no: DS.attr(), 
    instrument_date: DS.attr(),
    instrument_exp_date: DS.attr(),
    mproperty: DS.hasMany('mproperty'),


});
