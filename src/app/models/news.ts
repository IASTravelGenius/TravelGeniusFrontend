import { Tag } from "./tag.interface";

export class News {
    constructor(
        public id: number,
        public title: string,
        public text: string,
        public source: string,
        // public publishingDate: Date,

        public tags: Tag[]
    ) {}
}
