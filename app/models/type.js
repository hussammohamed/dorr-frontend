import DS from 'ember-data';

export default DS.Model.extend({
    name: DS.attr(),
    units: DS.hasMany('unit')
});
