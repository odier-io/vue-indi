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
            terminalInstance: new Terminal({convertEol: true, fontFamily: 'Ubuntu Mono, courier-new, courier, monospace'}),
        };
    },
    actions: {
        /*------------------------------------------------------------------------------------------------------------*/

        inject(message)
        {
            let list;

            if(message['@device'] in this.messages)
            {
                list = this.messages[message['@device']] ; //;
            }
            else
            {
                list = this.messages[message['@device']] = [];
            }

            list.unshift({
                message: message['@message'] || '',
                timestamp: message['@timestamp'] || '',
            });

            this.updateMessages();
        },

        /*------------------------------------------------------------------------------------------------------------*/

        selectDevice(deviceName)
        {
            this.deviceName = (deviceName || '').trim();

            this.updateMessages();
        },

        /*------------------------------------------------------------------------------------------------------------*/

        clearMessages()
        {
            this.messages[this.deviceName] = [];

            this.updateMessages();
        },

        /*------------------------------------------------------------------------------------------------------------*/

        updateMessages()
        {
            this.terminalInstance.clear();

            if(this.deviceName in this.messages)
            {
                this.messages[this.deviceName].map((x) => `${x.timestamp} - ${x.message}`).forEach((line) => this.terminalInstance.writeln(line));
            }
        },

        /*------------------------------------------------------------------------------------------------------------*/
    },
});

/*--------------------------------------------------------------------------------------------------------------------*/

export default useMessageStore;

/*--------------------------------------------------------------------------------------------------------------------*/
