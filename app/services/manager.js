import Ember from 'ember';
export default Ember.Service.extend({
    ajaxRequest(self, url, method, resolve, reject, data){
          Ember.$.ajax({
                 url: url,
                 method: method,
                 content: 'application/x-www-form-urlencoded',
                 headers: {
                     "Authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjViMWJiOTgzMGE2MWYxZjdjYjJlYjA4ZThmNWJlZTAwODEzODEwMTYyNjdkZGE4Yjc3OTUwMWI4ZGNmZjIyYmNkYmM5NTMyZGViZTc1ZmI4In0.eyJhdWQiOiIyIiwianRpIjoiNWIxYmI5ODMwYTYxZjFmN2NiMmViMDhlOGY1YmVlMDA4MTM4MTAxNjI2N2RkYThiNzc5NTAxYjhkY2ZmMjJiY2RiYzk1MzJkZWJlNzVmYjgiLCJpYXQiOjE1MjUwMzEyOTEsIm5iZiI6MTUyNTAzMTI5MSwiZXhwIjoxNTU2NTY3MjkxLCJzdWIiOiIyIiwic2NvcGVzIjpbXX0.a69WMIVRz8hJAOK6rGHJjgfg9uSchVxwlUVDeA3E51-8vvVRTNlBvDVOcvFxUcgXiyFBLsa2Ix4Wv3Qtu3tB1Isf_SH8CzUbQom_92Z--I77l3ksrxBJxRDHn36a3KM392qlT_2HesKeDPlUP8GfdbAWkXqC-PnNeQG-CGmxaWNQ7AAqgUUjHRq6wYvSGBbCIn-WQjdDVqoWXK-QMms95_XrxMHM_kNv-z-71kOtDtDjHyvunDkRKDKOOU6YO02P0JlE62KLRDJxnCPJ3bxizYYJ6aNIBMqb0GE28uwbE8oDLEzpy__a5X-ZijMDuO69ypE5doXHoGTdPIYXeGjvf-6MQEv6PPggpuYvfGP5_kAbVklwUpcx5Nyn0bs5w48Sey7rHLwWE_PFYj22EWOrRSjfLa0aSD50jAMrUZqti_qSfiB5n8l2E-t-llqPyHB8GanCdA4JIWpQ3uC9jjw_4FK04H0UlqvOuLCt29U5fXnACDyDOjSOXMgxilSZgv7KBl_iCvGyE79AagLgNg2l7mEq_AfKaKTAaqKzWjYgKbdcf6k2ji6XBAXA7-UmyTNn9d8SJCndKl6Tux_rrKIEivsHrR7IF_qXMbu8GGxfAtaqhzGxapoBQgDEi6sNIF7XhIBzeC2sKW5jpMlML4BOumt2Q3gjfnlUCg_G2SMzcEU",
                 },
                 
                 crossDomain: true,
                 data: data,
                 timeout: 60000,
                 success: Ember.run.bind(null, resolve),
                 error: Ember.run.bind(null, reject)
             }).fail(function() { console.log("failed") });
     },
     ajaxRequestFile(self, url, method, resolve, reject, data){
        Ember.$.ajax({
               url: url,
               method: method,
               contentType: false, // NEEDED, DON'T OMIT THIS (requires jQuery 1.6+)
               processData: false, // NEEDED, DON'T OMIT THIS
               headers  : {
                   "Authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjViMWJiOTgzMGE2MWYxZjdjYjJlYjA4ZThmNWJlZTAwODEzODEwMTYyNjdkZGE4Yjc3OTUwMWI4ZGNmZjIyYmNkYmM5NTMyZGViZTc1ZmI4In0.eyJhdWQiOiIyIiwianRpIjoiNWIxYmI5ODMwYTYxZjFmN2NiMmViMDhlOGY1YmVlMDA4MTM4MTAxNjI2N2RkYThiNzc5NTAxYjhkY2ZmMjJiY2RiYzk1MzJkZWJlNzVmYjgiLCJpYXQiOjE1MjUwMzEyOTEsIm5iZiI6MTUyNTAzMTI5MSwiZXhwIjoxNTU2NTY3MjkxLCJzdWIiOiIyIiwic2NvcGVzIjpbXX0.a69WMIVRz8hJAOK6rGHJjgfg9uSchVxwlUVDeA3E51-8vvVRTNlBvDVOcvFxUcgXiyFBLsa2Ix4Wv3Qtu3tB1Isf_SH8CzUbQom_92Z--I77l3ksrxBJxRDHn36a3KM392qlT_2HesKeDPlUP8GfdbAWkXqC-PnNeQG-CGmxaWNQ7AAqgUUjHRq6wYvSGBbCIn-WQjdDVqoWXK-QMms95_XrxMHM_kNv-z-71kOtDtDjHyvunDkRKDKOOU6YO02P0JlE62KLRDJxnCPJ3bxizYYJ6aNIBMqb0GE28uwbE8oDLEzpy__a5X-ZijMDuO69ypE5doXHoGTdPIYXeGjvf-6MQEv6PPggpuYvfGP5_kAbVklwUpcx5Nyn0bs5w48Sey7rHLwWE_PFYj22EWOrRSjfLa0aSD50jAMrUZqti_qSfiB5n8l2E-t-llqPyHB8GanCdA4JIWpQ3uC9jjw_4FK04H0UlqvOuLCt29U5fXnACDyDOjSOXMgxilSZgv7KBl_iCvGyE79AagLgNg2l7mEq_AfKaKTAaqKzWjYgKbdcf6k2ji6XBAXA7-UmyTNn9d8SJCndKl6Tux_rrKIEivsHrR7IF_qXMbu8GGxfAtaqhzGxapoBQgDEi6sNIF7XhIBzeC2sKW5jpMlML4BOumt2Q3gjfnlUCg_G2SMzcEU",
               },
               
               crossDomain: true,
               data: data,
               timeout: 60000,
               success: Ember.run.bind(null, resolve),
               error: Ember.run.bind(null, reject)
           }).fail(function() { console.log("failed") });
   },
     toaster(self, text){
        self.get('paperToaster').show(text, {
            duration: 4000,
            escapeToClose: true,
          });
    },
});