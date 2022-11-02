// Obtenemos el fichero
var fichero = document.getElementById('ruta')

// Creamos la variable matriz principal para almacenar la matriz leida por fichero
var matriz = []
var faltantes_total = []
//var similitudes = []
var vecinos = [];
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
function correlacion_pearson(matriz, usu1) { 
  let similitudes = []
  let media = calcular_media(matriz)
  let aux = 0
  let aux2 = 0
  let aux3 = 0
  for (let i = 0; i < matriz.length; i++) {
    if (i != usu1) {
      for (let j = 0; j < matriz[usu1].length; j++) {
        if (!faltantes_total.includes(j)) {
          aux = aux + ((matriz[usu1][j] - media[usu1])*(matriz[i][j] - media[i]))
          aux2 = aux2 + (Math.pow(matriz[usu1][j] - media[usu1],2))
          aux3 = aux3 + (Math.pow(matriz[i][j] - media[i],2))
        }
      }
      aux2 = Math.sqrt(aux2) * Math.sqrt(aux3)
      let vec = {
        v: i,
        valor: aux/aux2
      }
      aux = 0;
      aux2 = 0;
      aux3 = 0;
      similitudes.push(vec)
    }
    
  }
  for (let i = 0; i < similitudes.length; i++) {
    document.getElementById('print_matriz').innerHTML = document.getElementById('print_matriz').innerHTML + "\nSimilitud usuario " + usu1 + "," + similitudes[i].v + ": " + similitudes[i].valor
  }
  return(similitudes)
}
// Función que calcula la distancia coseno
function distancia_coseno(matriz, usu1) {
  let similitudes = []
  let aux = 0
  let aux2 = 0
  let aux3 = 0
  for (let i = 0; i < matriz.length; i++) {
    if (i != usu1) {
      for (let j = 0; j < matriz[usu1].length; j++) {
        if (!faltantes_total.includes(j)) {
          aux = aux + ((matriz[usu1][j])*(matriz[i][j]))
          aux2 = aux2 + (Math.pow(matriz[usu1][j],2))
          aux3 = aux3 + (Math.pow(matriz[i][j],2))
        }
      }
      aux2 = Math.sqrt(aux2) * Math.sqrt(aux3)
      let vec = {
        v: i,
        valor: aux/aux2
      }
      aux = 0;
      aux2 = 0;
      aux3 = 0;
      similitudes.push(vec)
    }
  }
  for (let i = 0; i < similitudes.length; i++) {
    document.getElementById('print_matriz').innerHTML = document.getElementById('print_matriz').innerHTML + "\nSimilitud usuario " + i + "," + similitudes[i].v + ": " + similitudes[i].valor
  }
  return similitudes
}
// Función que calcula la distancia euclidea
function distancia_euclidea(matriz, usu1) {
  let similitudes = []
  let aux = 0;
  for (let i = 0; i < matriz.length; i++) {
    if (i != usu1) {
      for (let j = 0; j < matriz[usu1].length; j++) {
        if (!faltantes_total.includes(j)) {
          aux = aux + Math.pow(matriz[usu1][j] - matriz[i][j], 2)
        }
      }
      let vec = {
        v: i,
        valor: Math.sqrt(aux)
      }
      aux = 0;
      similitudes.push(vec)
    }
  }
  for (let i = 0; i < similitudes.length; i++) {
    document.getElementById('print_matriz').innerHTML = document.getElementById('print_matriz').innerHTML + "\nSimilitud usuario " + i + "," + similitudes[i].v + ": " + similitudes[i].valor
  }
  return similitudes
}

// Calculamos la predicción Simple
function simple(matriz,usuario, item, num_vecinos) {

  let metrica = document.getElementById('metrica').value
  let similitudes = []
  let vecinos = []
  
  if (num_vecinos < 3) {
    alert("¡Debe elegir 3 vecinos como mínimo!");
    throw new Error();
  } else { 
      switch (metrica) {
        case '1':
          similitudes = correlacion_pearson(matriz,usuario)
          similitudes = similitudes.sort((a,b) => b.valor - a.valor)
          similitudes.splice(num_vecinos, similitudes.length)
          console.log(similitudes)
          for(let i  = 0; i < similitudes.length; i++) {
            vecinos[i] = similitudes[i].v
          }
          document.getElementById('print_matriz').innerHTML = document.getElementById('print_matriz').innerHTML + "\nVecinos elegidos " + vecinos
          break;

        case '2':
          similitudes = distancia_coseno(matriz,usuario)
          similitudes = similitudes.sort((a,b) => b.valor - a.valor)
          similitudes.splice(num_vecinos, similitudes.length)
          for(let i  = 0; i < similitudes.length; i++) {
            vecinos[i] = similitudes[i].v
          }
          document.getElementById('print_matriz').innerHTML = document.getElementById('print_matriz').innerHTML + "\nVecinos elegidos " + vecinos
          break;
          
        case '3':
          similitudes = distancia_euclidea(matriz,usuario)
          similitudes = similitudes.sort((a,b) => b.valor - a.valor)
          similitudes.splice(num_vecinos, similitudes.length)
          for(let i  = 0; i < similitudes.length; i++) {
            vecinos[i] = similitudes[i].v
          }
          document.getElementById('print_matriz').innerHTML = document.getElementById('print_matriz').innerHTML + "\nVecinos elegidos " + vecinos
          break;
          
      }
    }

    let aux = 0;
    let aux2 = 0;
    for (let i = 0; i < num_vecinos; i++) {
      if (matriz[similitudes[i].v][item].trim() != "-") {
        aux =  aux + similitudes[i].valor * matriz[similitudes[i].v][item]
        aux2 = aux2 + Math.abs(similitudes[i].valor)
      }
    }
    let prediccion = aux/aux2
    
    prediccion = prediccion.toFixed(2)
    document.getElementById('print_matriz').innerHTML = document.getElementById('print_matriz').innerHTML + "\nPrediccion del valor " + usuario + "," + item + ": " + prediccion
    return prediccion
  
}

