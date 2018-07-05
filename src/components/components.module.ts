import { NgModule } from '@angular/core';
import { BuildingsComponent } from './buildings/buildings';
import { ModalDirectoryComponent } from './modal-directory/modal-directory';
@NgModule({
	declarations: [BuildingsComponent,
    ModalDirectoryComponent],
	imports: [],
	exports: [BuildingsComponent,
    ModalDirectoryComponent]
})
export class ComponentsModule {}
