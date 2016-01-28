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
			var _elem = document.createElement('script'),
				_readyCallbackName = '__gapi__callback',
				_document = window.document,
				_node = _document.getElementsByTagName('script')[0];

			/**
			  On a side note: It's impossible to decypher what google js-api to load.
				`https://apis.google.com/js/api:client.js`
				or
				`https://apis.google.com/js/api/client.js`
				or
				`https://apis.google.com/js/api/platform.js`
			 */

			_elem.setAttribute('src', 'https://apis.google.com/js/api:client.js?onload=' + _readyCallbackName);
			_elem.async = true;

			window[_readyCallbackName] = () => {
				gapi.load('auth2', () => this._api_has_loaded(resolve, reject, preload_api));
			}

			if (_node) {
				_node.parentNode.insertBefore(_elem, _node);
			} else {
				(_document.head || _document.body || _document.documentElement).appendChild(_elem);
			}
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