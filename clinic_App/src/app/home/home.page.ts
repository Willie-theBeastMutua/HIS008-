import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{
  patientForm: FormGroup;
  counties: any[] = [];



  constructor(private formBuilder: FormBuilder,  private httpClient: HttpClient) {
    this.patientForm = this.formBuilder.group({
      surname: ['', Validators.required],
      firstName: ['', Validators.required],
      otherNames: [''],
      patientNo: [''],
      dateOfBirth: [''],
      idNo: [''],
      gender: [''],
      county: [''],
      mobile: [''],
      email: [''],
      alternativeContactPerson: [''],
      telephone: [''],
      hasDisability: [false],
      appointmentDate: [''],
      appointmentTime: [''],
    });
  }
  submitForm() {
    if (this.patientForm.valid) {
      const formData = this.patientForm.value;

    this.httpClient.post('http://localhost:3000/api/submit-form', formData)
    .subscribe(
      (response) => {
        console.log('Form submitted successfully:', response);
        // Handle success, e.g., show a success message
      },
      (error) => {
        console.error('Error submitting form:', error);
        // Handle error, e.g., show an error message
      }
    );
      console.log('Form submitted:', this.patientForm.value);
    }
  }
  ngOnInit() {
    this.fetchCounties();
  }
  fetchCounties() {
    this.httpClient.get<any[]>('http://localhost:3000/api/counties')
      .subscribe(
        (data) => {
          this.counties = data;
        },
        (error) => {
          console.error('Error fetching counties:', error);
        }
      );
  }

}
