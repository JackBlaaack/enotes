import {request, APIRequestContext } from '@playwright/test';
import { apiConfig } from 'config/apiConfig';
import fs from 'fs';


const authData = JSON.parse(fs.readFileSync('src/.auth/user.json', 'utf-8'));

export class ApiService {
   private request: APIRequestContext;
  private baseUrl: string;

  constructor(request: APIRequestContext, baseUrl: string) {
    this.request = request;
    this.baseUrl = baseUrl;
  }

  async clearCart() {
    const response = await this.request.post(`${this.baseUrl}${apiConfig.endpoints['Clear books']}`, { 
      headers: {
        "Content-type": "text/html",
        // PHPSESSID: `${authData.cookies[0].value}`,
        // _csrf: `${authData.cookies[1].value}`,
       
      },
     });
     console.log(`${authData.cookies[0].value}`)
     console.log(`${authData.cookies[1].value}`)
     return await response.json();
  }


}
