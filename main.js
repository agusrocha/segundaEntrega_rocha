//loclizacion de lo elementos
const form=document.getElementById("form");
const boton=document.getElementById("submitBoton");

const nombre=document.getElementById("nombre");
const email=document.getElementById("correo");
const telefono=document.getElementById("tel");
const genero=document.getElementById("genero");
const actividad=document.getElementById("entrenamiento");
const fecha=document.getElementById("fecha");
const horariosSelect=document.getElementById("horario");

//construccion del objeto formulario
const formularioValido={
    nombre:false,
    email:false,
    telefono:false,
    genero:false,
    actividad:false,
    horario:false,
    fecha:false,
}

//cambiar propiedad a true cuando llena los campos
nombre.addEventListener('change',(e)=>{
    formularioValido.nombre=e.target.value.trim().length>0;
});

email.addEventListener('change',(e)=>{
    formularioValido.email=e.target.value.trim().length>0;
});

telefono.addEventListener('change',(e)=>{
    formularioValido.telefono=e.target.value.trim().length>0;
});

genero.addEventListener('change',(e)=>{
    formularioValido.genero=e.target.value.trim().length>0;
});
actividad.addEventListener('change',(e)=>{
    formularioValido.actividad=true;
    formularioValido.horario=false;
//crear array de horarios de actividad dependendiendo el entrenamiento    
    const horariosActividad=[
        ["7:00","8:00","14:00","15:00"],
        ["9:00","10:00","16:00","17:00"],
        ["11:00","12:00","18:00","19:00"],
        ["13:00","14:00","20:00","21:00"],
    ]
    const horariosCorrespondientes=horariosActividad[+e.target.value-1];
    
    horariosSelect.innerHTML=`<option selected disabled hidden value="">Seleccione un horario</option>`    
    
    horariosCorrespondientes.forEach((horario)=>{
        const horarioOption=document.createElement("option");
        horarioOption.innerText=horario;
        horarioOption.value=horario;
        horariosSelect.appendChild(horarioOption);
    })
});  

horariosSelect.addEventListener('change',()=>{
    formularioValido.horario=true;
})

fecha.addEventListener('change',(e)=>{
    formularioValido.fecha=e.target.value.length>0;    
});

//boton

form.addEventListener('submit',()=>{
        
    const datosTurno={
        nombre:nombre.value,
        email:email.value,
        telefono:telefono.value,
        genero:genero.value,
        actividad:actividad.value,
        horario:horario.value,
        fecha:fecha.value,
    }
//almacenar turno seleccionado
const turnosActuales=JSON.parse(localStorage.getItem('turnos'));

if(turnosActuales && turnosActuales.length>0){
    turnosActuales.push(datosTurno);
    localStorage.setItem('turnos',JSON.stringify(turnosActuales));
}else{
    localStorage.setItem('turnos',JSON.stringify([datosTurno]));
}
window.location="misturnos.html";

alert(`${nombre.value} su turno fue otorgado. Lo esperamos a las ${horario.value} el dia ${fecha.value}`)
})




















//funcion validar formulario
/* const validarFormulario = () => {
    const formularioValidacion=Object.values(formularioValido);
    const validar=formularioValidacion.findIndex(value => value==false);
    if(validar==-1)form.submit();
    else alert('Faltan campos a completar');
} */

//validarFormulario();