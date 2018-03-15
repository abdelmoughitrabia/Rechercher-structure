import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-rechercher',
  templateUrl: './rechercher.component.html',
  styleUrls: ['./rechercher.component.css']
})
export class RechercherComponent implements OnInit {

  advancedSearch: boolean;

  cars: any[];

  cols: any[];

  constructor() {
    this.advancedSearch = false;
  }

  ngOnInit() {

    this.cols = [
      {field: 'matricule', header: 'Matricule'},
      {field: 'nomStatutaire', header: 'Nom statutaire'},
      {field: 'situationPolitique', header: 'Situation politique'}
    ];
  }

  advancedSearchSwitch() {
    this.advancedSearch = !this.advancedSearch;
  }

  clearView() {
    console.log('clear view') ;
  }
}
