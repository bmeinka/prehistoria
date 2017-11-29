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
		conditions: [],
		blessing: "none",
		primal: [],
		tack: [],
		valid: function(item) {
			if ("requires" in item)
				return this.conditions.includes(item.requires);
			return true;
		}
	};

	document.getElementsByName("condition").forEach(function(item) {
		if (item.checked) info.conditions.push(item.value);
	});
	info.blessing = document.getElementsByName("blessing")[0].selectedOptions[0].value;

	document.getElementsByName("primal").forEach(function(item) {
		if (item.checked) info.primal.push(item.value);
	});

	document.getElementsByName("tack").forEach(function(item) {
		if (item.checked) info.tack.push(item.value);
	});
	console.log(info);
	return info;
}

function get_player() {
	var info = get_player_info();
	var player = {
		extra_item: [],
		add_effect: function(effect) {
			if ("extra_item" in effect) {
				this.extra_item.push(effect.extra_item);
			}
		}
	};
	// TODO companion count
	if (info.blessing in data.blessing && info.valid(data.blessing[info.blessing]))
		player.add_effect(data.blessing[info.blessing]);

	info.primal.forEach(function(item) {
		if (item in data.primal && info.valid(data.primal[item]))
			player.add_effect(data.primal[item]);
	});

	info.tack.forEach(function(item) {
		if (item in data.tack && info.valid(data.tack[item]))
			player.add_effect(data.tack[item]);
	});

	console.log(player);
	return player;
}

function get_output(player, loot) {
	return "TODO: Format Output";
}

function primal_limit() {
	var n = 0;
	var primals = document.getElementsByName("primal");
	primals.forEach(function(item) {
		item.disabled = false;
		if (item.checked) n++;
	});
	if (n > 3) {
		primals.forEach(function(item) { item.checked = false; });
	} else if (n == 3) {
		primals.forEach(function(item) {
			if (!item.checked)
				item.disabled = true;
		});
	}
}

function roll() {
	var player = get_player();
	var loot = get_loot(player);
	document.getElementById("result").innerHTML = get_output(player, loot);
}
