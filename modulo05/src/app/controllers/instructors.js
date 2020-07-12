const { date, age } = require('../../lib/utils');
//desestrutura o Obj age importando ele(e funções) de outro arquivo
const Instructor = require('../models/Instructor');

module.exports = {
  index(request, response) {
     Instructor.all(function(instructors) {

      return response.render('instructors/index', { instructors })
     })    
    
  },

  create(request, response) {
  return response.render('instructors/create')

  },

  post(request, response) {
    
    //Organiza os dados do body por chaves
    const keys = Object.keys(request.body) 

    for (key of keys) {
      if (request.body[key] == "") {
        return response.send('Por favor preencha todos os campos');
      }
    }
    Instructor.create(request.body, function(instructor) {

      return response.redurect(`/instructors/${instructor.id}`)

    })
  },

  show(request, response) {
    Instructor.find(request.params.id, function(instructor) {
      if(!instructor) return response.send('Instrutor não encontrado!')

      instructor.age = age(instructor.birth)
      instructor.services = instructor.services.split(',')
      instructor.created_at = date(instructor.created_at).format

      return response.render('instructor/show', { instructor })
    })

  },

  edit(request, response) {

    return

  },

  put(request, response) {
    //Organiza os dados do body por chaves
    const keys = Object.keys(request.body) 

    for (key of keys) {
      if (request.body[key] == "") {
        return response.send('Por favor preencha todos os campos');
      }
    }
    
    return

  },

  delete(request, response) {

    return

  },
}
