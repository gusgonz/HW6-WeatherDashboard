// open weather apikey 7ed6e592c87c5c5e7c239aee3ee410d9

var recentSearches = [];

// Algolia third-party api for the searchbar
var placesAutocomplete = places({
	appId: 'plHJ3V77N7R0',
	apiKey: '15c839632d2df1c8823fe9d3cd8988f5',
	container: document.querySelector('#address-input')
});

function renderRecentSearches() {
	$('#recent-searches').empty();
	var local = localStorage.getItem('recent');

	// console.log(recentSearches);
	console.log(typeof local);

	if (local) {
		local = local.split(',');
		recentSearches = local;
		for (var i = 0; i < local.length; i++) {
			var newBtn = $('<button type="button" class="btn-block btn-light">' + local[i] + '</button>');
			$('#recent-searches').prepend(newBtn);
		}
	}
}

function addToLocalStorage(cityName) {
	// limiting to 10 most recent searches
	console.log(recentSearches);

	if (recentSearches.length === 10) {
		recentSearches.shift();
	}
	recentSearches.push(cityName);

	localStorage.setItem('recent', recentSearches);
	renderRecentSearches();
}

function uvIndex(lat, long) {
	var queryURL =
		'http://api.openweathermap.org/data/2.5/uvi?lat=' +
		lat +
		'&lon=' +
		long +
		'&APPID=7ed6e592c87c5c5e7c239aee3ee410d9&units=imperial';

	$.ajax({
		url: queryURL,
		method: 'GET'
	}).then(function(response) {
		// console.log(response);
		var uvi = response.value;

		$('#uv-index').text(uvi);
	});
}

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

		var lat = response.coord.lat;
		var long = response.coord.lon;

		uvIndex(lat, long);

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

			// icon
			var iconID = response.list[index].weather[0].icon;
			var iconSrc = 'https://openweathermap.org/img/wn/' + iconID + '@2x.png';
			var iconClass = '#day' + i + '-icon';
			$(iconClass).attr('src', iconSrc);

			// temp
			var temp = response.list[index].main.temp;
			var tempClass = '#day' + i + '-temp';
			$(tempClass).text(temp + ' ' + String.fromCharCode(176) + 'F');

			// humidity
			var humidity = response.list[index].main.humidity;
			var hClass = '#day' + i + '-humidity';
			$(hClass).text(humidity + '%');

			// date
			var date = response.list[index]['dt_txt'];
			// console.log(date);
			var month = date.substring(5, 7);
			var day = date.substring(8, 10);
			var year = date.substring(0, 4);
			// console.log(year);

			// date with regular us format
			date = month + '/' + day + '/' + year;

			var dateClass = '.day' + i + '-date';
			$(dateClass).text(date);
		}
	});
}

placesAutocomplete.on('change', function displayWeather(e) {
	// saving the input object in a variable
	var inputObject = e.suggestion;
	console.log(inputObject);

	// grabbing city name and country code from the input
	var cityName = inputObject.name;
	// console.log(cityName);
	addToLocalStorage(cityName);

	$('.results').fadeIn(1000);

	$('.name').text(cityName);

	currentWeather(cityName);

	fivedayForecast(cityName);
});

renderRecentSearches();

$('button').click(function() {
	var cityName = $(this).text();
	console.log(cityName);
	addToLocalStorage(cityName);

	$('.results').fadeIn(1000);

	$('.name').text(cityName);

	currentWeather(cityName);

	fivedayForecast(cityName);
});
