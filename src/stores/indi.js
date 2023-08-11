// noinspection JSUnresolvedReference
/*--------------------------------------------------------------------------------------------------------------------*/

import { defineStore } from 'pinia';

import { Terminal } from 'xterm';

import 'xterm/css/xterm.css';

/*--------------------------------------------------------------------------------------------------------------------*/

const CATEGORY_DEFS = [
    {value: 'dome', label: 'Dome'},
    {value: 'mount', label: 'Mount'},
    {value: 'imaging_camera', label: 'Imaging camera'},
    {value: 'guiding_camera', label: 'Guiding camera'},
    {value: 'focuser', label: 'Focuser'},
    {value: 'filters', label: 'Filters'},
    {value: 'weather', label: 'Weather'},
];

/*--------------------------------------------------------------------------------------------------------------------*/

const terminal = new Terminal({convertEol: true, fontFamily: 'Ubuntu Mono, courier-new, courier, monospace'});

/*--------------------------------------------------------------------------------------------------------------------*/

const useIndiStore = defineStore('indi', {
    state: () => {

        /*------------------------------------------------------------------------------------------------------------*/

        return {
            offOnSwitch: 'off',
            currentDeviceName: '---',
            /**/
            driverDefs: [],
            driverDict: {},
            deviceDict: {},
            messageDict: {},
            defXXXVectorDict: {},
        };

        /*------------------------------------------------------------------------------------------------------------*/
    },
    getters: {

        /*------------------------------------------------------------------------------------------------------------*/

        categoryDefs()
        {
            return CATEGORY_DEFS;
        },

        /*------------------------------------------------------------------------------------------------------------*/

        deviceDefs()
        {
            return [...new Set(Object.values(this.defXXXVectorDict).map(v => v['@device']))].map(device => ({
                value: device,
                label: device,
            }));
        },

        /*------------------------------------------------------------------------------------------------------------*/

        variables()
        {
            const result = {};

            Object.values(this.defXXXVectorDict).forEach((defXXXVector) => {

                if(defXXXVector['<>'] === 'defTextVector'
                   ||
                   defXXXVector['<>'] === 'defNumberVector'

                ) defXXXVector['children'].forEach((defXXX) => {

                    result[`\${${defXXXVector['@device']}:${defXXXVector['@name']}:${defXXX['@name']}}`] = defXXX['$'];
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

        updateTerminal(newDeviceName = null)
        {
            terminal.clear();

            if(newDeviceName)
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
