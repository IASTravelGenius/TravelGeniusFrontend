import { Attraction } from './attraction';
import { News } from './news';
import { Review } from './review';
import { Tag } from './tag.interface';
import { Photo } from './photo.interface';
import { TouristicAttraction } from './touristic-attraction';

export class City {
  constructor(
    public id: string,
    public name: string,
    public description: string,
    public mainPhotoUrl: Photo,
    public population: number,
    public photos: string[],
    public tags: Tag[],
    public touristicAttractions: TouristicAttraction[],
    public news: News[],
    public reviews: Review[],
    public countryName: string,
    public countryId: number,
  ) {}
}
