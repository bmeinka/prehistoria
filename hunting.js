var item_classes = ["exotic", "encounter", "rare", "uncommon", "common"];
var item_data = {
	common: [692155725, 692155733, 696851410, 688815084, 696851245, 692155738, 695683108, 714394111, 714394107],
	uncommon: [692155722, 692155730, 696852253, 696851734, 696851973, 692155740, 692155743],
	rare: [688402076, 688811667, 688811665, 688811679, 688811676, 688818335, 695683103],
	exotic: [688402080, 692155720, 695683106, 696852338, 696852465, 713651989]
};
//"Something scampers up to you. A tiny cub, lost and afraid refuses to leave your side. Maybe you could give it a home. (Companion Awarding)"
//"Angry growls erupt from behind you as you're confronted by a fearsome lion. Her fur bristles and her muscles tense as she slowly, but defensively approaches. How do you react?"
//"The hunter becomes the hunted. A massive sabertooth has been tracking you silently for miles, waiting for the right time to strike. Are you aware of the danger, or are you ambushed?"
//"Tiny whines sound from behind a patch of tall grass. You peek behind and find a small surprise staring up at you, hungry and dangerously alone. It looks like its mother had been killed and the only one from its litter to survive. You take pity on the small hyaenodon and bring it home. (Companion Awarding)"
//"As you stalk through the tall grass, tiny claws dig into your back and high pitched screech-squawks fill your ears. A tiny terror bird has decided to join your hunt, and also your pack it seems... (Companion Awarding)"
var encounter_data = [
"Something scampers up to you. A tiny cub, lost and afraid refuses to leave your side. Maybe you could give it a home.",
"Angry growls erupt from behind you as you're confronted by a fearsome lion. Her fur bristles and her muscles tense as she slowly, but defensively approaches. How do you react?",
"The hunter becomes the hunted. A massive sabertooth has been tracking you silently for miles, waiting for the right time to strike. Are you aware of the danger, or are you ambushed?",
"Tiny whines sound from behind a patch of tall grass. You peek behind and find a small surprise staring up at you, hungry and dangerously alone. It looks like its mother had been killed and the only one from its litter to survive. You take pity on the small hyaenodon and bring it home.",
"As you stalk through the tall grass, tiny claws dig into your back and high pitched screech-squawks fill your ears. A tiny terror bird has decided to join your hunt, and also your pack it seems..."
];

function random_choice(l) {
	return l[Math.floor(Math.random() * l.length)];
}

function get_chances(p) {
	var chances = {
		exotic: 0.02,
		encounter: 0.05,
		rare: 0.13,
		uncommon: 0.20
	};
	return chances;
}

function get_threshold(chances, target) {
	var m = 1.0
	switch (target) {
		case "common":
			return 0.0;
		case "uncommon":
			m -= chances.uncommon;
		case "rare":
			m -= chances.rare;
		case "encounter":
			m -= chances.encounter;
		case "exotic":
			m -= chances.exotic;
		default:
			return m;
	}
}

function get_item_class(p) {
	var n = Math.random();
	var chances = get_chances(p);
	for (var i = 0; i < item_classes.length; i++)
		if (n > get_threshold(chances, item_classes[i]))
			return item_classes[i];
}

function get_item(p) {
	var c = get_item_class(p);
	if (c === "encounter") return c;
	var item_id = random_choice(item_data[c]);
	return ":thumb" + item_id + ":";
}

function get_num_items(p) {
	var max_items = 4;
	// if p has umbru's familiar, max_items++
	// if p has black cat, max_items++
	return Math.floor(Math.random() * max_items) + 1;
}

function get_items(p) {
	var loot = {items: [], encounters: []};
	var item_count = get_num_items(p);
	for (var i = 0; i < item_count; i++) {
		var item = get_item(p);
		if (item == "encounter")
			loot.encounters.push(random_choice(encounter_data));
		else
			loot.items.push(item);
	}
	return loot;
}

function get_player_info() {
	return {
		deity_blessing: document.getElementById("deity-blessing").selectedOptions[0].value
	};
}

function roll() {
	// TODO calculate the player object
	var p = get_player_info();
	console.log(p.deity_blessing);
	var loot = get_items(p);
	document.getElementById("result").innerHTML = loot.items.join("") + "\n\n" + loot.encounters.join("\n\n");
}
