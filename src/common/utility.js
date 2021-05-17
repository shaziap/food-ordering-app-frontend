/**
 * This is a utility method used for fetching url data and callback method is fired on successful request
 *
 * @Param reqObject - ex: {url:"http://google.com", method: "GET", "headers": {Content-Type: "Application/Json"}}
 * @Param data - This should contain request body
 * @Param callback - On successfull request completion this callback method is called
 * @Param extra - Any extra data which require when callback method is invoked is passed through this variable
 *  */
let fetchDataMethod = (reqObject, data, callback, extra) => {
  let xhr = new XMLHttpRequest();
  xhr.addEventListener("readystatechange", function() {
    if (this.readyState === 4) {
      let responseHeaders = xhr.getAllResponseHeaders();
      console.log("Response Header: " + responseHeaders);
      console.log("Response Text: " + this.responseText);
      callback(
        this.status,
        JSON.parse(this.responseText),
        responseHeaders,
        extra
      );
    }
  });
  console.log("url: " + reqObject.url);
  console.log("http method: " + reqObject.method);
  console.log("data: " + JSON.stringify(data));
  xhr.open(reqObject.method, reqObject.url);
  xhr.setRequestHeader("Content-Type", "application/json");
  if (reqObject.headers) {
    console.log("Req Header Found");
    Object.keys(reqObject.headers).forEach(function(key) {
      console.log(key + " -- " + reqObject.headers[key]);
      xhr.setRequestHeader(key, reqObject.headers[key]);
    });
  }
  xhr.send(JSON.stringify(data));
};

/**
 * This method uses above mentioned fetchDataMethod to perform GET Request
 *
 * @Param reqObject - ex: {url:"http://google.com", "headers": {Content-Type: "Application/Json"}}
 * @Param data - This should contain request body
 * @Param callback - On successfull request completion this callback method is called
 * @Param extra - Any extra data which require when callback method is invoked is passed through this variable
 *  */
let getDataMethod = (reqObject, data, callback, extra) => {
  reqObject.method = "GET";
  fetchDataMethod(reqObject, data, callback, extra);
};

/**
 * This method uses above mentioned fetchDataMethod to perform POST Request
 *
 * @Param reqObject - ex: {url:"http://google.com", "headers": {Content-Type: "Application/Json"}}
 * @Param data - This should contain request body
 * @Param callback - On successfull request completion this callback method is called
 * @Param extra - Any extra data which require when callback method is invoked is passed through this variable
 *  */
let postDataMethod = (reqObject, data, callback, extra) => {
  reqObject.method = "POST";
  fetchDataMethod(reqObject, data, callback, extra);
};

/**
 * This method return user object if user is loggedin
 *
 * @returns user
 */
let getLoggedinUserMethod = () => {
  return sessionStorage.getItem("user-info");
};

/**
 * This method create and save user object in session along with accesstoken
 *
 * @param {*} response
 * @param {*} accessToken
 */
let setUserSessionMethod = (response, accessToken) => {
  let user = {
    access_token: accessToken,
    firstname: response.first_name,
    lastname: response.last_name,
  };

  sessionStorage.setItem("user-info", user);
};

/**
 * This method logout currenlty loggedin user
 *
 */
let logoutUserMethod = () => {
  sessionStorage.clear();
};

let utility = {
  getData: getDataMethod,
  postData: postDataMethod,
  getLoggedinUser: getLoggedinUserMethod,
  setUserSession: setUserSessionMethod,
  logoutUser: logoutUserMethod,
};

export default utility;
