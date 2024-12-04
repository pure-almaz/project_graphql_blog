export const cleanUpResponse = (text) => {
    // Replace escaped newlines with actual newlines
    if (!text) {
        return ""
    }
    
    let cleanedText = text.replace(/\\n/g, '\n');
    
    // Replace escaped quotes with actual quotes
    cleanedText = cleanedText.replace(/\\"/g, '"');
    
    // Remove any leading or trailing quotes (either single or double quotes)
    cleanedText = cleanedText.replace(/^"+|"+$/g, '').replace(/^'+|'+$/g, '');
  
    return cleanedText;
  }