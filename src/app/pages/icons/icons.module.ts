import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Feather Icon
import { FeatherModule } from 'angular-feather';
import { allIcons } from 'angular-feather/icons';

// Component pages
import { IconsRoutingModule } from './icons-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { BoxiconsComponent } from './boxicons/boxicons.component';
import { MaterialdesignComponent } from './materialdesign/materialdesign.component';
import { FeatherComponent } from './feather/feather.component';
import { RemixComponent } from './remix/remix.component';
import { LineawesomeComponent } from './lineawesome/lineawesome.component';
import { IconsCryptoComponent } from './icons-crypto/icons-crypto.component';

@NgModule({
  declarations: [
    BoxiconsComponent,
    MaterialdesignComponent,
    FeatherComponent,
    RemixComponent,
    LineawesomeComponent,
    IconsCryptoComponent
  ],
  imports: [
    CommonModule,
    FeatherModule.pick(allIcons),
    IconsRoutingModule,
    SharedModule
  ]
})
export class IconsModule { }
