import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class EtablissementService {

  constructor(private httpClient: HttpClient) {

  }

  public getEtablissement(nom: string) {
    return this.httpClient.get('http://localhost:8080/etablissements/' + nom + '/' + 10);
  }
}
