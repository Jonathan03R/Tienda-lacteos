import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { BASE_URL } from '../../app.config';
import { Productos } from '../../model/interface/Productos';
import { Observable, delay } from 'rxjs';
import { User, userResponde } from '../../model/interface/user';


interface State {

  users: User[]

}

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  private http = inject(HttpClient);

  constructor(){
    console.log('cargando data')

  }



  #state = signal<State>({
    users: [],
  })


  public users = computed (()=> this.#state().users);

  getProducts(){
    return this.http.get<any>(`${BASE_URL}/products/productos`)
  }
  getUser() {
    return this.http.get<userResponde>(`${BASE_URL}/user/usuarios`)

      .subscribe(res => {
        
        this.#state.set({
          users: res.data
        })
      });
  }

}
