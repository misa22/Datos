export default class Lifo {
	constructor(){
		this._superior = null;
	}

	push( nuevo_nodo ){
		if ( this._superior === null ) {
			this._superior = nuevo_nodo;
		}else{
			nuevo_nodo.anterior = this._superior;
			this._superior = nuevo_nodo;
		}
	}

	pop(){
		if ( this._superior !== null) {
			let nodo = this._superior;
			this._superior = this._superior.anterior;
			return nodo;
		}else{
			return null;
		}
	}

	peek(){
		return this._superior;
	}
}