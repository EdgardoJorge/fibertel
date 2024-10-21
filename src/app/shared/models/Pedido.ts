export interface Pedido{
    idPedido: number,
    fechaPedido: Date,
    fechaCancelado: Date,
    tipoPedido: string,
    estado: string,
    total: number,
    idCliente: number,
    idPersonal: number,
    idEnvio: number,
    idRecojo: number,
}