export class Deal {
    constructor(
      public id: string,
      public title: string,
      public description: string,
      public photoUrl: string,

      public price?: number,
      public startDate?: Date,
      public endDate?: Date
    ) {}
    
}
