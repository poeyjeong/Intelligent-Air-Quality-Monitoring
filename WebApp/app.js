// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.20.0/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAzKez_AbX4qSJUbxXKJL7ih6g_pzopRQM",
    authDomain: "temp-n-humid-6401d.firebaseapp.com",
    databaseURL: "https://temp-n-humid-6401d-default-rtdb.firebaseio.com",
    projectId: "temp-n-humid-6401d",
    storageBucket: "temp-n-humid-6401d.appspot.com",
    messagingSenderId: "514896098520",
    appId: "1:514896098520:web:457ef4f12479f8485c13ad",
    measurementId: "G-5WNE0GB343"
  };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Create a reference to the 'data' node in your Firebase database
const dataRef = firebase.database().ref('data');

// Add a real-time listener to 'data' node
dataRef.on('value', (snapshot) => {
    const data = snapshot.val();
    if (data) {
        // Get the latest child (timestamp) and its temperature and humidity data
        const latestChild = Object.keys(data).sort().pop();
        const latestData = data[latestChild];

        // Update the temperature and humidity values in the web app
        document.getElementById('temperature').innerText = latestData.temp + ' °C';
        document.getElementById('humidity').innerText = latestData.hum + ' %';

        // Update the lastest update time and date
        const latestDateTime = new Date(latestChild);
        const dateString = latestDateTime.toLocaleDateString();
        const timeString = latestDateTime.toLocaleTimeString();
        document.getElementById('date_time').innerText = `Lastest update: ${dateString} ${timeString}`;
    }        
});
