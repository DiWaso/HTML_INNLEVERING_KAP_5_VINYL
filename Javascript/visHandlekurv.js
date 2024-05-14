window.addEventListener('DOMContentLoaded', function() { // Med en gang DOM-treet er lastet inn vil den kjøre denne JavaScript funksjonen som viser handlekurven
    let lagretHandlekurv = localStorage.getItem('handleKurven'); // Henter handlekurven fra localStorage
    if (lagretHandlekurv) { // Hvis lagretHandlekurv er alt untatt null, undefined, 0, NaN, "", eller false så er den sann og vil da gå videre
        handleKurven = JSON.parse(lagretHandlekurv); // Gjør handlekurven om til en array
        visHandlekurv(); // Viser handlekurven
    }
})

function visHandlekurv() {
    let produkterDivEl = document.querySelector("#produkter"); // Henter div-elementet #produkter fra handlekurv.html
    let summenDivEl = document.querySelector("#summen"); // Henter div-elementet #summen fra handlekurv.html
    let summenAvProduktene = 0;
    produkterDivEl.innerHTML = '';
    summenDivEl.innerHTML = '';
    if (handleKurven.length === 0) { // Hvis handlekurven er tom så vises default meldingen
        produkterDivEl.innerHTML = '<h3>Handlekurven din er tom.</h3>';
        summenDivEl.innerHTML = '<h3>Gå og kjøp noe!</h3>';
    } else { // Hvis handlekurven ikke er tom
        for (let i = 0; i < handleKurven.length; i++) {
            let produkt = handleKurven[i];
            summenAvProduktene += produkt.pris; // Legger til prisen av hvert produkt for å få en total sum til slutt
            let produktBilde = '<img src=' + '"' + produkt.bilde + '" width="100px">';
            let produktNavn = '<h3>' + produkt.navn + '</h3>';
            let produktAntall = '<p> Antall: ' + produkt.antall + '</p>'
            let produktPris = '<p> Pris: ' + produkt.pris + ',00 kr' + '</p>';
            let fjernVareKnapp = '<button class="fjernVare" onclick="fjernVare(\'' + produkt.navn + '\')">✖</button>'; // Hvis krysset oppe til høyre av vært produkt blir trykket på vil 1 eksemplar av produktet slettes ved å kalle fjernVare funksjonen
            let produktDiv = document.createElement('div');
            produktDiv.innerHTML = produktBilde + produktNavn + produktAntall + produktPris + fjernVareKnapp; // Legger inn bilde av produktet, navnet, antall av det samme produktet, prisen av produktene basert på hvor mange deter av samme antall, og en knapp som lar deg fjerne produktet en om gangen

            produkterDivEl.appendChild(produktDiv); // Legger til produktet inn i "hoved"-diven
        }

        let fjernAlleVarerKnapp = '<button id="fjernAlleVarer" onclick="fjernAlleVarer()">Fjern alle varer</button>' // Lager en "Fjern alle varer" knapp
        summenDivEl.innerHTML = '<h3>Beløp å betale: ' + summenAvProduktene + ',00 kr</h3>' + fjernAlleVarerKnapp; // Viser totale summen man må betale
    }
}

function fjernVare(produktNavn) { // Funksjonen for å fjerne en vare
    let produkterDivEl = document.querySelector("#produkter"); // Henter div-elementet som inneholder alle produktene
    let produkter = produkterDivEl.querySelectorAll("div"); // Velger spesfikt div-elementene inne i #produkter-diven

    for (let i = handleKurven.length - 1; i >= 0; i--) { // Går baklengs i arrayen
        if (handleKurven[i].navn === produktNavn) { // Når den har funnet produktet som skal fjernes går den ned og gjør det som står i if-statementen
            let PrisPerProdukt = handleKurven[i].pris / (handleKurven[i].antall); // Finner prisen av 1
            handleKurven[i].pris -= PrisPerProdukt; // Trekker prisen av 1 fra totale prisen
            handleKurven[i].antall--; // Trekker antall eksemplarer ned med 1

            if (handleKurven[i].antall == 0) { // Hvis antall eksemplarer av produktet er 0 så:
                for (let j = 0; j < produkter.length; j++) {
                    if (produkter[j].querySelector("h3").innerHTML == produktNavn) { // Henter navnet til produktet og sjekker om det stemmer med navnet til produktet vi skal fjerne fra handlekurven
                        produkterDivEl.removeChild(produkter[j]); // Når produktet er funnet slettes hele div elementet fra "hoved"-diven
                    }
                }
                handleKurven.splice(i, 1); // Fjerner produktet fra handlekurv arrayen
            } else { // Hvis det er fortsatt noen eksemplarer igjen av produktet så:
                for (let j = 0; j < produkter.length; j++) {
                    if (produkter[j].querySelector("h3").innerHTML == produktNavn) { // Leter etter navnet til produktet som ble fjernet
                        let antallElement = produkter[j].querySelector("p:nth-of-type(1)"); // Henter teksten som viser antall eksemplarer
                        let prisElement = produkter[j].querySelector("p:nth-of-type(2)"); // Henter teksten som viser prisen
                        antallElement.innerHTML = "Antall: " + handleKurven[i].antall; // Oppdaterer antall eksemplarer som står på siden
                        prisElement.innerHTML = "Pris: " + handleKurven[i].pris + ",00 kr"; // Oppdaterer prisen som står på siden
                    }
                }
            }
            visHandlekurv(); // Skjører visHandlekurv funksjonen igjen for å oppdatere siden
            break; // Bryter ut av løkken siden vi er ferdige og trenger ikke å fortsette gjennom de andre produktene
        }
    }

    localStorage.setItem('handleKurven', JSON.stringify(handleKurven)); // Lagrer den oppdaterte handlekurven i den lokale lagringsplassen
}

function fjernAlleVarer() { // En funksjon for å fjerne alle varer
    localStorage.clear(); // Tømmer hele lokale lagringsplassen
    handleKurven = []; // Tømmer handlekurv arrayen
    visHandlekurv(); // Oppdaterer siden
}