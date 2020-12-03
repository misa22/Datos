class Producto{
    constructor(codigo, producto, cantidad, precio, descripcion, siguiente,anterior){
        this.codigo = codigo;
        this.producto = producto;
        this.cantidad = cantidad;
        this.precio = precio;
        this.descripcion = descripcion
        this.siguiente = siguiente;
        this.anterior = anterior;
    }
}

class Inventario{
    constructor(){
        this.inicio = null;
        this.cola = null; 
        this.tamano = 0;
    }
    agregar(codigo, producto, cantidad, precio, descripcion){
       const nuevoProducto = new Producto(codigo, producto, cantidad, precio, descripcion, this.inicio, null)
       if (this.inicio) {
            nuevoProducto.siguiente = this.inicio;
            this.inicio.anterior = nuevoProducto;
            this.inicio = nuevoProducto;
       } else {
           this.inicio = nuevoProducto;
           this.cola = nuevoProducto;
       }
       this.tamano ++;
    }
    mostrar(){
        if(this.tamano == 0){
            return null;
        }
        let actual = this.inicio;
        let row = '';
        while(actual){
            row +=
            `
            <tr>
                <td>${actual.codigo}</td>
                <td>${actual.producto}</td>
                <td>${actual.descripcion}</td>
                <td>${actual.cantidad}</td>
                <td>${actual.precio}</td>
                <td>${actual.cantidad * actual.precio}</td>
                <td>
                    <button value=${actual.codigo} onclick=eliminar(this)>Eliminar</button>
                </td>
            </tr>
            `;
            actual = actual.siguiente;
        }
        document.querySelector('tbody').innerHTML = row;
    }
    eliminar(codigo){
        let actual = this.inicio;
        let anterior = null;
        while(actual != null){
            if(actual.codigo == codigo){
                if(!anterior){
                    this.inicio = actual.siguiente;
                }else{
                    anterior.siguiente = actual.siguiente;
                }
                this.else--;
                return actual.codigo;
            }
            anterior = actual;
            actual = actual.siguiente
        }
        return null;
    }
    eliminarInicio(){
        let aux = this.inicio;
        this.inicio = this.inicio.siguiente;
        aux.siguiente = null;
    }
    invertir(inicio){
        if (!inicio || !inicio.siguiente) {
            return inicio;
          }
          let aux = this.invertir(inicio.siguiente);
          inicio.siguiente.siguiente = inicio;
          inicio.siguiente = null;
          return aux;
    }
    buscar(codigo){
        if(this.tamano == 0) return null;
        else if(this.inicio.codigo == codigo) return this.inicio;
        else{
            let aux = this.inicio;
            while(aux.codigo != codigo && aux.siguiente != null){
                aux = aux.siguiente;
            }
            if(aux.siguiente == null && aux.codigo != codigo) return null;
            else return aux;
        }
    }
}

const inventario = new Inventario();
const div = document.createElement('section');
div.setAttribute('class','historyElement')
const history = document.querySelector('#historialContenido');

document.querySelector('#agregarForm').addEventListener('submit', function(e){
    e.preventDefault();
    let codigo = document.querySelector('#codigo').value;
    let producto = document.querySelector('#producto').value;
    let cantidad = document.querySelector('#cantidad').value;
    let costo = document.querySelector('#costo').value;
    let descripcion = document.querySelector('#decripcion').value;
    const div = document.createElement('section');

    inventario.agregar(codigo, producto, cantidad, costo, descripcion);
    inventario.mostrar();

    div.innerHTML = 'Se agrego un producto';
    document.querySelector('#historialContenido').appendChild(div);
    document.querySelector('#agregarForm').reset();
});

const eliminar = (codigo) => {
    inventario.eliminar(codigo['value']);
    inventario.mostrar();

    const div = document.createElement('section');
    div.innerHTML ='Se elimino un producto';
    document.querySelector('#historialContenido').appendChild(div);
}
const eliminarInicio = () => {
    inventario.eliminarInicio();
    inventario.mostrar();

    const div = document.createElement('section');
    div.innerHTML ='Se elimino un producto del inicio de la lista';
    document.querySelector('#historialContenido').appendChild(div);
}
const invertir = () =>{
    inventario.inicio=inventario.invertir(inventario.inicio);
    inventario.mostrar();

    const div = document.createElement('section');
    div.innerHTML ='Se invirtio la lista';
    document.querySelector('#historialContenido').appendChild(div);
}
const buscar = () => {
    let codigo = document.querySelector('#buscarInput').value;
    product = inventario.buscar(codigo);
    if (product != null) {
        let result = 
        `
        <tr>
            <td>${product.codigo}</td>
            <td>${product.producto}</td>
            <td>${product.descripcion}</td>
            <td>${product.cantidad}</td>
            <td>${product.precio}</td>
            <td>${product.cantidad * product.precio}</td>
            <td>
                <button value=${product.codigo} onclick=eliminar(this)>Eliminar</button>
            </td>
        </tr>
        `;
        document.querySelector('tbody').innerHTML = result;

        const div = document.createElement('section');
        div.innerHTML ='Se busco un producto';
        document.querySelector('#historialContenido').appendChild(div);
    }else{
        inventario.mostrar();        
    }
}
inventario.mostrar();