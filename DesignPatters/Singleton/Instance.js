
/**
 * -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
 * INSTANCE 1
 * -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
 */

 const App=  require('./app').App;


console.log('Running Instance 1');
 /* ====================
 CREATE AN INSTANCE OF THE APP CLASS
 ==================== */
 const Instance1 =   new App();

 
 Instance1.delay = 600;
 Instance1.name = 'Instance1';
  
 /* ====================
 Increment the counter
 ==================== */
 console.log('Incrementing the counter of Instance 1');
 Instance1.asyncIncrement();
/* ====================
Print the info of the instance
==================== */
 console.log(Instance1);
 