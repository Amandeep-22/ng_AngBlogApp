import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../../services/categories.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Post } from '../../models/post';
import { PostsService } from '../../services/posts.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrl: './new-post.component.css'
})
export class NewPostComponent implements OnInit {
  flag: boolean = true;
  permalink: string = '';
  imgSrc: any = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxaU9SIVC1AZUv0jJW0WtEs0IgZlw0iiFs-w&s';
  selectedImg: any;
  categories = <any>[];
  post: any;
  postForm: FormGroup;
  formStatus: string = 'Add New';
  docId: string = '';

  constructor(private categoryService: CategoriesService, 
    private fb: FormBuilder, 
    private postService: PostsService,
    private route: ActivatedRoute  
  ) {
    this.postForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(10)]],
      permalink: [{ value: '', disabled: true },  Validators.required],
      exerpt: ['', [Validators.required, Validators.minLength(50)]],
      category: ['', Validators.required],
      postImg: ['', Validators.required],
      content: ['', Validators.required]
    });
    this.route.queryParams.subscribe(val => {
      this.docId = val['id'];
      if(this.docId)
      {
      this.postService.loadOneData(val['id']).subscribe(post => {
        console.log(post);
        this.post = post;
        this.postForm = this.fb.group({
          title: [this.post.title, [Validators.required, Validators.minLength(10)]],
          permalink: [{ value: this.post.permalink, disabled: true },  Validators.required],
          exerpt: [this.post.exerpt, [Validators.required, Validators.minLength(50)]],
          category: [`${this.post.category.categoryId}-${this.post.category.category}`, Validators.required],
          postImg: ['', Validators.required],
          content: [this.post.content, Validators.required]
        });
        this.imgSrc = this.post.postImgPath;
        this.formStatus = 'Edit';

        this.postForm.get('title')?.valueChanges.subscribe(newTitle => {
          const newPermalink = newTitle.replace(/\s/g, '-');
          this.postForm.get('permalink')?.enable();
          this.postForm.get('permalink')?.setValue(newPermalink);
          this.postForm.get('permalink')?.disable();
        });
      });
    }
    else
    {
      this.postForm = this.fb.group({
        title: ['', [Validators.required, Validators.minLength(10)]],
        permalink: [{ value: '', disabled: true },  Validators.required],
        exerpt: ['', [Validators.required, Validators.minLength(50)]],
        category: ['', Validators.required],
        postImg: ['', Validators.required],
        content: ['', Validators.required]
      });
    }
    })
    
    

    this.postForm.get('title')?.valueChanges.subscribe( value=>{
      this.postForm.get('permalink')?.setValue(value.replace(/\s/g, '-'));
    })
  }

  ngOnInit(): void {
    this.categoryService.loadData().subscribe(val => {
      this.categories = val;
    })
  }

  get fc() {
    return this.postForm.controls;
  }

  onTitleChanged($event: any) {
    // const title = $event.target.value;
    // this.permalink = title.replace(/\s/g, '-');
    // console.log(this.permalink);
  }

  showPreview($event: any) {
    const reader = new FileReader();
    reader.onload = (e) => {
      const target = e.target;
      if (target) {
        this.imgSrc = target.result;
      } else {
        console.error("Error: e.target is null");
      }
    };
    reader.onerror = (e) => {
      console.error("Error reading file:", e);
    };

    reader.readAsDataURL($event.target.files[0]);
    this.selectedImg = $event.target.files[0];
  }

  onSubmit() {
    let splitted = this.postForm.value.category.split('-');
    console.log(splitted);

    this.postForm.get('permalink')?.enable();

    const postData: Post = {
      title: this.postForm.value.title,
      permalink: this.postForm.value.permalink,
      category: {
        categoryId: splitted[0],
        category: splitted[1]
      },
      postImgPath: '',
      exerpt: this.postForm.value.exerpt,
      content: this.postForm.value.content,
      isFeatured: false,
      views: 0,
      status: 'new',
      createdAt: new Date()
    }
    console.log(this.docId);
    console.log(postData);
    this.postService.uploadImage(this.selectedImg, postData, this.formStatus, this.docId);

    this.postForm.get('permalink')?.disable();
    // console.log(postData);
    this.postForm.reset();
    this.imgSrc = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxaU9SIVC1AZUv0jJW0WtEs0IgZlw0iiFs-w&s';
  }


}
