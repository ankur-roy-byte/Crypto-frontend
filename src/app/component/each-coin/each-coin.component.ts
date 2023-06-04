import { Component, OnInit, Input, OnChanges } from '@angular/core';
// import coinsDetailsInDictForm from '../../../coinsDetailsInDictForm.json'
import { WazirxServiceService } from '../../services/wazirx-service.service'


@Component({

  selector: 'app-each-coin',
  templateUrl: './app.each-coin.html',
  styleUrls: ['./each-coin.component.scss']

})

export class EachCoinComponent implements OnInit {
  @Input() childInputData: any = null;
  @Input() wazirxData: any = null;
  @Input() detailForIdFromLocalFile: any = null;



  coinDetails: any = {};
  historyData: any = []
  // cryptoDetailsInDict: any;
  detailForId: any = {};
  historyEvent: any;
  eachHistoricalData: any = {};
  showHistoricalData: boolean = false;
  changeMode: boolean = false;

  buySoundPricechangeMode: boolean = false;
  sellSoundPricechangeMode: boolean = false;
  buySoundPercentchangeMode: boolean = false;
  sellSoundPercentchangeMode: boolean = false;

  constructor(private wazirxServiceService: WazirxServiceService) {
    // this.cryptoDetailsInDict = coinsDetailsInDictForm;

  }

  ngOnChanges() {
    let key = this.childInputData['coinCode'] + this.childInputData['priceUnit']
    key = key.toString().toLowerCase();
    if (this.wazirxData !== undefined && this.wazirxData !== null && this.wazirxData.hasOwnProperty(key)) {
      this.coinDetails = this.wazirxData[key];
    }
    else {
      this.coinDetails = { "NO DATA Found": "NA" }
    }
    let profitLoss = ((this.coinDetails['buy'] - this.childInputData['myPrice']) / this.childInputData['myPrice'] * 100).toFixed(5) + '%'
    this.historyData.push(profitLoss);

    let objDiv = document.getElementById("historyData");
    if (objDiv !== null) {
      objDiv.scrollTop = objDiv.scrollHeight;

    }


    this.detailForId = this.detailForIdFromLocalFile;

    // this.childInputData['buySoundPrice'] <= this.childInputData['myPrice'] ||

    let percentOfBuy = ((this.coinDetails['buy'] - this.childInputData['buySoundPrice']) / this.childInputData['buySoundPrice'] * 100).toFixed(5)
    if (this.coinDetails['sell'] <= this.childInputData['buySoundPrice']) {
      // alert()
      this.wazirxServiceService.playBuyAudio()
    }
    // this.childInputData['sellSoundPrice'] >= this.childInputData['myPrice'] ||
    if (this.coinDetails['buy'] >= this.childInputData['sellSoundPrice']) {
      this.wazirxServiceService.playSellAudio()
    }
  }

  inputValueChanged() {
    this.changeMode = true;
  }
  SaveInput() {
    this.changeMode = false;
    console.log(this.childInputData)
    // updateField(id: number, field: string, value: any, element: any) {

    this.wazirxServiceService.updateField(this.childInputData.id, 'myPrice', this.childInputData['myPrice'], this.childInputData)

  }

  // buySoundPricechangeMode: boolean = false;
  // sellSoundPricechangeMode: boolean = false;
  // buySoundPercentchangeMode: boolean = false;
  // sellSoundPercentchangeMode: boolean = false;

  inputValueChangedbuySoundPrice() {
    this.buySoundPricechangeMode = true;
  }

  SaveInputbuySoundPrice() {
    this.buySoundPricechangeMode = false;
    console.log(this.childInputData)
    // updateField(id: number, field: string, value: any, element: any) {
    let percentOfBuy = ((this.coinDetails['sell'] - this.childInputData['buySoundPrice']) / this.childInputData['buySoundPrice'] * 100).toFixed(5)
    this.childInputData['buySoundPercent'] = percentOfBuy;
    this.wazirxServiceService.updateField(this.childInputData.id, 'buySoundPrice', this.childInputData['buySoundPrice'], this.childInputData)

  }

  inputValueChangedsellSoundPrice() {
    this.sellSoundPricechangeMode = true;
  }

  SaveInputsellSoundPrice() {
    this.sellSoundPricechangeMode = false;
    console.log(this.childInputData)
    // updateField(id: number, field: string, value: any, element: any) {
    let percentOfSell = ((this.coinDetails['buy'] - this.childInputData['sellSoundPrice']) / this.childInputData['sellSoundPrice'] * 100).toFixed(5)
    this.childInputData['sellSoundPercent'] = percentOfSell;

    this.wazirxServiceService.updateField(this.childInputData.id, 'sellSoundPrice', this.childInputData['sellSoundPrice'], this.childInputData)

  }

  inputValueChangedbuySoundPercent() {
    this.buySoundPercentchangeMode = true;
  }

  SaveInputbuySoundPercent() {
    this.buySoundPercentchangeMode = false;
    console.log(this.childInputData)
    // updateField(id: number, field: string, value: any, element: any) {

    this.wazirxServiceService.updateField(this.childInputData.id, 'buySoundPercent', this.childInputData['buySoundPercent'], this.childInputData)

  }

  inputValueChangedsellSoundPercent() {
    this.sellSoundPercentchangeMode = true;
  }

  SaveInputsellSoundPercent() {
    this.sellSoundPercentchangeMode = false;
    console.log(this.childInputData)
    // updateField(id: number, field: string, value: any, element: any) {

    this.wazirxServiceService.updateField(this.childInputData.id, 'sellSoundPercent', this.childInputData['sellSoundPercent'], this.childInputData)

  }

  ngAfterViewInit() {
    this.historyEvent = this.wazirxServiceService.getHIstoricalDataEvent.subscribe(() => {
      // this.dashboard = this.wazirxServiceService.getDashboard();
      this.wazirxServiceService.getHistoricalDataFromApi(this.detailForId.id).subscribe((data) => {
        // this.apiResponse = data
        this.eachHistoricalData = data;
        this.showHistoricalData = true;
      })
    })

  }


  ngOnDestroy() {
    this.historyEvent.unsubscribe();
  }

  ngOnInit(): void {
  }

}
