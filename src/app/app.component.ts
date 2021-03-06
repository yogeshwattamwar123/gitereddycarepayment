import { Component, OnInit, HostListener, ElementRef } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
declare var $: any;
declare var Accept: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'ereddycarepayment';

  consultstep3form: FormGroup;
  public url = "http://127.0.0.1:8080";
  public card_number;
  public month;
  public year;
  public code;
  public dataValue;
  public dataDescriptor;
  public amount = 76;
  constructor(private http:HttpClient, private fb: FormBuilder, private router: Router,private elementRef:ElementRef) {
    this.createForm();
  }

  ngOnInit() {
    this.http.get(this.url+"/getdata")
    .subscribe(res => {
      console.log(res);
    });
  }

  paymentform() {
    var authData = {};
        authData["clientKey"] = "5RSBBL3y8Bxw9b56943J9Zyt5AJ32arm4PWsHWt2M6gnprmA8hxsfmyad44zdYKA";
        authData["apiLoginID"] = "8W6s4k3Ma";

    var cardData = {};
        cardData["cardNumber"] = (<HTMLInputElement>document.getElementById("card_number")).value;
        cardData["month"] = (<HTMLInputElement>document.getElementById("month")).value;
        cardData["year"] = (<HTMLInputElement>document.getElementById("year")).value;
        cardData["cardCode"] = (<HTMLInputElement>document.getElementById("code")).value;

    var secureData = {};
        secureData["authData"] = authData;
        secureData["cardData"] = cardData;
    console.log(secureData);
    Accept.dispatchData(secureData, responseHandler);

    function responseHandler(response:any) {
        if (response.messages.resultCode === "Error") {
            var i = 0;
            while (i < response.messages.message.length) {
                console.log(
                    response.messages.message[i].code + ": " +
                    response.messages.message[i].text
                );
                i = i + 1;
            }
            alert()
        } else {
          (<HTMLInputElement>document.getElementById("dataDescriptor")).value = response.opaqueData.dataDescriptor;
          (<HTMLInputElement>document.getElementById("dataValue")).value = response.opaqueData.dataValue;
        
            // If using your own form to collect the sensitive data from the customer,
            // blank out the fields before submitting them to your server.
            (<HTMLInputElement>document.getElementById("card_number")).value = "";
            (<HTMLInputElement>document.getElementById("month")).value = "";
            (<HTMLInputElement>document.getElementById("year")).value = "";
            (<HTMLInputElement>document.getElementById("code")).value = "";
            console.log(response.opaqueData.dataValue);
            var myForm = <HTMLFormElement>document.getElementById("paymentForm");
            myForm.submit();
            window.location.href = "http://localhost:4200/Patient/consultation/step/checkout";
        }
    }
  }

  postpaymentdata(data) {
    if(data["dataValue"] != undefined){
      
    }
  }

  valuechange(newValue) {
    //when value changes dynamically
    if (this.elementRef.nativeElement.dataset.isfocused == 'true') {
      console.log('is not focused');
      var paymentprocessinfo = {
        "dataValue" : (<HTMLInputElement>document.getElementById("dataValue")).value,
        "dataDescriptor" : (<HTMLInputElement>document.getElementById("dataDescriptor")).value,
        "amount" : (<HTMLInputElement>document.getElementById("amount")).value,
        "address_zip" : (<HTMLInputElement>document.getElementById("address_zip")).value
      }
      console.log(paymentprocessinfo);
      this.http.post(this.url+"/paymentforconsultaion/5e43a999feb8ea2affebb7f6",paymentprocessinfo)
        .subscribe(paymentres => {
        });
    } else {
        console.log('is focused');
    }
    
  }

  createForm() {
    this.consultstep3form = this.fb.group({
      card_number: ['', Validators.compose([
        Validators.required
      ])],
      month: ['', Validators.compose([
        Validators.required
      ])],
      year: ['', Validators.compose([
        Validators.required
      ])],
      code: ['', Validators.compose([
        Validators.required
      ])],
      address_zip: ['', Validators.compose([
        Validators.required
      ])],
      dataValue: [''],
      dataDescriptor: [''],
      amount:['']
    });
  }
}
