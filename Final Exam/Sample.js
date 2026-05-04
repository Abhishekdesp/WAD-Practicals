// Local repository (data)
let weatherData = {
    "pune": { temp: 30, humidity: 60, condition: "Sunny" },
    "mumbai": { temp: 32, humidity: 70, condition: "Humid" },
    "delhi": { temp: 35, humidity: 50, condition: "Hot" }
};

function getWeather() {
    let city = document.getElementById("city").value.toLowerCase();

    // Simulating AJAX request
    let xhr = new XMLHttpRequest();

    xhr.open("GET", "data.json", true);

    xhr.onload = function () {
        let result = document.getElementById("result");

        if (weatherData[city]) {
            let data = weatherData[city];
            result.innerHTML = 
                `Temperature: ${data.temp}°C <br>
                 Humidity: ${data.humidity}% <br>
                 Condition: ${data.condition}`;
        } else {
            result.innerHTML = "City not found";
        }
    };

    xhr.send();
}