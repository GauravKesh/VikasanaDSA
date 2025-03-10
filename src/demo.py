import requests

url = "https://judge0-ce.p.rapidapi.com/submissions/"

querystring = {"base64_encoded":"true","wait":"false","fields":"*"}

payload = {
	"language_id": 52,
	"source_code": "I2luY2x1ZGUgPHN0ZGlvLmg+CgppbnQgbWFpbih2b2lkKSB7CiAgY2hhciBuYW1lWzEwXTsKICBzY2FuZigiJXMiLCBuYW1lKTsKICBwcmludGYoImhlbGxvLCAlc1xuIiwgbmFtZSk7CiAgcmV0dXJuIDA7Cn0=",
	"stdin": "SnVkZ2Uw",
    "expected_output": "aGVsbG8sIEp1ZGdlMAo="
}
headers = {
	"x-rapidapi-key": "4e48ccc03amshfd5ad157e3e4671p1d075djsn5cb35f06eb21",
	"x-rapidapi-host": "judge0-ce.p.rapidapi.com",
	"Content-Type": "application/json"
}

response = requests.post(url, json=payload, headers=headers, params=querystring)

response2 = requests.get(url+f'{response.json()['token']}', headers=headers, params=querystring)

print(response2.json()['stdout'])
print(response2.json()['stdout'] == response2.json()['expected_output'])