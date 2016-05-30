
export default class MockDataBuilder {
    private _instance: any;

    constructor( typeConstructor: Function, args: any[] = [] ) {
        this._instance = new typeConstructor( ...args );

        for ( let prop in this._instance )
            this.bindSetter( prop );
        
    }

    private bindSetter( propertyName: string ) {
        const propWithInitialCap = `${propertyName[0].toUpperCase()}${propertyName.substring( 1 )}`;
        const setter = `set${propWithInitialCap}`;

        this[setter] = ( value: any ): MockDataBuilder => {
            return this.set( propertyName, value );
        }
    }

    set( propertyName: string, value: any ): MockDataBuilder {
        this._instance[propertyName] = value;
        return this;
    }

    build() {
        return this._instance;
    }
}