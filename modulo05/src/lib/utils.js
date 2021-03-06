module.exports = {
  age(timestamp) {

    //cria um novo Obj tipo data atual e coloca dentro do today
    const today = new Date()

    //recebe o timestamp recebido e formata em data
    const birthDate = new Date(timestamp)

                    //propriedade do obj pega ano atual cheio - ano recebido
    let age = today.getFullYear() - birthDate.getFullYear();

                    //propriedade do obj pega mês atual cheio - mes recebido
    const month = today.getMonth() - birthDate.getMonth();

    if (  month < 0 || 
          month == 0 && 
          today.getDate() <= birthDate.getDate()) {
          age = age - 1    
    }  
    return age;

  },

  date(timestamp) {
    const date = new Date(timestamp)

    const year = date.getUTCFullYear()
    const month = `0${date.getUTCMonth() + 1}`.slice(-2)
    const day = `0${date.getUTCDate()}`.slice(-2)

    return {
      day,
      month,
      year,
      iso: `${year}-${month}-${day}`,
      birthDay: `${day}/${month}`,
      format: `${day}/${month}/${year}`
    }
  }

  // // data do created_at
  // date_c(timestamp) {
  //   const date = new Date(timestamp)
  //   const year = date.getUTCFullYear()
  //   const month = `0${date.getUTCMonth() + 1}`.slice(-2)
  //   const day = `0${date.getUTCDate()}`.slice(-2)

  //   return `${day}/${month}/${year}`
  // },
  
  // //data de nascimento ou aniversario
  // date_nasc(timestamp) {
  //   const date = new Date(timestamp)
  //   const year = date.getUTCFullYear()
  //   const month = `0${date.getUTCMonth() + 1}`.slice(-2)
  //   const day = `0${date.getUTCDate()}`.slice(-2)

  //   return `${year}-${month}-${day}`
  //}
}