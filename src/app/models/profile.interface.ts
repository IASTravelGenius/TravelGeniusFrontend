import { Photo } from './photo.interface';
import { Tag } from './tag.interface';

export interface Profile {
  username: string;
  email: string;
  role: string;
  description: string;
  profilePhoto: Photo;
  photoUrls: Photo[];
  tags: Tag[];
  newsTags: Tag[];
  cityName: string;
  countryName: string;
}
