import {TypeStructureBean} from './typeStructureBean';
import {StructurePolitiqueBean} from './structurePolitiqueBean';
import {EtablissementBean} from './etablissementBean';
import {SectionBean} from './sectionBean';

export class StructureBean {

  public id: number;
  public matricule: string;
  public nom: string;
  public type: string;
  public champRecherche: string;
  public active: Boolean;
  public inactive: Boolean;
  public listAllTypeStructures: Array<TypeStructureBean>;
  public structurePolitique: StructurePolitiqueBean;
  public etablissement: EtablissementBean;
  public section: SectionBean;

  constructor() {
    this.structurePolitique = new StructurePolitiqueBean();
    this.etablissement = new EtablissementBean();
    this.section = new SectionBean();
  }


}
