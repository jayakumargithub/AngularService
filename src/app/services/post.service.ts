import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class PostService {
  private url = 'http://jsonplaceholder.typicode.com/posts'
  constructor(private http: Http) { } 
  
  getPosts() {
    return this.http.get(this.url);
  }

  createPost(post) {
    return this.http.post(this.url, JSON.stringify(post));
  }

  updatePost(post) {
    console.log("while update id is " + post.id);
    return this.http.patch(this.url + '/' + post.id, JSON.stringify(post));
  }

  deletePost(id) {
    return this.http.delete(this.url + '/' + id);
  }

}
