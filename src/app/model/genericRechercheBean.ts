import {StatutReponseBean} from './statutReponseBean';

export class GenericRechercheBean<T> {

  public listeResultat: Array<T>;
  public idRecherche: string;
  public statusCode: string;
  public nombreResultat: number;
  public statutReponseBean: StatutReponseBean;

}
