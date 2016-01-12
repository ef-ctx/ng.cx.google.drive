/// <reference path="../../typings/tsd.d.ts" />

export class API {
  static _script_loaded: boolean = false;
  private static _api_load_promise: Promise<any>;

	static bootstrap() {
		if (!this._api_load_promise) {
			this._api_load_promise = new Promise((resolve, reject) => this._add_script_tag(resolve, reject));
		}

		return this._api_load_promise;
	}

	static load(name: string, version: string) {
    if (API._script_loaded) {
      return new Promise((resolve, reject) => gapi.client.load(name, version, resolve));
    }

    return Promise.reject('Google Apis has not been loaded');
	}

	static _add_script_tag(resolve, reject) {
		if (API._script_loaded) {
			this._api_has_loaded(resolve, reject);
		} else {
	    var elem = document.createElement('script'),
	      _readyCallbackName = '__gapi__callback';

	    elem.setAttribute('src', '//apis.google.com/js/client.js?onload=' + _readyCallbackName);
	    elem.setAttribute('defer', null);
	    elem.setAttribute('async', null);

	    window[_readyCallbackName] = () => this._api_has_loaded(resolve, reject);
			window.document.head.appendChild(elem);
		}
  }

  static _api_has_loaded(resolve, reject) {
    API._script_loaded = true;
    resolve();
  }
}