import { Photo } from './photo.interface';
import { Tag } from './tag.interface';
import { Destination } from './destination.interface';

export interface Country {
  id: number;
  name: string;
  countryCode: string;
  description: string;
  mainPhoto: Photo;
  photos: Photo[];
  tags: Tag[];
  destinations: Destination[];
  rating: number;
}
