import { createApplication } from '@angular/platform-browser';
import { registerAllElements } from './app/elements.registry';
// import { registerUserCard } from './app/elements/user-card.element';

console.log('Angular Elements booting...');

// Single Angular Element bootstrap
// createApplication({ providers: []}).then(app => {
//   registerUserCard(app.injector);
// });

// If you had multiple elements to register, register all angular elements
createApplication({ providers: []}).then(app => {
  registerAllElements(app.injector);
});