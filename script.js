/*
Based on and inspired by http://www.itnetwork.cz
 */

let tabulka;
let panel;
let divTabulky;
let vychoziVelikostX = 4;
let vychoziVelikostY = 10;

let aktivniBunka;

function vytvorVychoziTabulku() {
    divTabulky = document.createElement("div");
    divTabulky.id = "divTab";
    document.body.appendChild(divTabulky);
    tabulka = document.createElement("table");
    divTabulky.appendChild(tabulka);
    for (let y = 0; y < vychoziVelikostY; y++) {
        let tr = document.createElement("tr");
        tabulka.appendChild(tr);

        for (let x = 0; x < vychoziVelikostX; x++) {
            tr.appendChild(vytvorBunku());
        }
    }
}

function vytvorTlacitkoAVlozHo(popisek, rodic) {
    let btn = document.createElement("button");
    btn.textContent = popisek;
    rodic.appendChild(btn);
    return btn;
}

function vytvorOvladaciTlacitka() {
    panel = document.createElement("div");
    panel.id = "panel";
    document.body.appendChild(panel);
    vytvorTlacitkoAVlozHo("Přidat řádek dolů", panel).onclick = pridejRadekDolu;
    vytvorTlacitkoAVlozHo("Přidat řádek nahoru", panel).onclick = pridejRadekNahoru;
    vytvorTlacitkoAVlozHo("Přidat sloupec vlevo", panel).onclick = pridejSloupecDoleva;
    vytvorTlacitkoAVlozHo("Přidat sloupec vpravo", panel).onclick = pridejSloupecDoprava;
    vytvorTlacitkoAVlozHo("Odstranit řádek", panel).onclick = smazRadek;
    vytvorTlacitkoAVlozHo("Odstranit sloupec", panel).onclick = smazSloupec;
}

function vytvorBunku() {
    let td = document.createElement("td");
    let tdInput = document.createElement("input");
    tdInput.type = "text";
    tdInput.onfocus = function() {
        aktivniBunka = this;
    }
    td.appendChild(tdInput);
    return td;
}

function vytvorRadek() {
    let novyRadek = document.createElement("tr");
    let prvniRadek = tabulka.firstElementChild;
    let bunkyPrvnihoRadku = prvniRadek.childNodes;
    let pocetBunekVPrvnimRadku = bunkyPrvnihoRadku.length;
    for (let i = 0; i < pocetBunekVPrvnimRadku; i++) {
        novyRadek.appendChild(vytvorBunku());
    }
    return novyRadek;
}

function indexRadkuAktivniBunky() {
    let cilHledani = tabulka.childNodes;
    let hledanyPrvek = aktivniBunka.parentElement.parentElement;
    return Array.prototype.indexOf.call(cilHledani, hledanyPrvek); //musime pouzit Array.prototype, protoze na kolekci nelze pouzit samotne indexOf
}

function indexSloupceAktivniBunky() {
    let bunkyVRadku = aktivniBunka.parentElement.parentElement.childNodes;
    let td = aktivniBunka.parentElement;
    return Array.prototype.indexOf.call(bunkyVRadku, td);
}

function pridejRadekNahoru() {
    let radek = vytvorRadek();
    let indexVybraneho = indexRadkuAktivniBunky();
    tabulka.insertBefore(radek, tabulka.childNodes[indexVybraneho]);
}

function pridejRadekDolu() {
    let radek = vytvorRadek();
    let indexVybraneho = indexRadkuAktivniBunky();
    if (tabulka.lastChild == tabulka.childNodes[indexVybraneho]) { //pokud jsme na konci tabulky, tak se jen prida novy radek pomoci appendChild
        tabulka.appendChild(radek);
    } else {
        tabulka.insertBefore(radek, tabulka.childNodes[indexVybraneho + 1]); //funkce insertAfter neexistuje, proto to +1
    }
}

function pridejSloupecDoleva() {
    let indexVybraneho = indexSloupceAktivniBunky();
    for (let i = 0; i < tabulka.childNodes.length; i++) {
        tabulka.childNodes[i].insertBefore(vytvorBunku(), tabulka.childNodes[i].childNodes[indexVybraneho]);
    }
}

function pridejSloupecDoprava() {
    let indexVybraneho = indexSloupceAktivniBunky();
    for (let i = 0; i < tabulka.childNodes.length; i++) {
        if (tabulka.childNodes[i].childNodes[indexVybraneho] == tabulka.childNodes[i].lastElementChild) {
            tabulka.childNodes[i].appendChild(vytvorBunku());
        } else {
            tabulka.childNodes[i].insertBefore(vytvorBunku(), tabulka.childNodes[i].childNodes[indexVybraneho + 1]);
        }
    }
}

function smazRadek() {
    let indexVybraneho = indexRadkuAktivniBunky();
    tabulka.removeChild(tabulka.childNodes[indexVybraneho]);
}

function smazSloupec() {
    let indexVybraneho = indexSloupceAktivniBunky();
    for (let i = 0; i < tabulka.childNodes.length; i++) {
        tabulka.childNodes[i].removeChild(tabulka.childNodes[i].childNodes[indexVybraneho]);
    }
}

window.onload = function() {
    vytvorOvladaciTlacitka();
    vytvorVychoziTabulku();
    panelTlacitek();

}