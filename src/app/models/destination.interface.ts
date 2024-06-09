import { Photo } from './photo.interface';
import { Tag } from './tag.interface';
import { Review } from './review';
import { TouristicAttraction } from './touristic-attraction';

export interface Destination {
    id: number;
    name: string;
    description: string;
    tags: Tag[];
    matchingFactor: number;
    latitude: number;
    longitude: number;
    countryName: string;
    mainPhotoUrl: Photo;

    photos: Photo[];
    reviews: Review[];

    // latitude: number;
    // longitude: number;
    type: string;
    postalCode: string;
    population: number;
    touristicAttractions: TouristicAttraction[];
  }
  