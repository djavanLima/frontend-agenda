import { MatSnackBar} from '@angular/material/snack-bar';

import { ContatoService } from './../contato.service';
import { Component, OnInit } from '@angular/core';
import { Contato } from './contato';
import {FormBuilder,FormGroup, Validators} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

import{DetalheContatoComponent} from '../detalhe-contato/detalhe-contato.component';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-contato',
  templateUrl: './contato.component.html',
  styleUrls: ['./contato.component.css']
})
export class ContatoComponent implements OnInit {

  formulario:FormGroup;
   contatos:Contato[]=[];
   colunas=['foto','id','nome','email','favorito'];
  totalElementos = 0;
  pagina =0;
  tamanho = 2;
  pageSizeOptions : number[] = [10];

  constructor(private service:ContatoService,
     private fb:FormBuilder,
      private dialog:MatDialog,
      private snackBar:MatSnackBar
    
    ) { 
    
  }

  ngOnInit(): void {
    this.listarContato(this.pagina, this.tamanho);
    this.montarFormulario()
  }

  montarFormulario(){
    this.formulario = this.fb.group({
      nome:['',Validators.required],
      email:['',[Validators.email, Validators.required]]

    });
  }


  submit(){
    const formValue =this.formulario.value;
    const contato:Contato = new Contato(formValue.nome, formValue.email);

    this.service.save(contato).subscribe(resposta=>{
           
        this.listarContato();
     
        this.snackBar.open('Contato foi adicionado!', 'Sucesso',{
          duration:2000
        });
           this.formulario.reset();
    });
      
  }


  favoritar(contato:Contato){
      this.service.favorite(contato).subscribe(response =>{
        contato.favorito = !contato.favorito;
      });
    
  }




  listarContato(pagina = 0, tamanho = 10){
    this.service.list(pagina, tamanho).subscribe(response=>{
      this.contatos = response.content;
      this.totalElementos = response.totalElements;
      this.pagina = response.number;
    });
  }


  uploadFoto(event, contato){
    const files = event.target.files;
    if(files){
      const foto = files[0];
      const formData: FormData = new FormData();
      formData.append("foto",foto);

      this.service
                  .upload(contato,formData)
                  .subscribe(response => this.listarContato());
    }
  }



  visualizarContato(contato:Contato){

      this.dialog.open(DetalheContatoComponent,{
        width:'400px',
        height:'450px',
        data: contato
      }

      );

  }

    paginar(event:PageEvent){
      this.pagina = event.pageIndex;
      this.listarContato(this.pagina,this.tamanho);
    }

}
