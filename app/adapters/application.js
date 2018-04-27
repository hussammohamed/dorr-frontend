import ActiveModelAdapter from 'active-model-adapter';
import ENV from "../config/environment";
import Ember from 'ember';
export default ActiveModelAdapter.extend({
    session: Ember.inject.service(),
    intl: Ember.inject.service(),
    host: ENV.host,
    coalesceFindRequests: false,
    headers: Ember.computed(function() {
        return {
            // "token": this.get('session').authToken(),
            "Authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjIzYjZmNDA1MzZjNzVjYzg2NTczNzY0YTMzYzEyNjRlN2M5Y2VkMWNiZjdmZjZhM2UxNTQyZGI1ZmNiYmRiNmVmNGYyYjM3NmIzZDRmMWMyIn0.eyJhdWQiOiIyIiwianRpIjoiMjNiNmY0MDUzNmM3NWNjODY1NzM3NjRhMzNjMTI2NGU3YzljZWQxY2JmN2ZmNmEzZTE1NDJkYjVmY2JiZGI2ZWY0ZjJiMzc2YjNkNGYxYzIiLCJpYXQiOjE1MjQ3NTYwMTAsIm5iZiI6MTUyNDc1NjAxMCwiZXhwIjoxNTU2MjkyMDEwLCJzdWIiOiIyIiwic2NvcGVzIjpbXX0.O1bxYSliYt6OQ5c6aNeNoFML4zg58QMcVhYhxLKVBsb0HH3Tz73vZZ5GAQzUhU5NKgxF_Mm3pkEmlWirarFOCPiAwEvqoaq6FLDQXsP1GiKo2pcqgy-FVUv4KKTJ8rqs5g6OzH3bz2g7letwsFuUr0-lQ7Bm1eeC9U1JaBYCfhDEoQzvfjMMyU25jl70Q3EX7Azoy9v6WMVMn9ZeuNApcjCVR8gZHn7CDdkDuBU4zlfk3KRLiWFOFfqyriy_ECRIhLQnAlD-R5vfG88xx85mPPyIUaukyNAxt4JcX3wTRWQMpwQdvOGqXkmMnjw7lJFJoY8ZzCUdfvg1pIqanGHUMbVtgGU0kwFGaR6ZYE4BSr1-Vuw3oMF5KvGFDJzKySyDlqCC7pQ-_rOYkEbBojD_aDw3yn7NjVqyTHWRgA_zbMgW62GZN5RRSP-1noRX0nZ16XIFgTPm6fwITQcV7zDKC0nfTp5k8GRjzunlsliz2dhZHoGMdQX_e1CLOAl6PAnecFtmsQ91yD0lO79HFYDX4XeSJgo9KY8MtKGV69pt6vljL-HCmaNoV-Q9o5cSLMMW7j4QN9oippVNktrk3LP0-ihrF9cSnMmaZ68t7YlH6ONa6GEuxybY43_xK14TOQK-tb9KzDa_-IpHuFxVuJUA5r9U2g-EeeOahnvOV-3N2Rk",
        };
    }).volatile(),
    // Scope all ajax calls.
    ajax: function(url, type, hash) {
        if (Ember.isEmpty(hash)) { hash = {}; }
        if (Ember.isEmpty(hash.data)) { hash.data = {}; }
        // hash.data.lang = this.get('intl').get('locale')[0];
        return this._super(url, type, hash);
    }
});