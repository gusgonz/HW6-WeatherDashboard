// open weather apikey 7ed6e592c87c5c5e7c239aee3ee410d9

// Algolia third-party api for the searchbar
var placesAutocomplete = places({
	appId: 'plHJ3V77N7R0',
	apiKey: '15c839632d2df1c8823fe9d3cd8988f5',
	container: document.querySelector('#address-input')
});

placesAutocomplete.on('change', (e) => {
	// saving the input object in a variable
	var inputObject = e.suggestion;
	console.log(inputObject);

	// grabbing city name and country code from the input
	var cityName = inputObject.name;
	console.log(cityName);
});
