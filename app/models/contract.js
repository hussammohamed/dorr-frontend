import DS from 'ember-data';

export default DS.Model.extend({
    // contract_data
    contract_type: DS.belongsTo('contract-type'),
    contract_condition: DS.belongsTo('contract-condition'),
    contract_status:DS.attr(),
    contract_calender_type: DS.belongsTo('calender-type'),
    contract_place: DS.belongsTo('region'),
    contract_date: DS.attr(),
    contract_start_date: DS.attr(),
    contract_end_date: DS.attr(),
    contract_image:  DS.attr(),
    // m_property data

    m_property_id: DS.attr(),
    m_property_region: DS.belongsTo('region'),
    m_property_district: DS.belongsTo('region'),
    m_property_address: DS.attr(),
    m_property_elevators: DS.attr(),
    m_property_floors: DS.attr(),
    m_property_parking: DS.attr(),
    m_property_units_no: DS.attr(),
    m_property_type: DS.belongsTo('type'),
    usage_type: DS.belongsTo('usage-type'),

    // renter_data
    renter_user_id: DS.attr(),
    renter_id: DS.attr(),
    renter_name: DS.attr(),
    renter_nationality: DS.belongsTo('nationality'),
    renter_id_type: DS.belongsTo('id-type'),
    renter_id_no: DS.attr(),
    renter_id_image: DS.attr(),
    renter_mobile: DS.attr(),
    renter_email: DS.attr(),

    // owner_data
    owner_user_id: DS.attr(),
    owner_id: DS.attr(),
    owner_name: DS.attr(),
    owner_nationality: DS.belongsTo('nationality'),
    owner_id_type: DS.belongsTo('id-type'),
    owner_id_no: DS.attr(),
    owner_id_image: DS.attr(),
    owner_mobile: DS.attr(),
    owner_email: DS.attr(),

    // agent_data
    agent_user_id: DS.attr(),
    agent_id: DS.attr(),
    agent_name: DS.attr(),
    agent_nationality: DS.belongsTo('nationality'),
    agent_id_type: DS.belongsTo('id-type'),
    agent_id_no: DS.attr(),
    agent_id_image: DS.attr(),
    agent_mobile: DS.attr(),
    agent_email: DS.attr(),

    // agency_data
    agency_address: DS.attr(),
    agency_commercial_register_no: DS.attr(),
    agency_fax: DS.attr(),
    agency_id: DS.attr(),
    agency_name: DS.attr(),
    agency_phone: DS.attr(),

    // financial data
    agency_amount: DS.attr(),
    guarantee_amount: DS.attr(),
    electricity_monthly_amount: DS.attr(),
    gas_monthly_amount: DS.attr(),
    water_monthly_amount: DS.attr(),
    parking_monthly_amount: DS.attr(),
    rented_parking_no: DS.attr(),
    rent_monthly_amount: DS.attr(),
    rent_period: DS.attr(),
    rent_period_amount: DS.attr(),
    last_rent_amount: DS.attr(),
    rent_payments: DS.attr(),
    rent_total: DS.attr(),

    contract_units: DS.hasMany('contract-unit', {async: false}),
    payments: DS.hasMany('payment'),
   
    companions: DS.hasMany('user'),


    // created_data
    created_by: DS.attr(),

});
