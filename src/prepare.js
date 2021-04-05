const express = require('express');
var fs = require('fs');
const lineReader = require('line-reader');


const app = express();
const finalJson = [];
lineReader.eachLine(__dirname + '/lt-lg.json', function(line) {
    if(!line.includes('DONE')) {
        finalJson.push(JSON.parse(line))
    } else {
        var chunkSize = 25000;
        var currentIndex = 0;

        while (currentIndex <= finalJson.length) {
            let aggFeatures = [];
            for(let i=0;i<currentIndex+chunkSize;i++) {
                if(finalJson[i]) {
                    //aggFeatures.push({type:feature.type,geometry:{type:'Point',coordinates:[feature.properties.LONGITUDE,feature.properties.LATITUDE]},properties:{mag:Math.floor(Math.random() * 7) + 1}})
                    aggFeatures.push({type:'Feature',geometry:{type:'Point',coordinates:[finalJson[i].lng,finalJson[i].lat]},properties:{mag:Math.floor(Math.random() * 7) + 1}})
                }
            }
            const finalFileContents = {
                type:'FeatureCollection',
                features:[...aggFeatures]
            };
            console.log('writing',Math.floor((currentIndex+chunkSize)/1000),aggFeatures.length);
            fs.writeFileSync( `${__dirname}/processed${Math.floor((currentIndex+chunkSize)/1000)}K.json`, JSON.stringify(finalFileContents) )
            currentIndex = currentIndex + chunkSize;
        }
    }
    
});



/*
var rawParsed = JSON.parse(fs.readFileSync(__dirname + '/lt-lg.json'));



*/
app.listen(3000, () => console.log('Gator app listening on port 3000!'));
