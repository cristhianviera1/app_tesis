import {Color} from "@ionic/core";
import {StatusVoucherType} from "../../../pages/myShopping/MyShopping";

interface ColorPeerVoucherStatusType {
    color: Color,
    status: StatusVoucherType
}

export const ColorsPeerVoucher: ColorPeerVoucherStatusType[] = [
    {
        color: 'success',
        status: 'aprobado'
    },
    {
        color: 'danger',
        status: 'denegado'
    },
    {
        color: 'warning',
        status: 'pendiente comprobante'
    },
    {
        color: 'primary',
        status: 'pendiente aprobación'
    },
]
