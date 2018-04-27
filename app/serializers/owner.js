import DS from 'ember-data';
import { ActiveModelSerializer } from 'active-model-adapter';
export default ActiveModelSerializer.extend(DS.EmbeddedRecordsMixin, {
  attrs: {
    owner_bank: { embedded: 'always' },
    nationality: { embedded: 'always' },
    owner_id_type: { embedded: 'always' },
    owner_id_issuer: { embedded: 'always' },
}
});