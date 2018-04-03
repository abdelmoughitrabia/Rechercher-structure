import {DetailMessageBean} from './detailMessageBean';

export class StatutReponseBean {

  public static STATUT_OK = '200';

  public code: string;
  public erreurs: Array<DetailMessageBean>;
  public avertissements: Array<DetailMessageBean>;
  public infos: Array<DetailMessageBean>;
}
