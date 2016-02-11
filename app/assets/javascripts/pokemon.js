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
			function displayTypes (arrayOfTypes) {
				if (arrayOfTypes[1] == undefined) {
					return arrayOfTypes[0].name
				} else {
					console.log(arrayOfTypes[0].name)
					return arrayOfTypes[0].name + " and " + arrayOfTypes[1].name
				}	
			}
		$.ajax({
			url: 'http://pokeapi.co' + self.info.sprites[0].resource_uri,

			success: function (response) {
				var image = response.image
				$('.js-pkmn-sprites').html(`<img src="http://pokeapi.co${image}">`);
			}
		});
	// description request
		// $.ajax({
		// 		url: 'http://pokeapi.co' + self.info.description,
		// 		success: function (response) {
		// 			console.log(response);
		// 			// $('.js-pkmn-sprites').html(`<img src="http://pokeapi.co${image}">`);
		// 		}

		// });

			$('.js-pkmn-name').text(self.info.name);
			$('.js-pkmn-number').text(self.info.pkdx_id);
			$('.js-pkmn-height').text(self.info.height);
			$('.js-pkmn-weight').text(self.info.weight);
			$('.js-pkmn-hp').text(self.info.hp);
			$('.js-pkmn-attack').text(self.info.attack);
			$('.js-pkmn-defense').text(self.info.defense);
			$('.js-pkmn-sp_atk').text(self.info.sp_atk);
			$('.js-pkmn-sp_def').text(self.info.sp_def);
			$('.js-pkmn-speed').text(self.info.speed);
			$('.js-pkmn-types').text(displayTypes(self.info.types));

			$(".js-pokemon-modal").modal("show");
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