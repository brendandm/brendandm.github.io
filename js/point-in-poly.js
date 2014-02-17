$(document).ready(function () {

    $.ajax({
        url: 'js/counties.json',
        dataType: 'json',
        success: function load(d) {

            var counties = L.geoJson(d, {

                style: {
                    "color": "rgba(0,0,0,0.4)",
                    "weight": 1,
                    "opacity": 0.5
                }

            });

            for (var i = 0; i < MotherShip.length; i++) {

                var grant = MotherShip[i];

                var inside;

                if (grant.geometry.type === "Point") {

                    var longitude = grant.geometry.coordinates[0];

                    var latitude = grant.geometry.coordinates[1];

                    inside = leafletPip.pointInLayer([longitude, latitude], counties, true);

                    if (inside.length > 0) {

                        grant.countyns = inside[0].feature.properties.COUNTYNS;

                        var json = JSON.stringify(grant);

                        $('body').append(json + "," + "<br/>");

                    }
                }

                inside = "";

            }

            //console.log(ches);

        }

    });

});