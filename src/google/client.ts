/// <reference path="../../typings/tsd.d.ts" />

export class Client {
  static _script_loaded: boolean = false;

	static bootstrap(key:string) {
		return new Promise((resolve, reject) => this._add_script_tag(resolve, reject));
	}

	static load(name:string, version:string) {
    if (this._script_loaded) {
      return new Promise((resolve, reject) => gapi.client.load(name, version, resolve));
    }

    return Promise.reject('Google Api has not been loaded');
	}

	static _add_script_tag(resolve, reject) {
    var elem = document.createElement('script'),
      _readyCallbackName = '__gapi__callback';

    elem.setAttribute('src', '//apis.google.com/js/client.js?onload=' + _readyCallbackName);
    elem.setAttribute('defer', null);
    elem.setAttribute('async', null);

    window[_readyCallbackName] = () => this._api_has_loaded(resolve, reject);
		window.document.body.appendChild(elem);
  }

  static _api_has_loaded(resolve, reject) {
    this._script_loaded = true;
    resolve();
  }
}