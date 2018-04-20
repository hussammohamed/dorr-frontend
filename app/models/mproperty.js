import DS from 'ember-data';

export default DS.Model.extend({
    property: DS.attr(),
    createdBy: DS.attr(),
    owner: DS.attr(),
    agent: DS.attr(),

});
