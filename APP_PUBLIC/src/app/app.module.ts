import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { APP_BASE_HREF } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AboutComponent } from './about/about.component';
import { CreateComponent } from './create/create.component';
import { DetailsComponent } from './details/details.component';
import { HomeComponent } from './home/home.component';
import { ListComponent } from './list/list.component';
import { UpdateComponent } from './update/update.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './header/header.component';
import { ReactiveFormsModule } from '@angular/forms';


import { CarServiceService } from './car-service.service';
import { CarListComponent } from './carlist/carlist.component';
import { CarcreateComponent } from './carcreate/carcreate.component';
import { CardetailsComponent } from './cardetails/cardetails.component';
import { CarupdateComponent } from './carupdate/carupdate.component';
import { AccessoryListComponent } from './accessorylist/accessorylist.component';
import { AccessorycreateComponent } from './accessorycreate/accessorycreate.component';
import { AccessorydetailsComponent } from './accessorydetails/accessorydetails.component';
import { AccessoryupdateComponent } from './accessoryupdate/accessoryupdate.component';
import { ContactComponent } from './contact/contact.component';
import { Contact } from './contact';

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    CreateComponent,
    DetailsComponent,
    HomeComponent,
    ListComponent,
    UpdateComponent,
    HeaderComponent,
    CarListComponent,
    CarcreateComponent,
    CardetailsComponent,
    CarupdateComponent,
    AccessoryListComponent,
    AccessorycreateComponent,
    AccessorydetailsComponent,
    AccessoryupdateComponent,
    ContactComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      {
        path: '',
        component: HomeComponent,
      },
      {
        path: 'about',
        component: AboutComponent,
      },
      {
        path: 'list',
        component: ListComponent,
      },
      {
        path: 'create',
        component: CreateComponent,
      },
      {
        path: 'edit',
        component: UpdateComponent,
      },
      {
        path: 'bike/:bikeId',
        component: DetailsComponent,
      },
      {
        path: 'cars',
        component: CarListComponent,
      },
      {
        path: 'carcreate',
        component: CarcreateComponent,
      },
      {
        path: 'car/:carId',
        component: CardetailsComponent,
      },
      {
        path: 'carupdate',
        component: CarupdateComponent,
      },
      {
        path: 'accessory',
        component: AccessoryListComponent,
      },
      {
        path: 'accessorycreate',
        component: AccessorycreateComponent,
      },
      {
        path: 'accessory/:accessoryId',
        component: AccessorydetailsComponent,
      },
      {
        path: 'accessoryupdate',
        component: AccessoryupdateComponent,
      },
      {
        path: 'contact',
        component: ContactComponent,
      },
    ]),
  ],
  providers: [{ provide: APP_BASE_HREF, useValue: '/' }],
  bootstrap: [HeaderComponent],
})
export class AppModule {}
