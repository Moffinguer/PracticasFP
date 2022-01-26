
public class CListaLinealSE {

    // primero: referencia al primer elemento de la lista.
    // Es el elemento de cabecera.
    CElemento primero = null;

    // Clase Elemento de una lista lineal simplemente enlazada
    private class CElemento {

        // Atributos
        Object datos;
        CElemento siguiente = null;

        // constructor de elemento por defecto
        public CElemento() {
        }
        // constructorde elemento(datos, siguiente)

        public CElemento(Object dato, CElemento sig) {
            this.datos = dato;
            this.siguiente = sig;
        }
    }

    //Constructor
    // constructor de la lista por defecto
    public CListaLinealSE() {
    }

    // Métodos
    // Devuelve el número de elementos de la lista
    public int tamaño() {
        int tamanio = 0;
        CElemento aux = this.primero;
        while (aux != null) {
            tamanio++;
            aux = aux.siguiente;
        }
        return tamanio;
    }

    // Añadir un elemento en la posición i
    public boolean añadir(Object dato, int pos) {
        CElemento elemento = new CElemento(dato, null);
        boolean aniadido = false;
        if (pos < 0 || pos > tamaño()) {
            System.out.println("Posicion no valida");
        } else {
            CElemento actual = this.primero;
            CElemento anterior = this.primero;
            for (int i = 0; i < pos; i++) {
                anterior = actual;
                actual = actual.siguiente;
            }
            anterior.siguiente = elemento;
            elemento.siguiente = actual;
            aniadido = true;
        }
        return aniadido;
    }

    // Añadir un elemento al principio
    public boolean añadirAlPrincipio(Object dato) {
        boolean aniadido = false;

        CElemento elemento = new CElemento(dato, primero);
        this.primero = elemento;
        aniadido = true;
        return aniadido;
    }

    // Añadir un elemento al final
    public boolean añadirAlFinal(Object dato) {
        boolean aniadido = false;
        añadir(dato, tamaño());
        aniadido = true;
        return aniadido;

    }

    // Borrar el elemento de la posición i
    public String borrar(int pos) {
        String dato = "";
        if (pos < 0 || pos > tamaño()) {
            dato = "Posicion no valida, no se ha podido borrar";

        } else {
            CElemento actual = this.primero;
            CElemento anterior = this.primero;
            for (int i = 0; i < pos; i++) {
                anterior = actual;
                actual = actual.siguiente;
            }
            dato = dato + actual.datos;
            anterior.siguiente = actual.siguiente;


        }
        return dato;
    }

    // Borrar el primer elemento
    public String borrarPrimero() {
        String dato = "";
        if (tamaño() == 0) {
            dato = "Lista vacia, no se ha podido borrar";

        } else {
            CElemento actual = this.primero.siguiente;
            dato = dato + this.primero.datos;
            this.primero = actual;
        }

        return dato;

    }

    // Borrar el último elemento
    public String borrarÚltimo() {

        return borrar(tamaño() - 1);

    }

    // Obtener el elemento de la posición i
    public Object obtener(int pos) {
        CElemento actual = null;
        String dato = "";
        if (pos < 0 || pos > tamaño()) {
            dato = "Posicion no valida";


        } else {
            actual = this.primero;
            for (int i = 0; i < pos; i++) {
                actual = actual.siguiente;
            }
        }


        return actual.datos;
    }

    // Retornar el primer elemento
    public Object obtenerPrimero() {

        return obtener(0);
    }

    // Retornar el último elemento
    public Object obtenerÚltimo() {

        return obtener(tamaño() - 1);
    }
}
