![Build Status](https://api.travis-ci.org/scriptype/appointment-scheduler.svg "Build Status")

# HR Scheduler

HR Scheduler is a Google-Calendar-like interface that users can make appointment 
entries for any hour of any year. Useful for managing and scheduling 
extensive amount of business appointments and any type of events.


## Notes
Current version includes very few real data-binding and it's mostly just a 
mockup with a detailed UI design. Even though seems no interaction can be made, 
code architecture and development infrastructure is almost complete.


## Todo
 - Provide the basic functionality of adding and browsing appointments
 - Editing/Viewing appointments
 - Provide the searching/filtering functionality
 - Improve layout responsivity, colors


## Further Development
Get started with installing dependencies from npm:
> npm i

You need SASS in your system, if you don't have, install it with:
> gem install sass

You should make changes only in `./src` directory. Before starting making 
changes, you should:
> make watch

Before deploy, run:
> make release

Working in a dummy server also wouldn't hurt:
> npm start

`./dist` is the one need to be served. You don't need any of other files on your 
server.


## Development Notes
 - HR Scheduler uses the ReactiFlux approach. I've used the easy-to-use 
[Fluxxor](http://fluxxor.com) library for supplying the underlying communication 
between actions, components and stores.

 - Components are 
[React](http://facebook.github.io/react).

 - Routing is done with 
[react-router](https://github.com/rackt/react-router)

 - App modules are developed with the `CommonJS` way of modularization, means 
[Browserify](http://browserify.org) is used to get the code work in browser.

 - Also [Babelify](http://babeljs.io) transformer added to browserify, because 
 ES2015 is cool. And we have polyfills as well.

 - I've used `Makefile` for build automation.

 - PostCSS/Autoprefixer and SASS have vastly improved the CSS writing experience.
 
 - The latest versions of packages are used.