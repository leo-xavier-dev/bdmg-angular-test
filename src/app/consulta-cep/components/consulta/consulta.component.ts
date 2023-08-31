import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CepInfo } from 'src/app/models/cep.model';
import { CepService } from '../../services/cep.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-consulta',
  templateUrl: './consulta.component.html',
  styleUrls: ['./consulta.component.scss']
})
export class ConsultaComponent implements OnInit {

  breakpoint: number = (window.innerWidth <= 600) ? 1 : 6;
  colspan: number = (window.innerWidth <= 600) ? 1 : 3;

  cepForm: FormGroup;
  cepData: CepInfo[] = [];

  constructor(
    private fb: FormBuilder,
    private cepService: CepService,
    private _snackBar: MatSnackBar
  ) {
    this.cepForm = this.fb.group({
      cep: ['', Validators.required],
      logradouro: ['', Validators.required],
      complemento: [''],
      bairro: ['', Validators.required],
      localidade: ['', Validators.required],
      uf: ['', Validators.required],
      ibge: [''],
      gia: [''],
      ddd: [''],
      siafi: ['']
    });
  }

  ngOnInit(): void {
    this.cepService.getAllCepInfoFromLocalStorage().subscribe(data => {
      this.cepData = data;
    });
  }


  onResize(event: any, col: number, colspan: number): void {
    this.breakpoint = (event.target.innerWidth <= 600) ? 1 : col;
    this.colspan = (event.target.innerWidth <= 600) ? 1 : colspan;
  }

  onSubmit(): void {
    if (!this.cepForm.invalid) {
      const cepModel = this.cepForm.value;
      this.cepService.saveCepInfoToLocalStorage(cepModel);
      this.cepData.push(cepModel);
      location.reload();
    }
  }

  onSearch(): void {
    const cep = this.cepForm.get('cep')!.value;
    this.cepService.getCepInfo(cep).subscribe({
      next: (data: CepInfo) => {
        this.cepForm.patchValue(data);
      },
      error: () => {
        this.openSnackBar('Cep inválido ou não encontrado', 'Ok');
      }
    });
  }

  onDelete(cep: string): void {
    this.cepService.removeCepInfoFromLocalStorage(cep);
    this.cepData = this.cepData.filter(item => item.cep !== cep);
    location.reload();
  }

  onEdit(data: CepInfo): void {
    this.cepForm.patchValue(data);
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 3 * 1000,
    });
  }

}
