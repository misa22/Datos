let arrayData = [];

document.querySelector('#agregar').addEventListener('submit',function(e){
    e.preventDefault();
    let cantidad =  document.getElementById('cantidadProducto').value;
    let precio = document.getElementById('precioProducto').value;
    let data = {
        codigo: document.getElementById('codigoProducto').value,
        nombre: document.getElementById('nombreProducto').value,
        cantidad: cantidad,
        precio: precio,
        total: precio * cantidad
    }
    arrayData.length <= 19 ?  arrayData[arrayData.length] = data : alert('ya no se puede introducir mas datos');
    generateTable(arrayData);
});

document.querySelector('#insertar').addEventListener('submit',function(e){
    e.preventDefault();
    let posicion =  document.getElementById('posicionInsertar').value;
    let cantidad =  document.getElementById('cantidadInsertar').value;
    let precio = document.getElementById('precioInsertar').value;
    let data = {
        codigo: document.getElementById('codigoInsertar').value,
        nombre: document.getElementById('nombreInsertar').value,
        cantidad: cantidad,
        precio: precio,
        total: precio * cantidad
    }
    for (let j = arrayData.length; j > posicion; j--) {
        arrayData[j] = arrayData[j-1] 
    }
    arrayData.length <= 19 ?   arrayData[posicion] = data : alert('ya no se puede introducir mas datos');
    generateTable(arrayData);
});

document.querySelector('.inputBuscar').addEventListener('keyup', function(){
    let value = this.value;
    let filterdData = [];
    arrayData.forEach(i => {
        let id = i.codigo;
        if (id.includes(value)) {
            filterdData[filterdData.length] = i;
        }
    });
    generateTable(filterdData);
});

document.querySelector('#invertir').addEventListener('click',function(){
    for (let i = 0; i < arrayData.length/2; i++) {
        let temp = arrayData[i]
        let ladoOpuesto = arrayData.length-i-1;
        arrayData[i] = arrayData[ladoOpuesto];
        arrayData[ladoOpuesto] = temp;
    }
    generateTable(arrayData);
})

function generateTable(data){
    let row = '';
    data.forEach(i => {
        row += 
        `
        <tr>
            <td>${i.Codigo}</td>
            <td>${i.Nombre}</td>
            <td>${i.Precio}</td>
            <td>${i.Cantidad}</td>
            <td>${i.Total}</td>
            <td>
                <button value=${i.codigo} onclick=eliminar(this)>Eliminar</button>
            </td>
        </tr>
        `;
        document.querySelector('tbody').innerHTML = row;
    });
}

function eliminar(data) {
    let id = data['value'];
    for (i = 0; i < arrayData.length; i++) {
        if (arrayData[i].codigo === id) {
            for (var j = i; j < arrayData.length - 1; j++) {
                arrayData[j] = arrayData[j + 1];
            }
            arrayData.length = arrayData.length - 1;
        }
    }
    console.log(arrayData);
    generateTable(arrayData);
}