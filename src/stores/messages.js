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

            if(this.deviceName in this.messages)
            {
                this.messages[this.deviceName].map((x) => `${x.timestamp} - ${x.message}`).forEach((line) => {

                    this.terminalInstance.writeln(line);
                });
            }
        },
    },
});

/*--------------------------------------------------------------------------------------------------------------------*/

export default useMessageStore;

/*--------------------------------------------------------------------------------------------------------------------*/
