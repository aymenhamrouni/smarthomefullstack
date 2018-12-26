import { VisitsPage } from './../pages/visits/visits';
import { GlobalService } from './../services/global';
import { VisitService } from './../services/visit';
import { CodigoQrPage } from './../pages/codigo-qr/codigo-qr';
import { LoginService } from './../services/login';
import { FormsModule } from '@angular/forms';
import {NgModule} from "@angular/core";
import {IonicApp, IonicModule} from "ionic-angular";
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {IonicStorageModule} from '@ionic/storage';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {Keyboard} from '@ionic-native/keyboard';
import {WeatherProvider} from "../services/weather";
import {MyApp} from "./app.component";
import {SettingsPage} from "../pages/settings/settings";
import {HomePage} from "../pages/home/home";
import {LoginPage} from "../pages/login/login";
import {NotificationsPage} from "../pages/notifications/notifications";
import {RegisterPage} from "../pages/register/register";
import {LocalWeatherPage} from "../pages/local-weather/local-weather";
import {AccesoPage} from "../pages/acceso/acceso"; 
import {HttpModule} from '@angular/http';
import {QRCodeModule} from 'angularx-qrcode'; 
import {SocialSharing} from "@ionic-native/social-sharing";
import {Screenshot} from "@ionic-native/screenshot";
import { StreamfeedPage } from "../pages/streamfeed/streamfeed";
import { FiresensorsPage } from "../pages/firesensors/firesensors";
import { SocketIoModule, SocketIoConfig } from "ng-socket-io";
const config: SocketIoConfig = { url: "http://localhost:3000", options: {} };

@NgModule({
  declarations: [
    MyApp,
    SettingsPage,
    HomePage,
    LoginPage,
    LocalWeatherPage,
    NotificationsPage,
    RegisterPage,    
    AccesoPage,
    CodigoQrPage,
    VisitsPage,
    StreamfeedPage,
    FiresensorsPage
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    SocketIoModule.forRoot(config),
    IonicModule.forRoot(MyApp, {
      scrollPadding: false,
      scrollAssist: true,
      autoFocusAssist: false
    }),
    IonicStorageModule.forRoot({
      name: '_mdc_HomeSecurity',
        driverOrder: ['indexeddb', 'sqlite', 'websql']
    }),
    QRCodeModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    SettingsPage,
    HomePage,
    LoginPage,
    LocalWeatherPage,
    NotificationsPage,
    RegisterPage,    
    AccesoPage,
    CodigoQrPage,
    VisitsPage,
    StreamfeedPage,
    FiresensorsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Keyboard,    
    WeatherProvider,
    LoginService,
    VisitService,
    GlobalService,
    Screenshot,
    SocialSharing
  ]
})

export class AppModule {
}
