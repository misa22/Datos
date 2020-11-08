class Producto{
    constructor(codigo, producto, cantidad, precio, descripcion, siguiente){
        this.codigo = codigo;
        this.producto = producto;
        this.cantidad = cantidad;
        this.precio = precio;
        this.descripcion = descripcion
        this.siguiente = siguiente;
    }
}

class Inventario{
    constructor(){
        this.inicio = null;
        this.tamano = 0;
    }
    agregar(codigo, producto, cantidad, precio, descripcion){
        const Nuevoproducto = new Producto(codigo, producto, cantidad, precio, descripcion, null);
        if (!this.inicio) {
            this.inicio = Nuevoproducto;
        } else {
            let actual = this.inicio;
            while (actual.siguiente) {
                actual = actual.siguiente;
            }
            actual.siguiente = Nuevoproducto;
        }
        this.tamano++;
    }
    agregarEspecifico(codigo, producto, cantidad, precio, descripcion, index){
        if (index < 0 || index > this.tamano) {
            return null
        }
        const Nuevoproducto = new Producto(codigo, producto, cantidad, precio, descripcion);
        let actual = this.inicio;
        let anterior;
        if (index === 0) {
            producto.siguiente = actual;
            this.inicio = Nuevoproducto;
        } else {
            for (let i = 0; i < index; i++) {
                anterior = actual;
                actual = actual.siguiente;   
            }
            Nuevoproducto.siguiente = actual;
            anterior.siguiente = Nuevoproducto;
        }
        this.tamano++;
    }
    agregarInicio(codigo, producto, cantidad, precio, descripcion){
        const Nuevoproducto = new Producto(codigo, producto, cantidad, precio, descripcion);
        let actual = this.inicio;
        Nuevoproducto.siguiente = actual;
        this.inicio = Nuevoproducto;
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
    console.log(codigo, producto, cantidad, costo, descripcion);
    inventario.mostrar();

    div.innerHTML = 'Se agrego un producto';
    document.querySelector('#historialContenido').appendChild(div);
    document.querySelector('#agregarForm').reset();
});
document.querySelector('#agregarEspecifico').addEventListener('submit', function(e){
    e.preventDefault();
    let posicion = document.querySelector('#posicion1').value;
    let codigo = document.querySelector('#codigo1').value;
    let producto = document.querySelector('#producto1').value;
    let cantidad = document.querySelector('#cantidad1').value;
    let costo = document.querySelector('#costo1').value;
    let descripcion = document.querySelector('#decripcion1').value;
    const div = document.createElement('section');

    inventario.agregarEspecifico(codigo, producto, cantidad, costo, descripcion, posicion);
    console.log(  codigo, producto, cantidad, costo, descripcion, posicion);
    
    inventario.mostrar();

    div.innerHTML = 'Se agrego un producto en una posicion especifica'
    document.querySelector('#historialContenido').appendChild(div);
    document.querySelector('#agregarEspecifico').reset();
});

document.querySelector('#agregarInicio').addEventListener('submit', function(e){
    e.preventDefault();
    let codigo = document.querySelector('#codigo2').value;
    let producto = document.querySelector('#producto2').value;
    let cantidad = document.querySelector('#cantidad2').value;
    let costo = document.querySelector('#costo2').value;
    let descripcion = document.querySelector('#decripcion2').value;
    const div = document.createElement('section');
    
    inventario.agregarInicio(codigo, producto, cantidad, costo, descripcion,0);
    inventario.mostrar();
    
    div.innerHTML ='Se agrego un producto al inicio';
    document.querySelector('#historialContenido').appendChild(div);
    document.querySelector('#agregarInicio').reset();
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
