var tallies = [],
    multi = [];

var many = [1452, 3661, 3728, 3778, 4003, 4024, 4284, 4338, 4455, 4495, 4829, 4921, 5089, 5486, 5749, 5980, 6210, 6389, 6410, 7306, 7321, 11243, 11537, 11636, 11799, 11864, 11944, 12281, 12333, 12444, 12644, 12811, 12836, 13150, 13356, 13357, 13769, 13781, 13967, 13970, 14105, 14106, 14511, 14988, 15083, 15090, 15231, 15333, 15336, 15472, 16081, 16234, 16414, 16554, 16726, 17011, 17067, 17115, 17156, 17177, 17196, 17207, 17209, 17225, 17244, 17290, 17348, 17370, 17472, 17529, 17871, 18240, 18291, 29423, 29482, 34078];

var uno = [1230, 1413, 1454, 1468, 1527, 1544, 1559, 1592, 1594, 1721, 1728, 1763, 1769, 1799, 1817, 1884, 1887, 1911, 1913, 1914, 1915, 1921, 1931, 3472, 3530, 3648, 3649, 3674, 3679, 3680, 3706, 3715, 3746, 3751, 3813, 3815, 3877, 3881, 3958, 4055, 4062, 4084, 4088, 4090, 4095, 4130, 4165, 4166, 4179, 4202, 4241, 4274, 4357, 4385, 4390, 4416, 4420, 4443, 4445, 4456, 4467, 4473, 4484, 4505, 4507, 4508, 4509, 4510, 4511, 4514, 4545, 4587, 4589, 4590, 4591, 4596, 4598, 4602, 4650, 4670, 4685, 4686, 4690, 4708, 4714, 4715, 4719, 4735, 4738, 4751, 4796, 4835, 4836, 4920, 4941, 4954, 4962, 4998, 4999, 5001, 5045, 5093, 5165, 5180, 5195, 5325, 5363, 5398, 5454, 5463, 5474, 5489, 5494, 5538, 5587, 5611, 5624, 5625, 5627, 5631, 5658, 5669, 5699, 5708, 5711, 5717, 5736, 5750, 5751, 5758, 5778, 5786, 5798, 5800, 5884, 5889, 5893, 5904, 5905, 5922, 5931, 5945, 5954, 5970, 5979, 5987, 6050, 6055, 6097, 6100, 6142, 6148, 6150, 6189, 6203, 6208, 6215, 6217, 6228, 6242, 6308, 6311, 6312, 6316, 6337, 6339, 6365, 6366, 6367, 6386, 6409, 6461, 6530, 6532, 6538, 6542, 6569, 6662, 6683, 6729, 6739, 6758, 6759, 6761, 6866, 6867, 6872, 6887, 6888, 6889, 6890, 6891, 6892, 6908, 6909, 6910, 6911, 6912, 6913, 6934, 6936, 6937, 6951, 6952, 6953, 6954, 6955, 6966, 6967, 6968, 6969, 6987, 6988, 6989, 7015, 7017, 7102, 7281, 7303, 7304, 7305, 7319, 7320, 7352, 7362, 7372, 7386, 7421, 7445, 7472, 7501, 7561, 7647, 7659, 8472, 8473, 8474, 8510, 8511, 8512, 8662, 10378, 10436, 10457, 10476, 10842, 11535, 11536, 11538, 11547, 11584, 11585, 11586, 11587, 11635, 11637, 11666, 11667, 11706, 11707, 11708, 11754, 11795, 11797, 11798, 11837, 11838, 11863, 11886, 11911, 11912, 11913, 11943, 11945, 12330, 12332, 12428, 12429, 12445, 12446, 12447, 12491, 12518, 12544, 12571, 12617, 12640, 12641, 12642, 12643, 12645, 12646, 12647, 12687, 12781, 12782, 12783, 12784, 12785, 12786, 12787, 12805, 12807, 12808, 12809, 12895, 12925, 12942, 12943, 12944, 12951, 12973, 13035, 13036, 13037, 13068, 13069, 13070, 13071, 13259, 13297, 13434, 13581, 13655, 13685, 13687, 13688, 13689, 13723, 13726, 13733, 13734, 13790, 13810, 13847, 13879, 13880, 13968, 13969, 14002, 14003, 14004, 14005, 14006, 14034, 14083, 14084, 14087, 14089, 14091, 14096, 14107, 14108, 14109, 14110, 14134, 14285, 14378, 14490, 14512, 14629, 14633, 14651, 14741, 14743, 14744, 14815, 14831, 14840, 14925, 14950, 15075, 15081, 15088, 15104, 15195, 15200, 15205, 15229, 15230, 15296, 15335, 15397, 15464, 15465, 15467, 15496, 15646, 15768, 15834, 15879, 15949, 15992, 15999, 16070, 16076, 16079, 16119, 16134, 16146, 16163, 16222, 16230, 16231, 16232, 16233, 16254, 16257, 16276, 16349, 16352, 16357, 16402, 16423, 16424, 16468, 16668, 16679, 16681, 16725, 16727, 16775, 16796, 16824, 16839, 16862, 16863, 16864, 16885, 16889, 17050, 17054, 17064, 17066, 17104, 17105, 17208, 17224, 17233, 17234, 17240, 17248, 17271, 17304, 17308, 17309, 17310, 17311, 17350, 17351, 17352, 17357, 17376, 17378, 17381, 17382, 17384, 17406, 17414, 17415, 17421, 17432, 17433, 17435, 17457, 17473, 17479, 17527, 17530, 17543, 17544, 17549, 17550, 17578, 17610, 17677, 17773, 17774, 17776, 17778, 17808, 17823, 17830, 17891, 17901, 17965, 17985, 18016, 18024, 18043, 18056, 18090, 18101, 18128, 18162, 18163, 18164, 18167, 18172, 18173, 18197, 18198, 18202, 18216, 18236, 18238, 18239, 18242, 18248, 18254, 18267, 18270, 18271, 18293, 18305, 18347, 18558, 18597, 18609, 18621, 18637, 18695, 18718, 18744, 18756, 18759, 18760, 18761, 18763, 18810, 18814, 18824, 18833, 18849, 18868, 18882, 18890, 18920, 18926, 18934, 18936, 18957, 18963, 18967, 18974, 22463, 22465, 22466, 22564, 22610, 22744, 22764, 22811, 22868, 22909, 22925, 22970, 22988, 22992, 22996, 23877, 24051, 24063, 24076, 24113, 24180, 24265, 24319, 24321, 24337, 24341, 24365, 24367, 24382, 24395, 24433, 24461, 24479, 24484, 24496, 24501, 24503, 24528, 24557, 24559, 24584, 24589, 24605, 24610, 24615, 24620, 25928, 25929, 27048, 27113, 27208, 27285, 27297, 27555, 27807, 27859, 27988, 28136, 28147, 28171, 28193, 28210, 28232, 28248, 29052, 29139, 29280, 29285, 29296, 29305, 29328, 29381, 29392, 29403, 29410, 29413, 29420, 29427, 29443, 29459, 29465, 29466, 29467, 29471, 29479, 29492, 29499, 29510, 29512, 29517, 29544, 29561, 29562, 29567, 29568, 29581, 30131, 30136, 30137, 32747, 32881, 33195, 33197, 33248, 33254, 33381, 33556, 33590, 33642, 33666, 33680, 33781, 33822, 33828, 33830, 33855, 33886, 33907, 33912, 33922, 33944, 33972, 34034, 34042, 34050, 34107, 34136, 34140, 34147, 34178, 34184, 34192, 34194, 34239, 34256, 34290];

