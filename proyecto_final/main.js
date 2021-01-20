if (!String.contains) {
    String.prototype.contains = function (e) {
        return this.indexOf(e) >= 0;
    }
}



$(document).ready(function () {
    $('#messages').puigrowl();
})

function recorerEnOrden() {
    var log1 = [],
        log2 = []
    Recorrido.preorden(actualesNodos, log1);
    console.info("PREORDEN", log1)

    Recorrido.postorden(actualesNodos, log2);
    console.info("POSTORDEN,", log2)
   
}



function nuevoArbol() {
    var expresion = $('#txtExtrada').val();
    var nodos = Arbol.crear(expresion);
    window.actualesNodos = nodos[0];
    recorerEnOrden();
    $('#resultado').html('=' + nodos[0].data);
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
    
    jerarquia: function (operador) {
        if (this.operadores[operador]) {
            return this.operadores[operador];
        }
        
        return 99;
    },
    aPosFija: function (expresion) {
        expresion = this.prepararExprecion(expresion);
        var infija = expresion.split(" ");

        var E = infija.reverse(),
            P = [], 
            S = []; 

        while (E.length > 0) {
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
        
        return S.join(" ")
            
            .replace(/\s{2,}/g, ' ').
        trim();
    }


};

var Arbol = {

    crear: function (exprecion) {
        var posfija = Parcer.aPosFija(exprecion);
        var posfija = posfija.split(" ");
        var E = posfija.reverse(); 
        var P = [];
        var operadores = "+-*/%^";
        while (E.length > 0) {
            if (operadores.contains(E[E.length - 1])) {
                P.push(this.crearNodo(E.pop(), P.pop(), P.pop()));
            } else {
                P.push(E.pop());
            }
        }
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
        if (!isNaN(v)) {
            return {
                label: v
            }
        }
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
    preorden: function (nodo, log) {
        if (nodo == null)
            return;
        log.push(nodo.label);
        if (!nodo.children)
            return;
        this.preorden(nodo.children[0], log); 
        this.preorden(nodo.children[1], log); 
    },
    
    postorden: function (nodo, log) {
        if (nodo == null)
            return;
        if (nodo.children) {
            this.postorden(nodo.children[0], log);
            this.postorden(nodo.children[1], log);
        }
        log.push(nodo.label);
    },
}