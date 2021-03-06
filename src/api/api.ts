// eslint-disable-next-line
/// <reference path="./custom.d.ts" />
// tslint:disable
/**
 * Api Documentation
 * Api Documentation
 *
 * OpenAPI spec version: 1.0
 * 
 *
 * NOTE: This file is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the file manually.
 */

import * as url from "url";
import * as isomorphicFetch from "isomorphic-fetch";
import { Configuration } from "./configuration";

const BASE_PATH = process.env.VUE_APP_BACKEND_URL.replace(/\/+$/, "");

/**
 *
 * @export
 */
export const COLLECTION_FORMATS = {
    csv: ",",
    ssv: " ",
    tsv: "\t",
    pipes: "|",
};

/**
 *
 * @export
 * @interface FetchAPI
 */
export interface FetchAPI {
    (url: string, init?: any): Promise<Response>;
}

/**
 *
 * @export
 * @interface FetchArgs
 */
export interface FetchArgs {
    url: string;
    options: any;
}

/**
 *
 * @export
 * @class BaseAPI
 */
export class BaseAPI {
    protected configuration: Configuration;

    constructor(configuration?: Configuration, protected basePath: string = BASE_PATH, protected fetch: FetchAPI = isomorphicFetch) {
        if (configuration) {
            this.configuration = configuration;
            this.basePath = configuration.basePath || this.basePath;
        }
    }
}

/**
 *
 * @export
 * @class RequiredError
 * @extends {Error}
 */
export class RequiredError extends Error {
    name: "RequiredError"
    constructor(public field: string, msg?: string) {
        super(msg);
    }
}

/**
 * 
 * @export
 * @interface AuthorRef
 */
export interface AuthorRef {
    /**
     * 
     * @type {string}
     * @memberof AuthorRef
     */
    id: string;
    /**
     * 
     * @type {string}
     * @memberof AuthorRef
     */
    name: string;
}
/**
 * 
 * @export
 * @interface CreateProfileDto
 */
export interface CreateProfileDto {
    /**
     * 
     * @type {string}
     * @memberof CreateProfileDto
     */
    nickname: string;
    /**
     * 
     * @type {string}
     * @memberof CreateProfileDto
     */
    password: string;
}
/**
 * 
 * @export
 * @interface PostCreateDto
 */
export interface PostCreateDto {
    /**
     * 
     * @type {string}
     * @memberof PostCreateDto
     */
    image?: string;
    /**
     * 
     * @type {string}
     * @memberof PostCreateDto
     */
    text: string;
    /**
     * 
     * @type {string}
     * @memberof PostCreateDto
     */
    title: string;
}
/**
 * 
 * @export
 * @interface PostCreationResult
 */
export interface PostCreationResult {
    /**
     * 
     * @type {string}
     * @memberof PostCreationResult
     */
    id: string;
}
/**
 * 
 * @export
 * @interface PostDto
 */
export interface PostDto {
    /**
     * 
     * @type {AuthorRef}
     * @memberof PostDto
     */
    author: AuthorRef;
    /**
     * 
     * @type {Date}
     * @memberof PostDto
     */
    created: Date;
    /**
     * 
     * @type {string}
     * @memberof PostDto
     */
    id: string;
    /**
     * 
     * @type {string}
     * @memberof PostDto
     */
    image?: string;
    /**
     * 
     * @type {string}
     * @memberof PostDto
     */
    text: string;
    /**
     * 
     * @type {string}
     * @memberof PostDto
     */
    title: string;
}
/**
 * 
 * @export
 * @interface ProfileDto
 */
export interface ProfileDto {
    /**
     * 
     * @type {string}
     * @memberof ProfileDto
     */
    nickname: string;
    /**
     * 
     * @type {string}
     * @memberof ProfileDto
     */
    ownerName: string;
    /**
     * 
     * @type {string}
     * @memberof ProfileDto
     */
    status?: string;
}
/**
 * 
 * @export
 * @interface UpdateProfileDto
 */
