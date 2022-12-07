import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Skinet';
  //products: IProduct[];

  constructor(){ }

  ngOnInit(): void {
    // this.http.get('https://localhost:5001/api/Products?pageSize=50').subscribe((response: Ipagination) => {
    //  this.products = response.data;
    // }, error => {
    //   console.log(error);
    // });
    
  }
  
}
