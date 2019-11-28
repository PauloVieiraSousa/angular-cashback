import { NgModule, ModuleWithProviders} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormLoginComponent } from './components/form-login/form-login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthenticationService } from './service/authentication.service';
import { HttpClientModule } from '@angular/common/http';
import { Interceptor } from './interceptor/interceptor';
import { TokenService } from './service/token.service';
import {LoginRoutesModule} from './login.routes';
import { FormRegisterComponent } from './components/form-register/form-register.component';
import {LoginComponent} from './login.component';
import { NgxMaskModule } from 'ngx-mask';
import { config , initialConfig, INITIAL_CONFIG, optionsConfig, NEW_CONFIG} from './config/config';

@NgModule({
  declarations: [FormLoginComponent, FormRegisterComponent, LoginComponent],
  exports: [ FormLoginComponent, LoginComponent, FormRegisterComponent],
  imports: [
    LoginRoutesModule,
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    Interceptor,
    NgxMaskModule.forRoot()
  ],

})
export class LoginModule {
  public static forRoot(configValue: optionsConfig | ( () => optionsConfig)): ModuleWithProviders {
    return {
      ngModule: LoginModule,
      providers: [
        {
          provide: NEW_CONFIG,
          useValue: configValue,
        },
        {
          provide: INITIAL_CONFIG,
          useValue: initialConfig
        },
        {
          provide: config,
          useFactory: _configFactory,
          deps: [NEW_CONFIG, INITIAL_CONFIG]
        },
        AuthenticationService,
        TokenService
      ]
    };
  }
}

/*
*  @internal
*/
export function _configFactory(initConfig, configValue: optionsConfig | (() => optionsConfig)): optionsConfig {
  return configValue instanceof Function ? {...initConfig, ...configValue()} : {...initConfig, ...configValue};
}
