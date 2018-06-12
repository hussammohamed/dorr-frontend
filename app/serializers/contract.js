import DS from 'ember-data';
import { ActiveModelSerializer } from 'active-model-adapter';
export default ActiveModelSerializer.extend(DS.EmbeddedRecordsMixin, {
  attrs: {
    contract_type: { embedded: 'always' },
    contract_condition: { embedded: 'always' },
    contract_units: { embedded: 'always' },
    companions: { embedded: 'always' },
    payments: { embedded: 'always' },
    


}
});