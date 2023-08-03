// noinspection JSUnusedGlobalSymbols
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
            currentDeviceName: '---',
            /**/
            messageDict: {},
            defXXXVectorDict: {},
        };
    },
    getters: {
        /*------------------------------------------------------------------------------------------------------------*/

        defXXXVectors()
        {
            return Object.values(this.defXXXVectorDict);
        },

        /*------------------------------------------------------------------------------------------------------------*/

        variables()
        {
            const result = {};

            this.defXXXVectors.forEach((defXXXVector) => {

                if(defXXXVector['<>'] === 'newTextVector'
                   ||
                   defXXXVector['<>'] === 'newNumberVector'

                ) defXXXVector['children'].forEach((defXXXX) => {

                    result[`${defXXXVector['@device']}:${defXXXVector['@name']}:${defXXXX['@name']}`] = defXXXX['$'];
                });
            });

            return result;
        }

        /*------------------------------------------------------------------------------------------------------------*/
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

        /*------------------------------------------------------------------------------------------------------------*/

        setOffOnSwitch(offOnSwitch)
        {
            this.offOnSwitch = offOnSwitch || false;

            return this;
        },

        /*------------------------------------------------------------------------------------------------------------*/

        setCurrentDeviceName(currentDeviceName)
        {
            this.currentDeviceName = currentDeviceName || '';

            return this;
        },

        /*------------------------------------------------------------------------------------------------------------*/

        clearMessages()
        {
            terminal.clear();

            this.messageDict[this.currentDeviceName].length = 0;
        },

        /*------------------------------------------------------------------------------------------------------------*/

        updateTerminal()
        {
            terminal.clear();

            if(this.currentDeviceName in this.messageDict)
            {
                this.messageDict[this.currentDeviceName].map((x) => `${x.timestamp} - ${x.message}`).forEach((line) => terminal.writeln(line));
            }
        },

        /*------------------------------------------------------------------------------------------------------------*/
    },
});

/*--------------------------------------------------------------------------------------------------------------------*/

export default useIndiStore;

/*--------------------------------------------------------------------------------------------------------------------*/
