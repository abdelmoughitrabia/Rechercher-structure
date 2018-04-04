import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class ConventionCollectiveService {

  constructor(private httpClient: HttpClient) {

  }

  public getConventions() {
    return this.httpClient.get('http://localhost:8080/conventionCollectives');
  }
}
