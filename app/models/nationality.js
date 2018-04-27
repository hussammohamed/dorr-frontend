import DS from 'ember-data';

export default DS.Model.extend({
    name: DS.attr(),
    owner: DS.hasMany('owner'),
    agent: DS.hasMany('agent'),
});
