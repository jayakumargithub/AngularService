import { Component, OnInit } from '@angular/core';
 
import { PostService } from '../services/post.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})

export class PostsComponent  implements OnInit{

  ngOnInit(): void {
    this.service.getPosts()
    .subscribe(response => {
      this.posts = response.json();
    });
  }
  posts: any[];
 
  constructor(private service: PostService) {
   
  }

  createPost(input: HTMLInputElement) {
    let post = { title: input.value }
    input.value = '';
    this.service.createPost((post))
      .subscribe(response => {
        post['id]'] = response.json().id;
        this.posts.splice(0, 0, post);
      });
  } 

  updatePost(post) {
    this.service.updatePost(post)
      .subscribe(response => {
        console.log(response.json());
      })
  }

  deletePost(post){
    this.service.deletePost(post.id)
    .subscribe(response => {
      let index = this.posts.indexOf(post);
      this.posts.splice(index,1);
    })
  }
  
}