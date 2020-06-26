// file sistem paa salvar arquivos
const fs = require('fs');

//pega todos os dados dentro do data.json e coloca na variavel data
const data = require('./data.json');

//desestrutura o Obj age importando ele(e funções) de outro arquivo
const { age, date } = require('./utils');



//mostrar
exports.show = function(request, response) {
  //pega o id que foi enviado pela url /:id e colca dentro do obj id
  const { id } = request.params;

  //variavel para receber todo o obj que a função find encontrar
  const foundInstructor = data.instructors.find( function(instructor) {

    //compara se o id que veio do req.params pe igual ao id do array instructor
    return id == instructor.id;
  });

  //se não encontrar nenhum instructor com id igual 
  if (!foundInstructor) return response.send('Instrutor não encontrado');

  
  //espalha tudo que tem dentro do foundInstructor, sobresquevendo com as alterações abaixo
  const instructor = {
    ... foundInstructor,
    age: age(foundInstructor.birth),
                                      //split quebra em virgulas o conteudo do array
    services: foundInstructor.services.split(","),

    //coloca um novo constructor com o metodo dateTimeformat retornando um obj na formatação pt-BR
    //data atual
    created_at: new Intl.DateTimeFormat('pt-PT').format(foundInstructor.created_at)
    
  }
  console.log(instructor.hoje);

  //rederiza a pagina , enviando o dado instructor, com o obj encontrado para a pág show.njk
  return response.render('instructors/show', { instructor })
}

//criate
exports.post = function(request, response) {
  //Organiza os dados do body por chaves
  const keys = Object.keys(request.body)

 

  for (key of keys) {
    if (request.body[key] == "") {
      return response.send('Por favor preencha todos os campos');
    }
  }

  //desestuturando o req.body para obter as variaveis disponíveis
  let { avatar_url, birth, name, services, gender } = request.body

  //transforma o campo birth em data timestamp
  birth = Date.parse(birth)
  
  //cria uma variavel pegando a data atual
  const created_at = Date.now();
  
  //cria um id na forma numerica, length = tamanho do array + 1
  const id = Number(data.instructors.length + 1)



  //pega a variavel data .com o array "instructors". adiciona novas variaveis do req.body no array
  data.instructors.push({
    id,
    name,
    avatar_url,
    birth,
    gender,
    services,
    created_at
  });

 
  //escreve no arquivo já criando o data, transforma em json(2 = epaçamento quebrando a linha), função se tiver erro 
  fs.writeFile('data.json', JSON.stringify(data, null, 2 ), function(err) {
    if(err) return response.send('Erro na escrita do arquivo');
    
    return response.render('instructors/index');
  });
  
}

//editar
exports.edit = function(request, response) {

  //pega o id que foi enviado pela url /:id e colca dentro do obj id
  const { id } = request.params;

  //variavel para receber todo o obj que a função find encontrar
  const foundInstructor = data.instructors.find( function(instructor) {

    //compara se o id que veio do req.params pe igual ao id do array instructor
    return id == instructor.id;
  });

  //se não encontrar nenhum instructor com id igual 
  if (!foundInstructor) return response.send('Instrutor não encontrado');

  const instructor = {
    ...foundInstructor,
    birth: date(foundInstructor.birth)
  }

   return response.render('instructors/edit', { instructor })
}
//put

exports.put = function(request, response) {
  const { id } = request.body
  const foundinstructor = data.instructors.find(function(instructor) {
    return id == instructor.id
  })
  if(!foundinstructor) return response.send('Instrutor não encontrado!')

  const instructor = {
    ...foundinstructor,
    ...request.body,
    birth: Date.parse(request.body.birth)
  }

  data.instructors[id - 1] = instructor

  fs.writeFile("data.json", JSON.stringify(data,null, 2), function(err) {
    if(err) return response.send('Erro de escrita!')

    return response.redirect(`/instructors/${id}`)
  })
}
