import { Routes } from '@angular/router';
import { authGuard, publicGuard } from './controller/guards/auth.guard';

export const routes: Routes = [

    {
        path: 'dashboard',
        loadComponent: () => import ('./view/components/principal/principal.component'),
        children: [
            {path: 'home' , loadComponent:() => import('./view/pages/inicio/inicio.component'), title: 'Inicio' },
            {path: 'products' , loadComponent: ()=> import('./view/pages/productos/productos.component'), title: 'Productos' },
            {path: 'Favorites' , loadComponent: ()=> import('./view/pages/favoritos/favoritos.component'), title: 'Favoritos' },
            {path: 'envios' , loadComponent: () => import('./view/pages/envios/envios.component'), title: 'Envios' },
            
            { path: '', redirectTo: '/dashboard/home', pathMatch: 'full' },
            { path: '**', redirectTo: '/dashboard/home', pathMatch: 'full' }
        ]
    },
    {
        path: 'Empresa',
        canActivate: [authGuard],
        loadComponent: ()=> import ('./view/admin/components/principal/principal.component'),
        children: [
            {path: 'home', loadComponent:() => import('./view/admin/pages/inicio/inicio.component'), title: 'Inicio' },
            {path: 'page2', loadComponent:() => import('./view/admin/pages/inventario/inventario.component'), title: 'Inventario' },
            {path: 'clientes', loadComponent:() => import ('./view/admin/pages/clientes/clientes.component'), title: 'Clientes' },
            {path: 'consultas', loadComponent:() => import ('./view/admin/pages/consultas/consultas.component'), title: 'Chats ' },
            {path: 'perfil', loadComponent:() => import('./view/shared/Perfil/Perfil.component'),  title: 'Perfil'},
            {path: 'historial', loadComponent:() => import('./view/admin/pages/Historial/Historial.component'), title: 'Historial' },
            { path: '', redirectTo: '/Empresa/home', pathMatch: 'full' },
            { path: '**', redirectTo: '/Empresa/home', pathMatch: 'full' }
        ]
    },
    {
        path: 'pedido' ,
        loadComponent: () => import ('./view/pages/productos/pedido/pedido.component')
    },
    {
        path: 'login' ,
        canActivate: [publicGuard],
        loadComponent: ()=> import ('./view/components/auth/login/login.component'),
    },
    {
        path: 'register' ,
        canActivate: [publicGuard],
        loadComponent: ()=> import ('./view/components/auth/register/register.component'),
    },
    {
        path: '',
        redirectTo: 'dashboard/home',
        pathMatch: 'full'
    },
    {
        // Redirección en caso de ruta desconocida
        path: '**',
        redirectTo: 'dashboard/home',
        pathMatch: 'full'
    },
];