var geode = [];

var single = [];

var PointModel = function (id, geometry) {

    this.id = id;

    this.type = "MultiPoint";

    this.coordinates = [geometry];

};

var GeoModel = function (id, county, huc) {

    this.id = id;

    this.county = [county];

    this.huc8 = [huc];

};

var pointModel, geoModel;

//console.log(typeof model);

var funding = {};

var counts = {};

var origin = "+title=WGS84 Web Mercator (Auxiliary Sphere) +proj=merc +a=6378137 +b=6378137 +lat_ts=0.0 +lon_0=0.0 +x_0=0.0 +y_0=0 +k=1.0 +units=m +nadgrids=@null +wktext +no_defs";

var dest = "+title=*GPS (WGS84) (deg) +proj=longlat +ellps=WGS84 +datum=WGS84 +units=degrees";

/*for (var i = 0; i < grants.parsed_data.length; i++) {

    grant = grants.parsed_data[i];

    if (grant.NFWFID.indexOf("0601.") !== -1 || grant.NFWFID.indexOf("0602.") !== -1 || grant.NFWFID.indexOf("0603.") !== -1 || grant.NFWFID.indexOf("0604.") !== -1 || grant.NFWFID.indexOf("0605.") !== -1) {

        delete grant.StateAb;
        delete grant.Cntry;
        delete grant.CntryAb;
        delete grant.Focus;
        delete grant.FocusID;

        for (var k = 0; k < points.features.length; k++) {

            var point = points.features[k];

            if (point.attributes.EZG_ID === grant.EGID) {

                /*for(var key in point.attributes) {

                    if(point.attributes.hasOwnProperty(key)) {

                        delete point.attributes[key];

                    }

                }*/

