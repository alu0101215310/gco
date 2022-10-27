// Obtenemos el fichero
var fichero = document.getElementById('ruta')
//Creamos la variable matriz principal para almacenar la matriz leida por fichero
var matriz = []

fichero.addEventListener('change', function(e) {
  matriz = []
  let reader = new FileReader()
  reader.onload = function () {
    let lines = reader.result.toString()
    let filas = lines.split("\n")

    //Insertamos los valores del fichero en la variable matriz
    filas.forEach((fila) => {
      matriz.push(fila.split(" "))
    })
  }
  reader.readAsText(fichero.files[0])
}, false)

// Calculamos la media de cada fila
function calcular_media(matriz) {
  //Vector donde almacenaremos los resultados
  let medias = []
  //Recorremos la matriz y calculamos la media
  for (let i = 0; i < matriz.length; i++) {
    let cont = 0
    let sum = 0
    for (let j = 0; j < matriz[i].length; j++) {
      if (matriz[i][j] != "-") {
        console.log(matriz[i][j])
        sum = sum + parseInt(matriz[i][j])
        cont++
      } 
    }
    medias.push(sum/cont)
  }
  return medias
}
  
// Función principal que muestra el sistema de recomendación escogido
function main() {
//Comprobamos si la matriz se ha recogido del fichero correctamente
  if (matriz.length == 0) { 
    alert("No ha sido posible procesar la matriz")
    throw new Error()
  } else {
    console.log(calcular_media(matriz))
  }
}