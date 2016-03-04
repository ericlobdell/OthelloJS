class ObservableEvent {

    constructor(...subs) {
        this.subscribers = subs || [];
    }

    subscribe( fn ) {
        this.subscribers.push( fn );
    }

    notify( args ) {
        this.subscribers.forEach( fn => fn( args ) );
    }

}