
	var klasa_op_dla_ZL = new Object();
	//jednokondygnacyjny
	klasa_op_dla_ZL['J'] = {
			"ZLI" : "D",
			"ZLII" : "D",
			"ZLIII" : "D",
			"ZLIV" : "D",
			"ZLV" : "C"
		};
	//dwukondygnacyjny
	klasa_op_dla_ZL['D'] = {
			"ZLI" : "C",
			"ZLII" : "C",
			"ZLIII" : "D",
			"ZLIV" : "D",
			"ZLV" : "C"
		};
	klasa_op_dla_ZL['N'] = {
		"ZLI" : "B",
		"ZLII" : "B",
		"ZLIII" : "C",
		"ZLIV" : "D",
		"ZLV" : "C"
	};
	klasa_op_dla_ZL['SW'] = {
		"ZLI" : "B",
		"ZLII" : "B",
		"ZLIII" : "B",
		"ZLIV" : "C",
		"ZLV" : "B"
	};
	klasa_op_dla_ZL['W'] = {
		"ZLI" : "B",
		"ZLII" : "B",
		"ZLIII" : "B",
		"ZLIV" : "B",
		"ZLV" : "B"
	};
	klasa_op_dla_ZL['WW'] = {
		"ZLI" : "A",
		"ZLII" : "A",
		"ZLIII" : "C",
		"ZLIV" : "A",
		"ZLV" : "A"
	};
	
	
	
	


	// KN - konstr nosna
	var wymogi_elementow = new Object();
	wymogi_elementow["A"] = {
		"KN" : "R 240",
		"KD" : "R 30",
		"STROP" : " REI 120",
		"SZ" : "EI 120",
		"SW" : "EI 60",
		"PD" : "RE 30"
	};
	wymogi_elementow["B"] = {
		"KN" : "R 120",
		"KD" : "R 30",
		"STROP" : " REI 60",
		"SZ" : "EI 60",
		"SW" : "EI 30",
		"PD" : "RE 30"
	};
	wymogi_elementow["C"] = {
		"KN" : "R 60",
		"KD" : "R 15",
		"STROP" : " REI 60",
		"SZ" : "EI 30",
		"SW" : "EI 15",
		"PD" : "RE 15"
	};
	wymogi_elementow["D"] = {
		"KN" : "R 30",
		"KD" : " -- ",
		"STROP" : " REI 30",
		"SZ" : "EI 30",
		"SW" : "--",
		"PD" : "--"
	};
	wymogi_elementow["E"] = {
		"KN" : " -- ",
		"KD" : " -- ",
		"STROP" : " -- ",
		"SZ" : " -- ",
		"SW" : " -- ",
		"PD" : " -- "
	};
	
	
var klasa_op_dla_PM = new Object();
klasa_op_dla_PM['DO_500'] = {"J":"E", "N":"D", "SW":"C","W":"B","WW":"B"};
klasa_op_dla_PM['DO_1000'] = {"J":"D", "N":"D", "SW":"C","W":"B","WW":"B"};
klasa_op_dla_PM['DO_2000'] = {"J":"C", "N":"C", "SW":"C","W":"B","WW":"B"};
klasa_op_dla_PM['DO_4000'] = {"J":"B", "N":"B", "SW":"B","W":"N/A","WW":"N/A"};
klasa_op_dla_PM['POWYZEJ_4000'] = {"J":"A", "N":"A", "SW":"A","W":"N/A","WW":"N/A"};