/**
 * Created by dcordova on 8/7/17.
 */

class MochaConfig {

    static start( _resolve, _reject ){
        if( !this.getIsMock() ){
            MochaConfig.prototype.resolve = _resolve;
            MochaConfig.prototype.reject = _reject;
        }
    }

    static done( _event ){
        if( !this.getIsMock() ){
            if( _event ){
                MochaConfig.prototype.resolve( _event );
            } else {
                MochaConfig.prototype.reject( ' ' );
            }
        }
    }

    static getEvent( ){
        let event = null;

        if( !this.getIsMock() ){
            event = MochaConfig.prototype.event || null;
        }

        return event;
    }

    static setEvent( _event ){
        MochaConfig.prototype.event = _event;
    }

    static setIsMock( _bool ){
        MochaConfig.prototype.isMock = _bool;
    }

    static getIsMock( ){
        let isMock;

        if( MochaConfig.prototype.isMock !== undefined ){
            isMock = MochaConfig.prototype.isMock;
        } else {
            console.warn('setEtoE() was not called before test require(s). Possible wrong functionality.');
            isMock = true;
        }

        return isMock;
    }
}

module.exports = MochaConfig;