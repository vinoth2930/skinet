import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { IBrand } from '../shared/models/brand';
import { IProduct } from '../shared/models/product';
import { IType } from '../shared/models/productType';
import { ShopParams } from '../shared/models/ShopParams';
import { ShopService } from './shop.service';


@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {
  @ViewChild('search',{static: false}) searchTearm: ElementRef;

  products: IProduct[];
  brands: IBrand[];
  types: IType[];
  // brandIdSelected: number;
  // typeIdSelected: number;
  // sortSelected = 'name';

  shopParams = new ShopParams();
  totalCount: number;


  

  sortOptions = [
    {name: 'Alphabetical', value: 'name'},
    {name: 'Price: Low to High', value: 'priceAsc'},
    {name: 'price: High to Low', value: 'priceDesc'}
  ];

  constructor(private shopService: ShopService) {}

  ngOnInit() {
  this.getProducts();
  this.getbrands();
  this.getTypes();
  }

  getProducts(){
    this.shopService.getProducts(this.shopParams)
    .subscribe(response => {
      this.products = response.data;
      this.shopParams.pageNumber = response.pageIndex;
      this.shopParams.pageSize = response.pageSize;
      this.totalCount = response.count;
    }, error => {
      console.log(error);
    });
  }

  getbrands(){
    this.shopService.getBrands().subscribe(response => {
      this.brands =[{id: 0, name: 'ALL'}, ...response];
    }, error => {
      console.log(error);
    });
  }

  getTypes(){
    this.shopService.getTypes().subscribe(response => {
      this.types =[{id: 0, name: 'ALL'}, ...response];;
    }, error => {
      console.log(error);
    });
  }

  OnBrandSelected(brandId: number){
    this.shopParams.brandId = brandId;
    this.getProducts();
  }

   onTypeSelected(typeId: number){
     this.shopParams.typeId = typeId;
     this.getProducts();
  }

   onSortSelected(sort: string){
     this.shopParams.sort = sort;
     this.getProducts();
   }

   onPageChanged(event: any){
    this.shopParams.pageNumber = event;
    this.getProducts();
   }

   onSearch(){
    this.shopParams.search = this.searchTearm.nativeElement.value;
    this.getProducts();
   }

   onReset(){
    this.searchTearm.nativeElement.value = '';
    this.shopParams = new ShopParams();
    this.getProducts();
   }

}
