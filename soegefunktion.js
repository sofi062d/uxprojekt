/**
 * file: xml-seek-word.html
 * formål: henter data om bøger fra EAAA Bibliotekets API
 **/
$(document).ready(function () {

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
    });

    $("#webdesign").click(function () {
        $("#myTextBox").val("Webdesign").change();
        $("#submit").trigger("click");
    });

    $("#grafisk").click(function () {
        $("#myTextBox").val("Grafisk design").change();
        $("#submit").trigger("click");
    });

    $("#multi").click(function () {
        $("#myTextBox").val("Multimediedesign").change();
        $("#submit").trigger("click");
    });

    // format the searchstring
    $('#submit').click(function () {

        // "renser" #indhold ...
        $('#indhold').html('');
        //$('#test').hide();



        // henter data via AJAX
        $.ajax({
            type: "GET",
            url: wrd,
            cache: false,
            dataType: "xml",
            success: function (xml) {

                //console.log(xml);
                // viser XML-strukturen i console-inspect-tool

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
                    $('#indhold').append('<div class="bog">' + // .bog en bogkasse begynder
                        '<a href="' + permalink + '" target="_blank">' + visBillede(billede) + '</a>' + // billede
                        '<h3>' + titel + '</h3>' + // titel
                        '<h4> Forfatter: ' + forfatter + '</h4>' + // forfatter
                        // visBillede( billede ) + // skriver kun billedtag, hvis der er et billede
                        '<p>Beskrivelse: ' + beskrivelse + '</p>' + // beskrivelse
                        '<p>Udgivelse: ' + pubdate.substring(0, 16) + '</p>' + // tryk: dato
                        '<a href="' + permalink + // permalink
                        '</div>' // bogkasse slut
                    );
                })
            }
        }); // ajax slut
    }); // #submit klik slut
}); // document ready slut
