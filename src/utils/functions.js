import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

export function show_alerta(mensaje, icono,foco=''){
    onFocus(foco)
    const MySwal = withReactContent(Swal);
    MySwal.fire({
        title:mensaje,
        icon:icono,
    });
}

const onFocus = (foco) => {
    if(foco !== ''){
        document.getElementById(foco).focus();
    }
}