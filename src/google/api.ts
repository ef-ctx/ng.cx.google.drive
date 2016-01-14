/// <reference path="../../typings/tsd.d.ts" />

const VERSIONS = {
	'drive': 'v3'
}

export class API {
  static _script_loaded: boolean = false;
  static _api_load_promise: Promise<any>;

	static bootstrap(preload_api?: string) {
		if (!this._api_load_promise) {
			this._api_load_promise = new Promise((resolve, reject) => this._add_script_tag(resolve, reject, preload_api));
		}

		return this._api_load_promise;
	}

	static load(name: string, version: string) {
		if (!VERSIONS.hasOwnProperty(name)) {
			console.warn('Unsupported api "' + name + '"');
		} else {
			if (VERSIONS[name] !== version) {
				console.warn('Unsupported ' + name + '-api version "' + version + '"');
			}
		}

    if (API._script_loaded) {
      return new Promise((resolve, reject) => gapi.client.load(name, version, resolve));
    }

    return Promise.reject('Google Apis has not been loaded');
	}

	static _add_script_tag(resolve, reject, preload_api:string) {
		if (API._script_loaded) {
			this._api_has_loaded(resolve, reject, preload_api);
		} else {
	    var elem = document.createElement('script'),
	      _readyCallbackName = '__gapi__callback';

	    elem.setAttribute('src', '//apis.google.com/js/client.js?onload=' + _readyCallbackName);
	    elem.setAttribute('defer', null);
	    elem.setAttribute('async', null);

			window[_readyCallbackName] = () => this._api_has_loaded(resolve, reject, preload_api);
			window.document.head.appendChild(elem);
		}
  }

  static _api_has_loaded(resolve, reject, preload_api:string) {
    API._script_loaded = true;

    if (preload_api) {
			this.load(preload_api, VERSIONS[preload_api]).then(resolve);
    } else {
			resolve();
    }
  }
}