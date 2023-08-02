# Intelligent-Air-Quality-Monitoring
&emsp;This project is an Intelligent Air Quality Monitoring system that measures and displays temperature and humidity data from a DHT22 sensor. The data is sent to Firebase for real-time monitoring and is accessible through a web application.
![S__6324231](https://github.com/poeyjeong/Intelligent-Air-Quality-Monitoring/assets/32700040/5a0dd8cc-c26e-4f32-b464-b7c2c53ede93)

<h2>Getting Started</h2>

**Prerequisites**

- ESP32 board (e.g., WROOM-32, TTGO T-Display)
- DHT22 temperature and humidity sensor
- MicroPython firmware
- Live Server extension (for real-time web app updates during development(e.g., Firebase, ThingSpeak))

<h2>Running the System</h2>

- Power up the ESP32 board.
- The ESP32 will connect to the Wi-Fi network and start sending temperature and humidity data to Firebase every 50 minutes.
- Open the index.html file in your web browser to view the real-time temperature and humidity data.

<h2>Web Application Features</h2>

- The web application displays the current temperature and humidity data fetched from Firebase.
- The data is updated in real-time without the need to refresh the page.

<h2>Built With</h2>

- MicroPython : The firmware used for the ESP32 board.
- DHT22 : The temperature and humidity sensor.
- Firebase : The real-time database for storing and retrieving data.
- HTML/CSS/JavaScript : The web technologies used to build the user interface.

<h2>Acknowledgments</h2>
- https://www.youtube.com/watch?v=B10HWeXouIg&feature=youtu.be
