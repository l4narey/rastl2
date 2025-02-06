function getLocation() {
    const status = document.getElementById("status");

    if (!navigator.geolocation) {
        status.textContent = "Geolocalização não suportada pelo navegador.";
        return;
    }

    status.textContent = "Obtendo localização...";

    navigator.geolocation.getCurrentPosition(
        (position) => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            status.textContent = `Latitude: ${latitude}, Longitude: ${longitude}`;
            console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
        },
        (error) => {
            status.textContent = `Erro: ${error.message}`;
            console.error("Erro ao obter localização:", error);
        },
        {
            enableHighAccuracy: true, 
            timeout: 10000, 
            maximumAge: 0, 
        }
    );
}
