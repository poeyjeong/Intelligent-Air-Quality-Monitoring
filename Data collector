import machine
from machine import Pin
from time import sleep
import st7789
import tft_config
import dht
import vga2_8x16 as font
import network
import ntptime
import time
import ufirebase
import gc

tft = tft_config.config(1)

sensorDHT_power = Pin(4, Pin.OUT)  # Power pin for DHT22 sensor
sensorDHT = dht.DHT22(machine.Pin(3)) # DHT22 Pin
ldr = Pin(14, Pin.IN) # Motion detector Pin

# -----------------------------------------------------------

def display_text(text, line):
    y = line * font.HEIGHT  # Calculate the y-coordinate based on the line number
    tft.fill_rect(0, y, tft.width(), font.HEIGHT, st7789.BLACK)  # Clear the line
    tft.text(
        font,
        text,
        0,  # Set the x-coordinate to 0 for left alignment
        y,
        st7789.WHITE,  # text color
        st7789.BLACK)  # background

def center(text):
    length = 1 if isinstance(text, int) else len(text)
    tft.text(
        font,
        text,
        tft.width() // 2 - length // 2 * font.WIDTH,
        tft.height() // 2 - font.HEIGHT //2,
        st7789.WHITE,
        st7789.RED)

def connecting():
    tft.init()
    tft.fill(st7789.RED)
    center(b'Connecting...')
    sleep(2)
    tft.fill(st7789.BLACK)

def connected():
    tft.init()
    tft.fill(st7789.BLUE)
    center(b'WiFi Connected!')
    sta_if.ifconfig()
    sleep(2)
    tft.fill(st7789.BLACK)

sta_if = network.WLAN(network.STA_IF)
sta_if.active(True)
if not sta_if.isconnected():
    sta_if.connect('...', '...') #name and password
    while not sta_if.isconnected():
        connecting()
    connected()

ufirebase.setURL('...')

# -----------------------------------------------------------

# Set the last update time to be the current time
last_update = machine.RTC().datetime()[6]

ntptime.settime()
UTC_OFFSET = +7 * 60 * 60
actual_time = time.localtime(time.time() + UTC_OFFSET) #ไทย GMT+7

# Set time
rtc = machine.RTC()
rtc.datetime((actual_time[0], actual_time[1], actual_time[2], 0, actual_time[3], actual_time[4], actual_time[5], 0))

# -----------------------------------------------------------

tft.init() # Initialize(เริ่ม) the display
tft.fill(st7789.BLACK) # Fill the screen with black

while True: # Main loop
    # Get current time
    t = rtc.datetime()
    date_str = '{:04d}-{:02d}-{:02d}'.format(t[0], t[1], t[2])
    time_str = '{:02d}:{:02d}:{:02d}'.format(t[4], t[5], t[6])
    # {:04d} =  width of 4 digits

    try:
        # Power cycle the DHT22 sensor
        sensorDHT_power.on()
        sleep(1)
        sensorDHT_power.off()

        # Read tempurature and humidity
        sensorDHT.measure()
        temp = sensorDHT.temperature()
        hum = sensorDHT.humidity()
        
        if ldr.value() == 1:
            print('OBJECT DETECTED')
            display_text(text[0], 0) # Display the date
            display_text(text[1], 1) # Display the time
            display_text(text[2], 2) # Display the temperature
            display_text(text[3], 3) # Display the humidity
            sleep(2)

        else:
            # If no motion detected, display nothing
            tft.fill(st7789.BLACK)

        current_time = (machine.RTC().datetime()[4] * 60 * 60) + (machine.RTC().datetime()[5] * 60) + machine.RTC().datetime()[6]
        # If it has been 1 min since the last update, send data to Firebase
        if current_time - last_update >= 60:
            path = 'data/' + str(date_str) + ' ' + str(time_str) +'/'
            ufirebase.put(path, {'temp': temp, 'hum': hum}, bg=0)
            print('Data sent to Firebase')

            # Update last_update variable
            last_update = current_time

        gc.collect()
        sleep(0.5)

    except Exception as e:
        machine.reset()
        print('machine reset')
