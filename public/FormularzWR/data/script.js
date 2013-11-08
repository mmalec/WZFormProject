//to jest zmiana II
$(document).ready(function() {
	// alert("dziala dfsdsdsdsd");
	$("#komentarz").text("dziala Jq");
	
	$("#wersja_przegladarki").html( parseInt( $.browser.version ));
	
	if (( $.browser.msie ) && (parseInt( $.browser.version ) >= 10))  {
		
		
		$("#komunikat").hide();
		$("#formularz").show();
		
		//alert( parseInt( $.browser.version ));
		}
	else if (( $.browser.mozilla ) && (parseInt( $.browser.version ) >= 23)){
		$("#komunikat").hide();
		$("#formularz").show();
	}
	else {
		$("#komunikat").show();
		$("#formularz").hide();
	}

	$("#data_protokolu").datepicker($.datepicker.regional["pl"]);

	dodaj_wiesz_listy_objektow(1);

	$("#dodaj_object").click(add_new_object);
	$("#usun_object").click(remove_object);
	$(".edytuj_protokol_button").click(edytuj_protokol);

	// $(".editable").ckedit();
	$("div.editable").click(make_div_editable);

	$("#komentarz").text("działa aaaaaaaaaaaaaaaaa");

	$(".tableheader").removeClass("ukryte");

	// $("table.dynamic").mouseenter(pokarz_wszystkie_wiersze_w_tabeli);
	// $("table.dynamic").mouseleave(ukryj_niewybrane_wiersze_w_tabeli);
	$("#pouchdb").click(dbTest);
	// $( "input[type=checkbox]" ).change(pokarz_wybrane_wiersze_w_tabeli );
	//

	// spis tre�ci
	$("#menu_top").mouseenter(function() {
		// alert("mouse entr");
		$("#spis_tresci_more").show("slow");
	});

	$("#spis_tresci_more").mouseleave(function() {
		// alert("mouse leave");
		$("#spis_tresci_more").hide("slow");
	});

});

function dodaj_wiesz_listy_objektow(nr_wiersza) {
	console.log('Dodaje nowy wiersz nr Wiersza to: ' + nr_wiersza);
	$("#list_of_objects").find("tr").last().after(
			'<tr  id="wiersz_nr' + nr_wiersza + '" class="protocol'+nr_wiersza+'"></tr>');
	$("#list_of_objects")
			.find("tr")
			.last()
			.load(
					'data/lista_objektow_nowy_wiersz.html',
					function() {

						$('#wiersz_nr' + nr_wiersza)
								.find('.dynamic')
								.each(
										function() {

											console
													.log("zaczynam zmieniac wartosci id dla nowego wiersza ");
											var stare_id = $(this).attr("id");
											var nowe_id = stare_id + nr_wiersza;
											// alert("stare id " +stare_id + "
											// nowe_id "+nowe_id);
											$(this).attr("id", nowe_id);

										});

						$('#lp' + nr_wiersza).html(nr_wiersza);

						$("#edytuj_protokol_button" + nr_wiersza).click(
								edytuj_protokol);

					});

	zaladuj_protokol(nr_wiersza);

}

