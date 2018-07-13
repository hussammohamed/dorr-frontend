import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | index/properties/show/collection-requests/lists', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:index/properties/show/collection-requests/lists');
    assert.ok(route);
  });
});
