import { Component, OnInit } from '@angular/core';
import { ProductListService } from '../services/product-list.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  productDetails: object[] = [];
  filteredProduct:any;
  constructor(private productservice:ProductListService, private route:ActivatedRoute, private router:Router) {}

  ngOnInit(): void {
    let id=0
    this.route.paramMap.subscribe((data:any) => id=data.params.id)
    this.productservice.fetchProducts().subscribe((res:any)=>{
      this.productDetails = res;
      this.productDetails = this.productDetails.filter((data:any)=> data.id == id);
      if(this.productDetails.length<=0){
        this.router.navigateByUrl('');
        alert(`page not found`)
      }
      this.filteredProduct = this.productDetails[0];
      console.log(this.filteredProduct)
    })
  }

  addToCart(products:any){
    this.productservice.addToCart(this.filteredProduct);
    alert(`Added to cart !`)
  }
}