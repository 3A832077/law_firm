import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

const TOKEN_KEY = 'law_firm_token';
const USER_KEY = 'law_firm_user';
const VALID_CREDENTIALS = { username: 'admin', password: 'admin123' };

export interface GoogleUser {
  name: string;
  email: string;
  photoUrl: string;
}

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
        const fakeToken = btoa(`${username}:${Date.now()}`);
        localStorage.setItem(TOKEN_KEY, fakeToken);
      }
      return true;
    }
    return false;
  }

  loginWithGoogleCredential(credential: string): void {
    if (!isPlatformBrowser(this.platformId)) return;
    // 解碼 JWT payload（不驗簽章，僅取用戶資料；正式環境應在後端驗證）
    const payload = JSON.parse(
      atob(credential.split('.')[1].replace(/-/g, '+').replace(/_/g, '/'))
    );
    localStorage.setItem(TOKEN_KEY, credential);
    localStorage.setItem(USER_KEY, JSON.stringify({
      name: payload['name'] ?? '',
      email: payload['email'] ?? '',
      photoUrl: payload['picture'] ?? '',
    }));
  }

  logout(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(USER_KEY);
    }
  }

  isLoggedIn(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      return !!localStorage.getItem(TOKEN_KEY);
    }
    return false;
  }
}
