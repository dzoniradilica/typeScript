var userInput;
var userName;
userInput = 1;
userInput = 'max';
if (typeof userInput === 'string') {
    userName = userInput;
}
function generateError(message, code) {
    throw { message: message, errorCode: code };
}
generateError('looool', 400);
