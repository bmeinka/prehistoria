var data = {
	item_types: ["encounter", "exotic", "rare", "uncommon", "common"],
	base_rates: {
		encounter: 0.05,
		exotic: 0.02,
		rare: 0.13,
		uncommon: 0.20,
	},
	base_effects: {
		// cub, double, beads, weights
		item_count: { min: 1, max: 4 },
	},
	blessing: {
		umbru: { effect: "extra_item", value: 0.50, requires: "night" },
		hasswei: {},
		mamota: { effect: "rare", value: 0.10 },
	},
	primal: {
		queens_love: {},
		night_fall: { effect: "rare", value: 0.05, requires: "night", companion: "include" },
		sun_chaser: { effect: "extra_item", value: 0.10, companion: "multiply" },
		snow_wanderer: { effect: "rare", value: 0.10, requires: "snow", companion: "multiply" },
		plains_prowler: { effect: "rare", value: 0.05, companion: "multiply" },
		protector_of_the_forest: { effect: "rare", value: 0.10, requires: "forest", companion: "multiply" },
	},
	trait: {
		accident_prone: {},
		befriender: {},
		fortunes_favor: {},
		survivor: {},
		loner: { effect: "not_common", value: 0.10, companion: "negate" },
		quick_learner: {},
		treasure_hunter: {},
		legendary_resilience: { effect: "not_common", value: 0.05 },
	},
	tack: {
		claw_of_the_great_hunt: { effect: "not_common", value: 0.05 },
		horn_of_beasts: {},
		sharpened_spear: { effect: "not_common", value: 0.05 },
		hide_wrapped_quiver: { effect: "not_common", value: 0.03 },
		hyaenodon: { effect: "not_common", value: 0.05 },
		dodo: {},
		pygmy_onyc: {},
		umbrus_familiar: { effect: "extra_item", value: 1.00 },
		spectral_trilobite: {},
		black_cat: { effect: "extra_item", value: 1.00 },
	},
};
