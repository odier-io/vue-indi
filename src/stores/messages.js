/*--------------------------------------------------------------------------------------------------------------------*/

import { defineStore } from 'pinia';

/*--------------------------------------------------------------------------------------------------------------------*/

const useMessageStore = defineStore('messages', {
    state: () => {
        return {
            messages: {},
        };
    },
    actions: {
        getMessagesForDevice(device)
        {
           return device in this.messages ? '\n'.join(this.messages.map((x) => `${x.timestamp}: ${x.message}`)) : '';
        },
    },
});

/*--------------------------------------------------------------------------------------------------------------------*/

export default useMessageStore;

/*--------------------------------------------------------------------------------------------------------------------*/
