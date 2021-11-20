console.log("js started");

const temp = document.getElementsByClassName("temp")[0];
const humidity = document.getElementsByClassName("humidity")[0];
const lastReadingData = document.getElementsByClassName("lastReadingData")[0];

console.log(temp.textContent)
/* Fetch from API server*/


/*Get location selection from DOM*/
        const locationSelection = ((value)=>{
            console.log(value);
            fetchSelectedLocation(value)
        })
 
        
        /*Translation layer*/
        const fetchSelectedLocation = (value)=>{
            let locations = { lr: "https://climate-api.zohar-hadari.com:3000/zones/livingrooms%20-l", os: "https://climate-api.zohar-hadari.com:3000/zones/outsides%20-l"}
            console.log('fetch', value);
            console.log(value);
            console.log(locations.value);
            console.log('[]',locations[value]);

            const apiCall = locations[value];
            fetchFuntion(apiCall);
        }
       
        /*fetch results*/

      const  fetchFuntion = (apiCall)=>{
            var requestOptions = {
                method: 'GET',
                redirect: 'follow'
              };
              
            
              fetch(apiCall, requestOptions)
                .then(response => response.text())
                .then(result => console.log(result) + update(result))
                .catch(error => console.log('error', error));
            

        }
      /*Defult location reading*/
        locationSelection('os');
        
/*Update DOM*/
    update =((result)=>{
      console.log(result);
        show = JSON.parse(result);
        result.json
        lastReadingData.textContent = show[0].time;
        temp.textContent = show[0].C;
        humidity.textContent = show[0].H;
        console.log(temp.textContent);
    })



  //Chart
  const ctx = document.getElementById('myChart').getContext('2d');


//fetch results
var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };
  
  fetch("https://climate-api.zohar-hadari.com:3000/zones/livingrooms", requestOptions)
    .then(response => response.text())
    .then(result => console.log(result) + writeChartData(result))
    .catch(error => console.log('error', error));

    const writeChartData = (result) => {
         console.log(result);
         show = JSON.parse(result);
         for( i in show) {
            labels.push(show[i].time);
            data.datasets[0].data.push(show[i].C);
            data.datasets[1].data.push(show[i].H);
          }
          console.log("stop popuating");
          draw();
    };




let delayed;


//Gradient fill
let gradient = ctx.createLinearGradient(0, 0, 0, 400);
gradient.addColorStop(0, 'rgb(58,124,213, 1)')
gradient.addColorStop(1, 'rgb(0,210,255, 0.3)')

const labels = [
    
];

const data = {
    labels,
    datasets: [
        {
        data:[],
        label: "Temp",
        fill: true,
        backgroundColor: gradient,
        borderColor: "#fff",
        pointBackgroundColor: "red",
        tension: 0.3,
        
    },
    {
    label: 'Humidity',
    data:[],
    }
],
};


const config = {
    type: "line",
    data: data,
    options: {
 
      plugins: {
        legend: {
            labels: {
                color: 'white',
                fontColor: 'white'
            }
        }
      },
        hitRadius: 30,
        responsive: true,
   
       /* animation: {
            onComplete: () => {
              delayed = true;
            },
            delay: (context) => {
              let delay = 0;
              if (context.type === 'data' && context.mode === 'default' && !delayed) {
                delay = context.dataIndex * 300 + context.datasetIndex * 100;
              }
              return delay;
            },
          },*/
        scales: {
            Y: {
                /*ticks: {
                  callback: function(value){
                      return '$'+ value + "M";
                  }
                },
                beginAtZero: false,*/
            }
        }
    },
};

const draw = ()=>{
    const myChat = new Chart(ctx, config);  
};
