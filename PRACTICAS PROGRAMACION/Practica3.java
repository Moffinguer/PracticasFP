
import java.util.Random;

public class Practica3 {
//Programa: Practica3
//Autor: Fernando José Mateos Gómez

    public static byte CuentaCifras(int numero) {
        //Entorno:
        byte cifra;
        //Algoritmo:
        cifra = 1;
        while (Math.pow(10, cifra) < numero) {
            cifra++;
        }//Fin Mientras
        return cifra;
    }//Fin Función

    public static byte CifraPuesto(int numeros, byte cifras) {
        //Entorno:
        byte cifra_descubierta;
        //Algoritmo:
        cifras = (byte) (cifras - 1);
        if (cifras != 0) {
            cifra_descubierta = (byte) ((numeros / Math.pow(10, cifras)) % 10);
        } else {
            cifra_descubierta = (byte) (numeros % 10);
        }
        return cifra_descubierta;
    }//Fin Función

    public static int aleatorio(int n) {
        //Entorno:
        Random aleatorio;
        //Algoritmo:
        aleatorio = new Random();

        return aleatorio.nextInt(n);
    }//Fin Funcion

    public static void pintaCifra(int numero1, int cifrasnum1, int numero2, int cifrasnum2) {
        //Entorno:
        byte x, numero;
        //Pinta la parte del numero, en caso de que este sea menor que el introducido (Con asteriscos)
        for (x = (byte) (cifrasnum1 - cifrasnum2); x > 0; x--) {
            System.out.print("*");
            cifrasnum1--;
        }//Fin Para
        for (x = (byte) cifrasnum1; x > 0; x--) {
            numero = Practica3.CifraPuesto(numero2, x);
            if (Practica3.CifraPuesto(numero1, x) == numero) {
                System.out.print(numero);
            } else {
                System.out.print("*");
            }//Fin Si
        }//Fin Para
        //Pinta la parte del numero en funcion ahora de su tamaño adecuado
    }

    public static void main(String[] args) {
        //Entorno:
        byte espacios, intentos, huecos, posicion, cifraIntroducido, cifraAleatorio, puestos;
        int numero_adivinar, aleatorio;
        //Algoritmo:
        aleatorio = Practica3.aleatorio(100000);
        System.out.println(aleatorio);
        System.out.println("Se ha generado un número aleatorio, intente averiguarlo, tienes 10 intentos");
        for (espacios = CuentaCifras(aleatorio); espacios >= 1; espacios--) {
            System.out.print("*");
        }//Fin Para
        System.out.println("");
        espacios = CuentaCifras(aleatorio);
        System.out.print("Introduzca un número: ");
        numero_adivinar = Leer.datoInt();
        posicion = CuentaCifras(numero_adivinar);
        while (posicion > espacios || numero_adivinar < 0 || numero_adivinar > 100000) {
            System.out.print("Introduciste un número no valido, pruebe otra vez: ");
            numero_adivinar = Leer.datoInt();
            posicion = CuentaCifras(numero_adivinar);
        }//Fin Mientras
        intentos = 10;
        while (numero_adivinar != aleatorio && intentos>1) {
            Practica3.pintaCifra(aleatorio, espacios, numero_adivinar, posicion);
            System.out.println("");
            System.out.print("Tenias " + intentos + ", intentos, prueba otra vez: ");
            numero_adivinar = Leer.datoInt();
            posicion = CuentaCifras(numero_adivinar);
            espacios = CuentaCifras(aleatorio);
            while (posicion > espacios || numero_adivinar < 0 || numero_adivinar >= 100001) {
                System.out.print("Introduciste un número no valido, pruebe otra vez: ");
                numero_adivinar = Leer.datoInt();
                posicion = CuentaCifras(numero_adivinar);
            }//Fin Mientras
            intentos--;
        }//Fin Si
        if (intentos == 1) {
            System.out.println("Se te acabaron los intentos, el numero a adivinar era: " + aleatorio);
        } else {
            System.out.println("Enhorabuena, ganaste");
        }//Fin Si   
    }//Fin Programa
}
