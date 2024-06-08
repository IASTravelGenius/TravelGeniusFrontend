import { Attraction } from './attraction';
import { News } from './news';
import { Review } from './review';

export class City {
  constructor(
    public id: string,
    public name: string,
    public description: string,
    public mainPhotoUrl: string,
    public population: number,
    public photos: string[],
    public tags: string[],
    public attractions: Attraction[],
    public news: News[],
    public reviews: Review[],
  ) {}
}
