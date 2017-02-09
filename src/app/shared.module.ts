import { NgModule, ModuleWithProviders } from '@angular/core';
import { CrudService} from './crud-employee/crud.service';
import { CommonModule } from '@angular/common';
import { TranslateService } from '../translate/translate.service';
import { TranslatePipe } from '../translate/translate.pipe';
import { TRANSLATION_PROVIDERS } from '../translate/translations'
import { AlertService } from './shared/common-service/alert.service'
import { ConfirmActivateGuard } from './shared/security/confirm-activate-guard';
import { FirebaseAuthentication } from "./shared/firebase/firebaseAuthentication";

@NgModule({
  imports:[CommonModule],
  declarations: [TranslatePipe],
  exports: [TranslatePipe]
})
export class SharedModule {
    static forRoot() : ModuleWithProviders{
        return {
            ngModule: SharedModule,
            
            providers: [CrudService,TRANSLATION_PROVIDERS,TranslateService,AlertService,ConfirmActivateGuard,FirebaseAuthentication]
        }
    }
}