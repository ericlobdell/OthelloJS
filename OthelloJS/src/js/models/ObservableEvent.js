class ObservableEvent {

    constructor() {
        this.observers = [];
    }

    subscribe( fn ) {
        this.observers.push( fn );
    }

    notify( args ) {
        this.observers.forEach( fn => fn( args ) );
    }

}