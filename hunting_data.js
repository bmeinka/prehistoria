/* Possible Effects:
 *
 * Increase chance of finding a cub of any species -- needs clarified
 * Increase chance of finding "double pelts" and "extra resources" -- just says found double
 * Increase chance of finding specific type of items -- including events
 * Increase chance of finding items Uncommon and above
 * Increase chance of finding specific items or events
 * Increase chance of finding an additional item
 * Add chance to find Beads
 * Add an extra item
 *
 * Possible Requirements:
 *
 * Night
 * Snow
 * Forest
 *
 * First things first, we are going to determine the number of items
 */
var data = {
	base_effects: {
		// cub, double, beads, chances, weights
		item_count: { min: 1, max: 4 },
	},
	blessing: {
		umbru: { requires: "night", extra_item: 0.50 },
	},
	primal: {
		sun_chaser: { extra_item: 0.10 },
	},
	tack: {
		umbrus_familiar: { extra_item: 1.00 },
		black_cat: { extra_item: 1.00 },
	},
};

/*
var data = {
	base_effects: {
		find_cub: 0.00,
		double_pelts: 0.00,
		find_beads: { chance: 0.00, min: 0, max: 0 },
		chances: { uncommon: 0.20, rare: 0.13, encounter: 0.05, exotic: 0.02 },
		weights: { companion: 1.00, shards: 1.00, coins: 1.00, bag: 1.00 }
	},
	item_types: ["exotic", "encounter", "rare", "uncommon", "common"],
	item_groups: {
		companion: { encounter: [0, 3, 4] },
		shards: { exotic: [5] },
		coins: { exotic: [0] },
		bag: { uncommon: [3], exotic: [1, 3] }
	},
	items: {
		common: [
			{ thumb: ":thumb692155725:", name: "Ruined Hide" },
			{ thumb: ":thumb692155733:", name: "Mauled Pelt" },
			{ thumb: ":thumb696851410:", name: "Handful of Small Claws" },
			{ thumb: ":thumb688815084:", name: "Broken Bow String" },
			{ thumb: ":thumb696851245:", name: "Broken Bones" },
			{ thumb: ":thumb692155738:", name: "Dewclaw" },
			{ thumb: ":thumb695683108:", name: "Cave Bear Claws" },
			{ thumb: ":thumb714394111:", name: "Cloven Hooves" },
			{ thumb: ":thumb714394107:", name: "Thick Hoof" }
		],
		uncommon: [
			{ thumb: ":thumb692155722:", name: "Warm Wolf Fur" },
			{ thumb: ":thumb692155730:", name: "Molted Feathers" },
			{ thumb: ":thumb696852253:", name: "Pristine Lion Fangs" },
			{ thumb: ":thumb696851734:", name: "Chewed Up Hunters Pack" },
			{ thumb: ":thumb696851973:", name: "Handful of Predator Teeth" },
			{ thumb: ":thumb692155740:", name: "Coarse Ruined Hide" },
			{ thumb: ":thumb692155743:", name: "Bloodied String of Beads" }
		],
		rare: [
			{ thumb: ":thumb688402076:", name: "Saber Fang" },
			{ thumb: ":thumb688811667:", name: "Spotted Pelt" },
			{ thumb: ":thumb688811665:", name: "Striped Pelt" },
			{ thumb: ":thumb688811679:", name: "Hefty Musk Ox Hide" },
			{ thumb: ":thumb688811676:", name: "Silky Albino Fur" },
			{ thumb: ":thumb688818335:", name: "Cursed Mammoth Tusks" },
			{ thumb: ":thumb695683103:", name: "Wooly Whino Horn" }
		],
		encounter: [
			"Something scampers up to you. A tiny cub, lost and afraid refuses to leave your side. Maybe you could give it a home. (Companion Awarding)",
			"Angry growls erupt from behind you as you're confronted by a fearsome lion. Her fur bristles and her muscles tense as she slowly, but defensively approaches. How do you react?",
			"The hunter becomes the hunted. A massive sabertooth has been tracking you silently for miles, waiting for the right time to strike. Are you aware of the danger, or are you ambushed?",
			"Tiny whines sound from behind a patch of tall grass. You peek behind and find a small surprise staring up at you, hungry and dangerously alone. It looks like its mother had been killed and the only one from its litter to survive. You take pity on the small hyaenodon and bring it home. (Companion Awarding)",
			"As you stalk through the tall grass, tiny claws dig into your back and high pitched screech-squawks fill your ears. A tiny terror bird has decided to join your hunt, and also your pack it seems... (Companion Awarding)"
		],
		exotic: [
			{ thumb: ":thumb688402080:", name: "Long Forgotten Coin" },
			{ thumb: ":thumb692155720:", name: "Wiggling Burlap Sack" },
			{ thumb: ":thumb695683106:", name: "Claw of the Great Hunt" },
			{ thumb: ":thumb696852338:", name: "Clawed Medicinal Bag" },
			{ thumb: ":thumb696852465:", name: "Horn of Beasts" },
			{ thumb: ":thumb713651989:", name: "Trait Shard" }
		]
	}
	deity_blessings: {
		hasswei: { double_pelts: 0.10 }, // TODO clarify
		mamota: { chances: { rare: 0.10 } }
	},
	primal_abilities: {
		// TODO clarify depiction concept
		queens_love: { find_cub: 0.01 },
		night_fall: { chances: { rare: 0.05 } },
		snow_wanderer: { requires: "snow", chances: { rare: 0.10 } },
		plains_prowler: { chances: { rare: 0.05 } },
		protector_of_the_forest: { requires: "forest", chances: { rare: 0.10 } }
	},
	traits: {
		// TODO clarify rarer
		accident_prone: { chances: { encounter: 0.05 } },
		befriender: { weights: { companion: 0.03 } },
		fortunes_favor: { find_beads: { chance: 0.05, min: 100, max: 600 } },
		survivor: { chances: { exotic: 0.03 } },
		loner: { chances: { rare: 0.05 } },
		quick_learner: { weights: { shards: 0.05 } },
		treasure_hunter: { weights: { coins: 0.02 } },
		legendary_resilience: { chances: { rare: 0.05 } }
	},
	tack: {
		// TODO clarify rarer
		claw_of_the_great_hunt: { chances: { rare: 0.05 } },
		horn_of_beasts: { weights: { companion: 0.03 } },
		sharpened_spear: { chances: { rare: 0.05 } },
		hide_wrapped_quiver: { chances: { rare: 0.03 } },
		hyaenodon: { chances: { rare: 0.05 } },
		dodo: { weights: { coins: 0.02 } },
		pygmy_onyc: { weights: { bag: 0.05 } },
		spectral_trilobite: { weights: { shards: 0.05 } },
	},
};
*/
