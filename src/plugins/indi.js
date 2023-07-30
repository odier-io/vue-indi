/*--------------------------------------------------------------------------------------------------------------------*/

const _buildKey = (message) => `${message['@device']}::${message['@name']}`;

/*--------------------------------------------------------------------------------------------------------------------*/

const _processMessage = (defXXXVectorDict, message) => {

    if('<>' in message)
    {
        /*------------------------------------------------------------------------------------------------------------*/
        /* DEF* MESSAGES                                                                                              */
        /*------------------------------------------------------------------------------------------------------------*/

        /**/ if(message['<>'].startsWith('def') && '@device' in message && '@name' in message && 'children' in message)
        {
            defXXXVectorDict[_buildKey(message)] = message;

            message['children'].forEach((defXXXX) => {

                const m = /%(\d*)(?:\.(\d+))?f/.exec(defXXXX['@format']);

                defXXXX['@orig'] = defXXXX['$'] = (m && typeof m[2] !== 'undefined') ? defXXXX['$']
                                                                                            = parseFloat(defXXXX['$']).toFixed(parseInt(m[2])).toString()
                                                                                     : defXXXX['$']
                ;
            });
        }

        /*------------------------------------------------------------------------------------------------------------*/
        /* SET* MESSAGES                                                                                              */
        /*------------------------------------------------------------------------------------------------------------*/

        else if(message['<>'].startsWith('set') && '@device' in message && '@name' in message && 'children' in message)
        {
            const vector = defXXXVectorDict[_buildKey(message)];

            if(!vector)
            {
                return;
            }

            const children1 = message['children'];
            const children2 = vector['children'];

            for(let i = 0, j = Math.min(children1.length, children2.length); i < j; i++)
            {
                if('$' in children1[i] && children2[i]['$'] !== children1[i]['$'])
                {
                    children2[i]['@orig'] = children1[i]['$'];

                    children2[i]['$'] = children1[i]['$'];
                }
            }

            if(('@state' in message) && vector['@state'] !== message['@state'])
            {
                vector['@state'] = message['@state'];
            }

            if(('@perm' in message) && vector['@perm'] !== message['@perm'])
            {
                vector['@perm'] = message['@perm'];
            }
        }

        /*------------------------------------------------------------------------------------------------------------*/
        /* DEL* MESSAGES                                                                                              */
        /*------------------------------------------------------------------------------------------------------------*/

        else if(message['<>'] === 'delProperty' && '@device' in message && '@name' in message)
        {
            delete defXXXVectorDict[_buildKey(message)];
        }

        /*------------------------------------------------------------------------------------------------------------*/
        /* ALERT MESSAGES                                                                                             */
        /*------------------------------------------------------------------------------------------------------------*/

        else if(message['<>'] === 'message')
        {
            const textarea = document.getElementById('indi_console')

            textarea.value = `${message['@message']}\n${textarea.value}`;

            console.log(message['@message']);
        }

        /*------------------------------------------------------------------------------------------------------------*/
    }
};

/*--------------------------------------------------------------------------------------------------------------------*/

const _buildNewTextVectorMessage = (defTextVector) => {

    const result = {'<>': 'newTextVector', '@device': defTextVector['@device'], '@name': defTextVector['@name'], 'children': []};

    defTextVector['children'].forEach((defText) => {

        if(defText['@orig'].toString() !== defText['$'].toString())
        {
            result['children'].push({
                '<>': 'oneText',
                '@name': defText['@name'],
                '$': defText['$'].toString(),
            });
        }
    });

    return result['children'].length > 0 ? JSON.stringify(result) : null;
};

/*--------------------------------------------------------------------------------------------------------------------*/

const _buildNewNumberVectorMessage = (defNumberVector) => {

    const result = {'<>': 'newNumberVector', '@device': defNumberVector['@device'], '@name': defNumberVector['@name'], 'children': []};

    defNumberVector['children'].forEach((defNumber) => {

        if(defNumber['@orig'].toString() !== defNumber['$'].toString())
        {
            result['children'].push({
                '<>': 'oneNumber',
                '@name': defNumber['@name'],
                '$': defNumber['$'].toString(),
            });
        }
    });

    return result['children'].length > 0 ? JSON.stringify(result) : null;
};

/*--------------------------------------------------------------------------------------------------------------------*/

const _buildNewSwitchVectorMessage = (defSwitchVector, index) => {

    const result = {'<>': 'newSwitchVector', '@device': defSwitchVector['@device'], '@name': defSwitchVector['@name'], 'children': []};

    switch(defSwitchVector['@rule'])
    {
        /*------------------------------------------------------------------------------------------------------------*/
        /* OneOfMany                                                                                                  */
        /*------------------------------------------------------------------------------------------------------------*/

        case 'OneOfMany':

            defSwitchVector['children'].forEach((def, INDEX) => {

                result['children'].push({
                    '<>': 'oneSwitch',
                    '@name': def['@name'],
                    '$': index === INDEX ? 'On' : 'Off',
                });
            });

            break;

        /*------------------------------------------------------------------------------------------------------------*/
        /* AtMostOne                                                                                                  */
        /*------------------------------------------------------------------------------------------------------------*/

        case 'AtMostOne':

            defSwitchVector['children'].forEach((def, INDEX) => {

                result['children'].push({
                    '<>': 'oneSwitch',
                    '@name': def['@name'],
                    '$': index === INDEX ? (def['$'] === 'On' ? 'Off' : 'On') : 'Off',
                });
            });

            break;

        /*------------------------------------------------------------------------------------------------------------*/
        /* AnyOfMany                                                                                                  */
        /*------------------------------------------------------------------------------------------------------------*/

        case 'AnyOfMany':

            defSwitchVector['children'].forEach((def, INDEX) => {

                result['children'].push({
                    '<>': 'oneSwitch',
                    '@name': def['@name'],
                    '$': index === INDEX ? (def['$'] === 'On' ? 'Off' : 'On') : def['$'],
                });
            });

            break;

        /*------------------------------------------------------------------------------------------------------------*/
    }

    return JSON.stringify(result);
};

/*--------------------------------------------------------------------------------------------------------------------*/

export default {

    install(app)
    {
        app.provide('indi', {
            processMessage: _processMessage,
            buildNewTextVectorMessage: _buildNewTextVectorMessage,
            buildNewNumberVectorMessage: _buildNewNumberVectorMessage,
            buildNewSwitchVectorMessage: _buildNewSwitchVectorMessage,
        });
    }
};

/*--------------------------------------------------------------------------------------------------------------------*/
