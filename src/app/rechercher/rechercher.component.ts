import {Component, OnInit} from '@angular/core';
import {StructureBean} from '../model/structureBean';
import {EtablissementBean} from '../model/etablissementBean';
import {SectionBean} from '../model/sectionBean';

@Component({
  selector: 'app-rechercher',
  templateUrl: './rechercher.component.html',
  styleUrls: ['./rechercher.component.css']
})
export class RechercherComponent implements OnInit {

  structures: Array<StructureBean>;

  structure: StructureBean;
  etablissement: EtablissementBean;
  section: SectionBean;

  cols: any[];
  type: string;
  matricule: string;
  advancedSearch: boolean;


  constructor() {
    this.advancedSearch = false;
    this.structure = new StructureBean();
    this.section = new SectionBean();
    this.etablissement = new EtablissementBean();
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
    console.log('clear view');
  }
}
