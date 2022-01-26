//Autor: Fernando Mateos Gomez
public class B2Ej2 {

    private int vector[];
    private int nElem;
    //Constructores:

    public B2Ej2() {
        this.vector = new int[10];
        this.nElem = 0;
    }
    //Metodos:

    public void visualizar() {
        int i;
        for (i = 0; i < this.nElem; i++) {
            System.out.print(this.vector[i] + "\t");
        }//Fin Para
        for (i = this.nElem; i < this.vector.length; i++) {
            System.out.print("-\t");
        }//Fin Para
        System.out.println("");
    }//Fin Procedimiento

    public void insertar(int pos, int n) {
        if (pos >= 1 && pos <= 10) {
            if (!this.estaLLena()) {
                if (pos - 1 >= this.nElem) {
                    this.vector[this.nElem] = n;
                } else {
                    this.desplazaIzda(this.vector, pos - 1, this.nElem);
                    this.vector[pos - 1] = n;
                }//Fin Si
                this.nElem++;
            } else {
                this.estaCompleto();
            }//Fin Si
        } else {
            System.out.println("Fuera de Rango");
        }//Fin Si
    }//Fin Procedimiento

    public void insertarAlPrincipio(int n) {
        insertar(1, n);
    }//Fin Procedimiento

    public void insertarAlfinal(int n) {
        if (!this.estaLLena()) {
            insertar(this.nElem + 1, n);
        } else {
            this.insertar(this.nElem, n);
        }
    }//Fin Procedimiento

    public void eliminar(int pos) {
        if ((pos >= 1 && pos <= 10)) {
            if (this.nElem != 0) {
                this.desplazaDcha(this.vector, pos - 1, this.nElem);
                this.nElem--;
            } else {
                this.estaVacio();
            }//Fin Si
        } else {

            System.out.println("Fuera de Rango");

        }
    }//Fin Procedimiento

    public void eliminarAlPrincipio() {
        eliminar(1);
    }//Fin Procedimiento

    public void eliminarAlFinal() {
        if (!this.estaLLena()) {
            eliminar(this.nElem + 1);
        } else {
            this.eliminar(this.nElem);
        }
    }//Fin Procedimiento

    private void desplazaIzda(int[] v, int desde, int hasta) {
        //Entorno:
        int i;
        //Algoritmo:
        for (i = hasta; i > desde; i--) {
            v[i] = v[i - 1];
        }//Fin Para
    }//Fin Procedimiento

    private void desplazaDcha(int[] v, int desde, int hasta) {
        //Entorno:
        int i;
        //Algoritmo:
        for (i = desde; i < hasta - 1; i++) {
            v[i] = v[i + 1];
        }//Fin para
    }//Fin Procedimiento

    public boolean estaLLena() {
        return this.nElem == 10;
    }//Fin Función

    public boolean estaVacia() {
        return this.nElem==0;
    }//Fin Función

    private void estaCompleto() {
        System.out.println("Imposible introducir datos, tabla llena.");
    }

    private void estaVacio() {
        System.out.println("Imposible borrar dato, elemento vacío");
    }
}
