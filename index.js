const Colors = require("Colors");
require('dotenv').config();
const { 
    inquirerMenu,
    pause,
    prompt,
    inquirerCities2Select
 } = require("./helpers/inquirer");
const SearchHistory= require('./models/SearchHistory');

const main=async ()=>{
 
    let menuOpt=null;
    const searchHistory=new SearchHistory();
    do{
        menuOpt= await inquirerMenu();
        switch (menuOpt) {
            case '1':
                // mostrar mensajes de selección
                //TODO buscar lugares

                const cityName=await prompt('Introduce el nombre de la ciudad:');
                const citiesList = await searchHistory.searchCity(cityName);
                const citySelected= await inquirerCities2Select(citiesList);
                // Guardar en DB
                searchHistory.saveHistory( citiesList[citySelected].name );
                // Get Weather
                const cWeather=await searchHistory.getCityWeather(citiesList[citySelected]);
                // console.log(await searchHistory.getCityWeather(citiesList[citySelected]));
                // console.log(await cWeather);
                console.log('\n');
                console.log('Ciudad: ',citiesList[citySelected].name);
                console.log('Lat. :',citiesList[citySelected].lat);
                console.log('Lng. :',citiesList[citySelected].lng);
                console.log('--------------------')
                console.log('Clima : ', cWeather.clima);
                console.log('Temperatura');
                console.log('Actual : ',cWeather.temp.feels_like);
                console.log('Sensación térmica : ',cWeather.temp.feels_like);
                console.log('Min. : ', cWeather.temp.temp_min);
                console.log('Max. : ', cWeather.temp.temp_max);
                console.log('Humedad : ', cWeather.temp.humidity);                
            break;
            case '2':
                const history=await searchHistory.historyUpperCase;
                history.forEach((item,i)=>{
                    const idx = `${ i + 1 }.`.green;
                    console.log(`${idx} - ${item}`);
                });
            break;
            default:1
            break;
        }
        if(menuOpt!==0) await pause();
    }while(menuOpt !== '0');
}

main();