import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | index/properties/property-status', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:index/properties/property-status');
    assert.ok(route);
  });
});
