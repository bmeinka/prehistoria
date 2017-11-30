function rng() {
	var n = Math.random();
	console.log("Rolled " + Math.floor(n * 100));
	return n;
}

function get_num_items(player) {
	var item_count = data.base_effects.item_count;
	console.log("Rolling for item count");
	var n = Math.floor(rng() * item_count.max) + item_count.min;
	console.log("Got " + n + " items");
	player.extra_item.forEach(function(item, index, arr) {
		console.log("Rolling for an extra item with a " + item * 100 + "% chance");
		if (rng() > (1.00 - item)) {
			console.log("Got an extra item");
			n++;
		}
	});
	console.log("Giving " + n + " items!");
	return n;
}

function get_loot(player) {
	var loot = {items: [], encounters: []};
	var item_count = get_num_items(player);
	return loot;
}

function get_player_info() {
	var info = {
		condition: [],
		companion: 0,
		blessing: [],
		primal: [],
		tack: [],
		valid: function(item) {
			if ("requires" in item)
				return this.condition.includes(item.requires);
			return true;
		},
		value: function(effect) {
			if ("companion" in effect) {
				if (effect.companion) return effect.value * this.companion;
				else if (this.companion > 0) return 0;
			}
			return effect.value;
		}
	};

	["condition", "blessing", "primal", "tack"].forEach(function(name) {
		document.getElementsByName(name).forEach(function(item) {
			if (item.checked) info[name].push(item.value);
		});
	});

	console.log(info);
	return info;
}

function get_player() {
	var info = get_player_info();
	var player = {
		companion: 0,
		extra_item: [],
		add_effect: function(effect) {
			var v = info.value(effect);
			if (effect.effect == "extra_item")
				this.extra_item.push(v);
		}
	};
	//if (info.blessing in data.blessing && info.valid(data.blessing[info.blessing]))
	//	player.add_effect(data.blessing[info.blessing]);

	["blessing", "primal", "tack"].forEach(function(name) {
		info[name].forEach(function(item) {
			if (item in data[name] && info.valid(data[name][item]))
				player.add_effect(data[name][item]);
		});
	});

	// TODO companion count
	// TODO: traits

	console.log(player);
	return player;
}

function get_output(player, loot) {
	return "TODO: Format Output";
}

function roll() {
	var player = get_player();
	var loot = get_loot(player);
	document.getElementById("result").innerHTML = get_output(player, loot);
}
