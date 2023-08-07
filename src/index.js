/*--------------------------------------------------------------------------------------------------------------------*/

import { createPinia } from 'pinia';

import 'bootstrap/js/src/tab';
import 'bootstrap/js/src/modal';

/*--------------------------------------------------------------------------------------------------------------------*/

import indi from './plugins/indi';
import sock from './plugins/sock';

import useIndiStore from './stores/indi';

import IndiDriver from './components/IndiDriver.vue';
import IndiVariable from './components/IndiVariable.vue';
import IndiDashboard from './components/IndiDashboard.vue';

/*--------------------------------------------------------------------------------------------------------------------*/

const setup = (app) => {

    /*----------------------------------------------------------------------------------------------------------------*/

    app.use(createPinia());

    app.use(indi);
    app.use(sock);

    /*----------------------------------------------------------------------------------------------------------------*/

    const initialize = (json) => {

        try
        {
            indi.processMessage(JSON.parse(json));
        }
        catch(e)
        {
            console.error(`Error parsing message: ${e}`);
        }
    };

    app._context.provides.sock.subscribe('indi', initialize);

    /*----------------------------------------------------------------------------------------------------------------*/
};

/*--------------------------------------------------------------------------------------------------------------------*/

export {
    setup,
    useIndiStore,
    IndiDriver,
    IndiVariable,
    IndiDashboard,
};

/*--------------------------------------------------------------------------------------------------------------------*/
