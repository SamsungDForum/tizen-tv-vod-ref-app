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