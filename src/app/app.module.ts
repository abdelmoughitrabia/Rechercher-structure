import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';


import {AppComponent} from './app.component';
import {RechercherComponent} from './rechercher/rechercher.component';
import {PanelModule} from 'primeng/panel';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  AutoCompleteModule,
  CheckboxModule,
  DropdownModule,
  InputTextareaModule,
  InputTextModule,
  MessagesModule,
  RadioButtonModule
} from 'primeng/primeng';
import {ButtonModule} from 'primeng/button';
import {TableModule} from 'primeng/table';
import {FormsModule} from '@angular/forms';
import {MessageModule} from 'primeng/message';
import {DataViewModule} from 'primeng/dataview';
import {RechercherStructureService} from './service/rechercherStructureService';
import {HttpClientModule} from '@angular/common/http';
import {ListboxModule} from 'primeng/listbox';
import {EtablissementService} from './service/etablissementService';


@NgModule({
  declarations: [
    AppComponent,
    RechercherComponent
  ],
  imports: [
    AutoCompleteModule,
    ListboxModule,
    HttpClientModule,
    DataViewModule,
    MessagesModule,
    MessageModule,
    BrowserModule,
    FormsModule,
    PanelModule,
    BrowserAnimationsModule,
    InputTextModule,
    DropdownModule,
    ButtonModule,
    CheckboxModule,
    RadioButtonModule,
    TableModule,
    InputTextareaModule
  ],
  providers: [RechercherStructureService, EtablissementService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
