
/**
 * -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
 * INSTANCE 2
 * -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
 */


const App=  require('./app').App; 

const Instance1 = require('./Instance');

console.log('Running Instance 2');

/* ====================
CREATE AN INSTANCE OF THE APP CLASS
==================== */

const Instance2 =   new App();
Instance2.delay = 1000;
Instance2.name = 'Instance2';

console.log(Instance2);
/* ====================
Increment the counter
==================== */
console.log('Incrementing the counter of Instance 2');
Instance2.asyncIncrement();



/* ====================
Print the info of the instance
==================== */

console.log(Instance2);
