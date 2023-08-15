/*--------------------------------------------------------------------------------------------------------------------*/

import io from 'socket.io-client';

/*--------------------------------------------------------------------------------------------------------------------*/
/* VARIABLES                                                                                                          */
/*--------------------------------------------------------------------------------------------------------------------*/

let _client = null;
let _endpoint = null;
let _connected = false;

/*--------------------------------------------------------------------------------------------------------------------*/

const _callbackDict = {};

/*--------------------------------------------------------------------------------------------------------------------*/
/* FUNCTIONS                                                                                                          */
/*--------------------------------------------------------------------------------------------------------------------*/

const _connected_func = () => _client && _endpoint && _connected;

/*--------------------------------------------------------------------------------------------------------------------*/

const _update_func = (endpoint, token) => {

    /*----------------------------------------------------------------------------------------------------------------*/

    if(_client)
    {
        if(_endpoint !== endpoint)
        {
            try { _client.disconnect(); } catch (_) { /* IGNORE */ }
        }
        else
        {
            return;
        }
    }

    /*----------------------------------------------------------------------------------------------------------------*/

    try
    {
        /*------------------------------------------------------------------------------------------------------------*/

        _client = io(_endpoint = endpoint, {path: '/api/socket.io'});

        /*------------------------------------------------------------------------------------------------------------*/

        const f = (connected) => {

            _connected = connected;

            _client.emit('indi', '{"<>": "getProperties", "@version": "1.7"}');

            if('$connection$' in _callbackDict) _callbackDict['$connection$'].forEach((callback) => {

                callback(connected);
            });
        };

        /*------------------------------------------------------------------------------------------------------------*/

        _client.on('connect', () => f(true));

        _client.on('reconnect', () => f(true));

        _client.on('disconnect', () => f(false));

        /*------------------------------------------------------------------------------------------------------------*/

        _client.onAny((topic, message) => {

            if(topic in _callbackDict) _callbackDict[topic].forEach((callback) => {

                callback(message);
            });
        });

        /*------------------------------------------------------------------------------------------------------------*/
    }
    catch(_)
    {
        _client = null;
    }

    /*----------------------------------------------------------------------------------------------------------------*/
}

/*--------------------------------------------------------------------------------------------------------------------*/

const _setConnectionCallback_func = (callback) => _subscribe_func('$connection$', callback);

/*--------------------------------------------------------------------------------------------------------------------*/

const _unsetConnectionCallback_func = (callback) => _unsubscribe_func('$connection$', callback);

/*--------------------------------------------------------------------------------------------------------------------*/

const _subscribe_func = (topic, callback) => {

    let set;

    if(topic in _callbackDict) {
        set = _callbackDict[topic] ; /////////;
    }
    else {
        set = _callbackDict[topic] = new Set();
    }

    if(typeof callback === 'function')
    {
        set.add(callback);
    }
};

/*--------------------------------------------------------------------------------------------------------------------*/

const _unsubscribe_func = (topic, callback) => {

    let set;

    if(topic in _callbackDict) {
        set = _callbackDict[topic] ; /////////;
    }
    else {
        set = _callbackDict[topic] = new Set();
    }

    if(typeof callback === 'function')
    {
        set.delete(callback);
    }
};

/*--------------------------------------------------------------------------------------------------------------------*/

const _emit_func = (topic, payload) => {

    if(_connected_func()) _client.timeout(5000).emit(topic, payload);
};

/*--------------------------------------------------------------------------------------------------------------------*/

export default {

    install(app)
    {
        app.provide('sock', {
            connected              : _connected_func              ,
            update                 : _update_func                 ,
            setConnectionCallback  : _setConnectionCallback_func  ,
            unsetConnectionCallback: _unsetConnectionCallback_func,
            subscribe              : _subscribe_func              ,
            unsubscribe            : _unsubscribe_func            ,
            emit                   : _emit_func                   ,
        });
    }
};

/*--------------------------------------------------------------------------------------------------------------------*/
