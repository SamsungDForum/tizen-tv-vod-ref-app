/* Copyright
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

function isValidJson(str) {
    const result = {
        success: true,
        error: ""
    }
    
    try {
        JSON.parse(str);
    } catch (e) {        
        return {
            success: false,
            error: `JSON is not valid: ${e.message.toLowerCase()}`
        };
    } 

    return result;
}

export { isValidJson };