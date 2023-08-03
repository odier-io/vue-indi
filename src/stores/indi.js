/*--------------------------------------------------------------------------------------------------------------------*/

import { defineStore } from 'pinia';

import { Terminal } from 'xterm';

import 'xterm/css/xterm.css';

/*--------------------------------------------------------------------------------------------------------------------*/

const terminal = new Terminal({convertEol: true, fontFamily: 'Ubuntu Mono, courier-new, courier, monospace'});

/*--------------------------------------------------------------------------------------------------------------------*/

const useIndiStore = defineStore('indi', {
    state: () => {
        return {
            drivers: [],
            offOnSwitch: 'off',
            /**/
            messages: {},
            currentDeviceName: '---',
        };
    },
    actions: {
        /*------------------------------------------------------------------------------------------------------------*/

        setup(div)
        {
            terminal.open(div);
        },

        /*------------------------------------------------------------------------------------------------------------*/

        setDrivers(drivers)
        {
            this.drivers = drivers || [];

            return this;
        },

        getDrivers()
        {
            return this.drivers;
        },

        /*------------------------------------------------------------------------------------------------------------*/

        setOffOnSwitch(offOnSwitch)
        {
            this.offOnSwitch = offOnSwitch || false;

            return this;
        },

        getOffOnSwitch()
        {
            return this.offOnSwitch;
        },

        /*------------------------------------------------------------------------------------------------------------*/

        setCurrentDeviceName(currentDeviceName)
        {
            this.currentDeviceName = currentDeviceName || '';

            return this;
        },

        getCurrentDeviceName()
        {
            return this.currentDeviceName;
        },

        /*------------------------------------------------------------------------------------------------------------*/

        injectMessage(message)
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
                timestamp: message['@timestamp'] || '',
                message  : message['@message'  ] || '',
            });

            this.updateTerminal();
        },

        /*------------------------------------------------------------------------------------------------------------*/

        clearMessages()
        {
            this.messages[this.currentDeviceName].length = 0;

            this.updateTerminal();
        },

        /*------------------------------------------------------------------------------------------------------------*/

        updateTerminal()
        {
            terminal.clear();

            if(this.currentDeviceName in this.messages)
            {
                this.messages[this.currentDeviceName].map((x) => `${x.timestamp} - ${x.message}`).forEach((line) => terminal.writeln(line));
            }
        },

        /*------------------------------------------------------------------------------------------------------------*/
    },
});

/*--------------------------------------------------------------------------------------------------------------------*/

export default useIndiStore;

/*--------------------------------------------------------------------------------------------------------------------*/
