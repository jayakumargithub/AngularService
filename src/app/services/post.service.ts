import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import {Observable} from 'rxjs/Observable';
import { AppError } from '../common/app-error';
import { NotFoundError } from '../common/not-found-error';
import { BadInput } from '../common/bad-input';
import 'rxjs/add/operator/catch';
import 'rxjs/add/Observable/throw';

@Injectable()
export class PostService {
  private url = 'http://jsonplaceholder.typicode.com/posts'
  constructor(private http: Http) { } 
  
  getPosts() {
    return this.http.get(this.url);
  }

  createPost(post) {
    return this.http.post(this.url, JSON.stringify(post))
    .catch(this.handleError); 
}

  updatePost(post) {
    console.log("while update id is " + post.id);
    return this.http.patch(this.url + '/' + post.id, JSON.stringify(post))
    .catch(this.handleError);
  }

  deletePost(id) {
    return this.http.delete(this.url + '/' + id)
      .catch(this.handleError);
  }


  private handleError(error: Response) {
    if (error.status === 404)
      return Observable.throw(new NotFoundError());
      if (error.status === 40)
      return Observable.throw(new BadInput(error.json()));

    return Observable.throw(new AppError(error));
  }
}
