import DS from 'ember-data';

export default DS.Model.extend({
    commercial_register_name: DS.attr(),
    commercial_register_date: DS.attr(),
    commercial_register_exp_date: DS.attr(),
    commercial_register_issuer: DS.belongsTo('region'), 
    commercial_register_no: DS.attr(),
    phone: DS.attr(),
    fax: DS.attr()

});
