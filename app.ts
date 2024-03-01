let userInput: unknown;
let userName: string;

userInput = 1;
userInput = 'max';

if (typeof userInput === 'string') {
  userName = userInput;
}

function generateError(message: string, code: number) {
  throw { message: message, errorCode: code };
}

generateError('looool', 400);
