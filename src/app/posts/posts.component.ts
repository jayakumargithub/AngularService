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
    },error => {
      alert('An unexpected error occured.')
      console.log(error);
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
      },(error:Response) => {
        if(error.status === 400){
          alert("Request contains bad data.")
          //this.form.setErrors(error.json()); // if need to display in the form
        }else{
        alert('An unexpected error occured.')
        console.log(error);}
      });
  } 

  updatePost(post) {
    this.service.updatePost(post)
      .subscribe(response => {
        console.log(response.json());
      },error => {
        alert('An unexpected error occured.')
        console.log(error);
      })
  }

  deletePost(post){
    this.service.deletePost(post.id)
    .subscribe(response => {
      let index = this.posts.indexOf(post);
      this.posts.splice(index,1);
    },(error:Response) => {
    if(error.status === 404)
    alert('This post already deleted');
    else{
      alert('An unexpected error occured.')
      console.log(error);
    }
    })
  }
  
}