
export default class MockDataBuilder<T> {
    private _instance: T;
    private _ctor: any;

    constructor( ctor: { new ( ...args: any[] ): T } ) {
        this._ctor = ctor;  
    }

    createNew() {
        this._instance = new this._ctor();

        for ( let prop in this._instance )
            this.bindSetter( prop );

        return this;
    }

    private bindSetter( propertyName: string ) {
        const propWithInitialCap = `${propertyName[0].toUpperCase()}${propertyName.substring( 1 )}`;
        const setter = `set${propWithInitialCap}`;

        this[setter] = ( value: any ): MockDataBuilder<T> => {
            return this.set( propertyName, value );
        }
    }

    set( propertyName: string, value: any ): MockDataBuilder<T> {
        this._instance[propertyName] = value;
        return this;
    }

    build() {
        return this._instance;
    }
}