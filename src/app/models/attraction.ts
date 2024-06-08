import { Review } from './review';

export class Attraction {
    constructor(
      public id: string,
      public name: string,
      public description: string,
      public photoUrl: string,
      public tags?: string[],
      public photos?: string[],
      public reviews?: Review[]
    ) {}
  }
  