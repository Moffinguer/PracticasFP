//Fernando Mateos Gomez
import java.util.Random;

public class Practica6 {

    public static byte errorFila(int[][] matriz, int filaAnaliz) {
        int contador = 0;
        for (int i = 0; i < matriz[0].length - 1; i++) {
            contador = contador + matriz[filaAnaliz][i];
        }
        return (byte)(contador % 2);
    }

    public static byte errorColum(int[][] matriz, int colAnaliz) {
        int contador = 0;
        for (int i = 0; i < matriz.length - 1; i++) {
            contador = contador + matriz[i][colAnaliz];
        }
        return (byte)(contador % 2);
    }

    public static void arreglaMatriz(int[][] matriz, int fil, int col) {
        if (matriz[fil][col] == 0) {
            matriz[fil][col] = 1;
        } else {
            matriz[fil][col] = 0;
        }
    }

    public static void detectaError(int[][] matriz) {
        byte fil, col;
        fil = 0;
        while (Practica6.errorFila(matriz, fil)==matriz[fil][matriz[0].length - 1]) {
            fil++;
        }
        col = 0;
        while (Practica6.errorColum(matriz, col) == matriz[matriz.length - 1][col]) {
            col++;
        }
        System.out.println("ERROR DETECTADO EN LA COLUMNA= " + col + " Y EN LA FILA= " + fil);
        System.out.println("PALABRA CON EL ERROR: " + Practica6.reconstruyePalabra(matriz));
        Practica6.arreglaMatriz(matriz, fil, col);
        System.out.println("PALABRA ENVIADA CORRECTAMENTE: " + Practica6.reconstruyePalabra(matriz));
    }

    public static int[] conversionAsciiTabla(String palabra) {
        int[] ascii;
        int i;
        ascii = new int[palabra.length()];
        for (i = 0; i < palabra.length(); i++) {
            ascii[i] = (short) palabra.toCharArray()[i];
        }
        return ascii;
    }

    public static String introduceBitsRestantes(String binario) {
        String bits = binario;
        while (bits.length() < 8) {
            bits = "0" + bits;
        }
        return bits;
    }

    public static int[][] conversionBits(int[] ascii) {
        String bits;
        byte i, j;
        int[][] bitsParidad = new int[ascii.length + 1][9];
        for (i = 0; i < ascii.length; i++) {
            bits = Integer.toBinaryString(ascii[i]);
            bits = Practica6.introduceBitsRestantes(bits);
            for (j = 0; j < 8; j++) {
                bitsParidad[i][j] = Integer.parseInt(bits.substring(j, j + 1));
                bitsParidad[bitsParidad.length - 1][j] = bitsParidad[i][j] + bitsParidad[bitsParidad.length - 1][j];
                bitsParidad[i][bitsParidad[0].length - 1] = bitsParidad[i][bitsParidad[0].length - 1] + bitsParidad[i][j];
            }
            bits = "";
        }
        for (i = 0; i < bitsParidad.length - 1; i++) {
            bitsParidad[i][bitsParidad[0].length - 1] = Practica6.errorFila(bitsParidad,i);
        }
        for (j = 0; j < bitsParidad[0].length - 1; j++) {
            bitsParidad[bitsParidad.length - 1][j] = Practica6.errorColum(bitsParidad, j);
        }
        return bitsParidad;
    }

    public static String reconstruyePalabra(int[][] matriz) {
        //Entorno:
        byte i, j;
        String palabra;
        String nPal;
        //Algoritmo:
        nPal = new String();
        palabra = new String();
        for (i = 0; i < matriz.length - 1; i++) {
            for (j = 0; j < matriz[0].length - 1; j++) {
                palabra = palabra + Integer.toString(matriz[i][j]);
            }//Fin Para
            nPal = nPal + (char) ((short) Integer.parseInt(palabra, 2));
            palabra = "";
        }//Fin Para
        return nPal;
    }//Fin FUncion

    public static void introduceRuido(int[][] matriz) {
        Random numAl;
        byte columna, fil;
        numAl = new Random();
        fil = (byte) numAl.nextInt(matriz.length - 1);
        columna = (byte) numAl.nextInt(matriz[0].length - 1);
        if (matriz[fil][columna] == 0) {
            matriz[fil][columna] = 1;
        } else {
            matriz[fil][columna] = 0;
        }
        System.out.println("RUIDO INSERTADO EN LA COLUMNA= " + columna + " Y EN LA FILA= " + fil);
    }//Fin Procedimiento

    public static void main(String[] args) {
        //Entorno:
        String palabra;
        int[][] matrizBytes;
        do {
            System.out.println("Introduce una palabra de menos de 8 caracteres:");
            palabra = Leer.dato();
        } while (palabra.isEmpty() || palabra.indexOf(" ") != -1 || palabra.length() > 8);
        matrizBytes = Practica6.conversionBits(Practica6.conversionAsciiTabla(palabra));
        Practica6.introduceRuido(matrizBytes);
        Practica6.detectaError(matrizBytes);

    }
}