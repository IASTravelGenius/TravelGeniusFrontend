import { Attraction } from './attraction';

export class City {
  constructor(
    public id: string,
    public name: string,
    public mainPhotoUrl: string,
    public population: number,
    public attractions: Attraction[]
  ) {}
}
