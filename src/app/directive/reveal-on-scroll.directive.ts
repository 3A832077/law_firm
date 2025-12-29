import {
  Directive,
  ElementRef,
  Input,
  OnDestroy,
  AfterViewInit,
  Inject,
  PLATFORM_ID,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Directive({
  selector: '[appRevealOnScroll]'
})
export class RevealOnScrollDirective implements AfterViewInit, OnDestroy{

  /** 進入視窗多少比例觸發 */
  @Input() revealThreshold = 0.15;
  /** 觸發一次就停止觀察 */
  @Input() revealOnce = true;
  /** 延遲（ms），可做 stagger */
  @Input() revealDelay = 0;

  private io?: IntersectionObserver;

  constructor(
    private el: ElementRef<HTMLElement>,
    @Inject(PLATFORM_ID) private platformId: object
  ) {}

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    const node = this.el.nativeElement;
    node.classList.add('reveal');
    if (this.revealDelay > 0) {
      node.style.setProperty('--reveal-delay', `${this.revealDelay}ms`);
    }

    this.io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            node.classList.add('reveal--in');
            if (this.revealOnce) this.io?.unobserve(node);
          } else if (!this.revealOnce) {
            node.classList.remove('reveal--in');
          }
        }
      },
      { threshold: this.revealThreshold }
    );

    this.io.observe(node);
  }

  ngOnDestroy(): void {
    this.io?.disconnect();
  }

}
