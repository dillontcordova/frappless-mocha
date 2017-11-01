/**
 * Created by dcordova on 8/7/17.
 */

class MochaConfig {

    static getPayload( ){
        let payload = null;

        if( !MochaConfig.getIsMock() ){
            payload = MochaConfig.prototype.event || null;
        }

        return payload;
    }

    static setPayload(_event ){
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
            console.warn('setEtoE() was not called in time. Possible unexpected functionality.');
            isMock = true;
        }

        return isMock;
    }
}

module.exports = MochaConfig;