function zaladuj_protokol(nr_protokolu) {

	$("#tables_object" + nr_protokolu).load(
			'data/object_protocol.html',
			function() {
				console.log("�aduje protokow nr=" + nr_protokolu);
				pokarz_wybrane_wiersze_w_tabeli();
				$("div.editable").click(make_div_editable);

				$("input[type=checkbox]").change(
						pokarz_wybrane_wiersze_w_tabeli);
				console.log("koncze ladowanie protokolu nr=" + nr_protokolu);

				console.log("zaczynam nienia� nazwy id");

				$("#tables_object" + nr_protokolu).find("select").each(
						function() {
							console.log("zaczynam zmieniac nazwy dla id");
							var stare_id = $(this).attr("id");
							var nowe_id = stare_id + nr_protokolu;
							// alert("stare id " +stare_id + " nowe_id
							// "+nowe_id);
							$(this).attr("id", nowe_id);
						});

				$("#tables_object" + nr_protokolu).find("div").each(function() {
					// console.log("zaczynam zmieniac nazwy dla id");
					var stare_id = $(this).attr("id");
					var nowe_id = stare_id + nr_protokolu;
					// alert("stare id " +stare_id + " nowe_id "+nowe_id);
					$(this).attr("id", nowe_id);
				});

				$("#tables_object" + nr_protokolu).find("td").each(function() {
					// console.log("zaczynam zmieniac nazwy dla id");
					var stare_id = $(this).attr("id");
					var nowe_id = stare_id + nr_protokolu;
					// alert("stare id " +stare_id + " nowe_id "+nowe_id);
					$(this).attr("id", nowe_id);
				});

				$("#tables_object" + nr_protokolu).find("input").each(
						function() {
							var stare_id = $(this).attr("id");
							var nowe_id = stare_id + nr_protokolu;
							$(this).attr("id", nowe_id);
						});

				$("#data_kontroli" + nr_protokolu).datepicker(
						$.datepicker.regional["pl"]);
				
				$("#data_wykonania_decyzji" + nr_protokolu).datepicker(
						$.datepicker.regional["pl"]);

				$("#tables_object" + nr_protokolu).find("input[type=checkbox]")
						.change(pokarz_wybrane_wiersze_w_tabeli);
				
				

				// $("#grupa_objektow").attr("id" ,"grupa_objektow"+nr_protokolu
				// );

				// $("#rodzaj_objektu").attr("id" ,"rodzaj_objektu"+nr_protokolu
				// );
				// $("#rodzaj_objektu"+nr_protokolu).attr("nr_protokolu"
				// ,"protocol"+nr_protokolu );
				$("#rodzaj_objektu" + nr_protokolu).chained(
						"#grupa_objektow" + nr_protokolu);

				// $("#kategoria_objektu").attr("id"
				// ,"kategoria_objektu"+nr_protokolu );
				$("#kategoria_objektu" + nr_protokolu).attr("nr_protokolu",
						nr_protokolu);
				$("#kategoria_objektu" + nr_protokolu).chained(
						"#rodzaj_objektu" + nr_protokolu);
				$("#kategoria_objektu" + nr_protokolu).change(
						zmiana_rodzaju_obiektu);
				$('#kategoria_objektu' + nr_protokolu).change(
						oblicz_watrosci_wymagane);

				$("#wysokosc_budkunku" + nr_protokolu).attr("nr_protokolu",
						nr_protokolu);
				$('#wysokosc_budkunku' + nr_protokolu).change(
						oblicz_watrosci_wymagane);
				
				$("#liczba_kondyg_nadziemnych_instniejaca" + nr_protokolu).attr("nr_protokolu",
						nr_protokolu);
				$('#liczba_kondyg_nadziemnych_instniejaca' + nr_protokolu).change(
						oblicz_watrosci_wymagane);
				
				
				$("#gestosc_obciazenia_ogniowego_istniejaca" + nr_protokolu).attr("nr_protokolu",
						nr_protokolu);
				$('#gestosc_obciazenia_ogniowego_istniejaca' + nr_protokolu).change(
						oblicz_watrosci_wymagane);
				
				

				// $("#kategoria_objektuII").attr("id"
				// ,"kategoria_objektuII"+nr_protokolu );
				$("#kategoria_objektuII" + nr_protokolu).attr("nr_protokolu",
						nr_protokolu);
				$("#kategoria_objektuII" + nr_protokolu).chained(
						"#rodzaj_objektu" + nr_protokolu);
				$("#kategoria_objektuII" + nr_protokolu).change(
						zmiana_rodzaju_obiektuII);

				$("#objects_protocols > div").addClass("ukryty_protokol");
				$("#tables_object" + nr_protokolu).removeClass(
						"ukryty_protokol");

				$("#nazwa_obiektu" + nr_protokolu).change(
						function() {
							var text = $(this).val();
							var nr = $(this).parent("td").parent("tr").find(
									"td").first().html();
							$("#charakterystyka_nazwa_obiektu" + nr_protokolu)
									.text(text);
							$("#charakterystyka_nr_obiektu" + nr_protokolu)
									.text(nr);

							// console.log("wpisalem nazwe ob " + nr_protokolu);
						});

			});

}

function zmiana_rodzaju_obiektu() {

	var nazwa = $(this).find("option:selected").text();
	var nr_protokolu = $(this).attr("nr_protokolu");
	// alert("mienił sie " + nazwa );
	$('#rodzaj_objectu' + nr_protokolu).text(nazwa);
}

