import { Component, OnInit } from '@angular/core';
import { SubscribersService } from '../services/subscribers.service';

@Component({
  selector: 'app-subscribers',
  templateUrl: './subscribers.component.html',
  styleUrl: './subscribers.component.css'
})
export class SubscribersComponent implements OnInit{

  subscriberArray= <any>[];
  constructor(private subservice: SubscribersService){}

  ngOnInit(): void {

    this.subservice.loadData().subscribe(val=>{
        this.subscriberArray = val;
    });
  }

  onDelete(id : any){
    this.subservice.deleteData(id);
  }
}
