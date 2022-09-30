import { Component, OnInit, Input } from '@angular/core';
import { ProductListService } from '../services/product-list.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css'],
})
export class ShoppingCartComponent implements OnInit  {  
  public product: any = [];
  public total!: number;
  public amount!: number;
  constructor(
    private productservice: ProductListService,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.productservice.getProductDetails().subscribe((res: any) => {
      this.product = res.;
      console.log(res);
      
      if (this.product) {
        for (let i = 0; i < this.product.length; i++) {
          this.product[i].amount = this.product[i].amount || 1;
          this.getTotalAmount(this.product);
        }
      }
    });
  }

  removeItem(product: any) {
    this.productservice.removeCartData(product);
    this.getTotalAmount(this.product);
    alert(`Your item has been removed from the cart.`)
  }

  InputValidation(event: any, i: number) {
    const amount = +event.target.value;

    if (amount < 1) {
      event.target.value = this.product[i].amount;
      return;
    }
    this.updatedAmount(amount, i);
  }

  private updatedAmount(amount: number, i: number) {
    this.product[i].amount = amount;
    this.productservice.removeCartData(this.product);
    this.getTotalAmount(this.product);
  }

  getTotalAmount(data: any) {
    let Total = 0;

    for (const product of data) {
      const productAmount = product.amount || 1;
      Total += product.price * productAmount;
    }

    this.total = Total;
  }

}