export interface UpdateProfileDto {
    /**
     * 
     * @type {string}
     * @memberof UpdateProfileDto
     */
    nickname?: string;
    /**
     * 
     * @type {string}
     * @memberof UpdateProfileDto
     */
    status?: string;
}
/**
 * _Api - fetch parameter creator
 * @export
 */
export const _ApiFetchParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * 
         * @summary ?????????????? ????????
         * @param {PostCreateDto} body ?????????????????? ??????????
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        createUsingPOST(body: PostCreateDto, options: any = {}): FetchArgs {
            // verify required parameter 'body' is not null or undefined
            if (body === null || body === undefined) {
                throw new RequiredError('body','Required parameter body was null or undefined when calling createUsingPOST.');
            }
            const localVarPath = `/feed`;
            const localVarUrlObj = url.parse(localVarPath, true);
            const localVarRequestOptions = Object.assign({ method: 'POST' }, options);
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication oauth2 required
            // oauth required
            if (configuration && configuration.accessToken) {
				const localVarAccessTokenValue = typeof configuration.accessToken === 'function'
					? configuration.accessToken("oauth2", ["openid", "profile"])
					: configuration.accessToken;
                localVarHeaderParameter["Authorization"] = "Bearer " + localVarAccessTokenValue;
            }

            localVarHeaderParameter['Content-Type'] = 'application/json';

            localVarUrlObj.query = Object.assign({}, localVarUrlObj.query, localVarQueryParameter, options.query);
            // fix override query string Detail: https://stackoverflow.com/a/7517673/1077943
            delete localVarUrlObj.search;
            localVarRequestOptions.headers = Object.assign({}, localVarHeaderParameter, options.headers);
            const needsSerialization = (<any>"PostCreateDto" !== "string") || localVarRequestOptions.headers['Content-Type'] === 'application/json';
            localVarRequestOptions.body =  needsSerialization ? JSON.stringify(body || {}) : (body || "");

            return {
                url: url.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @summary ???????????????? ???????????????????? ?? ??????????
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getUsingGET(options: any = {}): FetchArgs {
            const localVarPath = `/feed`;
            const localVarUrlObj = url.parse(localVarPath, true);
            const localVarRequestOptions = Object.assign({ method: 'GET' }, options);
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            localVarUrlObj.query = Object.assign({}, localVarUrlObj.query, localVarQueryParameter, options.query);
            // fix override query string Detail: https://stackoverflow.com/a/7517673/1077943
            delete localVarUrlObj.search;
            localVarRequestOptions.headers = Object.assign({}, localVarHeaderParameter, options.headers);

            return {
                url: url.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @summary ?????????????????? ???????????? ??????????????
         * @param {string} id ?????????????????????????? ??????????????
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getUsingGET1(id: string, options: any = {}): FetchArgs {
            // verify required parameter 'id' is not null or undefined
            if (id === null || id === undefined) {
                throw new RequiredError('id','Required parameter id was null or undefined when calling getUsingGET1.');
            }
            const localVarPath = `/profile/public/{id}`
                .replace(`{${"id"}}`, encodeURIComponent(String(id)));
            const localVarUrlObj = url.parse(localVarPath, true);
            const localVarRequestOptions = Object.assign({ method: 'GET' }, options);
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            localVarUrlObj.query = Object.assign({}, localVarUrlObj.query, localVarQueryParameter, options.query);
            // fix override query string Detail: https://stackoverflow.com/a/7517673/1077943
            delete localVarUrlObj.search;
            localVarRequestOptions.headers = Object.assign({}, localVarHeaderParameter, options.headers);

            return {
                url: url.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @summary ?????????????????? ???????????? ???????????? ??????????????
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getUsingGET2(options: any = {}): FetchArgs {
            const localVarPath = `/profile/self`;
            const localVarUrlObj = url.parse(localVarPath, true);
            const localVarRequestOptions = Object.assign({ method: 'GET' }, options);
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication oauth2 required
            // oauth required
            if (configuration && configuration.accessToken) {
				const localVarAccessTokenValue = typeof configuration.accessToken === 'function'
					? configuration.accessToken("oauth2", ["openid", "profile"])
					: configuration.accessToken;
                localVarHeaderParameter["Authorization"] = "Bearer " + localVarAccessTokenValue;
            }

            localVarUrlObj.query = Object.assign({}, localVarUrlObj.query, localVarQueryParameter, options.query);
            // fix override query string Detail: https://stackoverflow.com/a/7517673/1077943
            delete localVarUrlObj.search;
            localVarRequestOptions.headers = Object.assign({}, localVarHeaderParameter, options.headers);

            return {
                url: url.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @summary ?????????????????????? ???????????? ??????????????
         * @param {CreateProfileDto} body ???????????? ??????????????
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        registerUsingPOST(body: CreateProfileDto, options: any = {}): FetchArgs {
            // verify required parameter 'body' is not null or undefined
            if (body === null || body === undefined) {
                throw new RequiredError('body','Required parameter body was null or undefined when calling registerUsingPOST.');
            }
            const localVarPath = `/profile/register`;
            const localVarUrlObj = url.parse(localVarPath, true);
            const localVarRequestOptions = Object.assign({ method: 'POST' }, options);
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            localVarHeaderParameter['Content-Type'] = 'application/json';

            localVarUrlObj.query = Object.assign({}, localVarUrlObj.query, localVarQueryParameter, options.query);
            // fix override query string Detail: https://stackoverflow.com/a/7517673/1077943
            delete localVarUrlObj.search;
            localVarRequestOptions.headers = Object.assign({}, localVarHeaderParameter, options.headers);
            const needsSerialization = (<any>"CreateProfileDto" !== "string") || localVarRequestOptions.headers['Content-Type'] === 'application/json';
            localVarRequestOptions.body =  needsSerialization ? JSON.stringify(body || {}) : (body || "");

            return {
                url: url.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @summary ?????????????????? ???????????? ??????????????
         * @param {UpdateProfileDto} body ?????????? ???????????? ??????????????
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        updateUsingPUT(body: UpdateProfileDto, options: any = {}): FetchArgs {
            // verify required parameter 'body' is not null or undefined
            if (body === null || body === undefined) {
                throw new RequiredError('body','Required parameter body was null or undefined when calling updateUsingPUT.');
            }
            const localVarPath = `/profile`;
            const localVarUrlObj = url.parse(localVarPath, true);
            const localVarRequestOptions = Object.assign({ method: 'PUT' }, options);
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication oauth2 required
            // oauth required
            if (configuration && configuration.accessToken) {
				const localVarAccessTokenValue = typeof configuration.accessToken === 'function'
					? configuration.accessToken("oauth2", ["openid", "profile"])
					: configuration.accessToken;
                localVarHeaderParameter["Authorization"] = "Bearer " + localVarAccessTokenValue;
            }

            localVarHeaderParameter['Content-Type'] = 'application/json';

            localVarUrlObj.query = Object.assign({}, localVarUrlObj.query, localVarQueryParameter, options.query);
            // fix override query string Detail: https://stackoverflow.com/a/7517673/1077943
            delete localVarUrlObj.search;
            localVarRequestOptions.headers = Object.assign({}, localVarHeaderParameter, options.headers);
            const needsSerialization = (<any>"UpdateProfileDto" !== "string") || localVarRequestOptions.headers['Content-Type'] === 'application/json';
            localVarRequestOptions.body =  needsSerialization ? JSON.stringify(body || {}) : (body || "");

            return {
                url: url.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * _Api - functional programming interface
 * @export
 */
export const _ApiFp = function(configuration?: Configuration) {
    return {
        /**
         * 
         * @summary ?????????????? ????????
         * @param {PostCreateDto} body ?????????????????? ??????????
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        createUsingPOST(body: PostCreateDto, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<PostCreationResult> {
            const localVarFetchArgs = _ApiFetchParamCreator(configuration).createUsingPOST(body, options);
            return (fetch: FetchAPI = isomorphicFetch, basePath: string = BASE_PATH) => {
                return fetch(basePath + localVarFetchArgs.url, localVarFetchArgs.options).then((response) => {
                    if (response.status >= 200 && response.status < 300) {
                        return response.json();
                    } else {
                        throw response;
                    }
                });
            };
        },
        /**
         * 
         * @summary ???????????????? ???????????????????? ?? ??????????
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getUsingGET(options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<Array<PostDto>> {
            const localVarFetchArgs = _ApiFetchParamCreator(configuration).getUsingGET(options);
            return (fetch: FetchAPI = isomorphicFetch, basePath: string = BASE_PATH) => {
                return fetch(basePath + localVarFetchArgs.url, localVarFetchArgs.options).then((response) => {
                    if (response.status >= 200 && response.status < 300) {
                        return response.json();
                    } else {
                        throw response;
                    }
                });
            };
        },
        /**
         * 
         * @summary ?????????????????? ???????????? ??????????????
         * @param {string} id ?????????????????????????? ??????????????
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getUsingGET1(id: string, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<ProfileDto> {
            const localVarFetchArgs = _ApiFetchParamCreator(configuration).getUsingGET1(id, options);
            return (fetch: FetchAPI = isomorphicFetch, basePath: string = BASE_PATH) => {
                return fetch(basePath + localVarFetchArgs.url, localVarFetchArgs.options).then((response) => {
                    if (response.status >= 200 && response.status < 300) {
                        return response.json();
                    } else {
                        throw response;
                    }
                });
            };
        },
        /**
         * 
         * @summary ?????????????????? ???????????? ???????????? ??????????????
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getUsingGET2(options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<ProfileDto> {
            const localVarFetchArgs = _ApiFetchParamCreator(configuration).getUsingGET2(options);
            return (fetch: FetchAPI = isomorphicFetch, basePath: string = BASE_PATH) => {
                return fetch(basePath + localVarFetchArgs.url, localVarFetchArgs.options).then((response) => {
                    if (response.status >= 200 && response.status < 300) {
                        return response.json();
                    } else {
                        throw response;
                    }
                });
            };
        },
        /**
         * 
         * @summary ?????????????????????? ???????????? ??????????????
         * @param {CreateProfileDto} body ???????????? ??????????????
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        registerUsingPOST(body: CreateProfileDto, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<ProfileDto> {
            const localVarFetchArgs = _ApiFetchParamCreator(configuration).registerUsingPOST(body, options);
            return (fetch: FetchAPI = isomorphicFetch, basePath: string = BASE_PATH) => {
                return fetch(basePath + localVarFetchArgs.url, localVarFetchArgs.options).then((response) => {
                    if (response.status >= 200 && response.status < 300) {
                        return response.json();
                    } else {
                        throw response;
                    }
                });
            };
        },
        /**
         * 
         * @summary ?????????????????? ???????????? ??????????????
         * @param {UpdateProfileDto} body ?????????? ???????????? ??????????????
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        updateUsingPUT(body: UpdateProfileDto, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<ProfileDto> {
            const localVarFetchArgs = _ApiFetchParamCreator(configuration).updateUsingPUT(body, options);
            return (fetch: FetchAPI = isomorphicFetch, basePath: string = BASE_PATH) => {
                return fetch(basePath + localVarFetchArgs.url, localVarFetchArgs.options).then((response) => {
                    if (response.status >= 200 && response.status < 300) {
                        return response.json();
                    } else {
                        throw response;
                    }
                });
            };
        },
    }
};

/**
 * _Api - factory interface
 * @export
 */
export const _ApiFactory = function (configuration?: Configuration, fetch?: FetchAPI, basePath?: string) {
    return {
        /**
         * 
         * @summary ?????????????? ????????
         * @param {PostCreateDto} body ?????????????????? ??????????
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        createUsingPOST(body: PostCreateDto, options?: any) {
            return _ApiFp(configuration).createUsingPOST(body, options)(fetch, basePath);
        },
        /**
         * 
         * @summary ???????????????? ???????????????????? ?? ??????????
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getUsingGET(options?: any) {
            return _ApiFp(configuration).getUsingGET(options)(fetch, basePath);
        },
        /**
         * 
         * @summary ?????????????????? ???????????? ??????????????
         * @param {string} id ?????????????????????????? ??????????????
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getUsingGET1(id: string, options?: any) {
            return _ApiFp(configuration).getUsingGET1(id, options)(fetch, basePath);
        },
        /**
         * 
         * @summary ?????????????????? ???????????? ???????????? ??????????????
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getUsingGET2(options?: any) {
            return _ApiFp(configuration).getUsingGET2(options)(fetch, basePath);
        },
        /**
         * 
         * @summary ?????????????????????? ???????????? ??????????????
         * @param {CreateProfileDto} body ???????????? ??????????????
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        registerUsingPOST(body: CreateProfileDto, options?: any) {
            return _ApiFp(configuration).registerUsingPOST(body, options)(fetch, basePath);
        },
        /**
         * 
         * @summary ?????????????????? ???????????? ??????????????
         * @param {UpdateProfileDto} body ?????????? ???????????? ??????????????
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        updateUsingPUT(body: UpdateProfileDto, options?: any) {
            return _ApiFp(configuration).updateUsingPUT(body, options)(fetch, basePath);
        },
    };
};

/**
 * _Api - object-oriented interface
 * @export
 * @class _Api
 * @extends {BaseAPI}
 */
export class _Api extends BaseAPI {
    /**
     * 
     * @summary ?????????????? ????????
     * @param {PostCreateDto} body ?????????????????? ??????????
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof _Api
     */
    public createUsingPOST(body: PostCreateDto, options?: any) {
        return _ApiFp(this.configuration).createUsingPOST(body, options)(this.fetch, this.basePath);
    }

    /**
     * 
     * @summary ???????????????? ???????????????????? ?? ??????????
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof _Api
     */
    public getUsingGET(options?: any) {
        return _ApiFp(this.configuration).getUsingGET(options)(this.fetch, this.basePath);
    }

    /**
     * 
     * @summary ?????????????????? ???????????? ??????????????
     * @param {string} id ?????????????????????????? ??????????????
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof _Api
     */
    public getUsingGET1(id: string, options?: any) {
        return _ApiFp(this.configuration).getUsingGET1(id, options)(this.fetch, this.basePath);
    }

    /**
     * 
     * @summary ?????????????????? ???????????? ???????????? ??????????????
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof _Api
     */
    public getUsingGET2(options?: any) {
        return _ApiFp(this.configuration).getUsingGET2(options)(this.fetch, this.basePath);
    }

    /**
     * 
     * @summary ?????????????????????? ???????????? ??????????????
     * @param {CreateProfileDto} body ???????????? ??????????????
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof _Api
     */
    public registerUsingPOST(body: CreateProfileDto, options?: any) {
        return _ApiFp(this.configuration).registerUsingPOST(body, options)(this.fetch, this.basePath);
    }

    /**
     * 
     * @summary ?????????????????? ???????????? ??????????????
     * @param {UpdateProfileDto} body ?????????? ???????????? ??????????????
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof _Api
     */
    public updateUsingPUT(body: UpdateProfileDto, options?: any) {
        return _ApiFp(this.configuration).updateUsingPUT(body, options)(this.fetch, this.basePath);
    }

}
