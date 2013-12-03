//to jest zmiana II nn
$(document).ready(function() {
// alert("dziala dfsdsdsdsd");
    $("#komentarz").text("dziala Jq");
    $("#wersja_przegladarki").html(parseInt($.browser.version));
    if (($.browser.msie) && (parseInt($.browser.version) >= 10)) {


        $("#komunikat").hide();
        $("#formularz").show();
        //alert( parseInt( $.browser.version ));
    }
    else if (($.browser.mozilla) && (parseInt($.browser.version) >= 23)) {
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
    $("#usun_object").click(klick_usun_objekt);
    $(".edytuj_protokol_button").click(edytuj_protokol);
    // $(".editable").ckedit();


    $("#komentarz").text("działa aaaaaaaaaaaaaaaaa");
    $(".tableheader").removeClass("ukryte");
    // $("table.dynamic").mouseenter(pokarz_wszystkie_wiersze_w_tabeli);
    // $("table.dynamic").mouseleave(ukryj_niewybrane_wiersze_w_tabeli);
    $("#pouchdb").click(dbTest);
    // $( "input[type=checkbox]" ).change(pokarz_wybrane_wiersze_w_tabeli );
    //

    // spis tre�ci
    $("#spis_tresci_top").mouseenter(function() {
// alert("mouse entr");
        $("#spis_tresci_more").show("slow");
    });
    $("#spis_tresci_more").mouseleave(function() {
// alert("mouse leave");
        $("#spis_tresci_more").hide("slow");
    });
    $("div.editable").click(make_div_editable);
    $("#kontrola").click(validate_forms);
    $(".ustawa").change(function() {
        $("#kontrola").submit();
    });

});
function validate_forms() {
    //alert("Dziala validacja");

    window.token = true;
    //token = true;

    jQuery.validator.addClassRules({
        ustawa: {
            required: function(element) {
                if ($("input:checkbox:checked.ustawa").length === 0) {

                    return true;
                }
                else {
                    return false;
                }
            },
            minlength: 1,
        }

    });

    $("#formularz").validate({
        debug: false,
        focusInvalid: false,
        errorClass: 'validation-error',
        messages: {
            required: "*",
            ustawa: "*"
        },
        // onkeyup: function(){
        //$("#kontrola").click();
        // },
        //onfocusout: function(){
        //  $("#kontrola").click();
        //},
        showErrors: function(errorMap, errorList) {
            // alert("token= " + window.token);
            //alert("token =" + token);
            //this.prepareForm();



            var i, elements;
            for (i = 0; this.errorList[i]; i++) {
                var error = this.errorList[i];
                if (this.settings.highlight) {
                    this.settings.highlight.call(this, error.element, this.settings.errorClass, this.settings.validClass);
                }
                this.showLabel(error.element, error.message);
                var lista_bledow = $("#lista_bledow");
                 var czy_jest_wpis = $("#lista_bledow").find("[title=\"" + error.message + "\"]").length;
                // alert("czy_jest_wpis = " + error.message);
                if (czy_jest_wpis === 0) {
                     var title = error.element.id;
                    var regExp = new RegExp(/\w/); 
                    if(regExp.test(error.message.toString())){
                      title = error.message.toString();
                    
                    }
                    
                    var ostatni_listy_bledow = $("#lista_bledow").find("li").first();
                    var nowy_wiersz = ostatni_listy_bledow.clone();
                    nowy_wiersz.find("a").attr("href", "#" + error.element.id);
                   nowy_wiersz.find("a").attr("title", error.message);
                    nowy_wiersz.find("a").text(title);
                    nowy_wiersz.insertBefore(ostatni_listy_bledow);
                }
            }
            if (this.errorList.length) {
                //alert("errorList.length ="+errorList.length);
                this.toShow = this.toShow.add(this.containers);
            }
            if (this.settings.success) {
                for (i = 0; this.successList[i]; i++) {
                    this.showLabel(this.successList[i]);
                }
            }
            if (this.settings.unhighlight) {
                for (i = 0, elements = this.validElements(); elements[i]; i++) {
                    this.settings.unhighlight.call(this, elements[i], this.settings.errorClass, this.settings.validClass);
                    // alert("el = " + elements[i].id);
                    $("#lista_bledow").find("a[href=#" + elements[i].id + "]").parent("li").remove();
                }
            }
            this.toHide = this.toHide.not(this.toShow);
            this.hideErrors();
            this.addWrapper(this.toShow).show();
            //alert("showErrors:");
            if (window.token === true) {
                window.token = false;
                var i = 0;
                var labelText = new Array(this.numberOfInvalids());
                var lista_bledow = $("#lista_bledow");
                $.each(errorMap, function(id, value) {
                    
                    var title = id;
                    var regExp = new RegExp(/\w/); 
                    if(regExp.test(value.toString())){
                      title = value;
                    
                    }

                    if (i === 0) {
                        lista_bledow.html("<ol><li><a class=\"error\" href=\"#" + id + "\" title=\"" + title + "\">" + title + " </a></li></ol>");
                    }
                   // alert("value" + value);
                    var czy_jest_wpis = $("#lista_bledow").find("[title=\"" + title + "\"]").length;
                    //alert("czy_jest_wpis = " + czy_jest_wpis +title);
                    if (czy_jest_wpis === 0) {
                        var ostatni_listy_bledow = $("#lista_bledow").find("li").last();
                        var nowy_wiersz = ostatni_listy_bledow.clone();
                        nowy_wiersz.find("a").attr("href", "#" + id);
                                 
                         nowy_wiersz.find("a").attr("title",  title);
                        nowy_wiersz.find("a").text(title);
                        nowy_wiersz.insertAfter(ostatni_listy_bledow);
                    }

                   
                    i++;
                });
                //validate_podstawa_prawna();



                $('#lista_bledow').find('a').click(function() {
                    //alert("dziala");
                    var $href = $(this).attr('href');
                    //var $anchor = $('#' + $href).offset();
                    // alert($href);

                    // window.location=$href;
                    window.scrollTo(0, ($($href).offset().top - 80));
                    $($href).focus();
                    //$($href).focuson();
                    //  $('html, body').animate({scrollTop: $($href).offset().top -60}, slow);
                    //$($href).scrollTop(-100);
                    return false;
                });
                // alert("token " + token);
            }

            //alert("token " + token);
        }

    });
    // $("#kontrola").focus();
    //validator.errorMap is an object mapping input names -> error messages
    //for (var i in vaildator.errorMap) {
    //  console.log(i, ":", validator.errorMap[i]);
    //}

}

function validate_podstawa_prawna() {
    var liczba_ustaw = $("input:checkbox:checked.ustawa").length;
    //alert("liczba ustaw = " + liczba_ustaw);
    if (liczba_ustaw === 0) {
        $("#podstawa_prawna").addClass("validation-error");
        var czy_jest_wpis = $("#lista_bledow").find("a[href=#podstawa_prawna]").length;
        if (czy_jest_wpis === 0) {

            var link = $("<li><a class=\"error\" href=\"#podstawa_prawna\" >Wybierz ustawę </a></li>");
            link.insertBefore($("#lista_bledow").find("li").first());
            // alert("liczba ustaw = " + liczba_ustaw);
        }
    }
    else {

        $("#podstawa_prawna").removeClass("validation-error");
    }

}
function dodaj_wiesz_listy_objektow(nr_wiersza) {


    var tabela_objektu = $("#objekt_nr").clone();
    tabela_objektu.attr("id", "objekt_nr-" + nr_wiersza);
    //alert("clon = " + tabela_objektu.attr("id"));

    var ostatni = $("#pojemnik_na_objekty").find(".object").last();
    tabela_objektu.addClass("protocol" + nr_wiersza);
    tabela_objektu.insertAfter(ostatni);
    tabela_objektu.find(".dynamic").each(function() {

        console.log("zaczynam zmieniac wartosci id dla nowego wiersza ");
        var stare_id = $(this).attr("id");
        var nowe_id = stare_id + "-" + nr_wiersza;
        //alert("stare id " +stare_id + "nowe_id "+nowe_id);
        $(this).attr("id", nowe_id);
    });
    var nowy_przycisk = $("#protocol_switcher").find("#dodaj_object").clone();
    var nowe_id = "switch_protocol-" + nr_wiersza;
    nowy_przycisk.attr("id", nowe_id);
    nowy_przycisk.addClass("protocol" + nr_wiersza);
    nowy_przycisk.find("span").text("Bez nazwy " + nr_wiersza);
    nowy_przycisk.insertAfter($("#protocol_switcher").find(".switch_button").last());
    var remove_b = nowy_przycisk.find(".remove_button");
    remove_b.attr("id", "remove_button-" + nr_wiersza);
    remove_b.click(klick_usun_objekt);
    nowy_przycisk.click(klick_przelacz_protokul);
    zaladuj_protokol(nr_wiersza);
    zmiana_odnosnikow_spisu_tresci(nr_wiersza);
    nowy_przycisk.click();
    // $("#kontrola").click();

}

function klick_przelacz_protokul() {
    $("#protocol_switcher").find(".switch_button").each(function() {
        $(this).removeClass("switch_button_active");
    });
    var nr_protokolu = parseInt($(this).attr("id").toString().split("-")[1]);
    $(this).addClass("switch_button_active");
    przelacz_protokul(nr_protokolu);
}


function przelacz_protokul(nr_protokolu) {

//alert("nr protokolu = " + nr_protokolu);
    $(".protocol_table_part").each(function() {
        $(this).addClass("ukryty_protokol");
    });
    $("#pojemnik_na_objekty").find("div.object").each(function() {
        $(this).addClass("ukryte");
        $("#objekt_nr-" + nr_protokolu).removeClass("ukryte");
    });
    $("body").attr("class", function() {
        return this.toString().replace(/protocol\d+/, "");
    });
    $("body").addClass("protocol" + nr_protokolu);
    $("#tables_object" + nr_protokolu).removeClass("ukryty_protokol");
    $("#kontrola").click();
}
function zaladuj_protokol(nr_protokolu) {

    $("#tables_object" + nr_protokolu).load(
            'data/object_protocol.html',
            function() {
                console.log("ładuje protokow nr=" + nr_protokolu);
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
                            var nowe_id = stare_id + "-" + nr_protokolu;
                            console.log("stare id " + stare_id + " nowe_id" + nowe_id);
                            $(this).attr("id", nowe_id);
                        });
                $("#tables_object" + nr_protokolu).find(".dynamic").each(
                        function() {
                            console.log("zaczynam zmieniac nazwy dla id dla class dymanic");
                            var stare_id = $(this).attr("id");
                            var nowe_id = stare_id + "-" + nr_protokolu;
                            console.log("stare id " + stare_id + " nowe_id" + nowe_id);
                            $(this).attr("id", nowe_id);
                        });
                $("#tables_object" + nr_protokolu).find("div").each(function() {
                    // console.log("zaczynam zmieniac nazwy dla id");
                    var stare_id = $(this).attr("id");
                    var nowe_id = stare_id + "-" + nr_protokolu;
                    // alert("stare id " +stare_id + " nowe_id "+nowe_id);
                    $(this).attr("id", nowe_id);
                });
                $("#tables_object" + nr_protokolu).find("td").each(function() {
                    // console.log("zaczynam zmieniac nazwy dla id");
                    var stare_id = $(this).attr("id");
                    var nowe_id = stare_id + "-" + nr_protokolu;
                    // alert("stare id " +stare_id + " nowe_id "+nowe_id);
                    $(this).attr("id", nowe_id);
                });
                $("#tables_object" + nr_protokolu).find("input").each(
                        function() {
                            var stare_id = $(this).attr("id");
                            var nowe_id = stare_id + "-" + nr_protokolu;
                            $(this).attr("id", nowe_id);
                        });
                $("#data_kontroli-" + nr_protokolu).datepicker(
                        $.datepicker.regional["pl"]);
                $("#data_wykonania_decyzji-" + nr_protokolu).datepicker(
                        $.datepicker.regional["pl"]);
                $("#tables_object-" + nr_protokolu).find("input[type=checkbox]")
                        .change(pokarz_wybrane_wiersze_w_tabeli);
                // $("#grupa_objektow").attr("id" ,"grupa_objektow"+nr_protokolu
                // );

                // $("#rodzaj_objektu").attr("id" ,"rodzaj_objektu"+nr_protokolu
                // );
                // $("#rodzaj_objektu"+nr_protokolu).attr("nr_protokolu"
                // ,"protocol"+nr_protokolu );

                //   $("#wysokosc_budkunku-" + nr_protokolu).attr("nr_protokolu",
                //         nr_protokolu);
                $('#wysokosc_budkunku-' + nr_protokolu).change(
                        oblicz_watrosci_wymagane);
                //  $("#liczba_kondyg_nadziemnych_instniejaca-" + nr_protokolu).attr("nr_protokolu",
                //         nr_protokolu);
                $('#liczba_kondyg_nadziemnych_instniejaca-' + nr_protokolu).change(
                        oblicz_watrosci_wymagane);
                //   $("#gestosc_obciazenia_ogniowego_istniejaca-" + nr_protokolu).attr("nr_protokolu",
                //          nr_protokolu);
                $('#gestosc_obciazenia_ogniowego_istniejaca-' + nr_protokolu).change(
                        oblicz_watrosci_wymagane);
                // $("#kategoria_objektuII").attr("id"
                // ,"kategoria_objektuII"+nr_protokolu );
                //   $("#kategoria_objektuII-" + nr_protokolu).attr("nr_protokolu",
                //          nr_protokolu);


                $("#objects_protocols > div").addClass("ukryty_protokol");
                $("#tables_object" + nr_protokolu).removeClass(
                        "ukryty_protokol");
                $("#nazwa_obiektu-" + nr_protokolu).change(zmiana_nazwy_objektu);
                dodanie_wiersza_rodzaju_objektu(nr_protokolu, 1);
                $("#dodaj_wiersz_rodzaju_objektu-" + nr_protokolu).click(klick_dodanie_wiersza_rodzaju_objektu);
                //uswienie pierwszego wiersza w protokole
                //teraz selecty w rodzaju obiektu


                $("#kontrola").click();
            });
}


