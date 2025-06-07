export interface ITN5Entry {
  Name: string;
  Kanji: string;
  Meaning: string;
  Note: string;
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {
  private data: any = {};
  private dataname = 'IT-N5';
  public dataLoaded$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) {
    this.loadITN5Data();
  }

  private async loadITN5Data() {
    try {
      const entries = await firstValueFrom(this.http.get<ITN5Entry[]>('data/it-n5.json'));
      this.data[this.dataname] = {};
      entries.forEach((entry, idx) => {
        this.data[this.dataname][idx] = entry;
      });
      this.dataLoaded$.next(true); // Thông báo đã load xong
    } catch (error) {
      console.error('Failed to load IT-N5 data:', error);
      this.dataLoaded$.next(false);
    }
  }

  setData(key: string, value: any) {
    this.data[key] = value;
  }

  getData(key: string): any {
    return this.data[key];
  }

  getAllData(): any {
    return this.data;
  }

  /**
   * Add or update an entry in the IT-N5 data set.
   * @param id The ID key for the entry
   * @param entry The entry object containing Name, Kanji, Meaning, Note
   */
  setDataEntry(id: string, entry: ITN5Entry) {
    if (!this.data[this.dataname]) {
      this.data[this.dataname] = {};
    }
    this.data[this.dataname][id] = entry;
  }

  /**
   * Get an entry from the IT-N5 data set by ID.
   * @param id The ID key for the entry
   */
  getDataEntry(id: string): ITN5Entry | undefined {
    return this.data[this.dataname] ? this.data[this.dataname][id] : undefined;
  }

  /**
   * Get all entries from the IT-N5 data set.
   */
  getAllDataEntries(): { [id: string]: ITN5Entry } {
    return this.data[this.dataname] || {};
  }
}
