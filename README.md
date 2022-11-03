# gco
##Sistemas de recomendación
##Alberto Rios de la Rosa - alu0101235929@ull.edu.es
##PONGAN SUS NOMBRES Y ALU

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
 
Parametros introducidos:

  Fichero:
  Métrica: Correlación de Pearson
  Número de vecinos (Tiene que ser 3 o mayor si se escoge como tipo de predicción "Predicción simple"): 
  Tipo de predicción: 
 
 HAY QUE PONER UN EJEMPLO DE USO AQUI, LOS VALORES INTRODUCIDOS Y LA SALIDA
 
Parametros de salida:
