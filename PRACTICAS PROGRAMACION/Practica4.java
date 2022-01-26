
import java.util.Calendar;
import java.util.GregorianCalendar;

public class Practica4 {
//Programa: Practica4
//Autor: Fernando Mateos

    public static void main(String[] args) {
        //Entorno:
        GregorianCalendar calendario;
        byte diaSemana, ultimoDia;
        short anio, mes;
        byte dia, bMes, semana;
        String[] nombreMes = {"ENERO", "FEBRERO", "MARZO", "ABRIL", "MAYO", "JUNIO", "JULIO", "AGOSTO", "SEPTIEMBRE", "OCTUBRE", "NOVIEMBRE", "DICIEMBRE"};
        String semanaCompleta;
        //Algoritmo:
        do {
            System.out.print("Mes: ");
            mes = Leer.datoShort();
        } while (mes < 1 || mes > 12);
        do {
            System.out.print("Año: ");
            anio = Leer.datoShort();
        } while (anio < 1582);
        dia = 1;
        bMes = (byte) mes;
        calendario = new GregorianCalendar((int) anio, (int) (bMes - 1), (int) dia);
        diaSemana = (byte) calendario.get(GregorianCalendar.DAY_OF_WEEK);
        System.out.println("\t  CALENDARIO " + nombreMes[mes - 1] + " DE " + anio);
        System.out.println("LU\tMA\tMI\tJU\tVI\tSA\tDO\t");
        semanaCompleta = "";
        if (diaSemana == 1) {
            for (semana = 6; semana >= 1; semana--) {
                semanaCompleta = semanaCompleta + "\t";
            }//Fin Para
            semanaCompleta = semanaCompleta + " " + Integer.toString(dia);
            dia++;
        } else {
            for (semana = (byte) (diaSemana - 2); semana >= 1; semana--) {
                semanaCompleta = semanaCompleta + "\t";
            }//Fin Para
            for (semana = diaSemana; semana <= 8; semana++) {
                semanaCompleta = semanaCompleta + " " + Integer.toString(dia) + "\t";
                dia++;
            }//Fin Para
        }//Fin Si
        ultimoDia = (byte) calendario.getActualMaximum(GregorianCalendar.DATE);
        while (dia < 10) {
            System.out.println(semanaCompleta);
            semanaCompleta = "";
           semana = 1;
            while (semana <= 7 && dia < 10) {
                semanaCompleta = semanaCompleta + " " + Integer.toString(dia) + "\t";
                dia++;
                semana++;
            }//Fin Mientras
        }//Fin Mientras
        while (dia <= ultimoDia) {
            while (semana <= 7 && dia <= ultimoDia) {
                semanaCompleta = semanaCompleta + Integer.toString(dia) + "\t";
                dia++;
                semana++;
            }//Fin Mientras
            semana = 1;
            System.out.println(semanaCompleta);
            semanaCompleta="";
        }//Fin Mientras
    }//Fin Programa
}