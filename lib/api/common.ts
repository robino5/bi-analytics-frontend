export class Common {
    private url = ""
    private searchParams = new URLSearchParams()

    protected setURL(url: string) {
        this.url = url
        return this;
    }

    protected getURL() {
        const paramsString = this.searchParams.toString()
        return this.url + (paramsString ? `?${paramsString}` : "")
    }
}