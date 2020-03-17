"use strict";

function findBoegerMed(forfatter) {
    fetch('http://openlibrary.org/search.json?author="' + forfatter + '"')
        .then(function (data) {
            return data.json();
        })
        .then(function (post) {


            const paneloverskrift = [];
            paneloverskrift[0] = document.getElementById("paneloverskrift0");
            paneloverskrift[1] = document.getElementById("paneloverskrift1");
            paneloverskrift[2] = document.getElementById("paneloverskrift2");
            const paneltekst = [];
            paneltekst[0] = document.getElementById("paneltekst0");
            paneltekst[1] = document.getElementById("paneltekst1");
            paneltekst[2] = document.getElementById("paneltekst2");


            for (let i = 0; i < 3; i++) {
                paneloverskrift[i].innerText = post.docs[i].title;
                paneltekst[i].innerHTML = `<p> Publiceret år: ${
                        post.docs[i].publish_year
                    } </p>  <p> Udgivet af: ${
                        post.docs[i].publisher
                    } </p>  <p> ISBN: ${
                        post.docs[i].isbn[1]
                    } </p>`;
            }
            document.getElementById("overskrift").innerHTML =
                ` Bøger om:  ${post.docs[0].author_name} `;
        })
        .catch(function (e) {
            console.log(e);
        })
}

document.getElementById("soegeknap").addEventListener("click", function () {
    const forfatter = document.getElementById("soegefelt").value;
    findBoegerMed(forfatter);

})



//Knap til søgefelt funktion - virker ikke endnu...
document.getElementById("knap").addEventListener("click", function () {
    document.getElementById("knap").value = document.getElementById("soegefelt").value;

})