function zmiana_nazwy_objektu() {
//alert("zmiana nazwy");
    var text = $(this).val();
    //alert("text = " + text);
    var nr_protokolu = pobierz_nr_protokolu(this);
    var nr = $(this).parent("td").parent("tr").find(
            "td").first().html();
    $("#charakterystyka_nazwa_obiektu-" + nr_protokolu)
            .text(text);
    $("#charakterystyka_nr_obiektu-" + nr_protokolu)
            .text(nr_protokolu);
    $("#switch_protocol-" + nr_protokolu).find("span").text(text);
    $("#li_object_nr-" + nr_protokolu).find(".li_nazwa_objectu").text(text);
    // console.log("wpisalem nazwe ob " + nr_protokolu);
}

function pobierz_nr_protokolu(el) {
    var nr_protokolu = parseInt($(el).attr("id").toString().split("-")[1].toString());
    return nr_protokolu;
}


function klick_dodanie_wiersza_rodzaju_objektu() {
//numer protokolu z id guzika
    var nr_protokolu = parseInt($(this).attr("id").toString().split("").pop());
    //alert("nr protokolu = " + nr_protokolu);
    var nr_wiersza = parseInt($("#dane_dot_kontroli-" + nr_protokolu).find("tr").last().attr("id").toString().split("").pop());
    dodanie_wiersza_rodzaju_objektu(nr_protokolu, nr_wiersza + 1);
}

