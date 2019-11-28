import {InjectionToken} from '@angular/core';

export interface IConfig {
  urlRedirectSuccess: string;
}

export type optionsConfig = Partial<IConfig>;
export const config: InjectionToken<IConfig> = new InjectionToken('config');
export const INITIAL_CONFIG: InjectionToken<IConfig> = new InjectionToken('INITIAL_CONFIG');
export const NEW_CONFIG: InjectionToken<IConfig> = new InjectionToken('NEW_CONFIG');
export const initialConfig: IConfig = {
  urlRedirectSuccess: 'dashboard'
};

