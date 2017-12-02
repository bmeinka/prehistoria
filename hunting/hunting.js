function log_roll(what_for, chance) {
	var chance_percent = Math.floor(chance * 100);
	console.log("Rolling for " + what_for + " with a " + chance_percent + "% chance");
}

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
		log_roll("an extra item", item);
		if (rng() > (1.00 - item)) {
			console.log("Got an extra item");
			n++;
		}
	});
	console.log("Giving " + n + " items!");
	return n;
}

function get_common_item(player) {
	var chance = 1.00;
	["encounter", "exotic", "rare", "uncommon", "not_common"].forEach(function(i) {
		chance -= player.rates[i];
	});
	log_roll("a common item", chance);
	return (rng() < chance)
}

function get_uncommon_item(player) {
	var chosen_type = false;
	var total = 0;
	var types = ["encounter", "exotic", "rare", "uncommon"];
	types.forEach(function(i) {
		total += player.rates[i];
	});
	console.log("Rolling for rarer item type");
	var r = rng() * total;
	types.forEach(function(type) {
		if (!chosen_type) {
			if (r > (total - player.rates[type]))
				chosen_type = type;
			else
				total -= player.rates[type];
		}
	});
	return chosen_type;
}

function get_item_type(player) {
	var type = "unknown";
	if (get_common_item(player))
		type = "common";
	else {
		type = get_uncommon_item(player);
	}
	console.log("got a(n) " + type + " item");
	return type;
}

function get_loot(player) {
	var loot = {items: [], encounters: []};
	var item_count = get_num_items(player);
	for (var i = 0; i < item_count; ++i) {
		loot.items.push(get_item_type(player));
	}
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
		add_effect: function(effect) {
			var v = info.value(effect);
			if (effect.effect == "extra_item")
				this.extra_item.push(v);
			if (effect.effect == "not_common")
				this.rates.not_common += v;
		}
	};

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
		out += ":" + item + ":";
	});
	return out;
}

function roll() {
	var player = get_player();
	var loot = get_loot(player);
	document.getElementById("result").innerHTML = get_output(player, loot);
}
