from machine import Pin
from time import sleep
import dht
import machine
import network
import ufirebase
import ntptime
import time
import gc

sensorDHT = dht.DHT22(machine.Pin(15)) # DHT22 Pin

# -----------------------------------------------------------

sta_if = network.WLAN(network.STA_IF)
sta_if.active(True)
if not sta_if.isconnected():
  sta_if.connect('...', '...') #name and password
  while not sta_if.isconnected():
    sleep(0.2)
  print("Connected to Wifi")

ufirebase.setURL('...')

# -----------------------------------------------------------

# Set the last update time to be the current time
last_update = machine.RTC().datetime()[6]

ntptime.settime()
UTC_OFFSET = +7 * 60 * 60
actual_time = time.localtime(time.time() + UTC_OFFSET) #Thai GMT+7

# Set time
rtc = machine.RTC()
rtc.datetime((actual_time[0], actual_time[1], actual_time[2], 0, actual_time[3], actual_time[4], actual_time[5], 0))

# -----------------------------------------------------------

# Main loop
while True:
    # Get current time
    t = rtc.datetime()
    date_str = '{:04d}-{:02d}-{:02d}'.format(t[0], t[1], t[2])
    time_str = '{:02d}:{:02d}:{:02d}'.format(t[4], t[5], t[6])
    # {:04d} =  width of 4 digits

    try:
        # Read temperature and humidity
        sensorDHT.measure()
        temp = sensorDHT.temperature()
        hum = sensorDHT.humidity()

        current_time = (machine.RTC().datetime()[4] * 60 * 60) + (machine.RTC().datetime()[5] * 60) + machine.RTC().datetime()[6]
        # If it has been 1 min since the last update, send data to Firebase
        if current_time - last_update >= 60:
          path = 'data/' + str(date_str) + ' ' + str(time_str) +'/'
          ufirebase.put(path, {'temp': temp, 'hum': hum}, bg=0)
          print('Data sent to Firebase')

          # Update last_update variable
          last_update = current_time

        gc.collect()
        sleep(1)

    except Exception as e:
        machine.reset()
        print('machine reset.')
