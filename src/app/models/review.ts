export class Review {
    constructor(
        public id: string,
        public title: string,
        public rating: number,
        public text: string,
        public date: Date,
        public userId: string,
        public userPhotoUrl: string,
        public cityId: string,
    ) {}
}
