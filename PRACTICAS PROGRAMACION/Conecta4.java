//Autor: Fernando Mateos Gómez
public class Conecta4 {

    public static void pintaConecta4(char[][] tablero) {
        int i;
        System.out.println(Conecta4.primeraFila());
        for (i = 4; i > 0; i--) {
            System.out.println(Conecta4.pintaFila(tablero, i));
            System.out.println(Conecta4.pintaUnionFilas());
        }//Fin Para
        System.out.println(Conecta4.pintaFila(tablero, i));
        System.out.println(Conecta4.ultimaFila());
    }//Fin Procedimiento

    private static String primeraFila() {
        String fila1;
        char caracter;
        int i;
        fila1 = "";
        caracter = 218;
        fila1 = fila1 + caracter;
        for (i = 0; i <= 6; i++) {
            caracter = 196;
            fila1 = fila1 + caracter + caracter + caracter;
            caracter = 194;
            fila1 = fila1 + caracter;
        }
        caracter = 196;
        fila1 = fila1 + caracter + caracter + caracter;
        caracter = 191;
        fila1 = fila1 + caracter;
        return fila1;
    }//Fin Funcion.

    private static String pintaFila(char tablero[][], int fila) {
        String union;
        char caracter;
        int i;
        union = "";
        for (i = 0; i <= 7; i++) {
            caracter = 179;
            union = union + caracter;
            caracter = tablero[fila][i];
            union = union + " " + caracter + " ";
        }
        caracter = 179;
        union = union + caracter;
        return union;
    }//Fin Funcion

    private static String ultimaFila() {
        char limitador;
        int i;
        String ultimaFila;
        ultimaFila = "";
        limitador = 192;
        ultimaFila = ultimaFila + limitador;
        for (i = 0; i <= 6; i++) {
            limitador = 196;
            ultimaFila = ultimaFila + limitador + limitador + limitador;
            limitador = 193;
            ultimaFila = ultimaFila + limitador;
        }
        limitador = 196;
        ultimaFila = ultimaFila + limitador + limitador + limitador;
        limitador = 217;
        ultimaFila = ultimaFila + limitador;
        return ultimaFila;
    }//Fin Funcion

    private static String pintaUnionFilas() {
        //Entorno:
        char caracter;
        int i;
        String union;
        //Algoritmo:
        union = "";
        caracter = 195;
        union = union + caracter;
        caracter = 196;
        for (i = 0; i <= 6; i++) {
            union = union + caracter + caracter + caracter;
            caracter = 197;
            union = union + caracter;
            caracter = 196;
        }
        caracter = 196;
        union = union + caracter + caracter + caracter;
        caracter = 180;
        union = union + caracter;
        return union;
    }//Fin Funcion

    public static boolean evaluaColumna(int col, int fila, char[][] tablero, char ficha) {
        //Entorno:
        byte contador;
        //Algoritmo:
        fila--;
        contador = 1;
        while (fila >= 0 && contador != 5 && tablero[fila][col] == ficha) {
            fila--;
            contador++;
        }//Fin Mientras
        return contador == 4;
    }//Fin Funcion

    public static boolean evaluaFila(int col, int fila, char[][] tablero, char ficha) {
        //Entorno:
        byte contador;
        //Algoritmo:
        col--;
        contador = 1;
        while (col != -1 && contador != 4 && tablero[fila][col] == ficha) {
            col--;
            contador++;
        }//Fin Mientras
        if (contador != 4) {
            col = col + contador + 1;
            while (col < tablero[0].length && contador != 4 && tablero[fila][col] == ficha) {
                col++;
                contador++;
            }//Fin Mientras
        }//Fin Si
        return contador == 4;
    }

    public static boolean evaluaDiagonal13(int col, int fila, char[][] tablero, char ficha) {
        //Entorno:
        byte contador13;
        //Algoritmo:
        col--;
        fila--;
        contador13 = 1;
        while (col != -1 && fila != -1 && contador13 != 4 && tablero[fila][col] == ficha) {
            col--;
            fila--;
            contador13++;
        }//Fin Mientras
        if (contador13 != 4) {
            col = col + contador13 + 1;
            fila = fila + contador13 + 1;
            while (col < tablero[0].length && fila < tablero.length && contador13 != 4 && tablero[fila][col] == ficha) {
                col++;
                fila++;
                contador13++;
            }//Fin Mientras
        }//Fin Si
        return contador13 == 4;
    }//Fin Funcion

