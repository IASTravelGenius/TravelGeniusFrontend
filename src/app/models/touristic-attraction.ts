import { Photo } from './photo.interface';
import { Tag } from './tag.interface';
import { Review } from './review';

export interface TouristicAttraction {
  name: string;
  id: number;
  description: string;
  tags: Tag[];
  matchingFactor: number;
  latitude: number;
  longitude: number;
  countryName: string;
  mainPhotoUrl: Photo;
  photos: Photo[];
  reviews: Review[];
  type: string;
  cityName: string;
  cityId: number;
}
