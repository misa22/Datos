class Dado{
    lanzar(){
         return Math.floor(Math.random() * 6) + 1;
    }
 }

class Jugador{
    constructor(nombre){
        this.nombre = nombre;
        this.dado = new Dado();
        this.posicion = 0;
        this.serpiente = [
            {casilla: 16, reduce: 10},
            {casilla: 49, reduce: 38},
            {casilla: 46, reduce: 21},
            {casilla: 62, reduce: 43},
            {casilla: 64, reduce: 4},
            {casilla: 74, reduce: 21},
            {casilla: 95, reduce: 20},
            {casilla: 97, reduce: 17}
        ];
        this.escalera = [
            {casilla: 2, aumentar: 36},
            {casilla: 7, aumentar: 7},
            {casilla: 8, aumentar: 23},
            {casilla: 15, aumentar: 11},
            {casilla: 28, aumentar: 56},
            {casilla: 51, aumentar: 16},
            {casilla: 78, aumentar: 20},
            {casilla: 87, aumentar: 13},
        ]
    }

    avance(){
        this.posicion += this.dado.lanzar();
        for (var  i = 0; i < this.escalera.length; i++) {
            if (this.escalera[i].casilla == this.posicion) {
                return this.posicion += this.escalera[i].aumentar;
            }
        }
        for (var i = 0; i < this.serpiente.length; i++) {
            if(this.serpiente[i].casilla == this.posicion) {
                return this.posicion -= this.serpiente[i].reduce;
            }
        }
        return this.posicion;
    }

    texto(){
        return this.nombre + ' pos '  + this.posicion;
    }
}

class Tablero{
    constructor(){
        this.jugador1 = new Jugador('jugador1');
        this.jugador2 = new Jugador('jugador2');
        this.distancia = 100;
    }

    iniciar(){
        while(this.jugador1.posicion < 100 && this.jugador2.posicion < 100){
            this.jugador1.avance();
            this.jugador2.avance();           
            console.log(this.jugador1.texto() + '->'+ this.jugador2.texto());
        }
        this.ganador();
        
    }
    ganador(){
        switch (true) {
            case this.jugador1.posicion >= this.distancia && this.jugador2.posicion >= this.distancia:
                console.log('empate');
                break;
            case this.jugador1.posicion >= this.distancia && this.jugador2.posicion >= this.distancia:
                console.log('jugador1 y jugador2 ganaron');
                break;
            case this.jugador1.posicion >= this.distancia:
                console.log('jugador1 gano');
                break;
            case this.jugador2.posicion >= this.distancia:
                console.log('jugador2 gano');
                break;
            default:
                break;
        }
    }
}

var juego = new Tablero();
juego.iniciar();