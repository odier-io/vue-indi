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

            console.log('**************************');

            this.updateMessages();
        },
        updateMessages()
        {
            const content = this.deviceName in this.messages ? this.messages[this.deviceName].map((x) => `${x.timestamp} - ${x.message}`).join('\n') : '';

            this.terminalInstance.reset();

            this.terminalInstance.writeln(content);

            if(this.deviceName in this.messages)
            {
                console.log('----------------------------');
                console.log(content);
            }

        },
    },
});

/*--------------------------------------------------------------------------------------------------------------------*/

export default useMessageStore;

/*--------------------------------------------------------------------------------------------------------------------*/
