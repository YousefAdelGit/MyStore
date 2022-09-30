import { Component, OnInit } from '@angular/core';
import { ProductListService } from '../services/product-list.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  productList: any;

  constructor(private proListservice:ProductListService) { }

  ngOnInit(): void {
    this.proListservice.fetchProducts().subscribe(data => this.productList=data)
  
  }
  addToCart(products:any){
    this.proListservice.addToCart(products);
    alert(`Added to cart !`)
  }

  UpdateAmount(event:{value:number;}){
  }
  
  AmountOnChange(event:number){
  }

}
