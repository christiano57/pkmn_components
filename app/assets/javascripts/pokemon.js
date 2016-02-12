// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.

$(document).on("ready", function () {
	$(".js-show-pokemon").on("click", function (event) {
		var $button = $(event.currentTarget);
		var pokemonUri = $button.data("pokemon-uri");

		var pokemon = new PokemonApp.Pokemon(pokemonUri);
		pokemon.render();
	});
});


PokemonApp.Pokemon = function (pokemonUri) {
	this.id = PokemonApp.Pokemon.idFromUri(pokemonUri);
};

PokemonApp.Pokemon.prototype.render = function() {
	console.log("Rendering pokemon: #" + this.id);
	var self = this;
	$.ajax({
		url: '/api/pokemon/' + this.id,
		success: function (response) {
			self.info = response;
			console.log("Pokemon info:");
			console.log(response);
		getSprite(self.info);
		showModal(self.info);
		showDescription(self.info);
	},
		error: function () {
			alert("this is an error");
		}
	});
}


PokemonApp.Pokemon.idFromUri = function (pokemonUri) {
	var uriSegments = pokemonUri.split("/");
	var secondLast = uriSegments.length - 2;
	return uriSegments[secondLast];
};

function showDescription (self) {
	var arrOfDescripUri = []
	self.descriptions.forEach( function(description) {
		arrOfDescripUri.push(description.resource_uri)
	})
	var sortedDescriptions = arrOfDescripUri.sort();
	var descriptionToShow = sortedDescriptions[sortedDescriptions.length - 1]
	// console.log(descriptionToShow);

		$.ajax({
				url: 'http://pokeapi.co' + descriptionToShow,
				success: function (response) {
					console.log(response);
					$('.js-pkmn-description').text(response.description);
				}
		});
}
function getSprite (self) {
	$.ajax({
		url: 'http://pokeapi.co' + self.sprites[0].resource_uri,

		success: function (response) {
			var image = response.image
			$('.js-pkmn-sprites').html(`<img src="http://pokeapi.co${image}">`);
		}
	});
}

function displayTypes (arrayOfTypes) {
	if (arrayOfTypes[1] == undefined) {
		return arrayOfTypes[0].name
	} else {
		console.log(arrayOfTypes[0].name)
		return arrayOfTypes[0].name + " and " + arrayOfTypes[1].name
	}	
}

function showModal(self) {

	$('.js-pkmn-name').text(self.name);
	$('.js-pkmn-number').text(self.pkdx_id);
	$('.js-pkmn-height').text(self.height);
	$('.js-pkmn-weight').text(self.weight);
	$('.js-pkmn-hp').text(self.hp);
	$('.js-pkmn-attack').text(self.attack);
	$('.js-pkmn-defense').text(self.defense);
	$('.js-pkmn-sp_atk').text(self.sp_atk);
	$('.js-pkmn-sp_def').text(self.sp_def);
	$('.js-pkmn-speed').text(self.speed);
	$('.js-pkmn-types').text(displayTypes(self.types));
	$(".js-pokemon-modal").modal("show");
}
