import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { product } from '../models/product.model';
import { cart } from '../models/cart.model'
@Injectable({
  providedIn: 'root'
})
export class ProductListService {
  productList=new BehaviorSubject<any>([]);
  cartdata:cart={
    product:[],
    total: 0
  };

  private dataUrl = 'assets/data.json';
  
  constructor(private http:HttpClient) { }


  fetchProducts(){
    return this.http.get(this.dataUrl)
  }

  getProductDetails(){
    return this.productList.asObservable();
  }

  addToCart(product:product){
    this.cartdata.product.push(product);
    if(this.cartdata.total)
      this.cartdata.total+=product.price;
    this.productList.next(this.cartdata);

    console.log(this.cartdata);
    
  }
  getTotalAmout():number|undefined{
    this.cartdata.product.map((a: product, index:number)=>{
      if(this.cartdata.total)
        this.cartdata.total += a.price
    })
    return this.cartdata.total;
  }

  removeCartData(product:product){
    this.cartdata.product.map((a:product, index:number)=>{
      if(product.id == a.id){
        this.cartdata.product.splice(index,1);
      }
    })
  }
}

