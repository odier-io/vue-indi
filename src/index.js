/*--------------------------------------------------------------------------------------------------------------------*/

import { inject } from 'vue';

import { createPinia } from 'pinia';

import 'bootstrap/js/src/tab';
import 'bootstrap/js/src/modal';

/*--------------------------------------------------------------------------------------------------------------------*/

import indiPlugin from './plugins/indi';
import sockPlugin from './plugins/sock';
import useIndiStore from './stores/indi';

import IndiDriver from './components/IndiDriver.vue';
import IndiVariable from './components/IndiVariable.vue';
import IndiDashboard from './components/IndiDashboard.vue';

/*--------------------------------------------------------------------------------------------------------------------*/

const setup = (app) => {

    /*----------------------------------------------------------------------------------------------------------------*/

    app.use(createPinia());

    app.use(indiPlugin);
    app.use(sockPlugin);

    /*--------------------------------------------------------------------------------------------------------------------*/

    const indi = inject('indi');
    const sock = inject('sock');

    /*--------------------------------------------------------------------------------------------------------------------*/

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

    sock.subscribe('indi', initialize);

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