function powiaz_selecty_w_wierszu_rodzaju_budynku(nr_protokolu, nr_wiersza) {
//alert("Wizanie selekow " + nr_protokolu + " nr wiersza " + nr_wiersza);

//$("#rodzaj_objektu-" + nr_protokolu+"-"+nr_wiersza).unbind("change");
// $("#kategoria_objektu-" + nr_protokolu+"-"+nr_wiersza).unbind("change");
//$("#kategoria_objektu-" + nr_protokolu+"-"+nr_wiersza).unbind("change");

    $("#rodzaj_objektu-" + nr_protokolu + "-" + nr_wiersza).chained(
            "#grupa_objektow-" + nr_protokolu + "-" + nr_wiersza);
    $("#kategoria_objektu-" + nr_protokolu + "-" + nr_wiersza).chained(
            "#rodzaj_objektu-" + nr_protokolu + "-" + nr_wiersza);
    // $("#kategoria_objektuII-" + nr_protokolu).chained(
    //        "#rodzaj_objektu-" + nr_protokolu);
    //$("#kategoria_objektuII-" + nr_protokolu).change(
    //      zmiana_rodzaju_obiektuII);



}

function dodanie_wiersza_rodzaju_objektu(nr_protokolu, nr_wiersza) {
    console.log("dziala dodawanie wiersza rodzaju objektu");
    //var nr_protokolu = $(this).attr("id").toString().split("-")[1];
    console.log("Nr protokolu = " + nr_protokolu);
    //var kopia_ostatniego_wiersza = $("#dane_dot_kontroli-"+nr_protokolu).find("tr").last().clone();
    //console.log("kopia ostatniego wiersza = " + kopia_ostatniego_wiersza);
    //var ostatni_wiersz = $("#dane_dot_kontroli-"+nr_protokolu).find("tr").last();
    // var nr_ostatniego_wiersza = parseInt($("#dane_dot_kontroli-"+nr_protokolu).find("tr").last().attr("id").split("").pop());
    //dodawanie wiersza
    // kopia_ostatniego_wiersza.insertAfter(ostatni_wiersz);
    // var nr_ostatniego_wiersza = parseInt($("#dane_dot_kontroli-"+nr_protokolu).find("tr").last().attr("id").split("").pop());
    // var nr_kolejnego_wiersz = nr_ostatniego_wiersza+1;
    var nowy_wiersz = $("#wiersz_wyboru_rodzaju_objektu").clone();
    // alert("Klonuje wierszz");
    var ostatni_wiersz = $("#dane_dot_kontroli-" + nr_protokolu).find("tr").last();
    nowy_wiersz.insertAfter(ostatni_wiersz);
    //wpisywanie w tabelce na gorze

    $("#dane_dot_kontroli-" + nr_protokolu).find("tr").last().attr("id", "wiersz_wyboru_rodzaju_objektu-" + nr_protokolu + "-" + nr_wiersza);
    $("#wiersz_wyboru_rodzaju_objektu-" + nr_protokolu + "-" + nr_wiersza).find("div").last().attr("id", "opis_wiersza_rodzaju_budynku_budynku-" + nr_protokolu + "-" + nr_wiersza);
    $("#wiersz_wyboru_rodzaju_objektu-" + nr_protokolu + "-" + nr_wiersza).find("div").last().click(make_div_editable);
    //teraz selecty
    $("#wiersz_wyboru_rodzaju_objektu-" + nr_protokolu + "-" + nr_wiersza).find("select").each(
            function() {
                console.log("zaczynam zmieniac id dla selectow w rodzaju objektu");
                var stare_id = $(this).attr("id").split("-")[0];
                var nowe_id = stare_id + "-" + nr_protokolu + "-" + nr_wiersza;
                console.log("stare id " + stare_id + " nowe_id" + nowe_id);
                $(this).attr("id", nowe_id);
            });
    powiaz_selecty_w_wierszu_rodzaju_budynku(nr_protokolu, nr_wiersza);
    if (nr_wiersza === 1) {
        $("#rodzaj_objectu-" + nr_protokolu).html("<div id=\"wynik_rodzaj_objektu-" + nr_protokolu + "-" + nr_wiersza + "\" class=\"wynik_rodzaj_objektu\" >--</div>");
    }
    else {
        var poprzedni_wiersz = parseInt(nr_wiersza) - 1;
        $("#wynik_rodzaj_objektu-" + nr_protokolu + "-" + poprzedni_wiersz).after("<div id=\"wynik_rodzaj_objektu-" + nr_protokolu + "-" + nr_wiersza + "\" class=\"wynik_rodzaj_objektu\" >--</div>");
    }

    $("#kategoria_objektu-" + nr_protokolu + "-" + nr_wiersza).change(function() {
// alert("dziala");
// var klasa_op = $(this  "option:selected").text;

        $("#wynik_rodzaj_objektu-" + nr_protokolu + "-" + nr_wiersza).html(this.value);
    });
}

