import EmberObject from '@ember/object';
import DorrValidationsMixin from 'dorr/mixins/dorr-validations';
import { module, test } from 'qunit';

module('Unit | Mixin | dorr-validations', function() {
  // Replace this with your real tests.
  test('it works', function (assert) {
    let DorrValidationsObject = EmberObject.extend(DorrValidationsMixin);
    let subject = DorrValidationsObject.create();
    assert.ok(subject);
  });
});
