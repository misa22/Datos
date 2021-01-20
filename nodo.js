xport default class NodoHibrido {
	constructor( dato ){
		this._izquierda = null;
		this._derecha = null;
		this._siguiente = null;
		this._anterior = null;
		this._dato = dato;
	}

	get dato(){
		return this._dato;
	}

	get siguiente(){
		return this._siguiente;
	}

	set siguiente( nuevo_siguiente ){
		this._siguiente = nuevo_siguiente;
	}

	get anterior(){
		return this._anterior;
	}

	set anterior( nuevo_anterior ){
		this._anterior = nuevo_anterior;
	}

	get derecha(){
		return this._derecha;
	}

	set derecha( nueva_derecha ){
		this._derecha = nueva_derecha;
	}

	get izquierda(){
		return this._izquierda;
	}

	set izquierda( nueva_izquierda ){
		this._izquierda = nueva_izquierda;
	}

	es_numero(){
		return typeof( this._dato ) === 'number';
	}

	to_string(){
		return "dato: " + this._dato;
	}
}