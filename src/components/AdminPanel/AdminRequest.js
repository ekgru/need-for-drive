export default class AdminRequest {
  constructor(apiParams, method, authorization, body) {
    this.apiParams = apiParams;
    this.method = method;

    this.headers = {
      'X-Api-Factory-Application-Id': '5e25c641099b810b946c5d5b',
      'Content-Type': 'application/json',
      'Authorization': authorization,
      'X-Requested-With': 'XMLHttpRequest',
    };
    this.body = JSON.stringify(body);
  }
  doRequest() {
    return fetch(`/${this.apiParams}`, {
      method: this.method,
      headers: this.headers,
      body: this.body,
    }).then((response) =>
      response.ok ? response.json() : Promise.reject(response),
    );
  }
}
