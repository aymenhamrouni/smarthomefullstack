
export class Messages {
  
    constructor(){}

    validation_messages = {
    'codigo': [
      { type: 'required', message: 'El código es requerido.' }
    ],
    'name': [
      { type: 'required', message: 'El nombre es requerido.' }        
    ],
    'address': [
      { type: 'required', message: 'La dirección es requerida.' }
    ],
    'email': [
      { type: 'required', message: 'El email es requerido.' },        
      { type: 'pattern', message: 'Favor de capturar un email valido' }        
    ],
    'password': [
      { type: 'required', message: 'La contraseña es requerida.' },        
      { type: 'maxLength', message: 'La contraseña debe ser máximo de 10 posiciones' },
      { type: 'minLength', message: 'La contraseña debe ser minímo de 5 posiciones' },
      { type: 'pattern', message: 'La contraseña solo debe contenet numeros y letras' }  
    ]
  }

}