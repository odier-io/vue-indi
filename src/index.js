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

    app.use(createPinia());

    app.use(indi);
    app.use(sock);
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
