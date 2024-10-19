import axios from 'axios'

export class ApiHandler {

    async postAsync(url: string, headers: object, body: object): Promise<any> {
        try {
            const response = await axios.post(url, body, { headers: headers })
            if (response.status != 200) {
                console.error(response);
                throw new Error('API request not 200 check your error log');
            };
            return response;
        } catch (error) {
            console.error(error);
            throw new Error('API requested failed');
        }
    }

    async getAsync(url: string, headers: object): Promise<any> {
        try {
            const response = await axios.get(url, { headers: headers })
            if (response.status != 200) {
                console.error(response);
                throw new Error('API request not 200 check your error log');
            };
            return response;
        } catch (error) {
            console.error(error);
            throw new Error('API requested failed');
        }
    }
}