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
        setMessages(deviceName)
        {
            this.deviceName = deviceName;

            this.updateMessages();
        },
        updateMessages()
        {
            this.terminalInstance.clear();

            this.terminalInstance.write('-----------');

            this.terminalInstance.write(this.deviceName in this.messages ? this.messages[this.deviceName].map((x) => `${x.timestamp} - ${x.message}`).join('\n') + '\n' : '');

            if(this.deviceName in this.messages)
            {
                console.log('----------------------------');
                console.log(this.messages[this.deviceName]);
            }

        },
    },
});

/*--------------------------------------------------------------------------------------------------------------------*/

export default useMessageStore;

/*--------------------------------------------------------------------------------------------------------------------*/
