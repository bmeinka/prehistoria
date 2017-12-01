var data = {
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
	tack: {
		umbrus_familiar: { effect: "extra_item", value: 1.00 },
		black_cat: { effect: "extra_item", value: 1.00 },
	},
};
