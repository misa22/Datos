export default class Lista_doble {
	constructor(){
		this._inicio = null;
	}

	get inicio(){
		return this._inicio;
	}

	set inicio( nuevo_inicio ){
		this._inicio = nuevo_inicio;
	}

	insertar( nuevo_nodo ){
		if ( this._inicio == null ) {
			this._inicio = nuevo_nodo;
		} else {
			let tmp = this._inicio;
			while ( tmp.siguiente != null ) {
				tmp = tmp.siguiente;
			}
			nuevo_nodo.anterior = tmp;
			tmp.siguiente = nuevo_nodo;
		}
	}
}