function zmiana_rodzaju_obiektuII() {

	var nazwa = $(this).find("option:selected").text();
	var nr_protokolu = $(this).attr("nr_protokolu");
	// alert("mienił sie II " + nazwa );
	var stara_tresc = $("#rodzaj_objectu" + nr_protokolu).text();
	// alert("stara_tesc " + stara_tresc);
	var str = stara_tresc + ",  " + nazwa;
	$("#rodzaj_objectu" + nr_protokolu).text(str);
}

function remove_object() {

	// alert("dł " + $("#list_of_objects").find("tr").length );
	if ($("#list_of_objects").find("tr").length > 2) {
		var nrWiersza = $("#list_of_objects").find("tr").last().find("td")
				.first().html();
		var protocol_id = "tables_object" + nrWiersza;
		$("#" + protocol_id).html(" ");
		$("#list_of_objects").find("tr").last().remove();

	}

}

// funkcja dodaje nowe kontrolowane objekty do tabeli
// oraz ładuje protokol (tabeli z pliku do div -ów)
// dodawany jest zawsze ostatni wiersz
function add_new_object() {
	// alert("dziala");

	var nrWiersza = parseInt($("#list_of_objects").find("tr").last().find("td")
			.first().html());
	if (nrWiersza == 10) {
		return;
	}

	dodaj_wiesz_listy_objektow(nrWiersza + 1);

	zaladuj_protokol(nrWiersza + 1);

	/*
	 * var protocol_id = "tables_object"+nrWierszaInt;
	 * console.log("protocol_id=" + protocol_id);
	 * $("#"+protocol_id).load('object_protocol.html', function(){
	 * $("div.editable").click(make_div_editable);
	 * 
	 * 
	 * //zmiana wszystkich id $("#"+protocol_id).find("table").each( function(){
	 * var stare_id = $(this).attr("id"); var nowe_id =
	 * stare_id+"_"+nrWierszaInt; $(this).attr("id", nowe_id); });
	 * 
	 * 
	 * 
	 * pokarz_wybrane_wiersze_w_tabeli();
	 * 
	 * //zmienia nazwy na potrzeby select zaladuj_protokol(nrWierszaInt); $(
	 * "table.dynamic").find( "input[type=checkbox]" ).unbind("change",
	 * "pokarz_wybrane_wiersze_w_tabeli" ); $( "table.dynamic").find(
	 * "input[type=checkbox]" ).change(pokarz_wybrane_wiersze_w_tabeli ); });
	 */

	// $(this).remove();
	// $(".dodaj_object").click(add_new_object);
}

function make_div_editable() {
	console.log("Dziala make_div_editable");
	$(this).attr('contenteditable', true);
	$(this).ckeditor();

}

// mouseOver
/*
 * function li_pokarz_punkty(){ //alert("Dziala mouserenter");
 * $(this).find("li").removeClass("ukryte"); } function
 * pokarz_wszystkie_wiersze_w_tabeli(){ //alert("Mouse Over");
 * $(this).find("tr").removeClass("ukryte"); }
 * 
 * //mouseOut function li_tylko_wybrane(){
 * $(this).find("li").addClass("ukryte");
 * $(this).find("li.wybrany").removeClass("ukryte"); } function
 * ukryj_niewybrane_wiersze_w_tabeli(){ //alert("Mouse Out");
 * $(this).find("tr").addClass("ukryte");
 * $(".tableheader").removeClass("ukryte"); $( "input:checked"
 * ).parent("td").parent("tr").removeClass("ukryte");
 *  $( "input[type=checkbox]"
 * ).parent("td").parent("tr").removeClass("wybrany"); $( "input:checked"
 * ).parent("td").parent("tr").addClass("wybrany"); }
 */

function pokarz_wybrane_wiersze_w_tabeli() {
	console.log("start: pokarz_wybrane_wiersze_w_tabeli");
	// alert("Dziala zaznacz wybrane");

	// $( "input[type=checkbox]"
	// ).parent("td").parent("tr").removeClass("widzialne");
	$("table.dynamic").find("tr").removeClass("wybrany");
	$("table.dynamic").find("tr").addClass("ukryte");
	// $( "input:checked" ).addClass("wybrany");
	// $( "input:checked" ).parent("td").parent("tr").removeClass("ukryte");
	$("table.dynamic").find("input:checked").parent("td").parent("tr")
			.addClass("wybrany");
	$("table.dynamic ").find("input:checked").parent("td").parent("tr")
			.removeClass("ukryte");
	$(".tableheader").removeClass("ukryte");

}
/*
 * function przelacz_li(){ alert("Dziala li"); this.text("co jest grane");
 * this.addClass("wybrany"); }
 */

