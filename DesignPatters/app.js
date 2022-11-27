exports.App = class App {
    constructor() { 
        if (App.instance) {
            return App.instance;
        }
        else {
            App.instance = this;
        }
    }

    delay = 10; 
    //GETTERS AND SETTERS
    get name() {
        return this._name;
    }

    async asyncIncrement() {
          setTimeout(() => {
            this.count++;
            console.log(this.count);
        }, this.delay);
        console.log(this.count);
    }

    async asyncDecrement() {
          setTimeout(() => {
            this.count--;
            
        }, delay);

        console.log(this.count);
    }

    set name(name) {
        this._name = name;
    }

    //METHODS
    async asyncDecrement() {
            setTimeout(() => {
                this.count--;
                
            }, delay);
    
            console.log(this.count);
        }   

    async asyncRender() {
        setTimeout(() => {
            this.render();
        }, this.delay);
    }

    render() {
        console.log(this.count);
    }

    //PROPERTIES
    count = 0;
    _name = 'App';

    //STATIC PROPERTIES
    static instance = null;

    //STATIC METHODS
    static getInstance() {
        if (!App.instance) {
            App.instance = new App();
        }
        return App.instance;
    }

    static async eventHandler(handler) {
        handler.addEventListener('click', () => {

            //Get the instance of the App class
            const app = App.getInstance();
            // Attach the event handler to the instance
            this.handler = handler;
            // Increment the counter
            app.asyncIncrement();
            return app;
            
        }
        
        );
    }


}