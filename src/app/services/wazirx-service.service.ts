import { Component, Injectable, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { GridsterConfig, GridsterItem, GridType, CompactType } from 'angular-gridster2';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { _throw as throwError } from 'rxjs/observable/throw';
import { analyzeAndValidateNgModules } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class WazirxServiceService {

  @Output() newCurrencyAddedEvent = new EventEmitter();
  @Output() getHIstoricalDataEvent = new EventEmitter();
  @Output() loginSuccessEvent = new EventEmitter();
  @Output() registerSuccessEvent = new EventEmitter();

  // private email: string = '';
  // private username: string = '';
  private isLoggedIn: boolean = false;
  private playAudio: boolean = true;

  private isPLaying: boolean = true;

  private currentId: number = 0;

   baseUrl = 'https://cryptobackend-iota.vercel.app/api/getAnalyticalData'
 // private baseUrl = 'https://crypto-backend-api.herokuapp.com/'
  // private baseUrl = 'http://localhost:8000/'
  dashboard: Array<GridsterItem>;
  constructor(private http: HttpClient) {

    this.dashboard = [
      { id: 1, cols: 10, rows: 7, y: 0, x: 0, coinCode: 'xec', priceUnit: 'usdt', myPrice: 0.00026697, buySoundPrice: 0.02, buySoundPercent: 10, sellSoundPrice: 0.05, sellSoundPercent: 15 },
      { id: 2, cols: 10, rows: 7, y: 0, x: 2, coinCode: 'matic', priceUnit: 'inr', myPrice: 125.5, buySoundPrice: 0.02, buySoundPercent: 10, sellSoundPrice: 0.05, sellSoundPercent: 15 },
      { id: 3, cols: 10, rows: 7, y: 10, x: 0, coinCode: 'xrp', priceUnit: 'inr', myPrice: 97.75, buySoundPrice: 0.02, buySoundPercent: 10, sellSoundPrice: 0.05, sellSoundPercent: 15 },
      { id: 4, cols: 10, rows: 7, y: 16, x: 16, coinCode: 'doge', priceUnit: 'inr', myPrice: 25.5, buySoundPrice: 0.02, buySoundPercent: 10, sellSoundPrice: 0.05, sellSoundPercent: 15 },
      { id: 5, cols: 10, rows: 7, y: 0, x: 0, coinCode: 'iost', priceUnit: 'inr', myPrice: 4.64, buySoundPrice: 0.02, buySoundPercent: 10, sellSoundPrice: 0.05, sellSoundPercent: 15 },
      { id: 6, cols: 10, rows: 7, y: 0, x: 0, coinCode: 'dot', priceUnit: 'inr', myPrice: 2526, buySoundPrice: 0.02, buySoundPercent: 10, sellSoundPrice: 0.05, sellSoundPercent: 15 },
      { id: 7, cols: 10, rows: 7, y: 0, x: 0, coinCode: 'poly', priceUnit: 'inr', myPrice: 58, buySoundPrice: 0.02, buySoundPercent: 10, sellSoundPrice: 0.05, sellSoundPercent: 15 }


    ];
    this.currentId = this.dashboard.length + 1;

  }


  switchOffAudio() {
    this.playAudio = false
  }
  alllowAudio() {
   //  this.playAudio = true
  }
  playBuyAudio() {
    let audio = new Audio();
    console.log(audio)
    audio.src = "../../assets/audio/buy.mp3";
    audio.load();
    if (this.playAudio && audio.paused) {
    //  audio.play();
      // audio.

    }
  }

  pauseAudio() {
    let audio = new Audio();
    audio.src = "../../assets/audio/buy.mp3";
    audio.load();
    audio.pause();

    let audioSell = new Audio();
    audioSell.src = "../../assets/audio/sell.mp3";
    audioSell.load();
    audioSell.pause();
  }


  playSellAudio() {
    let audio = new Audio();
    audio.src = "../../assets/audio/sell.mp3";
    audio.load();
    if (this.playAudio) {
     // audio.play();

    }
  }


  updateField(id: number, field: string, value: any, element: any) {
    let elementDIct: any = {}
    for (let i = 0; i < this.dashboard.length; i++) {
      if (this.dashboard[i]['id'] === id) {
        elementDIct = this.dashboard[i];
        break;
      }
    }
    elementDIct[field] = value;

    var index = this.dashboard.indexOf(element);

    if (index !== -1) {
      this.dashboard[index] = elementDIct;
    }
    console.log(this.dashboard)


  }


  getemail() {
    return localStorage.getItem('email')
  }

  setemail(item: string) {
    localStorage.setItem('email', item);
    // this.email = (item)
  }


  getusername() {
    // return this.username
    return localStorage.getItem('username')
  }

  setusername(item: any) {
    // this.username = (item)
    localStorage.setItem('username', item);

  }


  getisLoggedIn() {
    return this.isLoggedIn
  }

  setisLoggedIn(item: any) {
    this.isLoggedIn = (item)
  }


  newCoinAdded() {
    this.newCurrencyAddedEvent.emit();
  }

  getHistoricalData() {
    this.getHIstoricalDataEvent.emit();
  }
  loginSuccessEventEmit() {
    this.loginSuccessEvent.emit();
  }

  registerSuccessEventEmit() {
    this.registerSuccessEvent.emit();
  }

  getCurrentId() {
    return this.currentId;
  }

  getDashboard() {
    return this.dashboard
  }

  setDashboard(item: any) {
    this.dashboard.push(item)
    this.currentId = this.dashboard.length + 1;
  }



  setAllDashboardFromApiFirstTime(allData: any) {
    this.dashboard = allData
    this.currentId = this.dashboard.length + 1;

  }

  getWazirxData() {
    let url = this.baseUrl + '  '
    return this.http.get(url);


  }
  login(username: any, password: any) {
    let url = this.baseUrl + 'api/login'
    let postData = {

      "username": username,
      "password": password,
    }
    return this.http.post<any>(url, postData).pipe(
      catchError(error => {
        let errorMsg: string;
        if (error.error instanceof ErrorEvent) {
          errorMsg = `Error: ${error.error.message}`;
        } else {
          errorMsg = `Error: ${error.message}`;
        }
        return throwError(errorMsg);
      })
    );

  }

  register(rUsername: any, email: any, rPassword: any) {
    let url = this.baseUrl + 'api/register'
    let postData = {
      "username": rUsername,
      "password": rPassword,
      "email": email
    }
    return this.http.post<any>(url, postData)

  }

  getUserWidgets(email: any = this.getemail()) {
    let auth_token: any
    if (localStorage.hasOwnProperty('token')) {
      auth_token = localStorage.getItem("token");
    }

    const headers = { 'Authorization': 'Token ' + auth_token }

    let url = this.baseUrl + 'api/getAnalyticalData/?email=' + email
    return this.http.get<any>(url, { headers })

    // let url = this.baseUrl + 'api/getWazirxData/?email=' + email
    // return this.http.get<any>(url, { headers })

  }

  //api/getWazirxData

  putUserWidgets(username: any = this.getusername(), email: any = this.getemail()) {
    let auth_token: any
    if (localStorage.hasOwnProperty('token')) {
      auth_token = localStorage.getItem("token");
    }
    const headers = { 'Authorization': 'Token ' + auth_token }

    let url = this.baseUrl + 'api/profile/'
    let postData = {

      "name": username,
      "email": email,
      "currentState": this.dashboard
    }
    return this.http.put<any>(url, postData, { headers })

  }

  postUserWidgets(username: any = this.getusername(), email: any = this.getemail()) {

    let auth_token: any
    if (localStorage.hasOwnProperty('token')) {
      auth_token = localStorage.getItem("token");
    }
    const headers = { 'Authorization': 'Token ' + auth_token }

    let url = this.baseUrl + 'api/profile/'
    let postData = {

      "name": username,
      "email": email,
      "currentState": this.dashboard
    }
    return this.http.post<any>(url, postData, { headers })

  }


  getHistoricalDataFromApi(id: number) {

    let url = this.baseUrl + 'api/getHistoricalData/?id=' + id
    return this.http.get(url);


  }

}
