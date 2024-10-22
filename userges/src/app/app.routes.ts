import { Routes } from '@angular/router';
import { UsuarioAdminRoutedComponent } from './component/usuario/admin/plist/routed/usuario.admin.routed.component/usuario.admin.routed.component.component';
import { EliminarComponent } from './component/usuario/admin/plist/routed/eliminar/eliminar.component';
import { EditarComponent } from './component/usuario/admin/plist/routed/editar/editar.component';
import { ViewComponent } from './component/usuario/admin/plist/routed/ver/view.component';
import { CrearComponent } from './component/usuario/admin/plist/routed/crear/crear.component';

export const routes: Routes = [
  { path: 'admin/usuario/plist', component: UsuarioAdminRoutedComponent },
  { path:'admin/usuario/eliminar/:id',component: EliminarComponent },
  {path:'admin/usuario/editar/:id',component: EditarComponent },
  {path:'admin/usuario/view/:id',component: ViewComponent },
  {path: 'admin/usuario/create', component: CrearComponent }
];
