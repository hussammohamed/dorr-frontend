import DS from 'ember-data';
import { ActiveModelSerializer } from 'active-model-adapter';
export default ActiveModelSerializer.extend(DS.EmbeddedRecordsMixin, {
  attrs: {
    bank: { embedded: 'always' },
    nationality: { embedded: 'always' },
    id_type: { embedded: 'always' },
    id_issuer: { embedded: 'always' },
}
});