var data = {
	item_types: ["encounter", "exotic", "rare", "uncommon", "common"],
	base_rates: {
		encounter: 0.05,
		exotic: 0.02,
		rare: 0.13,
		uncommon: 0.20,
	},
	base_effects: {
		// cub, double, beads, chances, weights
		item_count: { min: 1, max: 4 },
	},
	blessing: {
		umbru: { requires: "night", effect: "extra_item", value: 0.50 },
	},
	primal: {
		sun_chaser: { effect: "extra_item", value: 0.10, companion: "multiply" },
	},
	trait: {
		loner: { effect: "not_common", value: 0.10, companion: "negate" },
	},
	tack: {
		claw_of_the_great_hunt: { effect: "not_common", value: 0.05 },
		sharpened_spear: { effect: "not_common", value: 0.05 },
		hide_wrapped_quiver: { effect: "not_common", value: 0.03 },
		hyaenodon: { effect: "not_common", value: 0.05 },
		umbrus_familiar: { effect: "extra_item", value: 1.00 },
		black_cat: { effect: "extra_item", value: 1.00 },
	},
};
