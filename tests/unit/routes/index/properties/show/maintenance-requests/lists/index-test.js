import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | index/properties/show/maintenance-requests/lists/index', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:index/properties/show/maintenance-requests/lists/index');
    assert.ok(route);
  });
});
