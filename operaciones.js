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
  

// Función principal que muestra el sistema de recomendación escogido
function main() {
//Comprobamos si la matriz se ha recogido del fichero correctamente
  if (matriz.length == 0) { 
    alert("No ha sido posible procesar la matriz")
    throw new Error()
  } else {
    console.log(matriz)
  }
}