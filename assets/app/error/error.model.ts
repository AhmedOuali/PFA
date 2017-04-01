import { default as swal, SweetAlertType } from 'sweetalert2';
export class Error {
    constructor(
        public title: string, 
        public text: string, 
        public type: SweetAlertType,
        public confirmButtonText: string,
        public showConfirmButton: boolean){}
}