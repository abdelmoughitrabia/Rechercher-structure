import {TypeStructureBean} from './typeStructureBean';
import {StructurePolitiqueBean} from './structurePolitiqueBean';
import {EtablissementBean} from './etablissementBean';
import {SectionBean} from './sectionBean';

export class StructureBean {

  public type: string;
  public champRecherche: string;
  public active: Boolean;
  public inactive: Boolean;
  public listAllTypeStructures: Array<TypeStructureBean>;
  public structurePolitique: StructurePolitiqueBean = new StructurePolitiqueBean();
  public etablissement: EtablissementBean = new EtablissementBean();
  public section: SectionBean = new SectionBean();



}
