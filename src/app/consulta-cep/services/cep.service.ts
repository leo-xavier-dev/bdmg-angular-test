import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { CepInfo } from 'src/app/models/cep.model';

@Injectable({
  providedIn: 'root',
})
export class CepService {

  constructor(private http: HttpClient) {}

  getCepInfo(cep: string): Observable<CepInfo> {
    return this.http.get<CepInfo>(`https://viacep.com.br/ws/${cep}/json/`);
  }

  saveCepInfoToLocalStorage(data: CepInfo): void {
    localStorage.setItem(data.cep, JSON.stringify(data));
  }

  getAllCepInfoFromLocalStorage(): Observable<CepInfo[]> {
    const keys = Object.keys(localStorage);
    const data = keys.filter(key => /^\d{5}-\d{3}$/.test(key)).map(key => JSON.parse(localStorage.getItem(key)!));
    return of(data);
  }

  removeCepInfoFromLocalStorage(cep: string): void {
    localStorage.removeItem(cep);
  }

  editCepInfoInLocalStorage(data: CepInfo): void {
    this.saveCepInfoToLocalStorage(data);
  }
}