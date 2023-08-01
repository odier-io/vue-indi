/*--------------------------------------------------------------------------------------------------------------------*/

import { defineStore } from 'pinia';

import { Terminal } from 'xterm';

import 'xterm/css/xterm.css';

/*--------------------------------------------------------------------------------------------------------------------*/

const terminal = new Terminal({convertEol: true, fontFamily: 'Ubuntu Mono, courier-new, courier, monospace'});

/*--------------------------------------------------------------------------------------------------------------------*/

const useMessageStore = defineStore('messages', {
    state: () => {
        return {
            messages: {},
            deviceName: '',
        };
    },
    actions: {
        /*------------------------------------------------------------------------------------------------------------*/

        setup(div)
        {
            terminal.open(div);
        },

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
            this.deviceName = deviceName || '';

            this.updateMessages();
        },

        /*------------------------------------------------------------------------------------------------------------*/

        clearMessages()
        {
            this.messages[this.deviceName].length = 0;

            this.updateMessages();
        },

        /*------------------------------------------------------------------------------------------------------------*/

        updateMessages()
        {
            terminal.clear();

            if(this.deviceName in this.messages)
            {
                this.messages[this.deviceName].map((x) => `${x.timestamp} - ${x.message}`).forEach((line) => terminal.writeln(line));
            }
        },

        /*------------------------------------------------------------------------------------------------------------*/
    },
});

/*--------------------------------------------------------------------------------------------------------------------*/

export default useMessageStore;

/*--------------------------------------------------------------------------------------------------------------------*/
