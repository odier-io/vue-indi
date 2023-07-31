/*--------------------------------------------------------------------------------------------------------------------*/

import { defineStore } from 'pinia';

import { Terminal } from 'xterm';

import 'xterm/css/xterm.css';

/*--------------------------------------------------------------------------------------------------------------------*/

const useMessageStore = defineStore('messages', {
    state: () => {
        return {
            messages: {},
            deviceName: '',
            terminalDiv: null,
            terminalInstance: new Terminal({convertEol: true, fontFamily: 'Ubuntu Mono, courier-new, courier, monospace'}),
        };
    },
    actions: {
        showMessages(deviceName)
        {
            this.deviceName = deviceName;

            this.terminalInstance.clear();

            this.terminalInstance.open(device in this.messages ? this.messages[device].map((x) => `${x.timestamp}: ${x.message}`).join('\n') + '\n' : '');
        },
    },
});

/*--------------------------------------------------------------------------------------------------------------------*/

export default useMessageStore;

/*--------------------------------------------------------------------------------------------------------------------*/
