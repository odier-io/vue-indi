/*--------------------------------------------------------------------------------------------------------------------*/

import { createPinia } from 'pinia';

import 'bootstrap/js/src/tab';
import 'bootstrap/js/src/modal';

/*--------------------------------------------------------------------------------------------------------------------*/

import indi from './plugins/indi';
import sock from './plugins/sock';

import IndiDashboard from './components/IndiDashboard.vue';

import useMessageStore from './stores/messages';

/*--------------------------------------------------------------------------------------------------------------------*/

const setup = (app) => {

    app.use(createPinia());

    app.use(indi);
    app.use(sock);
};

/*--------------------------------------------------------------------------------------------------------------------*/

export {
    setup,
    IndiDashboard,
    useMessageStore,
};

/*--------------------------------------------------------------------------------------------------------------------*/
