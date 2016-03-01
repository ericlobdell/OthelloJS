class ObservableEvent {

    constructor(...args) {
        this.observers = [];
        
        if ( args.length )
            this.observers.concat(args);
    }

    subscribe( fn ) {
        this.observers.push( fn );
    }

    notify( args ) {
        this.observers.forEach( fn => fn( args ) );
    }

}