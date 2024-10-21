import { Routes, RouterModule } from "@angular/router";
import { NavAdmiComponent } from "./pages/nav-admi/nav-admi.component";
import { NgModule } from "@angular/core";
import { DashboardComponent } from "./pages/dashboard/dashboard.component";
import { CollaboratorsComponent } from "./pages/collaborators/collaborators.component";
import { ProductsComponent } from "./pages/products/products.component";
import { CreateProductComponent } from "./pages/create-product/create-product.component";
import { UpdateProductComponent } from "./pages/update-product/update-product.component";
import { CategoriesBrandsComponent } from "./pages/categories-brands/categories-brands.component";
import { CreateCategoryComponent } from "./pages/create-category/create-category.component";
import { CreateBrandComponent } from "./pages/create-brand/create-brand.component";
import { UpdateCategoryComponent } from "./pages/update-category/update-category.component";
import { UpdateBrandComponent } from "./pages/update-brand/update-brand.component";
import { OrdersComponent } from "./pages/orders/orders.component";
import { OrderComponent } from "./pages/order/order.component";
import { ShipmentComponent } from "./pages/shipment/shipment.component";
import { RecojoComponent } from "./pages/recojo/recojo.component";
import { ShippingComponent } from "./pages/shipping/shipping.component";
import { RecojosComponent } from "./pages/recojos/recojos.component";
import { VouchersComponent } from "./pages/vouchers/vouchers.component";
import { VoucherComponent } from "./pages/voucher/voucher.component";
import { BannersComponent } from "./pages/banners/banners.component";
import { CreateBannerComponent } from "./pages/create-banner/create-banner.component";
import { UpdateBannerComponent } from "./pages/update-banner/update-banner.component";
import { StaffComponent } from "./pages/staff/staff.component";
import { CreateStaffComponent } from "./pages/create-staff/create-staff.component";
import { UpdateStaffComponent } from "./pages/update-staff/update-staff.component";
import { ProfileComponent } from "./pages/profile/profile.component";
import { UpdateProfileComponent } from "./pages/update-profile/update-profile.component";

const routes: Routes = [
    {path: '', component: NavAdmiComponent, children: [
        {path: 'dashboard', component: DashboardComponent},
        {path: 'colaboradores', component: CollaboratorsComponent},
        //LISTAR PRODUCTOS
        {path: 'productos', component: ProductsComponent},
        {path: 'producto/crear', component: CreateProductComponent},
        {path: 'producto/:id/actualizar', component: UpdateProductComponent},
        //CATEGORIAS Y MARCAS
        {path: 'categorias-marcas', component: CategoriesBrandsComponent},
        {path: 'categoria/crear', component: CreateCategoryComponent},
        {path: 'marca/crear', component: CreateBrandComponent},
        {path: 'categoria/:id/actualizar', component: UpdateCategoryComponent},
        {path: 'marca/:id/actualizar', component: UpdateBrandComponent},
        //PEDIDOS
        {path: 'pedidos', component: OrdersComponent},
        {path: 'pedido/:id', component: OrderComponent},
        {path: 'envios', component: ShippingComponent},
        {path: 'envio/:id', component: ShipmentComponent},
        {path: 'recojos', component: RecojoComponent},
        {path: 'recojo/:id', component: RecojosComponent},
        //COMPROBANTE
        {path: 'comprobantes', component: VouchersComponent},
        {path: 'comprobante/:id', component: VoucherComponent},
        //BANNERS
        {path: 'banners', component: BannersComponent},
        {path: 'banner/crear', component: CreateBannerComponent},
        {path: 'banner/:id/actualizar', component: UpdateBannerComponent},
        //PERSONALES
        {path: 'personales', component: StaffComponent},
        {path: 'personal/crear', component: CreateStaffComponent},
        {path: 'personal/:id/actualizar', component: UpdateStaffComponent},
        //PERFIL
        {path: 'perfil/:id', component: ProfileComponent},
        {path: 'perfil/:id/actualizar', component: UpdateProfileComponent}
    ]}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class AdmiRoutingModule {

}