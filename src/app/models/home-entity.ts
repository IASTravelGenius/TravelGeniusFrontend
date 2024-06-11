import { Photo } from './photo.interface';
import { Review } from './review';
import { Tag } from './tag.interface';

export class HomeEntity {
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

    constructor(data: any) {
        this.name = data.name;
        this.id = data.id;
        this.description = data.description;
        this.tags = data.tags;
        this.matchingFactor = data.matchingFactor;
        this.latitude = data.latitude;
        this.longitude = data.longitude;
        this.countryName = data.countryName;
        if (data.mainPhotoUrl) {
            console.log('data.mainPhotoUrl', data.mainPhotoUrl);
            this.mainPhotoUrl = data.mainPhotoUrl;
        }
        if (data.mainPhoto) {
            console.log('data.mainPhoto', data.mainPhoto);
            this.mainPhotoUrl = data.mainPhoto;
        } else {
            console.log('no main photo');
            this.mainPhotoUrl = data.mainPhoto;
        }

        // this.mainPhotoUrl = data.mainPhotoUrl || data.mainPhoto;
        this.photos = data.photos;
        this.reviews = data.reviews;
        this.type = data.type;
        this.cityName = data.cityName;
        this.cityId = data.city
    }
  
}
