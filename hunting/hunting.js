function rng() {
	return Math.random();
}

function rng_choice(options) {
	var sum = 0;
	options.forEach(function(option) { sum += option.chance; });
	var factor = 1 / sum;
	var n = 1.00;
	var choice = rng();
	for (var i = options.length - 1; i >= 0; --i) {
		var v = options[i].chance * factor;
		if (choice > (n - v))
			return options[i].value;
		n -= v;
	}
	console.log("ERROR: somehow we didn't return a valid choice!");
	return options[0].value;
}

function get_num_items(player) {
	var item_count = data.base_effects.item_count;
	var n = Math.floor(rng() * item_count.max) + item_count.min;
	player.extra_item.forEach(function(item, index, arr) {
		if (rng() > (1.00 - item)) {
			n++;
		}
	});
	return n;
}

function get_common_item(player) {
	var chance = 1.00;
	["encounter", "exotic", "rare", "uncommon", "not_common"].forEach(function(i) {
		chance -= player.rates[i];
	});
	return (rng() < chance)
}

function get_uncommon_item(player) {
	var options = [];
	["uncommon", "rare", "exotic", "encounter"].forEach(function(n) {
		options.push({ value: n, chance: player.rates[n] });
	});
	return rng_choice(options);
}

function get_item_type(player) {
	var type = "unknown";
	if (get_common_item(player))
		type = "common";
	else {
		type = get_uncommon_item(player);
	}
	return type;
}

function get_encounter(player) {
	return encounters[Math.floor(rng() * encounters.length)];
}

function get_item(type, player) {
	return items[type][Math.floor(rng() * items[type].length)];
}

function get_loot(player) {
	var loot = {items: [], encounters: []};
	var item_count = get_num_items(player);
	for (var i = 0; i < item_count; ++i) {
		var type = get_item_type(player);
		if (type == "encounter")
			loot.encounters.push(get_encounter(player));
		else
			loot.items.push(get_item(type, player));
	}
	// cubs, beads
	return loot;
}

function get_player_info() {
	var info = {
		companion: 0,
		condition: [],
		blessing: [],
		primal: [],
		trait: [],
		tack: [],
		valid: function(item) {
			if ("requires" in item)
				return this.condition.includes(item.requires);
			return true;
		},
		value: function(effect) {
			if ("companion" in effect) {
				if (effect.companion == "multiply")
					return effect.value * this.companion;
				if (effect.companion == "include")
					return effect.value * (this.companion + 1);
				if (effect.companion == "negate")
					if (this.companion > 0) return 0;
			}
			return effect.value;
		}
	};

	info.companion = parseInt(document.getElementsByName("companion")[0].value);

	["condition", "blessing", "primal", "trait", "tack"].forEach(function(name) {
		document.getElementsByName(name).forEach(function(item) {
			if (item.checked) info[name].push(item.value);
		});
	});

	console.log(info);
	return info;
}

function add_weight(weights, effect, value) {
	var group = data.weight[effect.group];
	["common", "uncommon", "rare", "exotic", "encounter"].forEach(function(type) {
		if (type in group) {
			group[type].forEach(function(i) {
				if (!weights[type][i])
					weights[type][i] = 1.00;
				weights[type][i] += value;
			});
		}
	});
}

function get_player() {
	var info = get_player_info();
	var player = {
		extra_item: [],
		rates: {
			encounter: data.base_rates.encounter,
			exotic: data.base_rates.exotic,
			rare: data.base_rates.rare,
			uncommon: data.base_rates.uncommon,
			not_common: 0.00
		},
		weights: {
			common: [],
			uncommon: [],
			rare: [],
			exotic: [],
			encounter: [],
		},
		add_effect: function(effect) {
			var v = info.value(effect);
			if (effect.effect == "extra_item")
				this.extra_item.push(v);
			if (effect.effect == "not_common")
				this.rates.not_common += v;
			if (effect.effect == "rare")
				this.rates.rare += v;
			if (effect.effect == "exotic")
				this.rates.exotic += v;
			if (effect.effect == "encounter")
				this.rates.encounter += v;
			if (effect.effect == "weight")
				add_weight(this.weights, effect, v);
			// weights
			// beads
			// double
			// cubs
		}
	};

	["common", "uncommon", "rare", "exotic"].forEach(function(type) {
		for (var i = 0; i < items[type].length; ++i)
			player.weights[type][i] = 1.00;
	});
	for (var i = 0; i < encounters.length; ++i)
		player.weights.encounter[i] = 1.00;

	["blessing", "primal", "trait", "tack"].forEach(function(name) {
		info[name].forEach(function(item) {
			if (item in data[name] && info.valid(data[name][item]))
				player.add_effect(data[name][item]);
		});
	});

	console.log(player);
	return player;
}

function get_output(player, loot) {
	var out = "";
	loot.items.forEach(function(item) {
		out += ":thumb" + item + ":";
	});
	loot.encounters.forEach(function(encounter) {
		out += "\n\n" + encounter;
	});
	return out;
}

function roll() {
	var player = get_player();
	var loot = get_loot(player);
	document.getElementById("result").innerHTML = get_output(player, loot);
}
