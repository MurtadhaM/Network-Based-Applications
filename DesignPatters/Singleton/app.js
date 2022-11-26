exports.App = class App {
    constructor() { 
        if (App.instance) {
            return App.instance;
        }
        else {
            App.instance = this;
        }
    }



    _delay = 10; 
    _name = 'App';
    _count = 0;


    //GETTERS AND SETTERS

    get name() {
        return this._name;
    }

    set name(name) {
        this._name = name;
    }

    get count() {
        return this._count;
    }

    set count(count) {
        this._count = count;
    }

    get delay() {
        return this._delay;
    }

    set delay(delay) {
        this._delay = delay;
    }




    //GETTERS AND SETTERS
    get name() {
        return this._name;
    }

    async asyncIncrement() {
          setTimeout(() => {
            this.count++;
        }, this._delay);
    }

    async asyncDecrement() {
          setTimeout(() => {
            this.count--;
            
        }, this._delay);

    }

    set name(name) {
        this._name = name;
    }

    //METHODS
    async asyncDecrement() {
            setTimeout(() => {
                this.count--;
                
            }, this._delay);
    
        }   

    async asyncRender() {
        setTimeout(() => {
            this.render();
        }, this._delay);
    }

    render() {
        console.log(this.count);
    }


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

    freeze() {
        Object.freeze(this);
    }




}

