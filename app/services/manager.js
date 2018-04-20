import Ember from 'ember';
export default Ember.Service.extend({
    ajaxRequest(self, url, method, resolve, reject, data){
          Ember.$.ajax({
                 url: url,
                 method: method,
                 content: 'application/x-www-form-urlencoded',
                 headers: {
                     "Authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjUzOGE5ODNkMDkwMWQ1YmU3YzYyODAxMWQwZDc1ZDIzMDk4NTQwOTQyMGU4MmU3OTJmNjM5NzZlMmQ4NWFhOGM3MTA5YTkwNjFiNTcyMTY1In0.eyJhdWQiOiIyIiwianRpIjoiNTM4YTk4M2QwOTAxZDViZTdjNjI4MDExZDBkNzVkMjMwOTg1NDA5NDIwZTgyZTc5MmY2Mzk3NmUyZDg1YWE4YzcxMDlhOTA2MWI1NzIxNjUiLCJpYXQiOjE1MjQyMTI2MTcsIm5iZiI6MTUyNDIxMjYxNywiZXhwIjoxNTU1NzQ4NjE3LCJzdWIiOiIyIiwic2NvcGVzIjpbXX0.WTX1fjmpzhJNnac-Or7mtxYv_iDqT-3rq1i6wWRVA-yaIPgbwFbUUqghpKr92-0FLFT5NK-aLQwrzdUcnRznJrdU7W0oMToR4ao-i8SELS-wRVzO5r2lZLVjQHz0Ec-8FHHeIM2CupzY5eFh0CZr52DxAsHFSK4_OgSGPc54B7RbVZr3aMIkpqPVrCXTO3B-dAP7Ia9ezvG2jq4LuKbZ18e0RFTTxWzkm4DMmRyoFSTxYkgSoiVTKyd5vD12qITtxRdh0g3pm5uUGpfrbtoGuYmhLjLr_fHIIu8R5sikoCN6wIlznPRSOY5i3pguQp-X7x8LMKP7D9hv6oOgBYa13et6ShuAeSKX0S-_Mht_i6HRgYyFnsNEEnnxywF0YeHDcRyTfadINQNd-CL6xZWJcHYOIJwEAWJt-ws31QpeyKt7jguAClJSVdT3D-T4MCAwpOCTsF1UVmrOHLfOEybj6rGpzcTWHZVfpxkl7hx0VkV7ZzNeUbetefMYTyzX2LCha7JKflvgDhANwf0ug5ahaQkrIm5_eNZO1fcomGiyvNxE0_s4dAPrNwGmuL3ylLmPlPA2V7b8nBETLGOVJ3S8ETwIOKPv2y-SenACW_g_TQi-MrSt_-eOWNigHar-55lqeU0bR9gRk2b56DGc_v09VLURuLNYrRTd_cckxfIMzac",
                 },
                 
                 crossDomain: true,
                 data: data,
                 timeout: 60000,
                 success: Ember.run.bind(null, resolve),
                 error: Ember.run.bind(null, reject)
             });
     },
});