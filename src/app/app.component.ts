import { Component } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
declare var Accept:any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  consultstep3form: FormGroup;
  title = 'ereddycarepayment';

  public dataValue;
  public dataDescriptor;
  public card_number;
  public month;
  public year;
  public code;

  constructor(private fb: FormBuilder) {
    this.createForm();
  }

  paymentform() {
    var authData = {};
        authData["clientKey"] = "7cj5EL8Dg4bdJqtXsygQZKRxNXjyQ8m4P4VVQgqg53aYSQ8RmvM7G4wMc9qN7Gvv";
        authData["apiLoginID"] = "7MzB2j6t";

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

    function responseHandler(response) {
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
            this.paymentFormUpdate(response.opaqueData);
            console.log(response.opaqueData.dataValue);
        }
    }
}

paymentFormUpdate(opaqueData) {
  (<HTMLInputElement>document.getElementById("dataDescriptor")).value = opaqueData.dataDescriptor;
  (<HTMLInputElement>document.getElementById("dataValue")).value = opaqueData.dataValue;

    // If using your own form to collect the sensitive data from the customer,
    // blank out the fields before submitting them to your server.
    (<HTMLInputElement>document.getElementById("card_number")).value = "";
    (<HTMLInputElement>document.getElementById("month")).value = "";
    (<HTMLInputElement>document.getElementById("year")).value = "";
    (<HTMLInputElement>document.getElementById("code")).value = "";
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
      dataDescriptor: ['']
    });
  }
}
