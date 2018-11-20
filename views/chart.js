fetch('http://localhost:3000/logs.json')
  .then((res) => {
    return res.json();
  })
  .then((resJson) => {
    var datos = resJson;
    console.log(datos);  // DEBUG
    var temps = [];
    var labels = [];
    for (let log of datos) {
      temps.push({ x: log.creado, y: log.temp });
      labels.push(log.creado);
    }
    // configuracion de datos de chart.js
    const data = {
      labels: labels,
      datasets: [{ data: temps, fill: false, borderColor: 'red' }]
    };
    // config del grafico de chart.js
    const options = {
      legend: { display: false },
      title: {
        display: true, text: 'Grafico de temperaturas'
      },
      scales: {
        xAxes: [{
          scaleLabel: { display: true, labelString: 'Tiempo' },
          ticks: { beginAtZero: true, min: 0 }
        }],
        yAxes: [{
          scaleLabel: { display: true, labelString: 'Temperatura' },
          ticks: { beginAtZero: true, min: 0 }
        }]
      }
    };
    // el canvas de html5 donde va a ir el grafico
    var canvas = document.getElementById('chart').getContext('2d');
    // aca es donde usamos chart.js para crear el grafico y ponerlo en el canvas
    var grafico = new Chart(canvas, {
      type: 'line',
      data: data,
      options: options
    }); // cierre de new Chart
  });   // cierre de then(jstr) y de fetch
