export interface Car {
    id: number;
    name: string;
    vin: string;
    make: string;
    model: string;
    year: string;
    fuelType: string;
    type: string;
    Position: {
        lat: string,
        long: string;
    };
    odometer: number;
    fuel: number;
    battery: number;
  }
  