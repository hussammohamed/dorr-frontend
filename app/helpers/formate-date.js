export function formateDate(params) {
  return moment(params).format('YYYY-MM-DD')
  }
  
  export default Ember.Helper.helper(formateDate);