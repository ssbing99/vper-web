import {NgModule} from '@angular/core';
import {UicSkeletonComponent} from "./uic-skeleton.component";
import {IonicModule} from "@ionic/angular";
import {CommonModule} from "@angular/common";

@NgModule({
    declarations: [
        UicSkeletonComponent
    ],
    imports: [
        IonicModule,
        CommonModule
    ],
    exports: [
        UicSkeletonComponent
    ],
    providers: []
})
export class UicSkeletonComponentModule {}
