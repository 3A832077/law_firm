import { Component, OnInit, Inject, PLATFORM_ID, NgZone, afterNextRender } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { AuthService } from '../../services/auth.service';

declare const google: any;

const GOOGLE_CLIENT_ID = '803186950506-5olrqga00ui5ckjc1nms8gci7bsmn3kd.apps.googleusercontent.com';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
    NzFormModule,
    NzInputModule,
    NzButtonModule,
    NzIconModule,
    NzAlertModule,
    NzDividerModule,
    RouterLink,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  isLoading = false;
  loginError = false;
  passwordVisible = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private ngZone: NgZone,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
    // afterNextRender 只在瀏覽器首次渲染後執行，SSR 環境自動跳過，避免 hydration 衝突
    afterNextRender(() => {
      this.waitForGoogleScript();
    });
  }

  ngOnInit(): void {}

  private waitForGoogleScript(): void {
    if (typeof google !== 'undefined' && google.accounts?.id) {
      this.initGoogleButton();
    } else {
      setTimeout(() => this.waitForGoogleScript(), 100);
    }
  }

  private initGoogleButton(): void {
    google.accounts.id.initialize({
      client_id: GOOGLE_CLIENT_ID,
      callback: (response: { credential: string }) => {
        // Google callback 在 Angular zone 外執行，需包回 zone
        this.ngZone.run(() => {
          this.authService.loginWithGoogleCredential(response.credential);
          this.router.navigate(['/backend/lawyers']);
        });
      },
    });
    google.accounts.id.renderButton(
      document.getElementById('google-signin-btn'),
      { theme: 'outline', size: 'large', width: 370, locale: 'zh-TW' }
    );
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      Object.values(this.loginForm.controls).forEach(control => {
        control.markAsDirty();
        control.updateValueAndValidity();
      });
      return;
    }

    this.isLoading = true;
    this.loginError = false;

    const { username, password } = this.loginForm.value;

    setTimeout(() => {
      const success = this.authService.login(username, password);
      this.isLoading = false;

      if (success) {
        this.router.navigate(['/backend/lawyers']);
      } else {
        this.loginError = true;
      }
    }, 800);
  }
}
