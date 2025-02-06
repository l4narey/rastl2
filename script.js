document.getElementById("obterEndereco").addEventListener("click", function() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        console.log("Geolocalização não é suportada neste navegador.");
    }
});

function showPosition(position) {
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;

    // Substitua pela sua chave da API
    var apiKey = "SUA_CHAVE_DE_API_DO_GOOGLE_MAPS";
    
    var url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.results.length > 0) {
                var endereco = data.results[0].formatted_address;
                document.getElementById("localizacao").innerHTML = "Endereço: " + endereco;
            } else {
                document.getElementById("localizacao").innerHTML = "Endereço não encontrado!";
            }
        })
        .catch(error => {
            console.error("Erro ao buscar o endereço: ", error);
            document.getElementById("localizacao").innerHTML = "Erro ao obter localização!";
        });
}
