// export class Review {
//     constructor(
//         public id: string,
//         public title: string,
//         public rating: number,
//         public text: string,
//         public date: Date,
//         public userId: string,
//         public userPhotoUrl: string,
//         public cityId: string,
//     ) {}
// }
import { Photo } from './photo.interface';

export interface Review {
  id: number;
  title: string;
  text: string;
  rating: number;
  username: string;
  userPhoto: Photo;
  publishingDate: string;
  photoAttached: Photo[];
}
