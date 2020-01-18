// open weather apikey 7ed6e592c87c5c5e7c239aee3ee410d9

// Algolia third-party api for the searchbar
var placesAutocomplete = places({
	appId: 'plHJ3V77N7R0',
	apiKey: '15c839632d2df1c8823fe9d3cd8988f5',
	container: document.querySelector('#address-input')
});

function currentWeather(cityName) {
	var queryURL =
		'http://api.openweathermap.org/data/2.5/weather?q=' +
		cityName +
		'&APPID=7ed6e592c87c5c5e7c239aee3ee410d9&units=imperial';

	$.ajax({
		url: queryURL,
		method: 'GET'
	}).then(function(response) {
		// console.log(response);

		var temp = response.main.temp;
		var humidity = response.main.humidity;
		var windSpeed = response.wind.speed;

		// console.log(temp, humidity, windSpeed);

		$('#temp').text(temp + ' ' + String.fromCharCode(176) + 'F');
		$('#humidity').text(humidity + '%');
		$('#wind-speed').text(windSpeed + ' mph');
	});
}

function fivedayForecast(cityName) {
	var queryURL2 =
		'http://api.openweathermap.org/data/2.5/forecast?q=' +
		cityName +
		'&APPID=7ed6e592c87c5c5e7c239aee3ee410d9&units=imperial';

	$.ajax({
		url: queryURL2,
		method: 'GET'
	}).then(function(response) {
		console.log(response);

		for (var i = 0; i < 5; i++) {
			var index = i * 8;
			var temp = response.list[index].main.temp;
			console.log(temp);
		}
	});
}

placesAutocomplete.on('change', (e) => {
	// saving the input object in a variable
	var inputObject = e.suggestion;
	console.log(inputObject);

	// grabbing city name and country code from the input
	var cityName = inputObject.name;
	console.log(cityName);

	currentWeather(cityName);
	fivedayForecast(cityName);
});
