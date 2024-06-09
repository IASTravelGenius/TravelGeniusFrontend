import { Photo } from './photo.interface';

export interface Destination {
    id: number;
    name: string;
    description: string;
    photo: Photo;
    latitude: number;
    longitude: number;
    type: string;
    rating: number;
  }
  