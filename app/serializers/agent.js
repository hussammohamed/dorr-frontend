import DS from 'ember-data';
import { ActiveModelSerializer } from 'active-model-adapter';
export default ActiveModelSerializer.extend(DS.EmbeddedRecordsMixin, {
  attrs: {
    agency_bank: { embedded: 'always' },
    agency_instrument_issuer: { embedded: 'always' },
    nationality: { embedded: 'always' },
    agent_id_type: { embedded: 'always' },
    agent_id_issuer: { embedded: 'always' },
    agency: {embedded: 'always'}

}
});