import DS from 'ember-data';

export default DS.Model.extend({
    name: DS.attr(),
    email: DS.attr(),
    address: DS.attr(),
    mobile1: DS.attr(),
    bank_iban: DS.attr(),
    id_exp_date: DS.attr(),
    id_issued_date: DS.attr(),
    id_no: DS.attr(),
    bank: DS.belongsTo('bank'),
    nationality: DS.belongsTo('nationality'),
    id_type:  DS.belongsTo('id-type'),
    id_issuer: DS.belongsTo('region'),
    phone:DS.attr(),
    avatar: DS.attr(),
    registered: DS.attr(),
    mproperty_id: DS.attr(),
    user_relation: DS.attr(),
    id_image: DS.attr(),
    relation: DS.attr(),
    mobile: DS.attr(),

});
