/*--------------------------------------------------------------------------------------------------------------------*/

import { createPinia } from 'pinia';

import 'bootstrap/js/src/tab';
import 'bootstrap/js/src/modal';

/*--------------------------------------------------------------------------------------------------------------------*/

import indi from './plugins/indi';
import sock from './plugins/sock';

import useIndiStore from './stores/indi';

import IndiDashboard from './components/IndiDashboard.vue';
import IndiDriver from './components/IndiDriver.vue';

/*--------------------------------------------------------------------------------------------------------------------*/

const setup = (app) => {

    app.use(createPinia());

    app.use(indi);
    app.use(sock);
};

/*--------------------------------------------------------------------------------------------------------------------*/

export {
    setup,
    useIndiStore,
    IndiDashboard,
    IndiDriver,
};

/*--------------------------------------------------------------------------------------------------------------------*/