function setUpEditor() {
	this.ckedit();
}

function edytuj_protokol() {
	// alert("edytuje");
	var nrWiersza = $(this).parent("td").parent("tr").last().find("td").first()
			.html();
	console.log("nrWiersza=" + nrWiersza);
	var nrWierszaInt = parseInt(nrWiersza);

	var protocol_id = "tables_object" + nrWierszaInt;
	console.log("protocol_id=" + protocol_id);
	$(".protocol_table_part").addClass("ukryty_protokol");
	$("#" + protocol_id).removeClass("ukryty_protokol");

	$("a.dynamic").each(function() {
		var nowy_cel;
		var cel = $(this).attr("cel");
		if (nrWierszaInt > 1) {
			nowy_cel = cel + "_" + nrWiersza;
		} else {
			nowy_cel = cel;
		}
		$(this).attr("href", nowy_cel);
	});

	// zmiana odnośników

}

function oblicz_watrosci_wymagane() {

	var nr_protokolu = $(this).attr('nr_protokolu');
	console.log("dziala obliczanie wart wymaganych dla protokolu ");
	
	czysc_wymagane(nr_protokolu);
	
	$("#kontrola").click();

	var kategoria_objektu = $('#kategoria_objektu' + nr_protokolu).find(
			"option:selected").val();
	var wysokosc_budynku = $("#wysokosc_budkunku" + nr_protokolu).find(
			'option:selected').val();	
	
	var liczba_kondygnacji_naziemnych = $("#liczba_kondyg_nadziemnych_instniejaca"+ nr_protokolu).val();

	console.log("kategoria budynku = " + kategoria_objektu);
	console.log('wysokosc_budkunku =' + wysokosc_budynku);
	console.log('liczba_kondyg_nadziemnych_instniejaca = '+liczba_kondygnacji_naziemnych);

	if ((kategoria_objektu == "PM") || (kategoria_objektu == "PM")) {
		// obliczenia dla PM i IN
		console.log("Obliczenia dla PM");
		var gestosc_obciazenia_ogniowego = get_gObciazenia_Ogniowego(nr_protokolu);
		console.log("G�sto�� OO = " + gestosc_obciazenia_ogniowego);

		if(liczba_kondygnacji_naziemnych == 1){
			console.log("ustawiam wysokosc_budynku na J"); 
			wysokosc_budynku = "J";
		}
		
		console.log("wysokosc_budynku " + wysokosc_budynku); 
		var klasa_odpornosci_pozarowej = klasa_op_dla_PM[gestosc_obciazenia_ogniowego][wysokosc_budynku];
		console.log("Klasa odpor. pozar = " + klasa_odpornosci_pozarowej);
		
		$('#klasa_odpor_wymagana' + nr_protokolu).text(
				klasa_odpornosci_pozarowej);

		$('#konstrukcja_nos_wymagana' + nr_protokolu).text(
				wymogi_elementow[klasa_odpornosci_pozarowej]["KN"]);
		$('#konstrukcja_dachu_wymagana' + nr_protokolu).text(
				wymogi_elementow[klasa_odpornosci_pozarowej]["KD"]);
		$('#strop_wymagana' + nr_protokolu).text(
				wymogi_elementow[klasa_odpornosci_pozarowej]["STROP"]);
		$('#sciana_zewnetrzna_wymagana' + nr_protokolu).text(
				wymogi_elementow[klasa_odpornosci_pozarowej]["SZ"]);
		$('#sciana_wewnetrzna_wymagana' + nr_protokolu).text(
				wymogi_elementow[klasa_odpornosci_pozarowej]["SW"]);
		$('#pokrycie_dachu_wymagana' + nr_protokolu).text(
				wymogi_elementow[klasa_odpornosci_pozarowej]["PD"]);

	 //koniec oblicze� dla PM
		
		
	} else if ((kategoria_objektu.length > 0) && (wysokosc_budynku.length > 0)) {
		// obliczenia dla ZL bez obnizania kategorii
		console.log("Obliczenia ZL");
		
		if(liczba_kondygnacji_naziemnych == 1){
			console.log("ustawiam wysokosc_budynku na J"); 
			wysokosc_budynku = "J";
		}
		
		console.log("wysokosc_budynku " + wysokosc_budynku); 
		var klasa_odpornosci_pozarowej = klasa_op_dla_ZL[wysokosc_budynku][kategoria_objektu];
		console.log("Klasa odpor. pozar = " + klasa_odpornosci_pozarowej);
		

		$('#klasa_odpor_wymagana' + nr_protokolu).text(
				klasa_odpornosci_pozarowej);

		$('#konstrukcja_nos_wymagana' + nr_protokolu).text(
				wymogi_elementow[klasa_odpornosci_pozarowej]["KN"]);
		$('#konstrukcja_dachu_wymagana' + nr_protokolu).text(
				wymogi_elementow[klasa_odpornosci_pozarowej]["KD"]);
		$('#strop_wymagana' + nr_protokolu).text(
				wymogi_elementow[klasa_odpornosci_pozarowej]["STROP"]);
		$('#sciana_zewnetrzna_wymagana' + nr_protokolu).text(
				wymogi_elementow[klasa_odpornosci_pozarowej]["SZ"]);
		$('#sciana_wewnetrzna_wymagana' + nr_protokolu).text(
				wymogi_elementow[klasa_odpornosci_pozarowej]["SW"]);
		$('#pokrycie_dachu_wymagana' + nr_protokolu).text(
				wymogi_elementow[klasa_odpornosci_pozarowej]["PD"]);

	} else {
		// jesli brakuje danych
		$('#klasa_odpor_wymagana' + nr_protokolu).text("__ ");
	}

}


