const inquirer = require('inquirer');
require('colors');

// Estas son las opciones en formato de INQUIRER.
const menuOpts=[
    {
        type: 'list',
        name: 'optionSelected',
        message: '¿Qué desea hacer?',
        choices: [
            {
                value: '1',
                name:`${'1'.green}. Buscar ciudad`
            },
            {
                value:`2`,
                name:`${'2'.green}. Historial`
            },
            {
                value:`0`,
                name:`${'0'.green}. Salir`
            }
        ]
    }
];

// muestra el menú principal de la app
const inquirerMenu= async ()=>{
    console.clear();
    console.log('========================='.green);
    console.log('  Seleccione una opción');
    console.log('=========================\n'.green);

    const {optionSelected}= await inquirer.prompt(menuOpts);
    return optionSelected;

}

// esto comprueba la opción elegida anteriormente.
const pause= async()=>{

    const pauseOpts=[
        {
            type: 'input',
            name: 'pauseOptionSelected',
            message: `\nPresione ${'Enter'.yellow} para continuar. \n`,
        }
    ];
    console.log('\n');
    const {pauseOptionSelected}= await inquirer.prompt(pauseOpts);
    return pauseOptionSelected;
}

// el prompt te tira un texto para llenar y devuelve el valor.
const prompt= async(message)=>{

    const promptOpts=[
        {
            type: 'input',
            name: 'outputText',
            message
        }
    ];
    console.log('\n');
    const {outputText}= await inquirer.prompt(promptOpts);
    return outputText;
}

// listado de teareas por borrar
const inquirerCities2Select= async(arrList=[])=>{
    // Hago un array con todos los elementos
    let i=0;
    const choices= arrList.map((task)=>{
        // const idx= `${i++ };`
        return {
            value:i++,
            name:`${ i } ${ task.name }`,
        }
    });
    // agrego la opción de volver
    choices.push({
        value:0,
        name:`0 - Cancelar.`
    });
    // Ahora creo el archivo
    const citiesOpt=[{
        type:'list',
        name:'citySelected',
        message:'Seleccione una opción:',
        choices:choices
    }];
    const {citySelected}= await inquirer.prompt(citiesOpt);
    return citySelected;
}

module.exports={
    inquirerMenu,
    pause,
    prompt,
    confirmDelete,
    inquirerCities2Select
}