//grant.tag += 1;

//point.program = point.attributes.Funding_Cy;

//var x = point.geometry.x;

//var y = point.geometry.y;

//var coords = proj4(origin, dest, [x, y]);

//grant.longitude = coords[0];

//grant.latitude = coords[1];

//var geo = {};

//geo.type = "Point";

//geo.coordinates = [coords[0], coords[1]];

//point.geometry = geo;

//geode.push(point);

//point.attributes.id = grant.EDID;

//tallies.push(grant.EGID);

//tallies.push(point.attributes.EZG_ID);

//}

/*if (point.attributes.EZG_ID === grant.EGID && grant.tag > 1) {

                var x = point.geometry.x;

                var y = point.geometry.y;

                var coords = proj4(origin, dest, [x, y]);

                var set = [];

                set.push(grant.geometry.coordinates);

                set.push([coords[0], coords[1]]);

                grant.geometry.coordinates = set;

                grant.geometry.type = "Multipoint";

                console.log(grant);

            }*/

//console.log(grant);

//var json = JSON.stringify(grant);

//$('body').append(json + " , ");

//}

//}

//}

/*for (var i = 0; i < grants.parsed_data.length; i++) {

    grant = grants.parsed_data[i];

    if (grant.NFWFID.indexOf("0601.") !== -1 || grant.NFWFID.indexOf("0602.") !== -1 || grant.NFWFID.indexOf("0603.") !== -1 || grant.NFWFID.indexOf("0604.") !== -1 || grant.NFWFID.indexOf("0605.") !== -1) {

        delete grant.StateAb;
        delete grant.Cntry;
        delete grant.CntryAb;
        delete grant.Focus;
        delete grant.FocusID;

        for (var k = 0; k < points.features.length; k++) {

            var point = points.features[k];

            if (point.attributes.EZG_ID === grant.EGID) {

                geode.push(grant);

                tallies.push(grant.EGID);
              
            }

        }

    }

}*/

//console.log(tallies);

/*for(var d = 0; d < geode.length; d++) {

    var f = geode[d].attributes;

    if(f.EZG_ID === 34078) {

        console.log(geode[d]);

    }

}*/

//console.log(geode);

/*var t = 0;

for (var i = 0; i < geode.length; i++) {

    //model.id = geode[i].EGID;

    for (var j = i + 1; j < geode.length; j++) {

        //var t = 0;

        if (geode[i].EGID === geode[j].EGID) {

            //t++;

            //console.log(geode[i]);

            var tag = "w";

            if (typeof model[tag] === 'undefined') {

                model.tag = tag;

                geode[i].geometry.type = "MultiPoint";

                var key = geode[i].EGID;

                model[key] = geode[i];

            } else {

                

                var key = geode[i].EGID;

                model[key] = geode[i];

            }

            //model[loc + t] = geode[i].geometry.coordinates;

            //model[type] = type;

        }

    }

}*/

/*var r = tallies.reduce(function (p, c) {

    if (typeof p[c] == 'undefined') {

        p[c] = 1;

    } else {

        p[c] += 1;

    }

    return p;

}, {});

for (var key in r) {

    if (r.hasOwnProperty(key) && r[key] > 1) {

        //$('body').append(key + ":" + r[key] + "<br/>");

        $('body').append(key + ",");

        multi.push(parseFloat(key));

    }

}*/

//console.log(multi);

