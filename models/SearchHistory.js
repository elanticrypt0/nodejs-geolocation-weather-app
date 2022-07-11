const fs = require('fs');
const { default: axios } = require("axios");

class SearchHistory{

    history = [];
    dbPath = './db/database.json';

    constructor(){
        this.readDB();
    }

    get paramsMapbox(){
        return `access_token=${process.env.MAPBOX_KEY}&language=es&limit=10`;
    }

    async searchCity(cityName=''){
        // console.log('Ciudad :',cityName);
        try {

            const instance= axios.create({
                baseURL:`https://api.mapbox.com/geocoding/v5/mapbox.places/${cityName}.json?${this.paramsMapbox}`
            });
            const resp= await instance.get();
            return resp.data.features.map(respPlace=>({
                id: respPlace.id,
                name:respPlace.place_name_es,
                lng:respPlace.center[0],
                lat:respPlace.center[1],
            }));
        } catch (error) {
            console.log('Hola Juan Carlos. No se encontró nada porque me habla el espíritu.');
            console.log('\n');
            console.log(error);
            console.log('\n');
            return [];
        }

        return [];  // Retorna las ciudades que tenga para elegir.
    }

    async getCityWeather(cityData){          
          try{
            const response=await axios.get(`https://community-open-weather-map.p.rapidapi.com/weather`,{
                params: {
                    q: cityData.name,
                    lat: cityData.lat,
                    lon: cityData.lng,
                    lang: 'es',
                    units: 'metric',
                    mode: 'json'
                  },
                headers: {
                    'X-RapidAPI-Key': process.env.OPENWEATHER_KEY,
                    'X-RapidAPI-Host': process.env.X_RAPIDAPI_HOST
                }
            });
            const { weather , main }=response.data;
            const toReturn={
                clima:weather[0].description,
                temp:main
            }
            return toReturn;
          } catch (error) {
              console.error(error);
          };
    }

    get historyUpperCase() {
        return this.history.map( city => {
            let words = city.split(' ');
            words = words.map( p => p[0].toUpperCase() + p.substring(1) );
            return words.join(' ');

        })
    }

    saveHistory( cityName = '' ) {
        if(cityName!==''){
            if( this.history.includes( cityName.toLocaleLowerCase() ) ){
                return;
            }
            this.history = this.history.splice(0,5);

            this.history.unshift( cityName.toLocaleLowerCase() );

            // Grabar en DB
            this.saveDB();
        }
    }

    saveDB() {

        const payload = {
            history: this.history
        };

        fs.writeFileSync( this.dbPath, JSON.stringify( payload ) );

    }

    readDB() {

        if( !fs.existsSync( this.dbPath ) ) return;
        
        const info = fs.readFileSync( this.dbPath, { encoding: 'utf-8' });
        const data = JSON.parse( info );

        this.history = data.history;


    }


}

module.exports = SearchHistory;