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
  horsPerimetre: boolean;

  structuresListOptions = [
    {label: 'SYND', value: 'SYND'},
    {label: 'UIT', value: 'UIT'},
    {label: 'UIS', value: 'UIS'},
    {label: 'UL', value: 'UL'},
    {label: 'SOF', value: 'SOF'},
    {label: 'SOS', value: 'SOS'}
  ];

  constructor() {
    this.initView();
  }

  initView() {
    this.advancedSearch = false;
    this.structure = new StructureBean();
    this.section = new SectionBean();
    this.etablissement = new EtablissementBean();
    this.horsPerimetre = true;
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
    this.initView();
  }

  rechercher() {
    console.log(this.structure);
  }

}