    public static boolean evaluaDiagonal24(int col, int fila, char[][] tablero, char ficha) {
        //Entorno:
        byte contador24;
        //Algoritmo:
        col--;
        fila++;
        contador24 = 1;
        while (col != -1 && fila < tablero.length && contador24 != 4 && tablero[fila][col] == ficha) {
            col--;
            fila++;
            contador24++;
        }//Fin Mientras
        if (contador24 != 4) {
            col = col + contador24 + 1;
            fila = fila - contador24 - 1;
            while (col < tablero[0].length && fila != -1 && contador24 != 4 && tablero[fila][col] == ficha) {
                col++;
                fila--;
                contador24++;
            }//Fin Mientras
        }//Fin Si
        return contador24 == 4;
    }//Fin Funcion

    public static void main(String[] args) {
        //Entorno
        char[][] conecta4;
        short columna, movs;
        String presentacion;
        byte[] evaluaCol;
        char simbolo;
        boolean haGanado;
        //Algorimto
        presentacion = "JUGADOR 1";
        evaluaCol = new byte[8];
        conecta4 = new char[6][8];
        simbolo = 1;
        Conecta4.pintaConecta4(conecta4);
        for (movs = 1; movs < 7; movs++) {
            System.out.println(presentacion);
            do {
                do {
                    System.out.print("INTRODUZCA UNA COLUMNA: ");
                    columna = Leer.datoShort();
                } while (columna > 8 || columna <= 0);
                columna--;
            } while (evaluaCol[columna] + 1 > 5);
            conecta4[evaluaCol[columna]][columna] = simbolo;
            evaluaCol[columna]++;
            if (simbolo == 1) {
                simbolo = 2;
                presentacion = "JUGADOR 2";
            } else {
                presentacion = "JUGADOR 1";
                simbolo = 1;
            }//Fin Si
            Conecta4.pintaConecta4(conecta4);
        }//Fin Para
        System.out.println(presentacion);
        do {
            do {
                System.out.print("INTRODUZCA UNA COLUMNA: ");
                columna = Leer.datoShort();
            } while (columna > 8 || columna <= 0);
            columna--;
        } while (evaluaCol[columna] + 1 > 5);
        conecta4[evaluaCol[columna]][columna] = simbolo;
        movs++;
        haGanado = Conecta4.evaluaColumna(columna, evaluaCol[columna], conecta4, simbolo)
                || Conecta4.evaluaFila(columna, evaluaCol[columna], conecta4, simbolo)
                || Conecta4.evaluaDiagonal13(columna, evaluaCol[columna], conecta4, simbolo)
                || Conecta4.evaluaDiagonal24(columna, evaluaCol[columna], conecta4, simbolo);
        while (!haGanado && movs <= 48) {
            evaluaCol[columna]++;
            if (simbolo == 1) {
                simbolo = 2;
                presentacion = "JUGADOR 2";
            } else {
                presentacion = "JUGADOR 1";
                simbolo = 1;
            }//Fin Si
            Conecta4.pintaConecta4(conecta4);
            System.out.println(presentacion);
            do {
                do {
                    System.out.print("INTRODUZCA UNA COLUMNA: ");
                    columna = Leer.datoShort();
                } while (columna > 8 || columna <= 0);
                columna--;
            } while (evaluaCol[columna] + 1 > 5);
            conecta4[evaluaCol[columna]][columna] = simbolo;
            movs++;
            haGanado = Conecta4.evaluaColumna(columna, evaluaCol[columna], conecta4, simbolo)
                    || Conecta4.evaluaFila(columna, evaluaCol[columna], conecta4, simbolo)
                    || Conecta4.evaluaDiagonal13(columna, evaluaCol[columna], conecta4, simbolo)
                    || Conecta4.evaluaDiagonal24(columna, evaluaCol[columna], conecta4, simbolo);
        }//Fin Mientras
        Conecta4.pintaConecta4(conecta4);
        if (haGanado) {
            System.out.println("ENHORABUENA " + presentacion.toLowerCase());
        } else {
            System.out.println("HABEIS EMPATADO");
        }//Fin Si
    }//Fin Programa
}
