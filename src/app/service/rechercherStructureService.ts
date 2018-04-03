import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {WebRequest} from '../model/webRequest';
import {WebRequestFront} from '../model/webRequestFront';

@Injectable()
export class RechercherStructureService {

  constructor(private httpClient: HttpClient) {

  }


  public getStrucutures(webRequest: WebRequestFront) {
    return this.httpClient.post('http://localhost:8080/structures', webRequest);
  }
}
