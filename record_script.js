google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawChart);

function drawChart() {

  let dataSet = [];
  let indices = localStorage.getItem("indices");
  for(let i=0;i<indices;i++){
    dataSet[i]=[];
    let set = localStorage.getItem(i);
    set = JSON.parse(set);
    dataSet[i][0]=Number(set.timeStamp.substr(12).replaceAll(":",""));
    dataSet[i][1]=Number(set.rating);
  }
  dataSet.unshift(['Time', 'Difficulty Rate']);
    // Set Data
    const data = google.visualization.arrayToDataTable(dataSet);
    // Set Options
    const options = {
      title: 'Rate vs Time',
      hAxis: {title: 'Time in HHMMSS'},
      vAxis: {title: 'Difficulty Rate'},
      legend: 'none'
    };
    // Draw Chart
    const chart = new google.visualization.LineChart(document.getElementById('myChart1'));
    chart.draw(data, options);
}
//table
const table = document.querySelector("#dataRecord");
let recordInd = 1;
if(localStorage.getItem("indices")!=null){
  function setUp(){
      for(let i=0;i<localStorage.getItem("indices");i++){
          let value = localStorage.getItem(i);
          value = JSON.parse(value);
          table.innerHTML+=`<tr><td>${recordInd++}</td><td>${value.timeStamp}</td><td>${value.rating}</td></tr>`;
      }
  }
  setUp();
}

//pain diagram
let pain = [];
for(let i=0;i<8;i++){
  pain[i]=[];
  for(let j=0;j<4;j++){
    pain[i][j]=0;
  }
}
let max=0;
for(let i=0;i<8;i++){
  for(let j=0;j<4;j++){
    for(let k=0;k<localStorage.getItem("indices");k++){
      let d = localStorage.getItem(k);
      d = JSON.parse(d);
      for(let l=0;l<d.location.length;l++){
        let x=Number(d.location[l].substr(0,1))-1;
        let y=Number(d.location[l].substr(1))-1;
        if(x==i && y==j){
          pain[i][j]++;
        }
      }
    }
  }
}
for(let i=0;i<8;i++){
  for(let j=0;j<4;j++){
    if(pain[i][j]>max){
      max=pain[i][j];
    }
  }
}
let rgb;
//more the green more the orange
let ratio = 2/max;

for(let i=0;i<8;i++){
  for(let j=0;j<4;j++){
    let ratio =1 - pain[i][j]/max;
    ratio = ratio * 200;
    rgb = Math.round(ratio);
    document.querySelector(`#bp${j+1}${i+1}`).style.border = `5px solid rgb(255,${rgb},0)`;
  }
}

// Draw
const chart = new google.visualization.BarChart(document.getElementById('myChart1'));
chart.draw(data, options);
