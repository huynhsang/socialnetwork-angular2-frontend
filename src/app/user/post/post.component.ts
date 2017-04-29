import { Component, Input,  OnInit, ChangeDetectorRef, ElementRef} from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { PostService } from '../../_service/post/post.service';
import { Post } from '../../_model/post.model';
import { Image } from '../../_model/image.model';
import { User } from '../../_model/user.model';

import { DateOrderByPipe } from '../../_pipe/date-orderby.pipe';

@Component({
    selector: 'post-ui',
    templateUrl: './post.component.html',
    styleUrls: ['./post.component.css']
})

export class PostComponent{
    post: Post;
    images: Array<Image> = new Array();
    img_load: string[] = [];
    content: string = "";
    currentUser: User;

    model: any ={};    

    @Input()
    public posts: Array<Post> = new Array();    
    public file_srcs: string[] = [];
    public debug_size_before: string[] = [];
    public debug_size_after: string[] = [];
    
    
    constructor(private changeDetectorRef: ChangeDetectorRef, private postService: PostService,
            private route: ActivatedRoute) {
    }
    
    ngOnInit(){
        this.currentUser = JSON.parse(localStorage.getItem("user"));
    }
    
    
    fileChange(input){
        this.readFiles(input.files);
        console.log(input.files);        
    }
    
    readFiles(files, index=0){
     // Create the file reader
        let reader = new FileReader();
        
        // If there is a file
        if(index in files){
          // Start reading this file
          this.readFile(files[index], reader, (result) =>{
            // Create an img element and add the image file data to it
            var img = document.createElement("img");
            img.src = result;
        
            // Send this img to the resize function (and wait for callback)
            this.resize(img, 100, 100, (resized_jpeg, before, after)=>{
              // For debugging (size in bytes before and after)
              this.debug_size_before.push(before);
              this.debug_size_after.push(after);
        
              // Add the resized jpeg img source to a list for preview
              // This is also the file you want to upload. (either as a
              // base64 string or img.src = resized_jpeg if you prefer a file). 
              this.file_srcs.push(resized_jpeg);
        
              // Read the next file;
              this.readFiles(files, index+1);
            });
          });
        }else{
          // When all files are done This forces a change detection
          this.changeDetectorRef.detectChanges();
        }
    }
    
    resize(img, MAX_WIDTH:number, MAX_HEIGHT:number, callback){
        // This will wait until the img is loaded before calling this function
        return img.onload = () => {
    
          // Get the images current width and height
          var width = img.width;
          var height = img.height;
    
          // Set the WxH to fit the Max values (but maintain proportions)
          if (width > height) {
              if (width > MAX_WIDTH) {
                  height *= MAX_WIDTH / width;
                  width = MAX_WIDTH;
              }
          } else {
              if (height > MAX_HEIGHT) {
                  width *= MAX_HEIGHT / height;
                  height = MAX_HEIGHT;
              }
          }
    
          // create a canvas object
          var canvas = document.createElement("canvas");
    
          // Set the canvas to the new calculated dimensions
          canvas.width = width;
          canvas.height = height;
          var ctx = canvas.getContext("2d");  
    
          ctx.drawImage(img, 0, 0,  width, height); 
    
          // Get this encoded as a jpeg
          // IMPORTANT: 'jpeg' NOT 'jpg'
          var dataUrl = canvas.toDataURL('image/jpeg');
    
          // callback with the results
          callback(dataUrl, img.src.length, dataUrl.length);
        };
      }
    
    readFile(file, reader, callback){
        
        var d = new Date();
        let name: string = d.getTime().toString();
        let type: string = "jpg";
        let path: string = "http://localhost:8080/getImage/" + name +".jpg";
        let image = new Image(name, type, path, new Date());
        this.images.push(image);
    
        reader.onload = () => {
          callback(reader.result);
          this.img_load.push(reader.result);
        }
    
        reader.readAsDataURL(file);
      }
    
    upload(){
       if(this.content != ""){
           let count = this.images.length;
           let title = "";
           if(count != 0){
               if(count == 1){
                   title = "Added a new photo";
               }else{
                   title = "Added "+ count + " new photos";
               }
           }
           this.post = new Post(title, this.content, new Date());
           this.model.post = this.post;
           this.model.images = this.images;
           this.model.img_load = this.img_load;
           this.postService.postImage(this.model).subscribe(
                   (data)=>{console.log(data)
                       this.post.images = this.images;
                       this.post.owner = JSON.parse(localStorage.getItem("user"));
                       this.posts.push(this.post);
                       this.content = "";
                       this.images = [];
                       this.img_load = [];
                       this.file_srcs = [];
                   },
                   error => {console.log(error)},
                   () => {console.log("Complete")})
       }
    }
};
