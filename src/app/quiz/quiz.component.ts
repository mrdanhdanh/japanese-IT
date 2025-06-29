import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedDataService, ITN5Entry } from '../shared/shared-data.service';
import { Subscription } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-quiz',
  imports: [CommonModule, MatButtonModule,
    FormsModule],
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnDestroy {
  isFlipped: boolean = false;
  showCard: boolean = false; // Thêm biến điều khiển hiển thị
  kanji: string = '';
  name: string = '';
  meaning: string = '';
  note: string = '';
  keys: string[] = [];
  currentKey: string = '';
  inputValue: string = '';
  message: string = '';
  type1: string = '';
  type2: string = '';
  options: string[] = [];
  selectedOption: string = '';
  private dataLoadedSub: Subscription;

  constructor(private sharedDataService: SharedDataService) {
    this.dataLoadedSub = this.sharedDataService.dataLoaded$.subscribe(loaded => {
      if (loaded) {
        const entries = this.sharedDataService.getAllDataEntries();
        this.keys = Object.keys(entries);
        if (this.keys.length > 0) {
          this.loadRandomCard(entries);
        }
      }
    });
  }

  private loadRandomCard(entries: { [key: string]: ITN5Entry }) {
    const randomKey = this.keys[Math.floor(Math.random() * this.keys.length)];
    this.kanji = entries[randomKey].Kanji;
    this.name = entries[randomKey].Name;
    this.meaning = entries[randomKey].Meaning;
    this.note = entries[randomKey].Note;
    this.type1 = entries[randomKey].Type1;
    this.type2 = entries[randomKey].Type2;
    this.currentKey = randomKey;
    // Generate 3 random wrong options with the same Type
    const wrongNames = this.keys.filter(k => k !== randomKey && entries[k].Type1 === this.type1 && entries[k].Type2 === this.type2)
      .map(k => entries[k].Name);
    const shuffled = this.shuffleArray([
      this.name,
      ...this.getRandomItems(wrongNames, 3)
    ]);
    this.options = shuffled;
    this.selectedOption = '';
  }

  private getRandomItems(arr: string[], n: number): string[] {
    const result = [];
    const used = new Set<number>();
    while (result.length < n && used.size < arr.length) {
      const idx = Math.floor(Math.random() * arr.length);
      if (!used.has(idx)) {
        result.push(arr[idx]);
        used.add(idx);
      }
    }
    return result;
  }

  private shuffleArray(array: string[]): string[] {
    const arr = array.slice();
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  ngOnDestroy() {
    this.dataLoadedSub.unsubscribe();
  }

  flipCard() {
    this.isFlipped = !this.isFlipped;
  }

  nextCard() {
    if (this.keys.length === 0) return;
    const entries = this.sharedDataService.getAllDataEntries();
    let randomKey = this.keys[Math.floor(Math.random() * this.keys.length)];
    let tries = 0;
    while (randomKey === this.currentKey && tries < 10) {
      randomKey = this.keys[Math.floor(Math.random() * this.keys.length)];
      tries++;
    }
    this.loadRandomCard(entries);
    this.isFlipped = false;
    this.inputValue = '';
    this.message = '';
  }

  submitAnswer() {
    if (this.selectedOption === this.name) {
      this.message = 'Đúng!';
      setTimeout(() => {
        this.nextCard();
      }, 800);
    } else {
      this.message = 'Sai!';
    }
  }

  get kanjiFontSize(): string {
    return this.kanji && this.kanji.length > 6 ? '36px' : '50px';
  }

  speakKanji(event: Event) {
    event.stopPropagation();
    if ('speechSynthesis' in window) {
      const utter = new SpeechSynthesisUtterance(this.kanji);
      utter.lang = 'ja-JP';
      window.speechSynthesis.speak(utter);
    }
  }

  toggleCard() {
    this.showCard = !this.showCard;
    if (!this.showCard) {
      this.isFlipped = false;
    }
  }

  get displayKanji(): string {
    return this.kanji && this.kanji.trim() ? this.kanji : this.meaning;
  }
}
