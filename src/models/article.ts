import {ObjectId} from "mongodb";

export default class Article {
    constructor(
        public uuid: string,
        public slug: string,
        public seotitle: string,
        public seodescription: string,
        public seoimage: string,
        public headline: string,
        public subhead: string,
        public abstract: string,
        public content: string,
        public infobox: string,
        public template: string,
        public shorttoken: string,
        public status: string,
        public weight: string,
        public mediaid: string,
        public createdat: string,
        public modifiedat: string,
        public publishedat: string,
        public metadata: string,
        public hits: string,
        public normalizedTags: string,
        public ceoid: string,
        public sstsid: string,
        public sstspath: string,
        public tags: string[],
        public authors: string[],
        public dominantmedia: string[],
        public ctime: Number,
        public mtime: Number,
        public ptime: Number,
        public id?: ObjectId
    ) {}
}