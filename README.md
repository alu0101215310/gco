
# Sistemas de recomendación. Filtrado colaborativo
## Alberto Rios de la Rosa - alu0101235929@ull.edu.es
## Daniel Hernández Fajardo - alu0101320489@ull.edu.es
## Alejandro Pérez Álvarez - alu0101215310@ull.edu.es

### Descripción del código desarrollado

La practica ha sido desarrollada en un fichero HTML y otro en Javascript. 

El fichero HTML básicamente es un formulario donde se introducen los parámetros de entradas y se muestran los de salida.
Lo parámetros de entradas son los siguientes:

  * La métrica que se usará para calcular las similitudes, que pueden ser el Coeficiente de Pearson, la Distancia Coseno o la Distancia Euclídea
  * El tipo de predicción que se desea usar a elegir entre la predicción simple o la diferencia con la media
  * Escoger el fichero que contiene la matriz que queremos usar
  * El número de vecinos deseados para llevar a cabo la predicción
  
Por otro lado, en el fichero Javascript, encontraremos las funciones que llevarán a cabo los calculos necesarios para tener nuestro sistema recomendador.
Estas son las siguientes:

  * `faltantes(usuario)`: Función que recibe como parametro una fila de la matriz y devuelve un vector con las posiciones de dicha fila donde haya encontrado un espacio sin valorar, o lo que es lo mismo un "-"
  * `calcular_media(matriz)`: Función que calcula la media por filas de toda la matriz y la guarda en un vector
  * `correlacion_pearson(matriz, usu1)`: Función que calcula las similitud entre dos usuarios a través del coeficiente de pearson
  * `distancia_coseno(matriz, usu1)`: Función que calcula las similitud entre dos usuarios a través de la distancia coseno
  * `distancia_euclidea(matriz, usu1)`: Función que calcula las similitud entre dos usuarios a través de la distancia euclidea
  * `simple(matriz,usuario, item, num_vecinos)`: Función que calcula la predicción de calificación de un usuario a un item mediante la predicción simple
  * `diferencia_media(matriz,usuario, item, num_vecinos)`: Función que calcula la predicción de calificación de un usuario a un item mediante la diferencia con la media
  * `cal_similitudes()`: Función que es llamada desde la main, en el que se lleva a cabo el calculo de las similitudes según la métrica escogida
  * `main()`: Función principal que se llama desde el HTML al pulsar el boton ejecutar una vez introducidos los parámetros
  
 
 ### Ejemplo de uso

 A continuación se mostrará un ejemplo de como habría que usar la aplicación y cual sería su resultado.
 
  #### Parametros introducidos:

  * Métrica: Correlación de Pearson
 
  * Tipo de predicción: Simple
 
  * Fichero: matrix-5-10.txt
 
  * Numero de vecinos(3 o más si se escoge la prediccion simple): 3

  #### Parametros de salida: 

  * Matriz resuelta:

 4,1.02,0.28,0,2,2.10,3,4.43,0,-1.13  
 -2.01,4,4,1,1,3,0,-3.68,-0.87,2  
 2,5,1,2,1,5,5,5,2,0  
 1,4,1,3,1,-1.87,1,0,0,0  
 0,3,4,0,0,5,5,4,5,-0.38
