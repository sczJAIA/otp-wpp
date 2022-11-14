const phoneNumberFormatter = (number: any) => {
    // 1. Eliminar caracteres que no sean numeros
    let formatted = number.replace(/\D/g, '');
  
    if (formatted.startsWith('0')) {
      formatted = '591' + formatted.substr(1);
    }
    formatted = formatted.replace(/\s+/g, '');
  
    if (!formatted.endsWith('@c.us')) {
      formatted += '@c.us';
    }
  
    return formatted;
  }
  
  export { phoneNumberFormatter }