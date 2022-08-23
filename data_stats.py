import json

sites = None

with open("./sites_current_with_operator.json", "r") as f:
    sites = json.loads(f.read())

operators = []
service_types = []
technologies = []
frequency_bands = []

for s in sites:
    if s["operator"] not in operators:
        operators.append(s["operator"])

    if s["serviceType"] not in service_types:
        service_types.append(s["serviceType"])

    if s["technology"] not in technologies:
        technologies.append(s["technology"])

    if s["frequencyBand"] not in frequency_bands and s["frequencyBand"] != None:
        frequency_bands.append(s["frequencyBand"])

print("Operators:")
print(operators)

print("Service types:")
print(service_types)

print("Technologies:")
print(technologies)

print("Frequency bands:")
frequency_bands.sort()
print(frequency_bands)
