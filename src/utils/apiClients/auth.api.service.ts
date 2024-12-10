import { request, APIRequestContext } from '@playwright/test';

export class AuthService {
    private baseURL: string;
    private requestContext: APIRequestContext | any;

    constructor(baseURL: string) {
        this.baseURL = baseURL;
    }

    async init(): Promise<void> {
        this.requestContext = await request.newContext();
    }

    async fetchCSRFToken(): Promise<string> {
        const response = await this.requestContext.get(`${this.baseURL}/login`);
        if (!response.ok()) {
            throw new Error(`Failed to fetch CSRF token. Status: ${response.status()}`);
        }

        const cookies = await this.requestContext.storageState();
        const csrfCookie = cookies.cookies.find((cookie: { name: string; }) => cookie.name === 'csrf');
        if (!csrfCookie) {
            throw new Error('CSRF token not found in cookies.');
        }

        return csrfCookie.value;
    }

    async login(username: string, password: string): Promise<void> {
        // const csrfToken = await this.fetchCSRFToken();

        const response = await this.requestContext.post(`${this.baseURL}/login`, {
            form: {
                username,
                password,
                // csrf: csrfToken,
            },
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });

        if (response.status() !== 302) {
            throw new Error(`Login failed. Status: ${response.status()}, Response: ${await response.text()}`);
        }

        console.log('Login successful. Redirected to:', response.headers()['location']);
    }

    async getCookies() {
        return this.requestContext.storageState();
    }

    async dispose(): Promise<void> {
        await this.requestContext.dispose();
    }
}

