import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout-form',
  templateUrl: './checkout-form.component.html',
  styleUrls: ['./checkout-form.component.css']
})
export class CheckoutFormComponent implements OnInit {
  username: string = '';
  address: string = '';
  creditCard: string = '';

  constructor( private route: Router) { }

  
  submitted = false;

  checkOutForm= new FormGroup({
  UserName: new FormControl('',(Validators.required,Validators.minLength(4),Validators.pattern('^[a-zA-Z ]*$'))),
  Address: new FormControl('',(Validators.required,Validators.minLength(6))),
  CreditCard: new FormControl('',(Validators.required,Validators.minLength(16),Validators.maxLength(16),Validators.pattern("^[0-9]*$"))),
  })

  
  onSubmit(){
    this.submitted = true
    
    if(this.checkOutForm.invalid){
      return
    }
    
  }
  get UserName(){
    return this.checkOutForm.get('');
  }

  
  navToShopingCart() {
    this.route.navigate(['/confirmationPage'], {
      queryParams: { data: this.username },
    });
  }


  ngOnInit(): void {
  }

}