/*for (var i = 0; i < geode.length; i++) {

    var g = geode[i];

    if (g.attributes.EZG_ID === 34078) {

        var id = g.attributes.EZG_ID;

        if (typeof pointModel === 'undefined') {

            pointModel = new PointModel(g.attributes.EZG_ID, g.geometry.coordinates);

            //console.log(model);

        } else {

            pointModel.coordinates.push(g.geometry.coordinates);

        }

    }

}*/

/*for (var i = 0; i < all.length; i++) {

    var a = all[i];

    if (a.EGID === 1452) {

        var id = a.EGID;

        if (typeof geoModel === 'undefined') {

            geoModel = new GeoModel(a.EGID, a.county, a.huc8);

        } else {

            for (var c = 0; c < geoModel.county.length; c++) {

                if (geoModel.county.indexOf(a.county) < 0) {

                    geoModel.county.push(a.county);

                }

            }

            for (var h = 0; h < geoModel.huc8.length; h++) {

                if (geoModel.huc8.indexOf(a.huc8) < 0) {

                    geoModel.huc8.push(a.huc8);

                }

            }

        }

    }

}*/

/*for (var mp = 0; mp < multipoint.length; mp++) {

    var p = multipoint[mp];

    for (var mg = 0; mg < multigeo.length; mg++) {

        var g = multigeo[mg];

        if (p.id === g.id) {

            p.county = g.county;

            p.huc8 = g.huc8;

            $('body').append((JSON.stringify(p)) + "," + "<br/>");

        }

    }

}*/

/*for (var i = 0; i < points.features.length; i++) {

    var point = points.features[i];

    var r = {};

    for (var u = 0; u < uno.length; u++) {

        var s = uno[u];

        if (point.attributes.EZG_ID === s) {

            r.id = point.attributes.EZG_ID;

            var x = point.geometry.x;

            var y = point.geometry.y;

            var coords = proj4(origin, dest, [x, y]);

            var loc = {};

            loc.type = "Point";

            loc.coordinates = [coords[0], coords[1]];

            r.geometry = loc;

            $('body').append((JSON.stringify(r)) + "," + "<br/>");

        }

    }

}*/

// For projects with single point geometries, loop through the array named "all" and generate new objects when
// the EGID of an item in "all" doesn't match our set of projects with multiple geometries (held in the array named "many").

/*for (var i = 0; i < many.length; i++) {

    var d = many[i];

    //var r = {};

    for (var a = 0; a < grants.parsed_data.length; a++) {

        var g = grants.parsed_data[a];

        if (g.NFWFID.indexOf("0601.") !== -1 || g.NFWFID.indexOf("0602.") !== -1 || g.NFWFID.indexOf("0603.") !== -1 || g.NFWFID.indexOf("0604.") !== -1 || g.NFWFID.indexOf("0605.") !== -1) {

            if (g.EGID !== d) {

                single.push(g.EGID);

            }
        }

    }

}

console.log(single.length);
console.log(all.length);

var s = single.reduce(function (a, b) {

    if (typeof a[b] === 'undefined') {

        a[b] = 1;

    } else {

        a[b] += 1;

    }

    return a;

}, {});

console.log(s);

for (var key in s) {

    if (s.hasOwnProperty(key) && s[key] > 75) {

        $('body').append(key + ",");

    }

}*/

//$('body').append((JSON.stringify(geoModel)) + "," + "<br/>");

/*for (var i = 0; i < geode.length; i++) {

    var rec = geode[i].EGID;

    for (rec in model) {

        console.log(model[key]);

    }

}*/

/*console.log(geode.length);

console.log(model);

for (var key in model) {

    $('body').append(key + "<br/>");

}*/


/*for (var i = 0; i < grants.parsed_data.length; i++) {

    g = grants.parsed_data[i];

    if (g.NFWFID.indexOf("0601.") !== -1 || g.NFWFID.indexOf("0602.") !== -1 || g.NFWFID.indexOf("0603.") !== -1 || g.NFWFID.indexOf("0604.") !== -1 || g.NFWFID.indexOf("0605.") !== -1) {

        var r = {};

        for (var k = 0; k < singlePoint.length; k++) {

            var point = singlePoint[k];

            if (point.id === g.EGID) {

                r.id = g.EGID;

                r.nfwfid = g.NFWFID;

                r.title = g.Title;

                r.org = g.OrgLegal;

                r.desc = g.Desc;

                r.award = g.AwdAmt;

                r.state = g.State;

                //r.county = d.county;

                //r.huc8 = d.huc8;

                r.year = g.IDYear;

                r.geometry = point.geometry;

                $('body').append((JSON.stringify(r)) + "," + "<br/>");

            }
        }

    }

}*/

