import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules, NoPreloading } from '@angular/router';
import { environment } from 'src/environments/environment';

const routes: Routes = [];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: environment.production ? PreloadAllModules : NoPreloading,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
