/*--------------------------------------------------------------------------------------------------------------------*/

import io from 'socket.io-client';

/*--------------------------------------------------------------------------------------------------------------------*/

let _client = null;
let _endpoint = null;
let _connectionCallback = null;
let _messageCallback = null;
let _connected = false;

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

        _client.on('connect', () => {

            _client.emit('indi', '{"<>": "getProperties", "@version": "1.7"}');

            _connected = true;
            if(_connectionCallback) {
                _connectionCallback(true);
            }
        });

        _client.on('reconnect', () => {

            _client.emit('indi', '{"<>": "getProperties", "@version": "1.7"}');

            _connected = true;
            if(_connectionCallback) {
                _connectionCallback(true);
            }
        });

        _client.on('disconnect', () => {

            ///////.emit('indi', '{"<>": "getProperties", "@version": "1.7"}');

            _connected = false;
            if(_connectionCallback) {
                _connectionCallback(false);
            }
        });

        /*------------------------------------------------------------------------------------------------------------*/

        _client.replaceAllListeners = (topic) => {

            _client.removeAllListeners(topic);

            _client.on(topic, (payload) => {

                if(_messageCallback)
                {
                    _messageCallback(topic, payload);
                }
            });
        };

        /*------------------------------------------------------------------------------------------------------------*/
    }
    catch(_)
    {
        _client = null;
    }

    /*----------------------------------------------------------------------------------------------------------------*/
}

/*--------------------------------------------------------------------------------------------------------------------*/

const _setConnectionCallback_func = (callback) => {

    _connectionCallback = typeof callback === 'function' ? callback : null;
};

/*--------------------------------------------------------------------------------------------------------------------*/

const _setMessageCallback_func = (callback) => {

    _messageCallback = typeof callback === 'function' ? callback : null;
};

/*--------------------------------------------------------------------------------------------------------------------*/

const _subscribe_func = (topic) => {

    if(_client)
    {
        _client.replaceAllListeners(topic);
    }
};

/*--------------------------------------------------------------------------------------------------------------------*/

const _unsubscribe_func = (topic) => {

    if(_client)
    {
        _client.removeAllListeners(topic);
    }
};

/*--------------------------------------------------------------------------------------------------------------------*/

const _emit_func = (topic, payload) => {

    if(_connected_func())
    {
        _client.timeout(5000).emit(topic, payload);
    }
};

/*--------------------------------------------------------------------------------------------------------------------*/

export default {

    install(app)
    {
        app.provide('sock', {
            connected            : _connected_func            ,
            update               : _update_func               ,
            setConnectionCallback: _setConnectionCallback_func,
            setMessageCallback   : _setMessageCallback_func   ,
            subscribe            : _subscribe_func            ,
            unsubscribe          : _unsubscribe_func          ,
            emit                 : _emit_func                 ,
        });
    }
};

/*--------------------------------------------------------------------------------------------------------------------*/
