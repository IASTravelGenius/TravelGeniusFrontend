import { Tag } from './tag.interface';

export interface SimpleProfile {
    description?: string;
    countryName?: string;
    cityName?: string;
    tags?: Tag[];
    deletedTags?: Tag[];
}
