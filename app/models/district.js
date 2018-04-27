import DS from 'ember-data';

export default DS.Model.extend({
    title: DS.attr(),
    location: DS.attr(),
    region: DS.belongsTo('district'),
});
