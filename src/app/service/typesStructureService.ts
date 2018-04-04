import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class TypesStructureService {

  constructor(private httpClient: HttpClient) {

  }

  public getTypesStructure() {
    return this.httpClient.get('http://localhost:8080/typesStructure/');
  }

}
