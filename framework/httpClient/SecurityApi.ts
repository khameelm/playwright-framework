import { promises } from "dns";
import { ApiHandler } from "./ApiHandler";

let _httpRequest = new ApiHandler();

export class SecurityApi {
    private apiKey?: string;

    private async generateApiKey(): Promise<any> {
        const url = 'https://yourApiEndpoint';
        const headers = {
            'Content-Type': 'application/json',
            'Accept': '*/*',
            'Connection': 'keep-alive'
        };
        const body = {
            'AccessKey': 'name1',
            'Password': 'text'
        };
        let resp = await _httpRequest.postAsync(url, headers, body)
        this.apiKey = resp.data['KEY'];
        return this.apiKey;
    }

    public async getBearerToken(): Promise<string> {
        if (!this.apiKey) {
            await this.generateApiKey();
        }
        const url = 'https://yourGetTokenEndpoint'
        const headers = {
            'Content-Type': 'application/json',
            'Accept': '*/*',
            'Connection': 'keep-alive'
        };
        const body = {
            "ApiKey": this.apiKey,
        };
        let resp = await _httpRequest.postAsync(url, headers, body)
        return resp.data['Token'];
    }
}