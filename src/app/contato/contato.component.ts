import { ContatoService } from './../contato.service';
import { Component, OnInit } from '@angular/core';
import { Contato } from './contato';
import {FormBuilder,FormGroup, Validators} from '@angular/forms';
@Component({
  selector: 'app-contato',
  templateUrl: './contato.component.html',
  styleUrls: ['./contato.component.css']
})
export class ContatoComponent implements OnInit {

  formulario:FormGroup;
   contatos:Contato[]=[];
   colunas=['foto','id','nome','email','favorito'];
  constructor(private service:ContatoService, private fb:FormBuilder) { 
    
  }

  ngOnInit(): void {
    this.listarContato();
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
           
        let lista: Contato[] = [... this.contatos, resposta];
        this.contatos=lista;
      
           
    });
      
  }


  favoritar(contato:Contato){
      this.service.favorite(contato).subscribe(response =>{
        contato.favorito = !contato.favorito;
      });
    
  }




  listarContato(){
    this.service.list().subscribe(response=>{
      this.contatos = response;
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


}
