import { CarDTO } from '../../dtos/CardDTO';

export type AppRoutesParamList = {
  Home: undefined;
  CarDetails: { car: CarDTO };
  Scheduling: undefined;
  SchedulingDetails: undefined;
  SchedulingComplete: undefined;
};
