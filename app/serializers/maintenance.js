import DS from 'ember-data';
import { ActiveModelSerializer } from 'active-model-adapter';
export default ActiveModelSerializer.extend(DS.EmbeddedRecordsMixin, {
  attrs: {
    unit_id: { embedded: 'always' },
    service_type: { embedded: 'always' },
    owner_response: { embedded: 'always' },
}
});