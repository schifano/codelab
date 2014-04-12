You will want to install `Node.js` as your server. Just hit their website and pull it down if you don't already have it installed. It will come bundled with NPM, which is the package manager.

The full stack looks like so:
- [Brunch.io](http://brunch.io/)        for front-end build processing
- [Express.js](http://expressjs.com/)   for server side file serving and any API functions
- [Socket.io](http://socket.io/)        for websockets
- [Angular.js](http://angularjs.org/)   for front-end logic

To get started, we will use NPM to download our dependencies. First, lets get Brunch, which needs to be installed globally because it has a CLI (command line interface):

    npm install -g brunch
    
Now, lets use Brunch to generate the skeleton of our web app. I've modified my favorite clean one to include the tech stack above. You will need to pick a name for the app folder:

    brunch new gh:mgarbacz/brunch-express-socket-angular awesome-folder-name
    
You should get an application structure in there that looks like this:

    /app
      /assets
        index.html
      /styles
        main.css
      initialize.js
    /vendor
      /scripts
        angular.js
        socket.io.js
      /styles
    server.js
    socket.js
    package.json
    
The `brunch new` command automatically used NPM to download the dependencies that are in `package.json`. This includes JavaScript linting, compilation, and minifying, CSS compilation and minifying, and auto-reload (which will auto refresh the browser window when it finds a change in the project structure), as well as `Express.js` and `Socket.io`.

There are three commands needed to run all the tools

    brunch watch        // Watch `app` and `vendor` for file changes to regenerate website into `public`
    node server.js      // Serve content from `public` to `localhost:3000`
    node socket.js      // Run Websockets folder on `localhost:8080`
    
You will need to run each of these in a separate Terminal/Command Line window or tab. That will let them run, as well as display messages on their activity.

You will write your front-end application in the `app` folder, following `Angular.js` documentation on how to write an app. If you keep `brunch watch` running, your browser window will automatically refresh when Brunch detects changes in the files and rebuilds them.

If you need to add any sort of API functionality, you can add it to the `server.js` file. You would follow `Express.js` documentation in order to know how to create the functionality. You will have to restart the `node server.js` to refresh changes.

You will write your server-side websockets code in the `socket.js` file, following the Socket.io documentation. All front-end websockets code would go in a JavaScript file of your choosing in the `app` folder. You will need to restart the `node socket.js` to refresh changes.

Brunch Warning
--------------

Brunch is a finicky tool. It is fantastic for a real project because it eases so much pain. It takes a bit of time to learn and understand it's use, however. If you want to have a less automatic project build, you can skip using it.

If you are avoiding Brunch, you can find your own path using the rest of the stack and it's documentation. You will have to manually manage your CSS/JavaScript and making sure it is all included in your HTML. But you still get the power of the other parts of the stack - `Node.js`, NPM, `Angular.js`, `Express.js`, `Socket.io`
