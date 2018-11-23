fetch('http://merva-online.herokuapp.com/logs.json')
  .then((res) => {
    return res.json();
  })
  .then((resJson) => {
    var datos = resJson;
    console.log(datos);  // DEBUG
    var temps_1 = [];
    var labels_1 = [];
    var temps_2 = [];
    var labels_2 = [];
    var temps_3 = [];
    var labels_3 = [];
    for (let log of datos) {
      if (log.termografo_id == 1) {
        temps_1.push({ x: log.creado, y: log.temp });
        labels_1.push(log.creado);
      } else if (log.termografo_id == 2) {
        temps_2.push({ x: log.creado, y: log.temp });
        labels_1.push(log.creado);
      } else if (log.termografo_id == 3) {
        temps_3.push({ x: log.creado, y: log.temp });
        labels_1.push(log.creado);
      }
    }
    // configuracion de datos de chart.js
    const data = {
      labels: labels_1,
      datasets: [
                 { label: 'CESAC 37', backgroundColor: 'red', data: temps_1, fill: false, borderColor: 'red' },
                 { label: 'CESAC 13', backgroundColor: 'blue', data: temps_2, fill: false, borderColor: 'blue' },
                 { label: 'CESAC 5', backgroundColor: 'green', data: temps_3, fill: false, borderColor: 'green' },
                ]
    };

    // config del grafico de chart.js
    const options = {
      legend: { display: true},
      title: {
        display: true, text: 'Grafico de temperaturas'
      },
      scales: {
        xAxes: [{
          //type: 'time',
          //time: { unit: 'second' },
          //distribution: 'linear',
          scaleLabel: { display: true, labelString: 'Tiempo' },
          ticks: { beginAtZero: true, min: 0}

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
