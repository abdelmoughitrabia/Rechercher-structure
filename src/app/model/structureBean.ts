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
  public structurePolitique: StructurePolitiqueBean;
  public etablissement: EtablissementBean;
  public section: SectionBean;

}
