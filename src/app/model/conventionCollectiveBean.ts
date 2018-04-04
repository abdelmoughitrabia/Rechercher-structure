import {GenericBean} from './genericBean';

export class ConventionCollectiveBean extends GenericBean {

  public id: number;
  public code: string;
  public nom: string;
  public libelleLong: string;
  public libelleCourt: string;

  constructor() {
    super();
  }
}
