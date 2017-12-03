var data = {
	base_rates: {
		encounter: 0.05,
		exotic: 0.02,
		rare: 0.13,
		uncommon: 0.20,
	},
	weight: {
		companions: { encounter: [0, 3, 4] },
		bags: { uncommon: [3], exotic: [1, 3] },
		coins: { exotic: [0] },
		shards: { exotic: [5] },
	},
	base_effects: {
		item_count: { min: 1, max: 4 },
	},
	blessing: {
		umbru: { effect: "extra_item", value: 0.50, requires: "night" },
		hasswei: {},
		mamota: { effect: "rare", value: 0.10 },
	},
	primal: {
		queens_love: {}, // TODO cubs
		night_fall: { effect: "rare", value: 0.05, requires: "night", companion: "include" },
		sun_chaser: { effect: "extra_item", value: 0.10, companion: "multiply" },
		snow_wanderer: { effect: "rare", value: 0.10, requires: "snow", companion: "multiply" },
		plains_prowler: { effect: "rare", value: 0.05, companion: "multiply" },
		protector_of_the_forest: { effect: "rare", value: 0.10, requires: "forest", companion: "multiply" },
	},
	trait: {
		accident_prone: { effect: "encounter", value: 0.05 },
		befriender: { effect: "weight", value: 0.03, group: "companions" },
		fortunes_favor: { effect: "beads", value: 0.05, min: 100, max: 600},
		survivor: { effect: "exotic", value: 0.03 },
		loner: { effect: "not_common", value: 0.10, companion: "negate" },
		quick_learner: { effect: "weight", value: 0.05, group: "shards" },
		treasure_hunter: { effect: "weight", value: 0.02, group: "coins" },
		legendary_resilience: { effect: "not_common", value: 0.05 },
	},
	tack: {
		claw_of_the_great_hunt: { effect: "not_common", value: 0.05 },
		horn_of_beasts: { effect: "weight", value: 0.03, group: "companions" },
		sharpened_spear: { effect: "not_common", value: 0.05 },
		hide_wrapped_quiver: { effect: "not_common", value: 0.03 },
		hyaenodon: { effect: "not_common", value: 0.05 },
		dodo: { effect: "weight", value: 0.02, group: "coins" },
		pygmy_onyc: { effect: "weight", value: 0.05, group: "bags" },
		umbrus_familiar: { effect: "extra_item", value: 1.00 },
		spectral_trilobite: { effect: "weight", value: 0.05, group: "shards" },
		black_cat: { effect: "extra_item", value: 1.00 },
	},
};
var items = {
	common: [ 692155725, 692155733, 696851410, 688815084, 696851245, 692155738, 695683108, 714394111, 714394107 ],
	uncommon: [ 692155722, 692155730, 696852253, 696851734, 696851973, 692155740, 692155743 ],
	rare: [ 688402076, 688811667, 688811665, 688811679, 688811676, 688818335, 695683103 ],
	exotic: [ 688402080, 692155720, 695683106, 696852338, 696852465, 713651989 ],
};
var encounters = [
	"Something scampers up to you. A tiny cub, lost and afraid refuses to leave your side. Maybe you could give it a home. (Companion Awarding)",
	"Angry growls erupt from behind you as you're confronted by a fearsome lion. Her fur bristles and her muscles tense as she slowly, but defensively approaches. How do you react?",
	"The hunter becomes the hunted. A massive sabertooth has been tracking you silently for miles, waiting for the right time to strike. Are you aware of the danger, or are you ambushed?",
	"Tiny whines sound from behind a patch of tall grass. You peek behind and find a small surprise staring up at you, hungry and dangerously alone. It looks like its mother had been killed and the only one from its litter to survive. You take pity on the small hyaenodon and bring it home. (Companion Awarding)",
	"As you stalk through the tall grass, tiny claws dig into your back and high pitched screech-squawks fill your ears. A tiny terror bird has decided to join your hunt, and also your pack it seems... (Companion Awarding)",
];
var output_template = ""; // TODO
