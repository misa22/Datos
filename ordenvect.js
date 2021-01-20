/*var vec1 = new Array(20);
var vec2 = new Array(20);
var vec3 = [];
for(i = 0; i < 20; i++) {
    vec1[i] = Math.floor( Math.random() * 30+1);
    vec2[i] = Math.floor(Math.random() * 30+1 )
    }
    vec1.sort(function(a,b){
        return a-b;

    })
    vec2.sort(function(a,b){
        return a-b;

    })
    console.log(vec1);
    console.log(vec2)
    var i1=0;
    var i2=0;
    var i=0;
    
    while ((i1<vec1.length)&& (i2<vec2.length)) {
        if (vec2[i1]<vec2[i2]) {
            vec3[i++]=vec1[i1++];
        } else {
            vec3[i++]=vec2[i2++];
        }
    }
    while (i1<vec1.length) {
        vec3[i++]=vec1[i1++];
    }
    while (i2<vec2.length) {
        vec3[i++]=vec2[i2++];
    }
    
console.log(vec3)*/
function recorerEnOrden() {


    var log1 = [],
        log2 = [],
        log3 = [];

    Recorrido.preorden(actualesNodos, log1);
    console.info("PREORDEN", log1)

    Recorrido.postorden(actualesNodos, log2);
    console.info("POSTORDEN,", log2);
}
var Parcer = {

    operadores: {
        '^': 5,
        '*': 4,
        '/': 4,
        '+': 3,
        '-': 3,
        ')': 2,
        '(': 1,
        obtenerPrecedencia: function () {

        }
    },

    /**
     *Depura la exprecion algebraica, quita espacios en blanco y deja un espacion entre peradores y dijitos
     */
    prepararExprecion: function (exprecion) {
        var simbolos = "+-*/()^";
        var salida = "";
        exprecion = exprecion.replace(/\\s+/, '');
        exprecion = "(" + exprecion + ")";
        for (var i = 0; i < exprecion.length; i++) {
            if (simbolos.contains(exprecion.charAt(i))) {
                salida += " " + exprecion.charAt(i) + " ";
            } else {
                salida += exprecion.charAt(i);
            }

        }
        return salida.trim();
    },
    /**
     *Determina la jerarquia de operadores
     */
    jerarquia: function (operador) {
        if (this.operadores[operador]) {
            return this.operadores[operador];
        }
        //si no es un operador tiene mayor precedencia
        return 99;
    },
    aPosFija: function (expresion) {
        expresion = this.prepararExprecion(expresion);
        var infija = expresion.split(" ");

        var E = infija.reverse(), // Entrada
            P = [], // Temporal
            S = []; //salida

        while (E.length > 0) {

            // E[E.length - 1] extrae el ultimo valor de la pilla  .peek();
            // console.info("E", E, "S", S, "P", P)
            switch (this.jerarquia(E[E.length - 1])) {
            case 1:
                P.push(E.pop());
                break;
            case 2:
                while (P[P.length - 1] != "(") {
                    S.push(P.pop())
                }
                P.pop();
                E.pop();
                break;
            case 3:
            case 4:
            case 5:
                while (this.jerarquia(P[P.length - 1]) >= this.jerarquia(E[E.length - 1])) {
                    S.push(P.pop());
                }
                P.push(E.pop());
                break;
            default:
                S.push(E.pop());
            }
        }
        
    }


};
var exprecion1 = "2 23 6 + * 1 -";

var Arbol = {

    crear: function (exprecion) {
        exprecion = exprecion1;
        var posfija = Parcer.aPosFija(exprecion);
        log.info("Exprecion posfija:", posfija);
        //  posfija = "2 23 6 + * 1 -";

        var posfija = posfija.split(" ");



        //Declaración de las pilas
        var E = posfija.reverse(); //Pila entrada
        var P = []; //Pila de operandos
        console.info(E)
        console.log.info(E)
            //Algoritmo de Evaluación Postfija
        var operadores = "+-*/%^";
        while (E.length > 0) {
            //si es un operador
            if (operadores.contains(E[E.length - 1])) {
                P.push(this.crearNodo(E.pop(), P.pop(), P.pop()));
            } else {
                P.push(E.pop());
            }
        }

        //retorna nodos
        return P;
    },


    evaluar: function (operador, n2, n1) {
        console.info(n1 + operador + n2);

        if (operador == '^') {
            return Math.pow(n1, n2);
        }
        return eval(n1 + operador + n2);
    },
    getNumber: function (v) {
        if (isNaN(v)) {
            return v.data
        }
        return v;
    },
    getInfo: function (v) {
        //es un digito
        if (!isNaN(v)) {
            return {
                label: v
            }
        }
        //es resultado de una operacion
        return v;
    },
    crearNodo: function (operador, n2, n1) {
        return {
            label: operador,
            expanded: true,
            children: [this.getInfo(n1), this.getInfo(n2),
        ],
            data: this.evaluar(operador, this.getNumber(n2), this.getNumber(n1))
        };
    }
};
var Recorrido = {
    /* (raíz, izquierdo, derecho).Para recorrer un árbol binario no vacío en preorden, hay que realizar las siguientes operaciones, *recursivamente en cada nodo, comenzando con el nodo de raíz:
     */
    preorden: function (nodo, log) {
        if (nodo == null)
            return;

        // console.info(nodo.label); //mostrar datos del nodo
        log.push(nodo.label);
        if (!nodo.children)
            return;
        this.preorden(nodo.children[0], log); //recorre subarbol izquierdo
        this.preorden(nodo.children[1], log); //recorre subarbol derecho
    },
    /*     (izquierdo, derecho, raíz). Para recorrer un árbol binario no vacío en postorden, hay que realizar las siguientes operaciones recursivamente en cada nodo:*/
    postorden: function (nodo, log) {
        if (nodo == null)
            return;
        if (nodo.children) {
            this.postorden(nodo.children[0], log);
            this.postorden(nodo.children[1], log);
        }
       log.push(nodo.label);
     console.info(nodo.label);
    }
    }