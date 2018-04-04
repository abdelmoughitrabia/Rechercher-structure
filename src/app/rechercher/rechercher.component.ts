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
import {ConventionCollectiveService} from '../service/conventionCollectiveService';
import {TypesStructureService} from '../service/typesStructureService';
import {TypeStructureBean} from '../model/typeStructureBean';
import {BrancheProfessionnelleService} from '../service/brancheProfessionnelleService';
import {BrancheProfessionnelleBean} from '../model/brancheProfessionnelleBean';

@Component({
  selector: 'app-rechercher',
  templateUrl: './rechercher.component.html',
  styleUrls: ['./rechercher.component.css']
})
export class RechercherComponent implements OnInit {

  structures: Array<StructureBean>;
  filtredEtablissement: Array<EtablissementBean>;
  conventionList: Array<ConventionCollectiveBean>;
  typesStructure: Array<TypeStructureBean>;
  filtersList: Array<Filtre>;
  branches: Array<BrancheProfessionnelleBean>;

  webRequestFront: WebRequestFront;

  selectedStablissement: EtablissementBean;
  selectedTypeStructure: TypeStructureBean;
  backResponse: GenericRechercheBean<StructureBean>;
  selectedFilter: Filtre;
  selectedConvention: ConventionCollectiveBean;
  selectedBranche: BrancheProfessionnelleBean;

  idRecherche: string;
  nbrResultat: number;
  monPerimetre: boolean;

  rows: number;

  msgs: Message[] = [];
  cols: any[];
  advancedSearch: boolean;

  constructor(private rechercherStructureService: RechercherStructureService,
              private etablissementService: EtablissementService,
              private conventionCollectiveService: ConventionCollectiveService,
              private typesStructureService: TypesStructureService,
              private brancheProfessionnelleService: BrancheProfessionnelleService) {
    this.initView();
    this.rows = 100;
  }

  initView() {
    // this.advancedSearch = false;
    this.msgs = [];
    this.selectedFilter = new Filtre();
    this.selectedConvention = new ConventionCollectiveBean();
    this.selectedStablissement = new EtablissementBean();
    this.monPerimetre = true;
    this.selectedTypeStructure = new TypeStructureBean();
    this.selectedBranche = new BrancheProfessionnelleBean();
    this.webRequestFront = new WebRequestFront();
  }

  ngOnInit() {

    this.cols = [
      {field: 'matricule', header: 'Matricule'},
      {field: 'nom', header: 'Nom statutaire'},
      {field: 'statut', header: 'Situation politique'}
    ];

    this.filtersList = [];
    this.backResponse = new GenericRechercheBean<StructureBean>();
    this.structures = this.backResponse.listeResultat;
    this.conventionList = [];
    this.typesStructure = [];
    this.getConventions();
    this.getTypesStructure();
  }


  getConventions() {
    this.conventionCollectiveService.getConventions()
      .subscribe(data => {
        this.conventionList = <Array<ConventionCollectiveBean>>data;
      }, error1 => console.log(error1));
  }

  getTypesStructure() {
    this.typesStructureService.getTypesStructure()
      .subscribe(data => {
        this.typesStructure = <Array<TypeStructureBean>>data;
      }, error1 => console.log(error1));
  }

  filterEtablissement(event) {
    const query = event.query;
    console.log(query);
    this.etablissementService.getEtablissement(query)
      .subscribe(data => {
        this.filtredEtablissement = <Array<EtablissementBean>>data;
      }, error1 => console.log(error1));
  }

  filterBranches(event) {
    const query = event.query;
    this.brancheProfessionnelleService.getBranchesProfessionnelle(query)
      .subscribe(data => {
        this.branches = <Array<BrancheProfessionnelleBean>>data;
      }, error1 => console.log(error1));
  }

  advancedSearchSwitch() {
    this.advancedSearch = !this.advancedSearch;
  }

  clearView() {
    console.log('clear view');
    this.initView();
  }

  updateListType() {
    // TODO : a ajouter ..
    // if (this.monPerimetre) {
    //   console.log('if');
    //   this.structuresListOptions.forEach(s => {
    //     if ((s.label === 'SSE') || (s.label === 'SSR')) {
    //       this.structuresListOptions.splice(this.structuresListOptions.indexOf(s), 2);
    //     }
    //   });
    // } else {
    //   console.log('else');
    //   this.structuresListOptions.forEach(s => {
    //     if ((s.label === 'SSE') || (s.label === 'SSR')) {
    //       this.structuresListOptions.splice(this.structuresListOptions.indexOf(s), 2);
    //     }
    //   });
    //   this.structuresListOptions.push({label: 'SSE', value: 'SSE'},
    //     {label: 'SSR', value: 'SSR'});
    // }
  }

  rechercher() {

    if (this.selectedTypeStructure.code != null) {

      if (this.webRequestFront.active && this.webRequestFront.inactive) {
        this.webRequestFront.inactive = this.webRequestFront.active = null;
      }
      if (this.selectedStablissement.nom !== '') {
        this.webRequestFront.etablissement = this.selectedStablissement.nom;
      }
      if (this.selectedBranche.id != null) {
        this.webRequestFront.brancheProfessionnelle = this.selectedBranche.libelle;
      }
      if (this.selectedConvention.id != null) {
        this.webRequestFront.conventionCollective = this.selectedConvention.code;
      }

      this.webRequestFront.type = this.selectedTypeStructure.code;
      this.webRequestFront.newSearch = true;
      this.webRequestFront.adhesionEnLigne = false;
      this.webRequestFront.monPerimetre = !this.monPerimetre;
      this.msgs = [];

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


  paginate(event) {
    // event.first = Index of the first record
    // event.rows = Number of rows to display in new page
    // event.page = Index of the new page
    // event.pageCount = Total number of pages

    console.log('Index of the first record=>' + event.first);
    console.log('Number of rows to display in new page=>' + event.rows);
    console.log('Index of the new page=>' + event.page);
    console.log('Total number of pages=>' + event.pageCount);

    this.webRequestFront = new WebRequestFront();
    this.webRequestFront.page = event.page + 1;
    this.webRequestFront.idRecherche = this.idRecherche;

    console.log(this.webRequestFront);

    this.rechercherStructureService.getStrucutures(this.webRequestFront)
      .subscribe(data => {
        this.backResponse = <GenericRechercheBean<StructureBean>> data;
        this.structures = this.backResponse.listeResultat;
      }, error1 => console.log('error==>' + error1));
  }


}
