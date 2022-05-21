import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { SceneReducers } from './store/reducers';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '@/environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { SceneEffects } from '@/app/store/effects';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        StoreModule.forRoot({}, {}),
        StoreModule.forFeature(SceneReducers.featureKey, SceneReducers.reducer),
        StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
        EffectsModule.forRoot([]),
        EffectsModule.forFeature([ SceneEffects ]),
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
