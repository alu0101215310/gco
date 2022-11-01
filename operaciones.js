// Obtenemos el fichero
var fichero = document.getElementById('ruta')

// Creamos la variable matriz principal para almacenar la matriz leida por fichero
var matriz = []
var faltantes_total = []
var similitudes = []
fichero.addEventListener('change', function(e) {
  matriz = []
  let reader = new FileReader()
  reader.onload = function () {
    let lines = reader.result.toString()
    let filas = lines.split("\n")

    // Insertamos los valores del fichero en la variable matriz
    filas.forEach((fila) => {
      matriz.push(fila.split(" "))
    })
  }
  reader.readAsText(fichero.files[0])
}, false)

function faltantes(usuario) {
  let fal = []
  for (let j = 0; j < matriz[0].length; j++) {
    if (matriz[usuario][j].trim() == '-') {
      fal.push(j)
    }
  }
  return fal
}
// Calculamos la media de cada fila
function calcular_media(matriz) {
  // Vector donde almacenaremos los resultados
  let medias = []
  for (let i = 0; i < matriz.length; i++) {
    for (let j = 0; j < matriz[i].length; j++) {
      if (matriz[i][j].trim() == '-') {
        
        if (!faltantes_total.includes(j)) {
          faltantes_total.push(j)
        }
      }
    }
  }
  // Recorremos la matriz y calculamos la media
  for (let i = 0; i < matriz.length; i++) {
    let cont = 0
    let sum = 0
    for (let j = 0; j < matriz[i].length; j++) {
      if (!faltantes_total.includes(j)) {
        sum = sum + parseInt(matriz[i][j])
        cont++
      } 
    }
    medias.push(sum/cont)
  }
  return medias
  
}
// Función que calcula la correlación de Pearson
function correlacion_pearson(matriz, usu1, usu2) {
  let media = calcular_media(matriz)
  let aux = 0
  let aux2 = 0
  let aux3 = 0
  for (let j = 0; j < matriz[usu1].length; j++) {
    if (!faltantes_total.includes(j)) {
      aux = aux + ((matriz[usu1][j] - media[usu1])*(matriz[usu2][j] - media[usu2]))
      aux2 = aux2 + (Math.pow(matriz[usu1][j] - media[usu1],2))
      aux3 = aux3 + (Math.pow(matriz[usu2][j] - media[usu2],2))
    }
  }
  aux2 = Math.sqrt(aux2) * Math.sqrt(aux3)
  return aux/aux2
}
// Función que calcula la distancia coseno
function distancia_coseno(matriz, usu1, usu2) {
  let aux = 0
  let aux2 = 0
  let aux3 = 0
  for (let j = 0; j < matriz[usu1].length; j++) {
    if (!faltantes_total.includes(j)) {
      aux = aux + ((matriz[usu1][j])*(matriz[usu2][j]))
      aux2 = aux2 + (Math.pow(matriz[usu1][j],2))
      aux3 = aux3 + (Math.pow(matriz[usu2][j],2))
    }
  }
  aux2 = Math.sqrt(aux2) * Math.sqrt(aux3)
  return aux/aux2
}
// Función que calcula la distancia euclidea
function distancia_euclidea(matriz, usu1, usu2) {
  let aux = 0;
  for (let j = 0; j < matriz[usu1].length; j++) {
    if (!faltantes_total.includes(j)) {
      aux = aux + Math.pow(matriz[usu1][j] - matriz[usu2][j], 2)
    }
  }
  return Math.sqrt(aux)
}