// Calculamos la prediccion de la diferencia con la media
function diferencia_media(matriz,usuario, item, num_vecinos) {
  let metrica = document.getElementById('metrica').value
  let medias = calcular_media(matriz)
  switch (metrica) {
    case '1':
      similitudes = correlacion_pearson(matriz,usuario)
      similitudes = similitudes.sort((a,b) => b.valor - a.valor)
      similitudes.splice(num_vecinos, similitudes.length)
      console.log(similitudes)
      for(let i  = 0; i < similitudes.length; i++) {
        vecinos[i] = similitudes[i].v
      }
      document.getElementById('print_matriz').innerHTML = document.getElementById('print_matriz').innerHTML + "\nVecinos elegidos " + vecinos
      break;

    case '2':
      similitudes = distancia_coseno(matriz,usuario)
      similitudes = similitudes.sort((a,b) => b.valor - a.valor)
      similitudes.splice(num_vecinos, similitudes.length)
      break;
      
    case '3':
      similitudes = distancia_euclidea(matriz,usuario)
      similitudes = similitudes.sort((a,b) => b.valor - a.valor)
      similitudes.splice(num_vecinos, similitudes.length)
      break;
      
  }
  // Calculamos la formula
    let aux = 0;
    let aux2 = 0;
    for (let i = 0; i < num_vecinos; i++) {
      if (matriz[similitudes[i].v][item].trim() != "-") {
        aux =  aux + similitudes[i].valor * (matriz[similitudes[i].v][item] - medias[i])
        aux2 = aux2 + Math.abs(similitudes[i].valor)
      }
    }
    let prediccion = aux/aux2
    prediccion = prediccion.toFixed(2)
    document.getElementById('print_matriz').innerHTML = document.getElementById('print_matriz').innerHTML + "\nPrediccion del valor " + usuario + "," + item + ": " + prediccion
    return prediccion
}

function cal_similitudes (){
  let metrica = document.getElementById('metrica').value
  similitudes = []
  let aux = []

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
  for (let i = 0; i < matriz.length; i++) {
    document.getElementById('print_matriz').innerHTML = document.getElementById('print_matriz').innerHTML + "\nUsuario " + (i+1)
    for (let j = 0; j < similitudes[0].length; j++) {
      document.getElementById('print_matriz').innerHTML = document.getElementById('print_matriz').innerHTML + "\r\n" + "Vecino " + (j+1) + ": " + similitudes[i][j]
    }
  }
}

// Función principal que muestra el sistema de recomendación escogido
function main() {
// Comprobamos si la matriz se ha recogido del fichero correctamente
  if (matriz.length == 0) { 
    alert("No ha sido posible procesar la matriz")
    throw new Error()
  } else {
    for (let i = 0; i < matriz.length; i++) {
      for (let j = 0; j < matriz[i].length; j++) {
        if (matriz[i][j].trim() == '-') {
          if (!faltantes_total.includes(j)) {
            faltantes_total.push(j)
          }
        }
      }
    }
    faltantes_total = faltantes_total.sort((a,b) => a-b)

    
    let pred = document.getElementById('tipo_prediccion').value
    let n_vecinos = document.getElementById('vecinos').value
    let r_matriz = matriz;
    for(let i = 0; i < matriz.length; i++) {
      for (let j = 0; j < matriz[0].length; j++) {
        if (matriz[i][j].trim() == '-') {
          switch (pred) {
            case "1":
              r_matriz[i][j] = simple(matriz, i, j, n_vecinos)
              console.log(r_matriz)
              break;
            case "2":
              r_matriz[i][j] = diferencia_media(matriz, i, j, 3)
              console.log(r_matriz)
              break;
          }
        }
      }
    }
    document.getElementById('print_matriz').innerHTML = document.getElementById('print_matriz').innerHTML + "\nMatriz resuelta:"
    for(let i = 0; i < matriz.length; i++) {
      for (let j = 0; j < matriz[0].length; j++)
        r_matriz[i][j] = r_matriz[i][j].trim()
    }
    for(let i = 0; i < matriz.length; i++) {
      document.getElementById('print_matriz').innerHTML = document.getElementById('print_matriz').innerHTML + "\n" + r_matriz[i]
    }
  }
}