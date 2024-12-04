function loadGoogleMapsAPI() {
    var script = document.createElement('script');
    script.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyD9mGyoiEpmJ_0vvHFCF2N62kMf2bKcfyg&callback=initialize";
    script.async = true;
    script.defer = true;

    document.body.appendChild(script);
}

loadGoogleMapsAPI();

function initialize() {
    const mapOptions = {
        zoom: 8,
        center: { lat: -34.397, lng: 150.644 }
    };

    const map = new google.maps.Map(document.getElementById('map_canvas'), mapOptions);
}
