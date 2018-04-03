import {Component, OnInit} from '@angular/core';
import {StructureBean} from '../model/structureBean';
import {WebRequestFront} from '../model/webRequestFront';
import {GenericRechercheBean} from '../model/genericRechercheBean';
import {Message} from 'primeng/api';
import {RechercherStructureService} from '../service/rechercherStructureService';
import {Filtre} from '../model/filtre';
import {ConventionCollectiveBean} from '../model/conventionCollectiveBean';
import {EtablissementService} from '../service/etablissementService';
import {EtablissementBean} from '../model/etablissementBean';

@Component({
  selector: 'app-rechercher',
  templateUrl: './rechercher.component.html',
  styleUrls: ['./rechercher.component.css']
})
export class RechercherComponent implements OnInit {

  structures: Array<StructureBean>;
  webRequestFront: WebRequestFront;

  filtredEtablissement: Array<EtablissementBean>;
  selectedStablissement: EtablissementBean;
  backResponse: GenericRechercheBean<StructureBean>;
  filtersList: Array<Filtre>;
  selectedFilter: Filtre;
  idRecherche: string;
  nbrResultat: number;
  selectedConvention: ConventionCollectiveBean;
  monPerimetre: boolean;


  msgs: Message[] = [];
  cols: any[];
  advancedSearch: boolean;

  structuresListOptions = [
    {label: 'SYND', value: 'SYND'},
    {label: 'UIT', value: 'UIT'},
    {label: 'UIS', value: 'UIS'},
    {label: 'UL', value: 'UL'},
    {label: 'SOF', value: 'SOF'},
    {label: 'SOS', value: 'SOS'},
    {label: 'SSE', value: 'SSE'},
    {label: 'SSR', value: 'SSR'}
  ];

  constructor(private rechercherStructureService: RechercherStructureService, private etablissementService: EtablissementService) {
    this.webRequestFront = new WebRequestFront();
    this.initView();
    this.monPerimetre = true;
  }

  initView() {
    this.advancedSearch = false;
    this.msgs = [];
    this.selectedFilter = new Filtre();
    this.selectedConvention = new ConventionCollectiveBean();
    this.selectedStablissement = new EtablissementBean();
  }

  ngOnInit() {
    this.cols = [
      {field: 'matricule', header: 'Matricule'},
      {field: 'nom', header: 'Nom statutaire'},
      {field: 'situationPolitique', header: 'Situation politique'}
    ];
    this.filtersList = new Array<Filtre>();
    this.backResponse = new GenericRechercheBean<StructureBean>();
    this.structures = this.backResponse.listeResultat;
  }

  advancedSearchSwitch() {
    this.advancedSearch = !this.advancedSearch;
  }

  clearView() {
    console.log('clear view');
    this.initView();
  }

  updateListType() {
    if (this.monPerimetre) {
      console.log('if');
      this.structuresListOptions.forEach(s => {
        if ((s.label === 'SSE') || (s.label === 'SSR')) {
          this.structuresListOptions.splice(this.structuresListOptions.indexOf(s), 2);
        }
      });
    } else {
      console.log('else');
      this.structuresListOptions.forEach(s => {
        if ((s.label === 'SSE') || (s.label === 'SSR')) {
          this.structuresListOptions.splice(this.structuresListOptions.indexOf(s), 2);
        }
      });
      this.structuresListOptions.push({label: 'SSE', value: 'SSE'},
        {label: 'SSR', value: 'SSR'});
    }
  }

  rechercher() {
    if (this.webRequestFront.type != null) {
      this.webRequestFront.newSearch = true;
      this.webRequestFront.adhesionEnLigne = false;
      this.webRequestFront.monPerimetre = !this.monPerimetre;
      this.msgs = [];
      if (this.webRequestFront.active && this.webRequestFront.inactive) {
        this.webRequestFront.inactive = this.webRequestFront.active = null;
      }
      if (this.selectedStablissement.nom !== '') {
        this.webRequestFront.etablissement = this.selectedStablissement.nom;
      }

      this.rechercherStructureService.getStrucutures(this.webRequestFront)
        .subscribe(data => {
          this.backResponse = <GenericRechercheBean<StructureBean>> data;
          this.structures = this.backResponse.listeResultat;
          this.idRecherche = this.backResponse.idRecherche;
          this.nbrResultat = this.backResponse.nombreResultat;
        }, error1 => console.log('error==>' + error1));
      console.log(this.webRequestFront);
    } else {
      this.msgs.push({
        severity: 'warn',
        summary: 'Avertissement',
        detail: 'Saisir au moins  un type de structure pour permettre à la recherche de se lancer.'
      });
    }
    console.log(this.structures);
  }

  addFilter() {

    let existe = false;

    this.filtersList.forEach(f => {
      if (f.libelle === this.selectedFilter.libelle) {
        existe = true;
        this.msgs.push({
          severity: 'warn',
          summary: 'Avertissement',
          detail: 'Filtre avec le méme libelle deja existe !!'
        });
      }
    });
    if (this.webRequestFront.type !== undefined && !existe) {
      this.selectedFilter.codePostal = this.webRequestFront.codePostale;
      this.selectedFilter.etablissement = this.webRequestFront.etablissement;
      this.selectedFilter.branche = this.webRequestFront.brancheProfessionnelle;
      this.selectedFilter.codeGeographiqueSection = this.webRequestFront.codeGeographique;
      this.selectedFilter.matriculeOuNom = this.webRequestFront.champRecherche;
      this.selectedFilter.conventionsCollectivesId = this.selectedConvention.id;
      this.selectedFilter.typeDeStructure = this.webRequestFront.type;
      this.selectedFilter.secteurPublic = this.webRequestFront.secteurSection === 'public';
      this.selectedFilter.implantation = this.webRequestFront.implantation;

      // this.selectedFilter.structureActive = this.webRequestFront.active ? true : null;
      // // TODO: a voir
      // this.selectedFilter.structureActive = this.webRequestFront.structureStatus;

      this.filtersList = [...this.filtersList, this.selectedFilter];
      console.log(this.filtersList);
      this.selectedFilter = new Filtre();
    }
  }

  filterEtablissement(event) {
    const query = event.query;
    console.log(query);
    this.etablissementService.getEtablissement(query)
      .subscribe(data => {
        this.filtredEtablissement = <Array<EtablissementBean>>data;
      }, error1 => console.log(error1));
  }

}
