import { Component } from '@angular/core';
import { API, ROUTES } from '../../global/api.service';
import { Authentication } from '../../global/authentication.service';

import { HomePage } from "../home/home";
import { NavController, NavParams, AlertController, ToastController, ModalController, LoadingController } from 'ionic-angular';
import { AppDataService } from '../../global/app-data.service';
import { IPopup } from '../../models/models';
import { BaseViewController } from '../base-view-controller/base-view-controller';

@Component({
  selector: 'page-my-card-more',
  templateUrl: 'my-card-more.html'
})
export class MyCardMorePage extends BaseViewController {
  auth: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public API: API, public authentication: Authentication, public modalCtrl: ModalController, public alertCtrl: AlertController, public toastCtrl: ToastController, public loadingCtrl: LoadingController) {
    super(navCtrl, navParams, API, authentication, modalCtrl, alertCtrl, toastCtrl, loadingCtrl);
  }

  ionViewDidLoad() {
    this.auth = this.authentication.getCurrentUser();
  }

  delete() {
    // API generate redeem code???
    // popup with code or stripe refund if under $10 ???
    
    const onConfirmFn = () => {
      this.navCtrl.setRoot(HomePage);
    }

     /*** Package for submit ***/
    this.presentLoading("Deleting...");
    this.API.stack(ROUTES.deleteCard, "GET")
      .subscribe(
          (response) => {
            console.log('response: ', response);
            this.dismissLoading("Deleted!");
          }, (err) => {
            const shouldPopView = false;
            this.errorHandler.call(this, err, shouldPopView)
          });
  }
}