function czysc_wymagane(nr_protokolu){

	$('#klasa_odpor_wymagana' + nr_protokolu).text("--");

	$('#konstrukcja_nos_wymagana' + nr_protokolu).text("--");
	$('#konstrukcja_dachu_wymagana' + nr_protokolu).text("--");
	$('#strop_wymagana' + nr_protokolu).text("--");
	$('#sciana_zewnetrzna_wymagana' + nr_protokolu).text("--");
	$('#sciana_wewnetrzna_wymagana' + nr_protokolu).text("--");
	$('#pokrycie_dachu_wymagana' + nr_protokolu).text("--");

}

function get_gObciazenia_Ogniowego(nr_protokolu){

	var goo1 = $("#gestosc_obciazenia_ogniowego_istniejaca"+nr_protokolu).val();
	var goo = parseInt(goo1);
	console.log("Goo = " + goo + goo1);
	if(goo <= 500){ 
		return "DO_500";
		}
	else if(goo <= 1000){
		return "DO_1000";
		}
	else if(goo <= 2000) {
		return "DO_2000";
	}
	else if(goo <=4000){
		return "DO_4000";
	}
	else if (goo > 4000){
		return "POWYZEJ_4000";
	}
	else{
		return "BRAK";
	} 
}

function dbTest() {
	$("#komentarz").text("dziala dbTest");
	console.log("dziala log");

	Pouch("'idb://baza", function(err, pouchdb) {
		if (err) {
			alert("Can't open pouchdb database");
		} else {
			db = pouchdb;

			var content = $("#kontener").html();
			var todo = {

				_id : new Date().toISOString(),
				kontener : content,
				completed : false
			};
			console.log(todo);
			db.put(todo, function callback(err, result) {
				if (!err) {
					console.log(result.id);
					console.log('Successfully posted a todo!');
				}
			});
		}
		console.log("Baza Dziala");
		$("#komentarz").text("dziala baza");
		$("#pola").text("Pola edycji" + $(".editable").length);
		$("#polach")
				.text("Pocla zaznaczen " + $("input[type=checkbox]").length);
		var str = "wynik1" + $("form").serialize();
		var field = $("form").serializeArray();

		jQuery.each(field, function(i, field) {
			$("#wynik").append(field.value + " ");
			console.log(a);
		});
		// $("#wynik").text("Wynik:" + str );

		// });

		// concole.log(db);

	});
}
