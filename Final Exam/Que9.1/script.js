let weatherData={
    "pune":{name:"pune",temperature:30},
    "mumbai":{name:"mumbai",temperature:20},
    "solapur":{name:"solapur",temperature:40}
};

function getWeather()
{
    let city=document.getElementById("city").value.toLowerCase();

    let xhr= new XMLHttpRequest();
    xhr.open("GET","data.json",true);

    xhr.onload=function(){
        let result=document.getElementById("result");
        if(weatherData[city]){
            let data=weatherData[city];
            result.innerHTML+=`
            name:${data.name}<br>
            Temperatur:${data.temperature}
            `;
        }
        else
        {
            result.innerHTML=`City not fount`;
        }
    };

    xhr.send();
}