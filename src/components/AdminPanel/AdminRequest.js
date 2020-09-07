export default class AdminRequest {
  constructor(apiParams, method, authorization) {
    this.apiParams = apiParams;
    this.method = method;
    this.api = 'https://cors-anywhere.herokuapp.com/http://api-factory.simbirsoft1.com/api/';
    this.headers = {
      'X-Api-Factory-Application-Id': '5e25c641099b810b946c5d5b',
      'Content-Type': 'application/json',
      'Authorization': authorization,
    };
  }
  doRequest() {
    return fetch(`${this.api}${this.apiParams}`, {
      method: this.method,
      headers: this.headers,
    }).then((response) => response.json());
  }
}
//    'https://cors-anywhere.herokuapp.com/http://api-factory.simbirsoft1.com/api/';
