(function () {

    var hucStarter = {
        "heading": "Funding by Watershed",
        "geography": "huc8",
        "projects": "737",
        "total": "$77,562,901"
    };

    var countyStarter = {
        "heading": "Funding by County",
        "geography": "county",
        "projects": "737",
        "total": "$77,562,901"
    };

    d3.select(".geo-heading").text(hucStarter.heading);

    d3.select(".geo-funding").text(hucStarter.total);

    d3.select(".geo-projects").text(hucStarter.projects);

    d3.select(".geo-type").text(hucStarter.geography);

    var width = 640,
        height = 880,
        centered;

    var svg = d3.select(".map-container").append("svg")
        .attr("width", width)
        .attr("height", height);

    var projection = d3.geo.albers()
        .translate([width / 2, height / 2])
        .scale(6400)
        .rotate([77.036667, 0])
        .center([0, 39.736667]);

    var path = d3.geo.path()
        .projection(projection);

    var g = svg.append("g");

    d3.json("js/huc8.json", function (error, huc8) {

        g.append("g")
            .attr("class", "watersheds")
            .selectAll("path")
            .data(topojson.feature(huc8, huc8.objects.huc8).features)
            .enter().append("path")
            .attr("d", path)
            .attr("class", function (d) {
                return d.properties.class;
            })
            .on("click", orient);

        g.append("path")
            .datum(topojson.mesh(huc8, huc8.objects.huc8, function (a, b) {
                return a !== b;
            }))
            .attr("d", path)
            .attr("class", "boundary");

    });

    function orient(d) {
        var x, y, k;

        if (d && centered !== d) {
            var centroid = path.centroid(d);
            x = centroid[0];
            y = centroid[1];
            k = 2;
            centered = d;
        } else {
            x = width / 2;
            y = height / 2;
            k = 1;
            centered = null;
        }

        g.selectAll("path")
            .classed("active", centered && function (d) {
                return d === centered;
            });

        g.transition()
            .duration(750)
            .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")scale(" + k + ")translate(" + -x + "," + -y + ")");

        display(d);

    }

    function display(data) {

        d3.selectAll(".level").style({
            "height": "0px"
        });

        d3.selectAll(".program-level").style({
            "width": "0px"
        });

        d3.selectAll(".tip").remove();

        d3.selectAll(".percent").style({
            "display": "block"
        });

        var propFund = (data.properties.funding / 77562901) * 100;

        d3.select(".funding-percent").text(propFund.toFixed(2) + "%");

        var propProj = (data.properties.projects / hucStarter.projects) * 100;

        d3.select(".project-percent").text(propProj.toFixed(2) + "%");

        if (data.id !== "02070010") {

            d3.select(".geo-name").text(data.properties.name);

        } else {

            var name = data.properties.name;

            d3.select(".geo-name").text(name.substring(0, 24));

        }

        var funds = data.properties.funding.toString();

        var money, percent;

        if (funds.length === 4) {

            money = funds.substring(0, 1) + "," + funds.substring(1, 4);

        } else if (funds.length === 5) {

            money = funds.substring(0, 2) + "," + funds.substring(2, 5);

        } else if (funds.length === 6) {

            money = funds.substring(0, 3) + "," + funds.substring(3, 6);

        } else if (funds.length === 7) {

            money = funds.substring(0, 1) + "," + funds.substring(1, 4) + "," + funds.substring(4, 7);

        }

        d3.select(".geo-funding").text("$" + money);

        var yearSplits = data.properties.annual;

        for (var yKey in yearSplits) {

            if (yearSplits.hasOwnProperty(yKey)) {

                percent = yearSplits[yKey] / data.properties.funding;

                var colHeight = Math.round(percent * 120) + "px";

                var yBar = ".b" + yKey + " .level";

                d3.select(yBar).style({
                    'height': colHeight
                });

            }

        }

        var progSplits = data.properties.programs;

        for (var pKey in progSplits) {

            if (progSplits.hasOwnProperty(pKey)) {

                var progSum = progSplits[pKey];

                percent = progSum / data.properties.funding;

                var progWidth = Math.round(percent * 320) + "px";

                var pBar = "#" + pKey.toLowerCase();

                var w = d3.select(pBar);

                w.style({
                    'width': progWidth
                });

                appendTally(progSum, w);

            }
        }

        function appendTally(a, b) {

            b.selectAll("div")
                .data([a])
                .enter()
                .append("div")
                .attr("class", "tip")
                .text(function (d) {

                    var cash;

                    cash = d.toString();

                    if (cash.length === 4) {

                        cash = cash.substring(0, 1) + "," + cash.substring(1, 4);

                    } else if (cash.length === 5) {

                        cash = cash.substring(0, 2) + "," + cash.substring(2, 5);

                    } else if (cash.length === 6) {

                        cash = cash.substring(0, 3) + "," + cash.substring(3, 6);

                    } else if (cash.length === 7) {

                        cash = cash.substring(0, 1) + "," + cash.substring(1, 4) + "," + cash.substring(4, 7);

                    }

                    var text = "$" + cash;

                    return text;

                });

        }

        d3.select(".geo-projects").text(data.properties.projects);

    }

    d3.select(".county").on("click", countyLayer);

    function countyLayer() {

        d3.select(".geo-heading").text(countyStarter.heading);

        d3.select(".geo-type").text(countyStarter.geography);

        d3.select(".watersheds").style({
            "visibility": "hidden"
        });

        d3.json("js/counties.json", function (error, counties) {

            g.append("g")
                .attr("class", "counties")
                .selectAll("path")
                .data(topojson.feature(counties, counties.objects.counties).features)
                .enter().append("path")
                .attr("d", path)
                .attr("class", function (d) {
                    return d.properties.class;
                })
                .on("click", orient);

            g.append("path")
                .datum(topojson.mesh(counties, counties.objects.counties, function (a, b) {
                    return a !== b;
                }))
                .attr("d", path)
                .attr("class", "boundary");

        });

    }

    d3.select(".huc").on("click", hucLayer);

    function hucLayer() {

        d3.select(".geo-heading").text(hucStarter.heading);

        d3.select(".geo-type").text(hucStarter.geography);

        d3.select(".watersheds").style({
            "visibility": "visible"
        });

        d3.select(".counties").remove();

    }

})();