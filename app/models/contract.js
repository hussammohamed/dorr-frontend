import DS from 'ember-data';

export default DS.Model.extend({
    contract_type_id: DS.attr(),
    contract_condition:DS.attr(),
    contract_status:DS.attr(),
    contract_calender_type: DS.attr(),
    contract_place: DS.attr(),
    contract_date: DS.attr(),
    contract_start_date: DS.attr(),
    contract_end_date: DS.attr(),
    owner: DS.belongsTo('user'),
    agent: DS.belongsTo('user'),



    renter_id: DS.attr(),
    renter_name: DS.attr(),
    renter_nationality: DS.attr(),
    renter_id_type: DS.attr(),
    renter_id_no: DS.attr(),
    renter_id_image: DS.attr(),
    renter_mobile: DS.attr(),
    renter_email: DS.attr(),

    units: DS.hasMany('unit'),

    agency_amount: DS.attr(),
    guarantee_amount: DS.attr(),
    electricity_monthly_amount: DS.attr(),
    water_monthly_amount: DS.attr(),
    parking_monthly_amount: DS.attr(),
    rented_parking_no: DS.attr(),
    rent_monthly_amount: DS.attr(),
    rent_period: DS.attr(),
    rent_period_amount: DS.attr(),
    last_rent_amount: DS.attr(),
    rent_payments: DS.attr(),
    rent_total: DS.attr(),



});
