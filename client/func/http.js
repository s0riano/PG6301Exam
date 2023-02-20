export class HttpError extends Error{
    constructor(status, statusText) {
        super("HttpError: " + statusText);
        this.status = status;
    }
}

export async function fetchJson(url, options = {}) {
    const res = await fetch(url, {
        method: options.method || "GET",
        headers: options.json ? {"content-type" : "application/json"} : {},
        body: options.json && JSON.stringify(options.json),
    });
    if (res.status === 200) {
        return await  res.json();
    } else if (res.status === 204){
        return undefined;
    }else if (!res.ok) {
        throw new Error(`Loading error ${res.status}: ${res.statusText}`);
    } else {
        throw new HttpError(res.status, res.statusText, res.body);
    }
}
