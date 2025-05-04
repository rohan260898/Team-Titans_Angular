import { Component, OnInit } from '@angular/core';
import { ContactService } from '../contact-service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
})
export class ContactComponent implements OnInit {
  contactForm: FormGroup;

  constructor(
    private contactService: ContactService,
    private formBuilder: FormBuilder
  ) {
    this.contactForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    const formData = {
      name: this.contactForm.controls['name'].value,
      email: this.contactForm.controls['email'].value,
      message: this.contactForm.controls['message'].value,
    };
    this.contactService.sendEmail(formData).subscribe(
      () => {
        alert('Form submitted successfully!');
        this.contactForm.reset();
      },
      (error: any) => {
        console.log(error);
        alert('Error submitting form, please try again later.');
      }
    );
  }
}
