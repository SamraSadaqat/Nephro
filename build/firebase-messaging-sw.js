importScripts("https://www.gstatic.com/firebasejs/5.9.4/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/5.9.4/firebase-messaging.js");
const firebaseConfig = {
     apiKey: "AIzaSyDCi8SoHj-y_afsmssIgoidvfKOWzOFkQg",
     authDomain: "return-bees.firebaseapp.com",
     databaseURL: "https://return-bees.firebaseio.com",
     projectId: "return-bees",
     storageBucket: "return-bees.appspot.com",
     messagingSenderId: "9517490203",
     appId: "1:9517490203:web:82b806c04987af89c618be",
     measurementId: "G-H204EL19TV"
};
firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();
messaging.setBackgroundMessageHandler(function(payload) {
     const promiseChain = clients
          .matchAll({
               type: "window",
               includeUncontrolled: true,
          })
          .then((windowClients) => {
               for (let i = 0; i < windowClients.length; i++) {
                    const windowClient = windowClients[i];
                    windowClient.postMessage(payload);
               }
          })
          .then(() => {
               registration.showNotification(payload.data.title);
               if(payload.data.title=='Customer Request for return'){
                    var newUrl = "http://localhost:3000/dashboard/returns";
                    window.location.href = newUrl;
               }
               return;
          });
     return promiseChain;
});
self.addEventListener("notificationclick", function(event) {
     console.log(event);
});