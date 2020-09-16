export default class AdminRequest {
  constructor(apiParams, method, authorization, body, signal) {
    this.apiParams = apiParams;
    this.method = method;
    this.signal = signal;
    this.headers = {
      'X-Api-Factory-Application-Id': '5e25c641099b810b946c5d5b',
      'Content-Type': 'application/json',
      'Authorization': authorization,
      'X-Requested-With': 'XMLHttpRequest',
    };
    if (body) this.body = JSON.stringify(body);
  }
  doRequest() {
    return fetch(
      `https://cors-anywhere.herokuapp.com/http://api-factory.simbirsoft1.com/api/${this.apiParams}`,
      {
        method: this.method,
        headers: this.headers,
        body: this.body,
        signal: this.signal,
      },
    ).then((response) =>
      response.ok ? response.json() : Promise.reject(response),
    );
  }
}
