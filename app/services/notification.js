import Ember from 'ember';
export default Ember.Service.extend({
    firebase: Ember.inject.service(),
    session: Ember.inject.service(),
    manager: Ember.inject.service(),
    store: Ember.inject.service(),
    urls: Ember.inject.service(),
    initNotification(index) {
        var self = this;
        self.destroyService();
        const messaging = this.get('firebase').u.app.messaging();
        messaging.requestPermission()
            .then(function () {
                // console.log('Notification permission granted.');
                return messaging.getToken()
                    .catch(function (err) {
                        console.log('An error occurred while retrieving token. ', err);
                        console.log('Error retrieving Instance ID token. ', err);
                    });
            })
            .then(function (token) {
                self.registrationToTopic(token, self.get('store').currentUser.id)
                console.log(token)
                // self.sendToken(token, index)
            })
            .catch(function (err) {
                console.log('Unable to get permission to notify.', err);
            });


        messaging.onMessage(function (payload) {
            console.log("Message received. ", payload);
            var audio1 = new Audio('/audio/1.ogg');
            audio1.play();
            self.getNotification(index, payload);

        });
        if (navigator.serviceWorker) {
            navigator.serviceWorker.onmessage = function (event) {
                if (event.data.type === "background") {
                    var audio1 = new Audio('/audio/1.ogg');
                    audio1.play();
                    console.log('Received a message from service worker: ', event);
                    var notification = new Notification('Notification title', {
                        icon: '/images/dorr-logo.svg',
                        body: event.data.data.web_msg,
                    });
                    notification.onclick = function () {
                        window.focus();
                    };
                    self.getNotification(index, event.data);

                }
            };
        }
    },
    registrationToTopic(token, topic){
        Ember.$.ajax({
            url: "https://iid.googleapis.com/iid/v1/"+ token +"/rel/topics/" + topic,
            method: "POST",
            contentType: "application/json", // NEEDED, DON'T OMIT THIS (requires jQuery 1.6+)// NEEDED, DON'T OMIT THIS
            headers  : {
                "Authorization":'key=AAAAOKZ-G_o:APA91bFzQNtD1YuE6QQzeEkGNjdy2hFlar2Xoka-SazPEwofFQcJ1_zmYu-pOmpeO9JHnQNq6JU1aiWq-ocrrkDI95MOfS656hfyyijPggVqpZ8EMA5Atxj0JT6EHim4h73ydYb9GtR87sQ0ru9TTDreebLhviMFWw',
            },
            
            crossDomain: true,
            timeout: 60000,
            success: function(){
             
            },
        })
    },
    sendToken(token, index) {
        var self = this;
        let data = {
            "firebase_session":
            {
                "token": token,
                "app_type": "Web"
            }

        }
        let currentSessionId = Cookies.get('firebasSessionId');
        if (!currentSessionId) {
            new Ember.RSVP.Promise(function (resolve, reject) {
                index.get('manager').ajaxRequest(index, index.get('urls').get('firebaseSessions'), 'POST', resolve, reject, data);
            }).then(
                function (success) {
                    self.get('session').saveCookie('firebasSessionId', success.firebase_session.id);
                },
                function (errors) {
                    
                }
            )
        }
    },
    destroyService() {
        if(navigator.serviceWorker){
            navigator.serviceWorker.getRegistrations().then(function (registrations) {
                for (let registration of registrations) {
                    registration.unregister()
                }
            })
        }
       

    },
    getNotification(index, payload) {
        if (payload.data.code == 'direct_video_session') {
            this.get('videoChat').hasVideoSession(index, payload);
        }
    }

});