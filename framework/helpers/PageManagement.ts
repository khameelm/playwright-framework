import { Frame, Page } from 'playwright'
import { expect } from 'playwright/test'

export class PageManagement {

    static async executeAction(action: () => Promise<any>): Promise<void> {
        try {
            await action();
            return Promise.resolve();
        } catch (error) {
            console.error(error)
            return Promise.reject();
        }
    }

    static async pageLaunch(page: Page, url: string): Promise<void> {
        try {
            await page.goto(url)
        } catch (error) {
            console.error(error)
            return Promise.reject();
        }
    }

    static async validateElementVisible(source: Page | Frame, elementName: string): Promise<void> {
        try {
            await expect(source.locator(elementName)).toBeVisible();
        } catch (error) {
            throw new Error(`${elementName} is not visible`);
        }
    }

    static async validateText(source: Page | Frame, text: string, exactMatch: boolean = false): Promise<void> {
        try {
            await expect(source.getByText(text, { exact: exactMatch })).toBeVisible({ timeout: 30000 })
        } catch (error) {
            throw new Error(`${text} was not found`);
        }
    }

    static async validateMessage(source: Page | Frame, elementName: string, message: string): Promise<void> {
        try {
            expect(await source.locator(elementName).textContent()).toContain(message);
        } catch (error) {
            throw new Error("Message not found in element");
        }
    }

    static async waitForApiResponse(source: Page, endpoint: string): Promise<void> {
        try {
            const resp = await source.waitForResponse(endpoint);
            if (resp.status() === 200) {
                return Promise.resolve();
            }
        } catch (error) {
            console.log('Unable to track network request ' + error)
            return Promise.reject();
        }
    }
}