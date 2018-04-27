import DS from 'ember-data';
import { ActiveModelSerializer } from 'active-model-adapter';
export default ActiveModelSerializer.extend(DS.EmbeddedRecordsMixin, {
  attrs: {
    region: { embedded: 'always' },
    district:{ embedded: 'always' },
    owner:{embedded: 'always'},
    agent:{embedded: 'always'}
}
});