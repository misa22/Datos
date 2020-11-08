class Producto{
    constructor(codigo,nombre,descripcion,precio,cantidad){
        this.codigo = codigo;
        this.nombre = nombre;
        this.descripcion = descripcion
        this.cantidad = cantidad;
        this.precio = precio;
        this.siguiente = null;
    }
}
class Inventario{
    constructor(){
        this.inicio = null;
        this.tamaño = 0;
    }
    agregar(codigo,nombre,descripcion,precio,cantidad){
        const nuevo = new Producto(codigo,nombre,descripcion,precio,cantidad,null);

        if(this.inicio ==null){
           this.inicio=nuevo;
        }
        else{
            var aux = this.inicio;
            while(aux.siguiente !== null){
                aux=aux.siguiente;
            }
            aux.siguiente=nuevo;
        }
        this.tamaño++;
    }
    eliminarInicio(){
         var aux=this.inicio;
        this.inicio=this.inicio.siguiente;
        aux.siguiente=null;
        return aux;
     }
     
     eliminar(codigo){
        var aux = this.inicio;
        var atras = null;
        while(aux != null){
            if(aux.codigo == codigo){
                if(!atras){
                    this.inicio = aux.siguiente;
                }else{
                    atras.siguiente = aux.siguiente;
                }
                this.else--;
                return aux.codigo;
            }
            atras = aux;
            aux = aux.siguiente
        }
        return null;
    }
    agregarInicio(codigo, nombre, descripcion, precio, cantidad){
        const nuevo = new Producto(codigo,nombre,descripcion,precio,cantidad);
        var aux = this.inicio;
        nuevo.siguiente = aux;
        this.inicio = nuevo;
    }
    buscar(codigo){
        if (this.tamaño == 0){
            return null;
        }
        else if (this.inicio.codigo = codigo){
            return this.inicio;
        }
        else{
            var aux = this.inicio;
            while(aux.codigo != codigo && aux.siguiente != null){
                aux = aux.siguiente;
            }
            if(aux.siguiente == null && aux.codigo != codigo) return null;
            else return aux;
        }
    }
    listar(){
        if(this.tamaño ==0){
            return null;
        }
        var aux = this.inicio;
        var  row = '';
        while(aux){
            row +=
            `
            <tr>
                <td>${aux.codigo}</td>
                <td>${aux.nombre}</td>
                <td>${aux.descripcion}</td>
                <td>${aux.precio}</td>
                <td>${aux.cantidad}</td>
                <td>${aux.cantidad * aux.precio}</td>
                <td>
                    <button value=${aux.codigo} onclick=eliminar(this)>Eliminar</button>
                </td>
            </tr>

            `;
            aux = aux.siguiente;
        }
        document.querySelector('tbody').innerHTML = row;
    }
    agregarEspecifico(codigo,nombre,descripcion,precio,cantidad,index){
        if (index < 0 || index > this.tamaño) {
            return null
        }
        const nuevo = new Producto(codigo,nombre,descripcion,precio,cantidad);
        let aux = this.inicio;
        let antes;
        if (index === 0) {
            producto.siguiente = aux;
            this.inicio = nuevo;
        } else {
            for (var i = 0; i < index; i++) {
                antes = aux;
                aux = aux.siguiente;   
            }
            nuevo.siguiente = aux;
            antes.siguiente = nuevo;
        }
        this.tamano++;
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

}
const inventario = new Inventario();
const div = document.createElement('section');
div.setAttribute('class','historyElement')
const history = document.querySelector('#historialContenido');
document.querySelector('#agregarForm').addEventListener('submit', function(e){
    e.preventDefault();
    var codigo = document.querySelector('#codigo').value;
    var nombre = document.querySelector('#nombre').value;
    var descripcion = document.querySelector('#descripcion').value;
    var precio = document.querySelector('#precio').value;
    var cantidad = document.querySelector('#cantidad').value;
    const div = document.createElement('section');

    inventario.agregar(codigo,nombre,descripcion,precio,cantidad);
    inventario.listar();

    div.innerHTML = 'Se agrego un producto';
    document.querySelector('#historialContenido').appendChild(div);
    document.querySelector('#agregarForm').reset();
});
document.querySelector('#agregarEspecifico').addEventListener('submit', function(e){
    e.preventDefault();
    var posicion = document.querySelector('#posicion1').value;
    var codigo = document.querySelector('#codigo1').value;
    var nombre = document.querySelector('#nombre1').value;
    var descripcion = document.querySelector('#descripcion1').value;
    var precio = document.querySelector('#precio1').value;
    var cantidad = document.querySelector('#cantidad1').value;
    const div = document.createElement('section');

    inventario.agregarEspecifico(codigo,nombre,descripcion,precio,cantidad,posicion);
    inventario.listar();
    div.innerHTML = 'Se agrego un producto en una posicion especifica'
    document.querySelector('#historialContenido').appendChild(div);
    document.querySelector('#agregarEspecifico').reset();
});

document.querySelector('#agregarInicio').addEventListener('submit', function(e){
    e.preventDefault();
    var codigo = document.querySelector('#codigo2').value;
    var producto = document.querySelector('#producto2').value;
    var cantidad = document.querySelector('#cantidad2').value;
    var costo = document.querySelector('#costo2').value;
    var descripcion = document.querySelector('#decripcion2').value;
    var div = document.createElement('section');
    
    inventario.agregarInicio(codigo, producto, cantidad, costo, descripcion,0);
    inventario.listar();
    
    div.innerHTML ='Se agrego un producto al inicio';
    document.querySelector('#historialContenido').appendChild(div);
    document.querySelector('#agregarInicio').reset();
});
const eliminar = (codigo) => {
    inventario.eliminar(codigo['value']);
    inventario.listar();

    const div = document.createElement('section');
    div.innerHTML ='Se elimino un producto';
    document.querySelector('#historialContenido').appendChild(div);
}
const eliminarInicio = () => {
    inventario.eliminarInicio();
    inventario.listar();

    const div = document.createElement('section');
    div.innerHTML ='Se elimino un producto del inicio de la lista';
    document.querySelector('#historialContenido').appendChild(div);
}
const invertir = () =>{
    inventario.inicio=inventario.invertir(inventario.inicio);
    inventario.listar();

    const div = document.createElement('section');
    div.innerHTML ='Se invirtio la lista';
    document.querySelector('#historialContenido').appendChild(div);
}
const buscar = () => {
    var codigo = document.querySelector('#buscarInput').value;
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
        inventario.listar();        
    }
}
inventario.listar();