function zmiana_rodzaju_obiektu() {

    var nazwa = $(this).find("option:selected").text();
    var nr_protokolu = $(this).attr("id").toString().split("-")[1].toString();
    // alert("mienił sie " + nazwa );
    $('#rodzaj_objectu-' + nr_protokolu).text(nazwa);
}

/*
 function zmiana_rodzaju_obiektuII() {
 
 var nazwa = $(this).find("option:selected").text();
 var nr_protokolu = $(this).attr("id").toString().split("-")[1].toString();
 // alert("mienił sie II " + nazwa );
 var stara_tresc = $("#rodzaj_objectu-" + nr_protokolu).text();
 // alert("stara_tesc " + stara_tresc);
 var str = stara_tresc + ",  " + nazwa;
 $("#rodzaj_objectu-" + nr_protokolu).text(str);
 }
 */

function klick_usun_objekt() {
//alert($(this).attr("id"));
    var potwierdz = confirm("Potwierdź usunięcie \n " + $(this).parent("div").find("span").text());
    if (potwierdz === true) {
        var nrWiersza = parseInt($(this).attr("id").toString().split("-")[1]);
        //alert("usuwanie " + nrWiersza);
        $(this).remove();
        remove_object(nrWiersza);
    }
}

function remove_object(nr_objektu) {

// alert("dł " + $("#list_of_objects").find("tr").length );
    if (nr_objektu > 1) {
// alert("dziala if");
// $("#tables_object" + (nr_objektu - 1)).removeClass("ukryty_protokol");
// $("#switch_protocol-1").click();
        var protocol_id = "tables_object" + nr_objektu;
        $("#" + protocol_id).html(" ");
        $("#objekt_nr-" + nr_objektu).remove();
        $("#switch_protocol-" + nr_objektu).remove();
        $("#li_object_nr-" + nr_objektu).remove();
        $("#switch_protocol-1").click();
    }

}

