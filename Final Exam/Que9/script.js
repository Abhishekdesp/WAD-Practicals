let weatherData={
    "pune":{temp:30,humudity:60,condition:"Sunny"},
    "mumbai":{temp:27,humudity:80,condition:"Humid"},
    "solapur":{temp:35,humudity:40,condition:"Hot"},
};

function getWeather(){
    let city=document.getElementById("city").value.toLowerCase();

    let xhr=new XMLHttpRequest();
    xhr.open('GET',"data.json",true);

    xhr.onload=function(){
        let result=document.getElementById("result");

        if(weatherData[city]){
            let data=weatherData[city];
            result.innerHTML=`Temperature:${data.temp}C<br>
                              Humidity:${data.humudity}<br>
                              Condition:${data.condition}<br>`
        }
        else
        {
            result.innerHTML="City not found";
        }
    };

    xhr.send();
}