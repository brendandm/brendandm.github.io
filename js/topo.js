(function () {

    var starter = {
        "hucH": "Funding by Watershed",
        "countyH": "Funding by County",
        "hucGeo": "huc8",
        "countyGeo": "county",
        "projects": {
            "2009": 57,
            "2005": 80,
            "2003": 72,
            "2006": 74,
            "2004": 81,
            "2008": 43,
            "2002": 59,
            "2007": 29,
            "2000": 55,
            "2001": 55,
            "2010": 41,
            "2011": 53,
            "2012": 38
        },
        "annual": {
            "insr": 32318527,
            "swg": 29497486,
            "twg": 12519681,
            "cbcig": 5016769
        }
    };

    d3.select(".geo-heading").text(starter.hucH);

    d3.select(".geo-funding").text(function () {

        var starterFunds = d3.values(starter.annual);

        var total = d3.sum(starterFunds);

        var totalString = total.toString();

        var text = totalString.substring(0, 2) + "," + totalString.substring(3, 6) + "," + totalString.substring(6, 8);

        return text;

    });

    d3.select(".geo-projects").text(function () {

        var starterGrants = d3.values(starter.projects);

        var total = d3.sum(starterGrants);

        var text = total.toString();

        return text;

    });

    d3.select(".geo-type").text(starter.hucGeo);

    var allYears = starter.projects;

    for (var allKey in allYears) {

        if (allYears.hasOwnProperty(allKey)) {

            var allPercent = allYears[allKey] / 81;

            var allHeight = Math.round(allPercent * 120) + "px";

            var allBar = ".b" + allKey + " .level";

            d3.select(allBar).style({
                'height': allHeight
            }).attr("data-project-count", allYears[allKey]);

        }

    }

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

        var propFund, propProj, yearSet, yearMax, totalProj;

        totalProj = d3.values(starter.projects);

        propFund = (data.properties.funding / 77562901) * 100;

        yearSet = d3.values(data.properties.projects);

        yearMax = d3.max(yearSet);

        propProj = (d3.sum(yearSet) / d3.sum(totalProj)) * 100;

        d3.select(".funding-percent").text(propFund.toFixed(2) + "%");

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

        var yearSplits = data.properties.projects;

        for (var yKey in yearSplits) {

            if (yearSplits.hasOwnProperty(yKey)) {

                percent = yearSplits[yKey] / yearMax;

                var colHeight = Math.round(percent * 120) + "px";

                var yBar = ".b" + yKey + " .level";

                d3.select(yBar).style({
                    'height': colHeight
                }).attr("data-project-count", yearSplits[yKey]);

            }

        }

        var progSplits = data.properties.programs;

        for (var pKey in progSplits) {

            if (progSplits.hasOwnProperty(pKey)) {

                var progSum = progSplits[pKey];

                percent = progSum / data.properties.funding;

                var progWidth = Math.round(percent * 320) + "px";

                var pBar = "#" + pKey;

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

        d3.select(".geo-projects").text(d3.sum(yearSet));

    }

    d3.select(".county-toggle").on("click", countyLayer);

    function countyLayer() {

        d3.select(".geo-heading").text(starter.countyH);

        d3.select(".geo-type").text(starter.countyGeo);

        d3.select(".watersheds").style({
            "visibility": "hidden"
        });

        d3.json("js/counties.json", function (error, counties) {

            g.append("g")
                .attr("class", "counties county")
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
                .attr("class", "boundary county");

        });

    }

    d3.select(".huc-toggle").on("click", hucLayer);

    function hucLayer() {

        d3.select(".geo-heading").text(starter.hucH);

        d3.select(".geo-type").text(starter.hucGeo);

        d3.select(".watersheds").style({
            "visibility": "visible"
        });

        d3.selectAll(".county").remove();

    }

}());