// funkcja dodaje nowe kontrolowane objekty do tabeli
// oraz ładuje protokol (tabeli z pliku do div -ów)
// dodawany jest zawsze ostatni wiersz
function add_new_object() {
// alert("dziala");

    var nrWiersza = parseInt($("#pojemnik_na_objekty").find(".object").last().attr("id").toString().split("-")[1]);
    if (nrWiersza === 10) {
        return;
    }

    var nowyNrWiersza = nrWiersza + 1;
    var nowy_wiersz_wykazu = $("#lista_objektow").find("li").first().clone();
    var nowe_id = nowy_wiersz_wykazu.attr("id").toString().split("-")[0] + "-" + nowyNrWiersza;
    nowy_wiersz_wykazu.attr("id", nowe_id);
    nowy_wiersz_wykazu.find(".li_nazwa_objectu").html("Bez nazwy " + nowyNrWiersza);
    nowy_wiersz_wykazu.insertAfter($("#lista_objektow").find("li").last());
    dodaj_wiesz_listy_objektow(nowyNrWiersza);
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
    zmiana_odnosnikow_spisu_tresci(nrWiersza);
    // zmiana odnośników

}

function zmiana_odnosnikow_spisu_tresci(nrWiersza) {
    $("a.dynamic").each(function() {
        var nowy_cel;
        var cel = $(this).attr("href").toString();
        var cel2 = cel.match(/.\w*/);
        //alert("cel2 " + cel2);
        console.log("cel = " + cel2);
        nowy_cel = cel2 + "-" + nrWiersza;
        $(this).attr("href", nowy_cel);
    });
}
function oblicz_watrosci_wymagane() {

    var nr_protokolu = $(this).attr("id").toString().split("-")[1].toString();
    console.log("dziala obliczanie wart wymaganych dla protokolu nr = " + nr_protokolu);
    czysc_wymagane(nr_protokolu);
    //$("#kontrola").click();
    var kategoria_objektu = $('#kategoria_objektu-' + nr_protokolu).find(
            "option:selected").val();
    var wysokosc_budynku = $("#wysokosc_budkunku-" + nr_protokolu).find(
            'option:selected').val();
    var liczba_kondygnacji_naziemnych = $("#liczba_kondyg_nadziemnych_instniejaca-" + nr_protokolu).val();
    console.log("kategoria budynku = " + kategoria_objektu);
    console.log('wysokosc_budkunku =' + wysokosc_budynku);
    console.log('liczba_kondyg_nadziemnych_instniejaca = ' + liczba_kondygnacji_naziemnych);
    if ((kategoria_objektu == "PM") || (kategoria_objektu == "PM")) {
// obliczenia dla PM i IN
        console.log("Obliczenia dla PM");
        var gestosc_obciazenia_ogniowego = get_gObciazenia_Ogniowego(nr_protokolu);
        console.log("G�sto�� OO = " + gestosc_obciazenia_ogniowego);
        if (liczba_kondygnacji_naziemnych == 1) {
            console.log("ustawiam wysokosc_budynku na J");
            wysokosc_budynku = "J";
        }

        console.log("wysokosc_budynku " + wysokosc_budynku);
        var klasa_odpornosci_pozarowej = klasa_op_dla_PM[gestosc_obciazenia_ogniowego][wysokosc_budynku];
        console.log("Klasa odpor. pozar = " + klasa_odpornosci_pozarowej);
        $('#klasa_odpor_wymagana-' + nr_protokolu).text(
                klasa_odpornosci_pozarowej);
        $('#konstrukcja_nos_wymagana-' + nr_protokolu).text(
                wymogi_elementow[klasa_odpornosci_pozarowej]["KN"]);
        $('#konstrukcja_dachu_wymagana-' + nr_protokolu).text(
                wymogi_elementow[klasa_odpornosci_pozarowej]["KD"]);
        $('#strop_wymagana-' + nr_protokolu).text(
                wymogi_elementow[klasa_odpornosci_pozarowej]["STROP"]);
        $('#sciana_zewnetrzna_wymagana-' + nr_protokolu).text(
                wymogi_elementow[klasa_odpornosci_pozarowej]["SZ"]);
        $('#sciana_wewnetrzna_wymagana-' + nr_protokolu).text(
                wymogi_elementow[klasa_odpornosci_pozarowej]["SW"]);
        $('#pokrycie_dachu_wymagana-' + nr_protokolu).text(
                wymogi_elementow[klasa_odpornosci_pozarowej]["PD"]);
        //koniec oblicze� dla PM


    } else if ((kategoria_objektu.length > 0) && (wysokosc_budynku.length > 0)) {
// obliczenia dla ZL bez obnizania kategorii
        console.log("Obliczenia ZL");
        if (liczba_kondygnacji_naziemnych == 1) {
            console.log("ustawiam wysokosc_budynku na J");
            wysokosc_budynku = "J";
        }

        console.log("wysokosc_budynku " + wysokosc_budynku);
        var klasa_odpornosci_pozarowej = klasa_op_dla_ZL[wysokosc_budynku][kategoria_objektu];
        console.log("Klasa odpor. pozar = " + klasa_odpornosci_pozarowej);
        $('#klasa_odpor_wymagana-' + nr_protokolu).text(
                klasa_odpornosci_pozarowej);
        $('#konstrukcja_nos_wymagana-' + nr_protokolu).text(
                wymogi_elementow[klasa_odpornosci_pozarowej]["KN"]);
        $('#konstrukcja_dachu_wymagana-' + nr_protokolu).text(
                wymogi_elementow[klasa_odpornosci_pozarowej]["KD"]);
        $('#strop_wymagana-' + nr_protokolu).text(
                wymogi_elementow[klasa_odpornosci_pozarowej]["STROP"]);
        $('#sciana_zewnetrzna_wymagana-' + nr_protokolu).text(
                wymogi_elementow[klasa_odpornosci_pozarowej]["SZ"]);
        $('#sciana_wewnetrzna_wymagana-' + nr_protokolu).text(
                wymogi_elementow[klasa_odpornosci_pozarowej]["SW"]);
        $('#pokrycie_dachu_wymagana-' + nr_protokolu).text(
                wymogi_elementow[klasa_odpornosci_pozarowej]["PD"]);
    } else {
// jesli brakuje danych
        $('#klasa_odpor_wymagana-' + nr_protokolu).text("__ ");
    }

}


