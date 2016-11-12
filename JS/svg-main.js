/**
 * Created by Learning Clip on 16/08/2016.
 */
window.onload = function () {
    var testData = [];
    var result = [];
    var draw = SVG('drawing').size(2000, 1000);

    /*
     load dat file from project root Temp/temp.dat
     */
    function coordinateArray(callback) {
        var rawFile = new XMLHttpRequest();
        rawFile.open("GET", "Temp/temp.dat", false);
        rawFile.onreadystatechange = function () {
            if (rawFile.readyState === 4) {
                if (rawFile.status === 200) {
                    var tdz = rawFile.responseText;
                    if (callback && typeof(callback) === "function") {
                        callback(tdz);
                    }
                }
            }
            return null;
        };
        rawFile.send(null);
    }

    /*
     Save result of load to local variable
     */
    coordinateArray(function (data) {
        result = data.split("\n");
    });

    /*
     iterate string and split into an array at line end
     */
    function DatarrayParse(test, callback) {
        var DataArray = [];
        for (var i = 0; i < test.length; i++) {
            var r = test[i].split(";");
            r.pop();
            DataArray.push([r]);
        }
        if (callback && typeof(callback) === "function") {
            callback(DataArray);
        }
    }

    /*
     save new array of arrays to local variable
     */
    DatarrayParse(result, function (data) {
        testData = data;
        for (var i = 0; i < testData.length; i++) {
            draw.polyline(testData[i]).fill('none').stroke({width: 1});
        }
    });
}
