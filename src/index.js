/*--------------------------------------------------------------------------------------------------------------------*/

import { createPinia } from 'pinia';

import 'bootstrap/js/src/tab';
import 'bootstrap/js/src/modal';

/*--------------------------------------------------------------------------------------------------------------------*/

import indi from './plugins/indi';
import sock from './plugins/sock';

import useMessageStore from './stores/messages';

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
    useMessageStore,
    IndiDashboard,
    IndiDriver,
};

/*--------------------------------------------------------------------------------------------------------------------*/
