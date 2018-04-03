import {StructureBean} from './structureBean';
import {EtablissementBean} from './etablissementBean';
import {SectionBean} from './sectionBean';

export class WebRequest {

  public structure: StructureBean;
  public etablissement: EtablissementBean;
  public section: SectionBean;
  public idRecherche: string;
  public newSearch: boolean;
  public pagination: boolean;
  public horsPerimetre: boolean;
  public adhesionEnLigne: Boolean;
  public loadAll: Boolean;
  public useLimitation: boolean;
  public page: number;
  public sidx: string;
  public sord: string;


  public constructor() {
    this.structure = new StructureBean();
    this.etablissement = new EtablissementBean();
    this.section = new SectionBean();
  }
}
