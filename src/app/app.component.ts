import { Component, Inject } from '@angular/core';

import { WazirxServiceService } from '../app/services/wazirx-service.service'
import { GridsterConfig, GridsterItem, GridType, CompactType } from 'angular-gridster2';
// import cryptoData from '../cryptoDetails.json'
import coinsDetailsInDictForm from '../coinsDetailsInDictForm.json'
// C:\Users\kumar\Desktop\CryptoTracker\src\coinsDetailsInDictForm.json
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { interval } from 'rxjs/observable/interval';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
// import {LoginRegisterComponent} from '../component/login-register/LoginRegisterComponent'
export interface AddDialogData {
  coinCode: string;
  yourPrice: number;
}

interface CryptoDetails {
  id: Number,
  name: String,
  symbol: string
  slug: String
  rank: Number
  is_active: Number
  first_historical_data: String
  last_historical_data: String
  platform: any

}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'cryptotracker';
  // options: GridsterConfig;
  // dashboard: Array;

  options: GridsterConfig;
  dashboard: Array<GridsterItem>;
  apiResponse: any;

  coinCode: string = "";
  yourPrice: Number = 1
  cryptoDetailsInDict: any;
  addItemEvent: any;
  loginEvent: any;
  registerevent: any;

  userName: any = 'Guest'

  // cryptoDetails: { any: CryptoDetails };
  apicall: any;
  constructor(public dialog: MatDialog, private wazirxServiceService: WazirxServiceService) {
    this.dashboard = this.wazirxServiceService.getDashboard();
    this.cryptoDetailsInDict = coinsDetailsInDictForm;
    let dict: any = {};
    if (localStorage.hasOwnProperty('username')) {
      this.userName = localStorage.getItem('username')
    }
    this.options = {
      gridType: GridType.ScrollVertical,
      compactType: CompactType.CompactUpAndLeft,
      mobileModeEnabled: true,
      mobileBreakpoint: 640,
      displayGrid: 'onDrag&Resize',
      keepFixedWidthInMobile: false,
      keepFixedHeightInMobile: false,
      disablePushOnResize: false,
      pushItems: true,
      swap: true, // allow items to switch position if drop on top of another
      disablePushOnDrag: false, // disable push on drag
      minCols: 30,
      maxCols: 30,
      minRows: 1,
      minItemRows: 5,
      maxItemRows: 50,
      defaultItemCols: 1,
      defaultItemRows: 1,
      draggable: {
        enabled: true,
      },
      resizable: {
        enabled: true,
      },
    };



  }

  stopAudio() {
    this.wazirxServiceService.switchOffAudio()
  }
  alllowAudio() {
    this.wazirxServiceService.alllowAudio()
  }
  pauseAudio() {
    this.wazirxServiceService.pauseAudio()
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(ADDCoinDialogueComponent, {
      width: '250px',
      data: { coinCode: this.coinCode, yourPrice: this.yourPrice }
    });

    dialogRef.afterClosed().subscribe(result => {

    });
  }

  openLoginRegisterDialog(): void {
    const dialogRef = this.dialog.open(LoginRegisterDialogueComponent, {
      // width: '250px',
      // data: { coinCode: this.coinCode, yourPrice: this.yourPrice }
    });

    dialogRef.afterClosed().subscribe(result => {

    });
  }

  saveCurrentState() {
    let token = localStorage.getItem("token");
    if (token == null) {
      this.openLoginRegisterDialog()
    } else {
      this.wazirxServiceService.putUserWidgets().subscribe((data) => {
      }, ((error) => {
        localStorage.removeItem("token")
      })

      );
    }
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('username');

    localStorage.removeItem('email');
    this.userName = "Guest"

  }
  getHistoricalData() {
    this.wazirxServiceService.getHistoricalData()
  }
  // static itemChange(item, itemComponent) {
  //   console.info('itemChanged', item, itemComponent);
  // }

  // static itemResize(item, itemComponent) {
  //   console.info('itemResized', item, itemComponent);
  // }

  ngOnInit() {



  }
  ngAfterViewInit() {
    this.addItemEvent = this.wazirxServiceService.getUserWidgets().subscribe((data: any) => {
      if (data !== undefined && data !== null && data['currentState'] !== undefined && data['currentState'] !== null && data['currentState'].length !== 0) {
        this.wazirxServiceService.setAllDashboardFromApiFirstTime(data['currentState'])
      }
      this.dashboard = this.wazirxServiceService.getDashboard();

    })

    this.addItemEvent = this.wazirxServiceService.newCurrencyAddedEvent.subscribe(() => {
      this.dashboard = this.wazirxServiceService.getDashboard();

    })


    this.loginEvent = this.wazirxServiceService.loginSuccessEvent.subscribe(() => {
      this.userName = this.wazirxServiceService.getusername()
      this.dashboard = this.wazirxServiceService.getDashboard();


    })

    this.registerevent = this.wazirxServiceService.registerSuccessEvent.subscribe(() => {
      this.userName = this.wazirxServiceService.getusername()

    })
    this.apicall = interval(1000).subscribe(() => {
      this.wazirxServiceService.getWazirxData().subscribe((data) => {
        this.apiResponse = data
      })


    })


  }

  ngOnDestroy() {
    this.apicall.unsubscribe();
    this.addItemEvent.unsubscribe();
  }




  // changedOptions() {
  //   this.options.api.optionsChanged();
  // }

  removeItem(event: any, item: any) {
    this.dashboard.splice(this.dashboard.indexOf(item), 1);
  }

  addItem() {
    this.dashboard.push({ cols: 10, rows: 7, y: 0, x: 0 });
  }

}


