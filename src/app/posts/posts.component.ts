import { Component, OnInit } from '@angular/core';

import { PostService } from '../services/post.service';
import { AppError } from '../common/app-error';
import { NotFoundError } from '../common/not-found-error';
import { Observable } from 'rxjs/Observable';
import { BadInput } from '../common/bad-input';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})

export class PostsComponent implements OnInit {

  ngOnInit(): void {
    this.service.getAll()
      .subscribe(posts => this.posts = posts); //must use 'map' for this
  }
  posts: any[];

  constructor(private service: PostService) {

  }

  createPost(input: HTMLInputElement) {
    let post = { title: input.value }
    input.value = '';
    this.service.create((post))
      .subscribe(newPost => {
        post['id]'] = newPost.id;
        this.posts.splice(0, 0, post);
      }, (error: AppError) => {
        if (error instanceof BadInput) {
          //  this.form.setErrors(error.originalError);
          return Observable.throw(new BadInput(error));
        } else {
          throw error;
        }
      });
  }

  updatePost(post) {
    this.service.update(post)
      .subscribe(updatedPost => {
        console.log(updatedPost); 
      });

  }

  deletePost(post) {
    this.service.delete(post.id)
      .subscribe(() => {
        let index = this.posts.indexOf(post);
        this.posts.splice(index, 1);
      }, 
      (error: AppError) => {
        if (error instanceof NotFoundError)
          alert('This post has already been deleted.')
        else {
         throw error;
        }
      });
  }

}