import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { DiaryEntry } from './dairy-entry.module';
import { tick } from '@angular/core/testing';
import { stringify } from 'querystring';

@Injectable({ providedIn: 'root' })
export class DiaryDataService {
  public maxId:number;
  constructor(private http: HttpClient) {}
  public diarySubject = new Subject<DiaryEntry[]>();
  private diaryEntries: DiaryEntry[] = [];

  onDelete(index: number) {
    this.http.delete<{message:String}>('http://localhost:3000/remove-entry/'+index).subscribe((jsonData)=>{
    console.log(jsonData);  
    this.getDiaryEntries();
    })
  }

  onAddDiaryEntry(diaryEntry: DiaryEntry) {
    this.http.get<{maxId:number}>('http://localhost:3000/max-id').subscribe((jsonData=>{
      diaryEntry.id=jsonData.maxId+1;
      this.http
        .post<{ message: string }>('http://localhost:3000/add-entry', diaryEntry)
        .subscribe((jsonData) => {
          console.log(diaryEntry);
          this.getDiaryEntries();
        })
    }))
  }

  getDiaryEntries() {
    this.http.get<{ diaryEntries: DiaryEntry[] }>('http://localhost:3000/diary-entries').subscribe((jsonData) => {
        this.diaryEntries = jsonData.diaryEntries;
        this.diarySubject.next(this.diaryEntries);
      });
  }

  getDiaryEntry(id: number) {
    const index = this.diaryEntries.findIndex(el =>{
      return el.id == id;
    })
    return this.diaryEntries[index];
  }

  onUpdateEntry(paramId: number, newEntry: DiaryEntry) {
    this.http.put<{message:string}>('http://localhost:3000/update-entry/'+paramId,newEntry).subscribe((jsonData)=>{
      console.log(jsonData.message);
      this.getDiaryEntries();
    })
  }
}