// Calculamos la predicción Simple
function simple(matriz,usuario, item, num_vecinos, media) {
  let vecinos = [];
  let metrica = document.getElementById('metrica').value
  if (num_vecinos < 3) {
    alert("¡Debe elegir 3 vecinos como mínimo!");
    throw new Error();
  } else { 
      switch (metrica) {
        case '1':
          for (let i = 0; i < num_vecinos - 1; i++) {
            let aux_similitudes = similitudes;
            const index = aux_similitudes.indexOf(Math.max(...aux_similitudes));
            vecinos[usuario].push(index);
            aux_similitudes.splice(index, 1);
          }
          break;
          

        case '2':
          for (let i = 0; i < num_vecinos - 1; i++) {
            let aux_similitudes = similitudes;
            const index = aux_similitudes.indexOf(Math.max(...aux_similitudes));
            vecinos[usuario].push(index);
            aux_similitudes.splice(index, 1);
          }
          break;
          
        case '3':
          for (let i = 0; i < num_vecinos - 1; i++) {
            let aux_similitudes = similitudes;
            const index = aux_similitudes.indexOf(Math.max(...aux_similitudes));
            vecinos[usuario].push(index);
            aux_similitudes.splice(index, 1);
          }
          break;
          
        }
    }
    console.log(vecinos[usuario])
    let num = 0;
    let den = 0;    
    // Calculamos la formula
    for (let i = 0; i < num_vecinos; i++) {
        num = num + (similitudes[usuario][vecinos[usuario][i]]*(matriz[vecinos[usuario][i]][item] - media[vecinos[usuario][i]]))
        den = den + Math.abs(similitudes[usuario][vecinos[usuario][i]])
    }
    let resultado = num/den;
    return resultado;
}

// Calculamos la prediccion de la diferencia con la media
function diferencia_media(matriz, medias, u, item, num_vecinos) {
  let num = 0;
  let den = 0;
  // Calculamos la formula
  for (let i = 0; i < num_vecinos; i++) {
    num = num + (similitudes[i][1] * (parseInt(matriz[similitudes[i][0]][item]) - medias[similitudes[i][0]]))
    den = den + Math.abs(similitudes[i][1])
  }
  let resultado = medias[u] + num/den
  return resultado;
}

function cal_similitudes (){
  let metrica = document.getElementById('metrica').value
  similitudes = []
  let aux = []
  /**for(let i=0; i<matriz.length -1; i++) {
    similitudes[i] = push([]);
  }**/
  console.log(similitudes)
  for (let i = 0; i < matriz[0].length; i++) {
    for(let j = 0; j < matriz[0].length; j++) {
      if (i != j) {
      switch (metrica) {
        case '1':
          aux.push(correlacion_pearson(matriz,i,j))
          break;
      case '2':
          aux.push(distancia_coseno(matriz,i,j))
          break;
      case '3':
          aux.push(distancia_euclidea(matriz,i,j))
          break;
      }
      }
      
    }
    console.log(aux)
      if (aux.length != 0) {
        similitudes[i] = aux;
      }
    aux = []
  }
  /**for (let i = 0; i < matriz[0].length; i++) {
    var filtered = similitudes[i].filter(function (el) {
      return el != undefined;
    });
  }
    similitudes = filtered
  **/
}

// Función principal que muestra el sistema de recomendación escogido
function main() {
// Comprobamos si la matriz se ha recogido del fichero correctamente
  if (matriz.length == 0) { 
    alert("No ha sido posible procesar la matriz")
    throw new Error()
  } else {
    /**let metrica = document.getElementById('metrica').value
    console.log(calcular_media(matriz))
    switch (metrica) {
      case '1':
        console.log(correlacion_pearson(matriz,0,1))
        break;
      case '2':
        console.log(distancia_coseno(matriz,0,1))
        break;
      case '3':
        console.log(distancia_euclidea(matriz,0,1))
        break;
    }**/
    /**let tipo_prediccion = document.getElementById('tipo_prediccion').value
    switch (tipo_prediccion) {
      case '1':
        
        break;
      case '2':
        break;
    }**/
    cal_similitudes()
    console.log(similitudes)
    console.log(faltantes_total)
    for (let i = 0; i < similitudes[0].length; i++) {
      /**const newtext = document.createTextNode("Vecino " + (i+1) + ": " + similitudes[i] + "\n")
      const p1 = document.getElementById("print_matriz");
      p1.appendChild(newtext);**/
      document.getElementById('print_matriz').innerHTML = document.getElementById('print_matriz').innerHTML + "\r\n" + "Vecino " + (i+1) + ": " + similitudes[0][i]
    }

  }
}