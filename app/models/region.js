import DS from 'ember-data';

export default DS.Model.extend({
    title: DS.attr(),
    name: DS.attr(),
    location: DS.attr(),
    districts: DS.hasMany('district'),
});
