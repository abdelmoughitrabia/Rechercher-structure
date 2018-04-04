import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';

@Injectable()
export class BrancheProfessionnelleService {

  constructor(private httpClient: HttpClient) {

  }

  public getBranchesProfessionnelle(nom: string) {
    return this.httpClient.get('http://localhost:8080/brancheProfessionnelle/' + nom + '/' + 10);
  }

}
