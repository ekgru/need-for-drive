export default class AdminRequest {
  constructor(apiParams, method, authorization, body) {
    this.apiParams = apiParams;
    this.method = method;
    this.api =
      'https://thingproxy.freeboard.io/fetch/http://api-factory.simbirsoft1.com/api/';
    this.headers = {
      'X-Api-Factory-Application-Id': '5e25c641099b810b946c5d5b',
      'Content-Type': 'application/json',
      'Authorization': authorization,
    };
    this.body = JSON.stringify(body);
    // this.body = body
  }
  doRequest() {
    return fetch(`${this.api}${this.apiParams}`, {
      method: this.method,
      headers: this.headers,
      body: this.body,
    }).then((response) => response.json());
  }
}
//    'https://cors-anywhere.herokuapp.com/http://api-factory.simbirsoft1.com/api/';
