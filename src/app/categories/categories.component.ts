import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../services/categories.service';
import { Category } from '../models/category';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent implements OnInit {

    categoryArray = <any>[];
    formCategory: string = '';
    formStatus: string = 'Add';
    categoryId: string = '';
    constructor(private categoryService: CategoriesService) {
      
    }
    
    ngOnInit(): void {
        this.categoryService.loadData().subscribe(val => {
          console.log(val);
          this.categoryArray = val;
        })
    }

    onSubmit(formData: any){
        let categoryData: Category = {
          category : formData.value.category
        }

        if(this.formStatus == 'Add')
        {
          this.categoryService.saveData(categoryData);
          formData.reset();
        }
        else if(this.formStatus == 'Edit')
        {
          this.categoryService.updateData(this.categoryId,categoryData);
          formData.reset();
          this.formStatus = 'Add';
        }
        // let subCategoryData = {
        //   subCategory: 'subCategory1'
        // }

      //  this.afs.collection('categories').add(categoryData).then(docRef => {
      //   console.log(docRef);

      //   //this.afs.doc(`categories/${docRef.id}').collection('subcategories`).add(subCategoryData)
      //   this.afs.collection('categories').doc(docRef.id).collection('subcategories').add(subCategoryData).then(docRef1 =>{
      //     console.log(docRef1);

      //    // this.afs.doc(`categories/${docRef.id}/subcategories/${docRef1.id}`).collection('subcategories').add(subCategoryData);
      //     this.afs.collection('categories').doc(docRef.id).collection('subcategories').doc(docRef1.id).collection('subcategories').add(subCategoryData).then(docRef2 => {
      //       console.log(docRef2);
      //     })
      //   })
      //  })
      //  .catch(err => { console.log(err)})
    }

    onEdit(category: any, id: any)
    {
       this.formCategory = category;
       this.categoryId = id;
       this.formStatus = 'Edit';
    }

    onDelete(id: any)
    {
      this.categoryService.deleteData(id);
    }
}
