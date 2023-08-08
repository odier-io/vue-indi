// noinspection JSUnresolvedReference
/*--------------------------------------------------------------------------------------------------------------------*/

import { defineStore } from 'pinia';

import { Terminal } from 'xterm';

import 'xterm/css/xterm.css';

/*--------------------------------------------------------------------------------------------------------------------*/

const terminal = new Terminal({convertEol: true, fontFamily: 'Ubuntu Mono, courier-new, courier, monospace'});

/*--------------------------------------------------------------------------------------------------------------------*/

const useIndiStore = defineStore('indi', {
    state: () => {

        /*------------------------------------------------------------------------------------------------------------*/

        const devices = Object.keys(this.deviceCategories).reduce((dict, category) => {

            dict[category] = '';

            return dict;

        }, {});

        /*------------------------------------------------------------------------------------------------------------*/

        return {
            drivers: [],
            devices: devices,
            offOnSwitch: 'off',
            currentDeviceName: '---',
            /**/
            messageDict: {},
            defXXXVectorDict: {},
        };

        /*------------------------------------------------------------------------------------------------------------*/
    },
    getters: {

        /*------------------------------------------------------------------------------------------------------------*/

        deviceCategories()
        {
            return {
                'dome': 'Dome',
                'mount': 'Mount',
                'camera1': 'Main camera',
                'camera2': 'Guiding camera',
                'focuser': 'Focuser',
                'filters': 'Filters',
                'weather': 'Weather',
                'aux1': 'Aux 1',
                'aux2': 'Aux 2',
                'aux3': 'Aux 3',
                'aux4': 'Aux 4',
                'aux5': 'Aux 5',
                'aux6': 'Aux 6',
                'aux7': 'Aux 7',
                'aux8': 'Aux 8',
            };
        },

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

                if(defXXXVector['<>'] === 'defTextVector'
                   ||
                   defXXXVector['<>'] === 'defNumberVector'

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

        clearTerminal()
        {
            terminal.clear();

            this.messageDict[this.currentDeviceName].length = 0;
        },

        /*------------------------------------------------------------------------------------------------------------*/

        updateTerminal(newDeviceName)
        {
            terminal.clear();

            if(typeof newDeviceName !== 'undefined')
            {
                this.currentDeviceName = newDeviceName;
            }

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
