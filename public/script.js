document.getElementById("obterEndereco").addEventListener("click", function() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
        console.log("Geolocalização não é suportada neste navegador.");
        document.getElementById("localizacao").innerHTML = "Geolocalização não suportada.";
    }
});

function showPosition(position) {
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;

    console.log("Latitude: " + latitude + ", Longitude: " + longitude);

    // Substitua pela sua chave da API
    var apiKey = "AIzaSyDuQtrZDbCsLW8AeEYo6ZqXnzeqi2Mq6EA";
    
    var url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log(data); // Log para ver a resposta da API
            if (data.results && data.results.length > 0) {
                var endereco = data.results[0].formatted_address;
                document.getElementById("localizacao").innerHTML = "Endereço: " + endereco;
            } else {
                console.log("Nenhum resultado encontrado");
                document.getElementById("localizacao").innerHTML = "Endereço não encontrado!";
            }
        })
        .catch(error => {
            console.error("Erro ao buscar o endereço: ", error);
            document.getElementById("localizacao").innerHTML = "Erro ao obter localização!";
        });
}

// Função para lidar com erros da geolocalização
function showError(error) {
    switch(error.code) {
        case error.PERMISSION_DENIED:
            console.log("Usuário negou a solicitação de Geolocalização.");
            document.getElementById("localizacao").innerHTML = "Usuário negou a solicitação de Geolocalização.";
            break;
        case error.POSITION_UNAVAILABLE:
            console.log("Informações de localização não disponíveis.");
            document.getElementById("localizacao").innerHTML = "Informações de localização não disponíveis.";
            break;
        case error.TIMEOUT:
            console.log("A solicitação de Geolocalização expirou.");
            document.getElementById("localizacao").innerHTML = "A solicitação de Geolocalização expirou.";
            break;
        case error.UNKNOWN_ERROR:
            console.log("Erro desconhecido.");
            document.getElementById("localizacao").innerHTML = "Erro desconhecido.";
            break;
    }
}
