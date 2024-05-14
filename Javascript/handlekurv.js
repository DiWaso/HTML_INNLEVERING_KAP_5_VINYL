let handleKurven = JSON.parse(localStorage.getItem("handleKurven")) || []; // Henter handlekurven fra den lokale lagringsplassen og gjør den om til en array (siden lokal lagring lagres som en string). Hvis det ikke er noe å hente settes det til å være en tom array

let prodNavn = document.querySelector("#tekst h1");
let prodPris = document.querySelector("#tekst p");
let prodBilde = document.querySelector("#bilde img");

let prisNummer = Number(prodPris.innerHTML.replace(",00 kr", "")) // Fjerner ,00 kr endelsen til alle produktene for å få prisen uten noe ekstra tegn bak

let buttonEl = document.querySelector("#leggIHandlekurvenBtn");
let meldingEl = document.createElement("div");

buttonEl.addEventListener("click", leggIHandlekurven); // Hvis "Legg i handlekurven" knappen blir trykket på kalles funksjonen leggIHandlekurven

function leggIHandlekurven() {
    let produktIndex = -1;

    for (let i = 0; i < handleKurven.length; i++) {
        let produkt = handleKurven[i];
        if (produkt.navn === prodNavn.innerHTML && produkt.bilde === prodBilde.src) { // Sjekker om produktet finnes allerede
            produktIndex = i; // Hvis det gjør blir produktIndex-en satt til I og for-løkken stoppes ved bruk av break
            break;
        }
    }

    if (produktIndex !== -1) { // Hvis produktet finnes blir antallet av det produktet økt med 1
        handleKurven[produktIndex].antall++;
        handleKurven[produktIndex].pris = prisNummer * handleKurven[produktIndex].antall; // Total prisen regnes ved å bruke original prisen og gange det med det nye antallet av det samme produktet
    } else { // Hvis produktet ikke finnes blir det laget her som ett objekt
        let objekt = { // Objektet inneholder et navn, en pris, et bilde, og et antall som i starten alltid er 1
            navn: prodNavn.innerHTML,
            pris: prisNummer,
            bilde: prodBilde.src,
            antall: 1
        };
        handleKurven.push(objekt); // Så legges objektet inn i handlekurv-arrayen
    }
    
    localStorage.setItem("handleKurven", JSON.stringify(handleKurven)); // Her lagrer vi handlekurven i den lokale lagringsplassen. Vi gir den samme navnet i den lokale lagringsplassen og gjør den om til string

    meldingEl.innerHTML = 'Produktet er lagt til i handlekurven!'; // Viser en melding om at produktet er lagt til i handlekurven
    buttonEl.parentNode.appendChild(meldingEl); // Setter meldingen under knappen ved bruk av parentNode. parentNode definerer et elementet som holder knappen er "hoved" diven og når vi da bruker appendChild så sier vi at meldingen skal legges til under hoved diven.
}