import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { data } from '../data';

/** 每位律師每日最多可接受預約數 */
export const MAX_DAILY_CAPACITY = 3;

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private lawyersSubject = new BehaviorSubject<any[]>([...data.lawyers]);
  private articlesSubject = new BehaviorSubject<any[]>([...data.articles]);
  private reservesSubject = new BehaviorSubject<any[]>([...data.reserves]);

  lawyers$ = this.lawyersSubject.asObservable();
  articles$ = this.articlesSubject.asObservable();
  reserves$ = this.reservesSubject.asObservable();

  // ─── Lawyers ────────────────────────────────────────────────
  addLawyer(lawyer: any): void {
    const current = this.lawyersSubject.value;
    const newId = Math.max(...current.map(l => l.id), 0) + 1;
    this.lawyersSubject.next([...current, { ...lawyer, id: newId, update: new Date() }]);
  }

  updateLawyer(id: number, patch: any): void {
    const updated = this.lawyersSubject.value.map(l =>
      l.id === id ? { ...l, ...patch, update: new Date() } : l
    );
    this.lawyersSubject.next(updated);
  }

  deleteLawyer(id: number): void {
    this.lawyersSubject.next(this.lawyersSubject.value.filter(l => l.id !== id));
  }

  // ─── Articles ───────────────────────────────────────────────
  addArticle(article: any): void {
    const current = this.articlesSubject.value;
    const newId = Math.max(...current.map(a => a.id), 0) + 1;
    const today = new Date().toISOString().split('T')[0].replace(/-/g, '.');
    this.articlesSubject.next([...current, { ...article, id: newId, date: today, update: new Date() }]);
  }

  updateArticle(id: number, patch: any): void {
    const updated = this.articlesSubject.value.map(a =>
      a.id === id ? { ...a, ...patch, update: new Date() } : a
    );
    this.articlesSubject.next(updated);
  }

  deleteArticle(id: number): void {
    this.articlesSubject.next(this.articlesSubject.value.filter(a => a.id !== id));
  }

  // ─── Reserves ───────────────────────────────────────────────
  addReserve(reserve: any): void {
    const current = this.reservesSubject.value;
    const number = `R${String(current.length + 1).padStart(4, '0')}`;
    this.reservesSubject.next([...current, { ...reserve, number }]);
  }

  updateReserve(number: string, patch: any): void {
    const updated = this.reservesSubject.value.map(r =>
      r.number === number ? { ...r, ...patch } : r
    );
    this.reservesSubject.next(updated);
  }

  deleteReserve(number: string): void {
    this.reservesSubject.next(this.reservesSubject.value.filter(r => r.number !== number));
  }

  // ─── 律師容量查詢 ─────────────────────────────────────────────
  /** 取得某律師在指定日期的已預約筆數（dateStr 格式：'yyyy/MM/dd'） */
  getLawyerBookingCount(lawyerId: number, dateStr: string): number {
    return this.reservesSubject.value.filter(
      r => r.lawyerId === lawyerId && r.date === dateStr
    ).length;
  }

  /** 判斷某律師在指定日期是否仍有名額 */
  isLawyerAvailable(lawyerId: number, dateStr: string): boolean {
    return this.getLawyerBookingCount(lawyerId, dateStr) < MAX_DAILY_CAPACITY;
  }
}
