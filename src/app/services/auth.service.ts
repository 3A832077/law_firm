import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

const TOKEN_KEY = 'law_firm_token';
// 模擬帳號（實際專案應改為 API 呼叫）
const VALID_CREDENTIALS = { username: 'admin', password: 'admin123' };

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  login(username: string, password: string): boolean {
    if (
      username === VALID_CREDENTIALS.username &&
      password === VALID_CREDENTIALS.password
    ) {
      if (isPlatformBrowser(this.platformId)) {
        // 模擬 JWT token
        const fakeToken = btoa(`${username}:${Date.now()}`);
        localStorage.setItem(TOKEN_KEY, fakeToken);
      }
      return true;
    }
    return false;
  }

  logout(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem(TOKEN_KEY);
    }
  }

  isLoggedIn(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      return !!localStorage.getItem(TOKEN_KEY);
    }
    return false;
  }
}
