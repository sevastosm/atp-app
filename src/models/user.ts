export interface User {
  name: string;
  surname: string;
  gender: string;
  age: string;
  phone: string;
  mobile: string;
  email: string;
  metrics?: Metrics;
}

export interface Metrics {
  date: string;
  weight: string;
  heigth: string;
  bmi: string;
  bodyFat: string;
  nonFatMass: string;
  vf: string;
  w: string;
  biseps: string;
  chest: string;
  waist: string;
  belly: string;
  pelvis: string;
  thigh: string;
  calves: string;
}
