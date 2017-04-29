import { Post } from './post.model';
import { Relationship } from './relationship.model';

export class User{
    id: number;
    username: string;
    email: string;
    givenName: string;
    familyName: string;
    born: Date;
    address: string;
    phone: string;
    avatar: string;
    authorities: string[];
    relationships: Relationship[];
    posts: Post[];
    enabled: boolean;

    constructor(email: string, giveName: string, familuName: string, born: Date, address: string, phone: string, avatar: string){}
    
    
    setPosts(p: Post[]){
        this.posts = p;
    }
    
    setRelationships(r: Relationship[]){
        this.relationships = r;
    }
}