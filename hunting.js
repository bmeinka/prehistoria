function get_num_items(p) {
	var max_items = 4;
	// if p has umbru's familiar, max_items++
	// if p has black cat, max_items++
	return Math.floor(Math.random() * max_items) + 1;
}

function roll() {
	// TODO calculate the player object
	document.getElementById("result").innerHTML = get_num_items({});
}
