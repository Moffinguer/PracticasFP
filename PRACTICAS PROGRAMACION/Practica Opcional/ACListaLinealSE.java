public class ACListaLinealSE {
    
private static void pintaLista(CListaLinealSE lista){
        int i=0;
        while(i<lista.tamaño()){
            System.out.println(lista.obtener(i));
            i++;
        }
    }

    public static void main(String[] args) {
        //Entorno:
        CListaLinealSE lista;
        String person1, person2, person3, person4;
        
        person1="Joaquin";
        person2="Jose";
        person3="Jorge";
        person4="Santiago";

        lista= new CListaLinealSE();
        System.out.println("---Añado en una posicion fuera de rango----");
       lista.añadir(person1, 5);
        System.out.println("---Añado al principio----");
        if (lista.añadirAlPrincipio(person1)) {
            System.out.println(lista.obtenerPrimero());
        } else {
            System.out.println("No se ha podido añadir");
        }
        System.out.println("---Añado al final");
        if (lista.añadirAlFinal(person2)) {
            System.out.println(lista.obtenerÚltimo());
        } else {
            System.out.println("No se ha podido añadir");
        }
        System.out.println("---Añado en una posiciondada----");
        if (lista.añadir(person3, 1)) {
            System.out.println(lista.obtener(1));
        } else {
            System.out.println("No se ha podido añadir");
        }
        
        System.out.println("---Añado en una posiciondada----");
        if (lista.añadir(person4, 1)) {
            System.out.println(lista.obtener(1));
        } else {
            System.out.println("No se ha podido añadir");
        }
        
        
        System.out.println("----------------MOSTRAMOS LA LISTA------------------------");
        
        ACListaLinealSE.pintaLista(lista);
        
        System.out.println("----------------BORRAMOS AL PRINCIPIO---------------------");
        
        System.out.println(lista.borrarPrimero());
        System.out.println("Mostramos la lista actualizada");
        ACListaLinealSE.pintaLista(lista);
        System.out.println("----------------BORRAMOS AL FINAL---------------------");
        System.out.println(lista.borrarÚltimo());
        System.out.println("Mostramos la lista actualizada");
        ACListaLinealSE.pintaLista(lista);
        System.out.println("----------------BORRAMOS UNA POSICION---------------------");
        System.out.println(lista.borrar(1));
        System.out.println("Mostramos la lista actualizada");
        ACListaLinealSE.pintaLista(lista);
    }
}