@Component({
  selector: 'add-coin-dialog',
  templateUrl: 'add-coin-dialog.html',
})
export class ADDCoinDialogueComponent {

  CURRENCY = ['USDT', 'INR'];
  currentCurrency = this.CURRENCY[0];
  constructor(private wazirxServiceService: WazirxServiceService,
    public dialogRef: MatDialogRef<ADDCoinDialogueComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AddDialogData) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  OkayClicked() {
    let dashboardItem = { id: this.wazirxServiceService.getCurrentId(), cols: 10, rows: 7, y: 0, x: 0, coinCode: 'xec', priceUnit: 'USDT', myPrice: 0 }
    dashboardItem.coinCode = this.data['coinCode'].toUpperCase()
    dashboardItem.myPrice = parseInt(this.data['yourPrice'].toString())

    dashboardItem.priceUnit = this.currentCurrency;
    this.wazirxServiceService.setDashboard(dashboardItem)
    this.wazirxServiceService.newCoinAdded();
  }

}

@Component({
  selector: 'login-register-dialog',
  templateUrl: 'login-register-dialog.html',
})
export class LoginRegisterDialogueComponent {

  Roles: any = ['Admin', 'Author', 'Reader'];
  loginform: FormGroup;
  registerForm: FormGroup;
  loginPage: boolean = true;

  loading = false;
  submitted = false;

  username: any;
  password: any;
  rUsername: any;
  email: any;
  rPassword: any;

  loginmessage: any;
  registerMessage: any;

  constructor(
    private formBuilder: FormBuilder, private route: ActivatedRoute, private wazirxServiceService: WazirxServiceService

  ) {
    this.loginform = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });


    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }


  login() {
    this.wazirxServiceService.login(this.username, this.password).subscribe((data) => {
      this.wazirxServiceService.setusername(this.username);
      if (data.hasOwnProperty('token')) {
        this.loginmessage = 'Login Successful'
        let token = data['token']
        localStorage.setItem("token", token);
      } else {
        this.loginmessage = 'Not Valid'

      }
      this.wazirxServiceService.setemail(data['email']);
      this.wazirxServiceService.setisLoggedIn(true);
      // again hit api for state data

      this.wazirxServiceService.getUserWidgets().subscribe((statedata: any) => {
        if (statedata !== undefined && statedata !== null && statedata['currentState'] !== undefined && statedata['currentState'] !== null && statedata['currentState'].length !== 0) {
          this.wazirxServiceService.setAllDashboardFromApiFirstTime(statedata['currentState'])
          this.wazirxServiceService.loginSuccessEventEmit()

        }

      }, (error) => {
        this.loginmessage = 'Not Valid'
      })

    })
  }



  register() {

    this.wazirxServiceService.register(this.rUsername, this.email, this.rPassword).subscribe((data) => {
      this.registerMessage = "Success"
      this.wazirxServiceService.setusername(this.username);
      this.wazirxServiceService.setemail(this.email);

      //post request to update json
      this.wazirxServiceService.postUserWidgets().subscribe((data) => {
      });

    }, (error: {}) => {
      // this.registerMessage = "INVALID"
      // Object.values(error['error'])[0].toString()
    })
  }


  openLoginPage() {
    this.loginPage = true;

  }
  OpenRegisterPage() {
    this.loginPage = false;

  }
  ngOnInit() {

  }
  // convenience getter for easy access to form fields
  get f() { return this.loginform.controls; }


}


