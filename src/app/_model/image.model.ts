import { Post } from './post.model';

export class Image{
    id: number;
    post: Post;
    constructor(public name: string, public type: string, public path: string, public created: Date){}
}