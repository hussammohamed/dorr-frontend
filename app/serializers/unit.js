import DS from 'ember-data';
import { ActiveModelSerializer } from 'active-model-adapter';
export default ActiveModelSerializer.extend(DS.EmbeddedRecordsMixin, {
  attrs: {
    type: { embedded: 'always' },
    furnished: { embedded: 'always' },
    furnished_status: { embedded: 'always' },
    kitchen_cabinet: { embedded: 'always' },
    m_property_id: { embedded: 'always' },
  
}
});