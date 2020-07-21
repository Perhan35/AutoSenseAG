export interface Car {
    'id': {'N' : string};
    'name': {'S' : string};
    'vin': {'S' : string};
    'make': {'S' : string};
    'model': {'S' : string};
    'year': {'S' : string};
    'fuelType': {'S' : string};
    'type': {'S' : string};
    'Position': { 'M': {
        'lat': {'N' : string},
        'lon': {'N' : string};
    }};
    'odometer': {'N' : string};
    'fuel': {'N' : string};
    'battery': {'N' : string};
  }
  