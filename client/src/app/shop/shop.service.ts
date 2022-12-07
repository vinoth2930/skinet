import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, map } from 'rxjs/operators';
import { IBrand } from '../shared/models/brand';
import { Ipagination } from '../shared/models/pagination';
import { IProduct } from '../shared/models/product';
import { IType } from '../shared/models/productType';
import { ShopParams } from '../shared/models/ShopParams';


@Injectable({
  providedIn: 'root'
})
export class ShopService {

  baseUrl = 'https://localhost:5001/api/';
 
  constructor(private http: HttpClient) { }
//Here we are getting all the services form our API
  getProducts(shopParams : ShopParams){
    let params = new HttpParams();

    if(shopParams.brandId !==0){
      params = params.append('brandId', shopParams.brandId.toString());
    }

    if(shopParams.typeId !==0){
      params = params.append('typeId', shopParams.typeId.toString());
    }

    if(shopParams.search){
      params = params.append('search', shopParams.search);
    }

   
      params = params.append('sort', shopParams.sort);
      params = params.append('pageIndex', shopParams.pageNumber.toString());
      params = params.append('pageIndex', shopParams.pageSize.toString());
    

    return this.http.get<Ipagination>(this.baseUrl + 'products', {observe: 'response', params})
    //using RXJS for map
      .pipe(
        delay(1000),
        map(response =>{
          return response.body;
        })
      );
  }

  getProduct(id: number){
    return this.http.get<IProduct>(this.baseUrl + 'products/' + id);
  }

  getBrands(){
    return this.http.get<IBrand[]>(this.baseUrl + 'products/brands')
  }

  getTypes(){
    return this.http.get<IType[]>(this.baseUrl + 'products/types')
  }
}
