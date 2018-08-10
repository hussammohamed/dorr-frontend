importScripts("https://www.gstatic.com/firebasejs/4.8.1/firebase-app.js"),importScripts("https://www.gstatic.com/firebasejs/4.8.1/firebase-messaging.js")
var datat={messagingSenderId:"243311451130"}
firebase.initializeApp(datat)
const messaging=firebase.messaging()
messaging.setBackgroundMessageHandler(function(e){e.type="background"
clients.matchAll({type:"window",includeUncontrolled:!0}).then(s=>{for(let t=0;t<s.length;t++){s[t].postMessage(e)}})
return!0})