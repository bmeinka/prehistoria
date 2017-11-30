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

function blessing_reset() {
	document.getElementsByName("blessing").forEach(function(item) {
		item.checked = false;
	});
}
