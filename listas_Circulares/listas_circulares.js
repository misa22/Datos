
class Rutas{
    constructor(nombre, minutos){
        this.nombre = nombre;
        this.minutos = minutos;
        this.siguiente = null;
    }
    creadorTabla(){
        let productString = '<li class="list-group-item">';
        for(let key in this){
            productString += `<div><strong>${key}:</strong> ${this[key]}</div>`;
        }
        return productString + "</li>";
    }
    recorrido(ruta,hora){
        let productString = '<li class="list-group-item">';
        for (let key in this) {
            productString += `<div><strong>${key}:</strong> ${this[key]}</div>`;
        }
        let texto ="Ruta: " + ruta + ", inicia a las: " + hora;
        return productString + texto + "</li>";
    }

}

class Central{
    constructor(){
        this.inicio = null;
        this.tamaño = 0;
    }
    
    agregar(nuevo){
        if(this.inicio === null){
            this.inicio = nuevo;
            nuevo.siguiente = this.inicio;
        }else{
            let aux = this.inicio;
            while(aux.siguiente !== this.inicio){
                aux = aux.siguiente;
            }
            aux.siguiente = nuevo;
            nuevo.siguiente = this.inicio;
        }
        this.tamaño++;
        this.lista();
    }


    buscar(nombre){
        if(this.inicio !== null){
            let aux = this.inicio;
            while(aux){
                if(aux.nombre == nombre){
                    return (aux);
                }
                aux = aux.siguiente;
            }
        }
        return null; 
    }
    
    borrar(nombre){
        let aux = this.inicio;

        if(aux.nombre === nombre){
            this.inicio = aux.siguiente;
            let temp = this.inicio;

            while(temp.siguiente.nombre !== nombre){
                temp = temp.siguiente;
            }
            this.tamaño--;
            temp.siguiente = this.inicio;
            this.lista();
        }else {
            let temp = this.inicio;

            while(temp.siguiente.nombre !== nombre){
                temp = temp.siguiente;
            }
            temp.siguiente = temp.siguiente.siguiente;
            this.tamaño--;
            this.lista();
            return temp.siguiente;
        }
        return (null,this.lista());
        
    }

    lista(){
        lista.innerHTML = "";
        if(this.tamaño === 0){
            return null;
        }
        let aux = this.inicio;
        let temp = false;
        while(!temp){
            lista.innerHTML += aux.creadorTabla();
            aux = aux.siguiente;
            if(aux.nombre === this.inicio.nombre){
                temp = true;
            }
        }
    }

    crearRecorrido(nombreR, horaIn, horaFin){
        lista.innerHTML = "";
        let aux = this.buscar(nombreR);
        let auxHora = Number(horaIn);
        
        while(auxHora < horaFin){
            lista.innerHTML += aux.recorrido(aux.nombre, auxHora);
            aux = aux.siguiente;
            auxHora += Number(aux.minutos);
        }
        lista.innerHTML += aux.recorrido(aux.nombre, auxHora);
    }
}
var btAgregar = document.querySelector("#btAgregar");
var btBuscar = document.querySelector("#btBuscar");
var btBorrar = document.querySelector("#btBorrar");
var btListar = document.querySelector("#btListar");
var btIniciar = document.querySelector("#btIniciar");

var nombre = document.querySelector("#nombre");
var minutos = document.querySelector("#minutos");
var posicion = document.querySelector("#posicion");
var buscar = document.querySelector("#buscar");
var borrar = document.querySelector("#borrar");
var nombreR = document.querySelector('#nombreR');
var horaIn = document.querySelector('#horaIn');
var horaFin = document.querySelector('#horaFin');
var lista = document.querySelector("#listado");

let central = new Central();
btAgregar.addEventListener("click", () => {
    let newRuta = new Rutas(nombre.value, Number(minutos.value));
    central.agregar(newRuta);
    console.log(newRuta);
    document.getElementById("form_1").reset();
  
});

btBuscar.addEventListener("click", () => {
    lista.innerHTML = "";
    let x = central.buscar(buscar.value);
    lista.innerHTML += x.creadorTabla();
    document.getElementById("form_1").reset();
});

btBorrar.addEventListener("click", () => {
    central.borrar(borrar.value);
    document.getElementById("form_1").reset();
    
});
  
btListar.addEventListener("click", () => {
    central.lista();
});


btIniciar.addEventListener("click", () => {
    central.crearRecorrido(nombreR.value, Number(horaIn.value), Number(horaFin.value));
})