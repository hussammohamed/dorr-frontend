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
            "Authorization": this.get('session').authToken(),
            // "Authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjViMWJiOTgzMGE2MWYxZjdjYjJlYjA4ZThmNWJlZTAwODEzODEwMTYyNjdkZGE4Yjc3OTUwMWI4ZGNmZjIyYmNkYmM5NTMyZGViZTc1ZmI4In0.eyJhdWQiOiIyIiwianRpIjoiNWIxYmI5ODMwYTYxZjFmN2NiMmViMDhlOGY1YmVlMDA4MTM4MTAxNjI2N2RkYThiNzc5NTAxYjhkY2ZmMjJiY2RiYzk1MzJkZWJlNzVmYjgiLCJpYXQiOjE1MjUwMzEyOTEsIm5iZiI6MTUyNTAzMTI5MSwiZXhwIjoxNTU2NTY3MjkxLCJzdWIiOiIyIiwic2NvcGVzIjpbXX0.a69WMIVRz8hJAOK6rGHJjgfg9uSchVxwlUVDeA3E51-8vvVRTNlBvDVOcvFxUcgXiyFBLsa2Ix4Wv3Qtu3tB1Isf_SH8CzUbQom_92Z--I77l3ksrxBJxRDHn36a3KM392qlT_2HesKeDPlUP8GfdbAWkXqC-PnNeQG-CGmxaWNQ7AAqgUUjHRq6wYvSGBbCIn-WQjdDVqoWXK-QMms95_XrxMHM_kNv-z-71kOtDtDjHyvunDkRKDKOOU6YO02P0JlE62KLRDJxnCPJ3bxizYYJ6aNIBMqb0GE28uwbE8oDLEzpy__a5X-ZijMDuO69ypE5doXHoGTdPIYXeGjvf-6MQEv6PPggpuYvfGP5_kAbVklwUpcx5Nyn0bs5w48Sey7rHLwWE_PFYj22EWOrRSjfLa0aSD50jAMrUZqti_qSfiB5n8l2E-t-llqPyHB8GanCdA4JIWpQ3uC9jjw_4FK04H0UlqvOuLCt29U5fXnACDyDOjSOXMgxilSZgv7KBl_iCvGyE79AagLgNg2l7mEq_AfKaKTAaqKzWjYgKbdcf6k2ji6XBAXA7-UmyTNn9d8SJCndKl6Tux_rrKIEivsHrR7IF_qXMbu8GGxfAtaqhzGxapoBQgDEi6sNIF7XhIBzeC2sKW5jpMlML4BOumt2Q3gjfnlUCg_G2SMzcEU",
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