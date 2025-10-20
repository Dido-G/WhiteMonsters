import requests
import json
from groq import Groq
import re

GROQ_API_KEY = ("API KEY")
NODEMCU_IP = "http://10.183.99.61"  # change to your MCU IP

client = Groq(api_key=GROQ_API_KEY)

# Fetch sensor data
response = requests.get(f"{NODEMCU_IP}/", timeout=5)
data = response.json()

# Ask Groq model for pump time
user_prompt = f"""
Find only the data for aloe, like moisture and sunlight (0 to 70), from the following dataset:
{json.dumps(data, indent=2)}

Based on this data, calculate how long (in minutes) a 5V water pump needs to run to keep the aloe healthy.
Return only the time as a number.

Finally, return the output in 50 tokens and make the last 2 words only for the time in the following format: "Minutes: [time]"
"""

chat_completion = client.chat.completions.create(
    model="llama-3.3-70b-versatile",
    messages=[
        {"role": "system", "content": "You are an assistant that analyzes IoT sensor data and returns a single number."},
        {"role": "user", "content": user_prompt}
    ],
    max_completion_tokens=200
)

pump_time_minutes = chat_completion.choices[0].message.content.strip()
print("Pump time (minutes):", pump_time_minutes)

numbers = re.findall(r'\d+', pump_time_minutes)

# Get the last number
last_number = int(numbers[-1])

# Send command to NodeMCU
try:
    seconds = int(float(last_number) * 60)
    r = requests.get(f"{NODEMCU_IP}/pump?time={seconds}", timeout=5)
    print("NodeMCU response:", r.text)
except Exception as e:
    print("Error sending pump command:", e)
