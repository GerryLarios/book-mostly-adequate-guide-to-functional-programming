const pause = (time = 5000) => new Promise(res => setTimeout(res, time));

const ajaxCall = (callback) => {
  pause();
  callback({ id: 666, firstName: 'GERARDO', lastName: 'Larios' });
}

// ignorant
const getServerStuff = callback => ajaxCall(json => callback(json));
// this line ajaxCall(json => callback(json)) is the same as this line ajaxCall(callback)

// enlightened
const getServerAjax = ajaxCall;
// so refactor getServerAjax is equivalent to ajaxCall

