/**
 * file: xml-seek-word.html
 * formål: henter data om bøger fra EAAA Bibliotekets API
 **/
$(document).ready(function () {

    const paneloverskrift = [];
    paneloverskrift[0] = "#paneloverskrift0";
    paneloverskrift[1] = "#paneloverskrift1";
    paneloverskrift[2] = "#paneloverskrift2";
    const paneltekst = [];
    paneltekst[0] = "#paneltekst0";
    paneltekst[1] = "#paneltekst1";
    paneltekst[2] = "#paneltekst2";

    $("#accordion_section").hide();

    // get user input
    $("#myTextBox").on("change paste keyup ", function () {

        // query:
        wrd = 'https://eaaa.reindex.net/EAAA/main/Api.php?Focus=rsshitlist&qe='
        wrd += encodeURIComponent($(this).val()) // uri encoder søgestrengen
        wrd += '&pagesize=24&page=1&format=rss';

        //let link = $('#test'); // viser uri til APIen som link i browseren
        //link.html('<a href="' + wrd + '">' + wrd + '</a>');

        //$('#test').show();

    });

    $("#markedf").click(function () {
        $("#myTextBox").val("Markedsøkonomi").change();
        $("#submit").trigger("click");
        $("#accordion_section").show();
    });

    $("#webdesign").click(function () {
        $("#myTextBox").val("Webdesign").change();
        $("#submit").trigger("click");
        $("#accordion_section").show();
    });

    $("#grafisk").click(function () {
        $("#myTextBox").val("Grafisk design").change();
        $("#submit").trigger("click");
        $("#accordion_section").show();
    });

    $("#multi").click(function () {
        $("#myTextBox").val("Multimediedesign").change();
        $("#submit").trigger("click");
        $("#accordion_section").show();
    });

    // format the searchstring
    $('#submit').click(function () {

        // "renser" #indhold ...
        $('#indhold').html('');
        //$('#test').hide();

        $("#accordion_section").show();


        // henter data via AJAX
        $.ajax({
            type: "GET",
            url: wrd,
            cache: false,
            dataType: "xml",
            success: function (xml) {

                //console.log(xml);
                // viser XML-strukturen i console-inspect-tool
                let i = 0;
                $("#overskrift").html("Bøger om " + $("#myTextBox").val());

                $(xml).find('item').each(function () { // ved hver <item> gøres følgende ...

                    // vælger data med .find() og gemmer dem i variabler
                    let titel = $(this).find('title').text();
                    let forfatter = $(this).find('author').text();
                    let beskrivelse = $(this).find('description').text();
                    let billede = $(this).find('enclosure').attr("url");
                    // src til billedet
                    let permalink = $(this).find('link').text();
                    let pubdate = $(this).find('pubDate').text();


                    // er der et billede? J/N?
                    function visBillede(img) {
                        if (img !== undefined) { // hvis img ikke er undefined
                            return '<img class="center" src="' + img + '" alt="billede af bogen">';
                        }
                        if (img == undefined) { // hvis billede er undefined
                            return '<!-- billede af forsiden mangler -->';
                        }
                    }

                    // tilføjer (append) markup til #indhold

                    $(paneloverskrift[i]).html(titel);

                    $(paneltekst[i]).html('<div class="bog">' + // .bog en bogkasse begynder
                        '<a href="' + permalink + '" target="_blank">' + visBillede(billede) + '</a>' + // billede
                        '<h3>' + titel + '</h3>' + // titel
                        '<h4> Forfatter: ' + forfatter + '</h4>' + // forfatter
                        // visBillede( billede ) + // skriver kun billedtag, hvis der er et billede
                        '<p>Beskrivelse: ' + beskrivelse + '</p>' + // beskrivelse
                        '<p>Udgivelse: ' + pubdate.substring(0, 16) + '</p>' + // tryk: dato
                        '<a href="' + permalink + // permalink
                        '</div>' // bogkasse slut
                    );
                    i++;
                })
            }
        }); // ajax slut
    }); // #submit klik slut
}); // document ready slut
