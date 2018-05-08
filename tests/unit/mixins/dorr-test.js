import EmberObject from '@ember/object';
import DorrMixin from 'dorr/mixins/dorr';
import { module, test } from 'qunit';

module('Unit | Mixin | dorr', function() {
  // Replace this with your real tests.
  test('it works', function (assert) {
    let DorrObject = EmberObject.extend(DorrMixin);
    let subject = DorrObject.create();
    assert.ok(subject);
  });
});
