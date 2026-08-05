import { expect} from '@playwright/test';
import axios from 'axios';

// console.log('Response from API:', response.data);
export async function CallAPI() {
    console.log('Running test: tests newest comments api');
    const response = await axios.get('http://localhost:3000/api/comments/newest');
    expect(response.status).toBe(200);
    expect(response.data).toHaveProperty('documents');
    expect(Array.isArray(response.data.documents)).toBe(true);

    return response.data.documents;
}