function czysc_wymagane(nr_protokolu) {

    $('#klasa_odpor_wymagana-' + nr_protokolu).text("--");
    $('#konstrukcja_nos_wymagana-' + nr_protokolu).text("--");
    $('#konstrukcja_dachu_wymagana-' + nr_protokolu).text("--");
    $('#strop_wymagana-' + nr_protokolu).text("--");
    $('#sciana_zewnetrzna_wymagana-' + nr_protokolu).text("--");
    $('#sciana_wewnetrzna_wymagana-' + nr_protokolu).text("--");
    $('#pokrycie_dachu_wymagana-' + nr_protokolu).text("--");
}

function get_gObciazenia_Ogniowego(nr_protokolu) {

    var goo1 = $("#gestosc_obciazenia_ogniowego_istniejaca-" + nr_protokolu).val();
    var goo = parseInt(goo1);
    console.log("Goo = " + goo + goo1);
    if (goo <= 500) {
        return "DO_500";
    }
    else if (goo <= 1000) {
        return "DO_1000";
    }
    else if (goo <= 2000) {
        return "DO_2000";
    }
    else if (goo <= 4000) {
        return "DO_4000";
    }
    else if (goo > 4000) {
        return "POWYZEJ_4000";
    }
    else {
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
                _id: new Date().toISOString(),
                kontener: content,
                completed: false
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
