import { Tag } from "./tag.interface";

export class News {
    constructor(
        public id: number,
        public latestEdit: Date,
        public title: string,
        public text: string,
        public source: string,
        public link: string,
        public publishingDate: Date,
        

        // public publishingDate: Date,

        public tags: Tag[]
    ) {}
}
