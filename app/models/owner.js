import DS from 'ember-data';

export default DS.Model.extend({
    name: DS.attr(),
    email: DS.attr(),
    address: DS.attr(),
    mobile1: DS.attr(),
    owner_bank_iban: DS.attr(),
    owner_id_exp_date: DS.attr(),
    owner_id_issued_date: DS.attr(),
    owner_id_no: DS.attr(),
    mproperty: DS.hasMany('mproperty'),
    owner_bank: DS.belongsTo('bank'),
    nationality: DS.belongsTo('nationality'),
    owner_id_type:  DS.belongsTo('id-type'),
    owner_id_issuer: DS.belongsTo('region'),



});
