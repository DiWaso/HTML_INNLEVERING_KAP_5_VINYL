document.addEventListener("DOMContentLoaded", function() { // Med en gang DOM-treet er lastet inn vil den kjøre denne JavaScript funksjonen som lager menyen som er ovenfor på alle sider
    let header = '<header class="menybar"><div class="menybar-logo"><img src="../Ikoner/logo.png"><nav class="menybar-nav"><ul><li><a href="index.html">Hjem</a></li><li><a href="alle_artister.html">Artister</a><ul><li><a href="frank_ocean.html">Frank Ocean</a></li><li><a href="djo.html">Djo</a></li><li><a href="pierce_the_veil.html">Pierce The Veil</a></li><li><a href="queen.html">Queen</a></li></ul></li></ul></nav></div><div class="menybar-handlekurv"><a href="handlekurv.html"><div id="menybar-handlekurv-funksjon"></div>Handlekurv</a></div></header>';

    document.body.insertAdjacentHTML("afterbegin", header) // Legger inn header-elementet som det aller første inn i body-en til vær HTML side som åpnes
});
