//Autor: Fernando Mateos Gomez
public class AB2Ej2 {

    public static void pintaMenu() {
        System.out.println("1. Visualizar.");
        System.out.println("2. Insertar elemento al principio.");
        System.out.println("3. Borrar elemento al principio.");
        System.out.println("4. Insertar elemento al final.");
        System.out.println("5. Borrar elemento al final.");
        System.out.println("6. Insertar un elemento en una posición.");
        System.out.println("7. Borrar un elemento de una posición.");
        System.out.println("8. SALIR.");
        System.out.print("Elija la opcion: ");
    }

    public static byte posTabla() {
        byte num;
        do {
            System.out.print("Introduce una posicion entre [1-10]: ");
            num = (byte) Leer.datoShort();
        } while (num < 1 || num > 10);
        return num;
    }

    public static int numTabla() {
        int num;
        System.out.print("Introduce el valor que desee guardar: ");
        num = Leer.datoInt();
        return num;
    }

    public static void opcionElegida(byte numOpcion, B2Ej2 tabla) {
        int num, pos;
        switch (numOpcion) {
            case 1:
                tabla.visualizar();
                break;
            case 2:
                num = AB2Ej2.numTabla();
                tabla.insertarAlPrincipio(num);
                break;
            case 3:
                tabla.eliminarAlPrincipio();
                break;
            case 4:
                num = AB2Ej2.numTabla();
                tabla.insertarAlfinal(num);
                break;
            case 5:
                tabla.eliminarAlFinal();
                break;
            case 6:
                pos = AB2Ej2.posTabla();
                num = AB2Ej2.numTabla();
                tabla.insertar(pos, num);
                break;
            case 7:
                pos = AB2Ej2.posTabla();
                tabla.eliminar(pos);
                break;
            case 8:
                System.out.println("Programa finalizado.");
                break;
            default:
                System.out.println("Opcion no existente, elija otra.");
        }//Fin Según sea
    }

    public static void main(String[] args) {
        byte opcion;
        B2Ej2 tabla = new B2Ej2();
        do {
            AB2Ej2.pintaMenu();
            opcion = (byte) Leer.datoShort();
            AB2Ej2.opcionElegida(opcion, tabla);
        } while (opcion != 8);
    }
}
