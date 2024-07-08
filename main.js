function initMap() {

    const SG_BOUNDS = {
        north: 1.52710,
        south: 1.18571,
        west: 103.57388,
        east: 104.08584,
    };

    /* Location Markers */
    const markers = [
        {
            locationName:"Junction 8",
            lat: 1.3503771216289602, 
            lng: 103.84908849332001,
            address:"9 Bishan Pl, Singapore 579837",
            link:"https://www.google.com.sg"
        },{
            locationName:"Google Singapore",
            lat: 1.2761807,
            lng: 103.7974598,
            address:"70 Pasir Panjang Rd, #03-71 Mapletree Business City II, Singapore 117371",
            link:"https://www.google.com.sg"
        }
    ];

    const junc8Coordinates = [
        { lat: 1.351623750973524, lng: 103.84750888896363 },
        { lat: 1.351850594046744, lng: 103.85194112397122 },
        { lat: 1.3478127841778096,lng: 103.85133604069372 },
        { lat: 1.348493314400655, lng: 103.84608694326155 },
        { lat: 1.351623750973524, lng: 103.84750888896363 },
      ];

    

    const centerMap = {lat:1.3559772, lng: 103.8125937}

    const mapOptions = {
        center: centerMap,
        zoom: 10,
        disableDefaultUI: true,
        mapTypeId: "satellite",
        restriction: {
            latLngBounds: SG_BOUNDS,
            strictBounds:false
        },
        clickableIcons: false,
        styles: [
            {
                "featureType": "water",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#e9e9e9"
                    },
                    {
                        "lightness": 17
                    }
                ]
            },
            {
                "featureType": "landscape",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#f5f5f5"
                    },
                    {
                        "lightness": 20
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#ffffff"
                    },
                    {
                        "lightness": 17
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "geometry.stroke",
                "stylers": [
                    {
                        "color": "#ffffff"
                    },
                    {
                        "lightness": 29
                    },
                    {
                        "weight": 0.2
                    }
                ]
            },
            {
                "featureType": "road.arterial",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#ffffff"
                    },
                    {
                        "lightness": 18
                    }
                ]
            },
            {
                "featureType": "road.local",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#ffffff"
                    },
                    {
                        "lightness": 16
                    }
                ]
            },
            {
                "featureType": "poi",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#f5f5f5"
                    },
                    {
                        "lightness": 21
                    }
                ]
            },
            {
                "featureType": "poi.park",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#dedede"
                    },
                    {
                        "lightness": 21
                    }
                ]
            },
            {
                "elementType": "labels.text.stroke",
                "stylers": [
                    {
                        "visibility": "on"
                    },
                    {
                        "color": "#ffffff"
                    },
                    {
                        "lightness": 16
                    }
                ]
            },
            {
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "saturation": 36
                    },
                    {
                        "color": "#333333"
                    },
                    {
                        "lightness": 40
                    }
                ]
            },
            {
                "elementType": "labels.icon",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "transit",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#f2f2f2"
                    },
                    {
                        "lightness": 19
                    }
                ]
            },
            {
                "featureType": "administrative",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#fefefe"
                    },
                    {
                        "lightness": 20
                    }
                ]
            },
            {
                "featureType": "administrative",
                "elementType": "geometry.stroke",
                "stylers": [
                    {
                        "color": "#fefefe"
                    },
                    {
                        "lightness": 17
                    },
                    {
                        "weight": 1.2
                    }]
            }
        ]
    }


    const map = new google.maps.Map(document.getElementById('gmap'), mapOptions);

    map.setTilt(45);

    

    const junc8Line = new google.maps.Polyline({
        path: junc8Coordinates,
        geodesic: true,
        strokeColor: "#FF0000",
        strokeOpacity: 1.0,
        strokeWeight: 2,
    });

    junc8Line.setMap(map);

    const infoWindow = new google.maps.InfoWindow({
        minWidth:250,
        maxWidth:250
    })

    const bounds = new google.maps.LatLngBounds();

    var centerOfMarkers;

    for (let i = 0; i < markers.length; i++) {
        const marker = new google.maps.Marker({
            position: { lat: markers[i]['lat'], lng: markers[i]['lng'] }, 
            map: map
        });

        function createInfoWindows() {
            const infoWindowContent = `
                <div class="infoWindow" style="overflow:hidden">
                    <h3>${markers[i]['locationName']}</h3>
                    <address>
                        ${markers[i]['address']}
                    </address>
                    <button onclick="window.open('${markers[i]['link']}','_blank')"> Find out more </button>
                </div>
            `;

            google.maps.event.addListener(marker, 'click', function() {

                infoWindow.setContent(infoWindowContent);
                infoWindow.open(map, marker);

                map.setTilt(45);

                map.panTo(marker.getPosition());
                smoothZoom(map, 19, map.getZoom());
            });
            

        }
        createInfoWindows();

        infoWindow.addListener('closeclick', function() {
            // map.fitBounds(bounds);
            map.setTilt(0);

        });


        bounds.extend(new google.maps.LatLng(markers[i]['lat'], markers[i]['lng']));
        map.fitBounds(bounds);
        centerOfMarkers=bounds;
    } 

    const resetButton = document.querySelector(".btn");

    // Add click event listener to the button
    resetButton.addEventListener("click", function() {
        // map.setCenter(centerMap);
        infoWindow.close();
        map.fitBounds(centerOfMarkers);
        map.setZoom(12.6);
        
    });

}

// Smooth zoom function
function smoothZoom (map, max, cnt) {
    if (cnt >= max) {
        return;
    }
    else {
        z = google.maps.event.addListener(map, 'zoom_changed', function(event){
            google.maps.event.removeListener(z);
            smoothZoom(map, max, cnt + 1);
        });
        setTimeout(function(){map.setZoom(cnt)}, 75); 
    }
}  


