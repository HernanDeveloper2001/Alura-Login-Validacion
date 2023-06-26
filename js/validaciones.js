export function valida(input) {
    const tipoDeInput = input.dataset.tipo;
    if(validadores[tipoDeInput]){
        validadores[tipoDeInput](input);
    }

    if(input.validity.valid){
        input.parentElement.classList.remove("input-container--invalid");
        input.parentElement.querySelector(".input-message-error").innerHTML = "";
    }
    else{
        input.parentElement.classList.add("input-container--invalid");
        input.parentElement.querySelector(".input-message-error").innerHTML = mostrarMensajesDeError(tipoDeInput, input);
    }

}

const tipoDeErrores = [
    "valueMissing",
    "typeMismatch",
    "patternMismatch",
    "customError",
]
 

const mensajesDeError = {
    nombre: {
        valueMissing: "El nombre es obligatorio",
    },
    email:{
        valueMissing: "El email es obligatorio",
        typeMismatch: "El email no es válido",
    },
    password:{
        valueMissing: "La contraseña es obligatorio",
        patterMismatch: "La contraseña no es válida",
    },
    nacimiento: {
        valueMissing: "La fecha de nacimiento es obligatorio",
        customError: "Debes tener 18 años de edad",
    },
    numero: {
        valueMissing: "El número es obligatorio",
        patternMismatch: "El número no es válido tiene que tener 10 dígitos",
    },
    direccion: {
        valueMissing: "El número es obligatorio",
        patternMismatch: "El número no es válido tiene que tener 10 dígitos",
    },
    ciudad: {
        valueMissing: "la ciudad es obligatorio",
        patternMismatch: "la ciudad no es valido",
    },
    estado:{
        valueMissing: "El estado es obligatorio",
        patternMismatch: "Es estado no es valido",
    }
    
    

}

function mostrarMensajesDeError(tipoDeInput, input) {
    let mensaje = "";
    tipoDeErrores.forEach((error) => {
        if(input.validity[error]){
            console.log(tipoDeInput, error);
            console.log(input.validity[error]);
            console.log(mensajesDeError[tipoDeInput][error]);
            mensaje = mensajesDeError[tipoDeInput][error];
        }
    });
    return mensaje
}

const validadores = {
    nacimiento: input => validarNacimiento(input),
}

function validarNacimiento(input) {
    const fechaCliente = new Date(input.value);
    let mensaje = "";
    if(!mayorDeEdad(fechaCliente)){
        mensaje = "Debes tener al menos 18 años de edad";
    }
    input.setCustomValidity(mensaje);
}

function mayorDeEdad(fecha) {
    const fechaActual = new Date();
    const diferenciaFecha = new Date(
        fecha.getUTCFullYear() + 18,
        fecha.getUTCMonth(),
        fecha.getUTCDate()
    );
    return diferenciaFecha <= fechaActual;
}