/*for (var i = 0; i < SinglePointGrants.length; i++) {

    g = SinglePointGrants[i];

    $('body').append((JSON.stringify(g)) + "," + "<br/>");

}

for (var i = 0; i < MultiPointGrants.length; i++) {

    g = MultiPointGrants[i];

    $('body').append((JSON.stringify(g)) + "," + "<br/>");

}*/

//var funds = 0;

/*for (var i = 0; i < MotherShip.length; i++) {

    var g = MotherShip[i];

    var huc8 = g.huc8;

    if (typeof funding[huc8] === 'undefined') {

        funding[huc8] = g.award;

    } else {

        funding[huc8] += g.award;

    }

}*/

//$('body').append(JSON.stringify(funding));

// Project counts by HUC or county

/*for (var i = 0; i < countyCodes.length; i++) {

    var g = countyCodes[i];

    var countyns = g.countyns;

    var year = g.year;

    var award = Math.round(g.award);

    var program, type;

    type = g.nfwfid.substring(0,4);

    switch (type) {
    
        case "0601": program = "CBCIG";

        break;

        case "0602": program = "INSR";

        break;

        case "0603": program = "SWG";

        break;

        case "0604": program = "INSR";

        break;

        case "0605": program = "TWG";

        break;

    }

    if (typeof counts[countyns] === 'undefined') {

        counts[countyns] = {};

        counts[countyns].id = countyns;

        counts[countyns].projects = 1;

        counts[countyns].funding = award;

        counts[countyns].annual = {};

        counts[countyns].programs = {};

    } else {

        counts[countyns].projects += 1;

        counts[countyns].funding += award;

    }

    if (typeof counts[countyns].annual[year] === 'undefined') {

        counts[countyns].annual[year] = award;

    } else {

        counts[countyns].annual[year] += award;

    }

    if (typeof counts[countyns].programs[program] === 'undefined') {

        counts[countyns].programs[program] = award;

    } else {

        counts[countyns].programs[program] += award;

    }

}*/

//console.log(counts);

//$('body').append(JSON.stringify(counts));

/*for (var key in counts) {

    if (counts.hasOwnProperty(key)) {

        var c = {};

        c.id = key;

        c.projects = counts[key].projects;

        c.funding = Math.round(counts[key].funding);

        c.annual = counts[key].annual;

        c.programs = counts[key].programs;

        $('body').append(JSON.stringify(c) + ",");

    }

}*/

/*for (var i = 0; i < MotherShip.length; i++) {

    var g = MotherShip[i];

    funds += g.award;

}

//console.log(funds);

/*for (var key in funding) {

    var f = {};

    if (funding.hasOwnProperty(key)) {

        f.id = key;

        f.funding = funding[key];

        $('body').append(JSON.stringify(f) + ",");

    }

}*/

//var funded = [];

for (var i = 0; i < countyAttrs.length; i++) {

    h = countyAttrs[i];

    hID = parseFloat(h.id);

    for (var k = 0; k < countyTopo.objects.counties.geometries.length; k++) {

        var topo = countyTopo.objects.counties.geometries[k];

        var tID = parseFloat(topo.id);

        if (hID === tID) {

            topo.properties.funding = h.funding;

            topo.properties.projects = h.projects;

            topo.properties.annual = h.annual;

            topo.properties.programs = h.programs;

        }

    }

}

for (var k = 0; k < countyTopo.objects.counties.geometries.length; k++) {

    var topo = countyTopo.objects.counties.geometries[k];

    if (topo.properties.funding <= 500000) {

        topo.properties.class = "f0";

    } else if (topo.properties.funding <= 1000000) {

        topo.properties.class = "f1";

    } else if (topo.properties.funding <= 2000000) {

        topo.properties.class = "f2";

    } else if (topo.properties.funding > 2000000) {

        topo.properties.class = "f3";

    } else if (!topo.properties.funding) {

        topo.properties.funding = "Not calculated.";

        topo.properties.class = "f10";

    }

}

$('body').append(JSON.stringify(countyTopo));

console.log(countyTopo.objects.counties.geometries.length);