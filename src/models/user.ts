export interface User {
  name: string;
  surname: string;
  gender: string;
  age: number;
  phone: string;
  mobile: string;
  email: string;
  metrics?: Metrics;
}

export interface Metrics {
  metabolicAge: number;
  date: string;
  weight: number;
  height: number;
  bmi: number;
  bodyFat: number;
  nonFatMass: number;
  boneMass: number;
  vf: number;
  bodyWater: number;
  biseps: number;
  chest: number;
  waist: number;
  belly: number;
  pelvis: number;
  thigh: number;
  calves: number;
}
