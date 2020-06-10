const Instructor = require('../models/Instructor');
const { age, date, birthDay } = require('../../lib/utils');

module.exports = {
    // index
    index(req, res) {
        
        Instructor.all(function(instructors) {
            return res.render("instructors/index", { instructors });
        });
    },

    // Exibe a página create
    create(req, res) {
        return res.render("instructors/create");
    },

    // create - POST (Exibe a página para preencher com os dados)
    post(req, res) {
        const keys = Object.keys(req.body);

        for (key of keys) {
            if (req.body[key] == "") {
                return res.send("Por favor, preencha todos os campos.");
            }
        }

        Instructor.create(req.body, function(instructor) {
            return res.redirect(`/instructors/${instructor.id}`);
        })
    },

    // show (Exibe a página com os dados do registro)
    show(req, res) {
        Instructor.find(req.params.id, function(instructor) {
            if (!instructor) {
                return res.send('Registro não encontrado!')
            }

            instructor.age = age(instructor.birth);
            instructor.birthDay = birthDay(instructor.birth).iso;
            instructor.services = instructor.services.split(',');
            instructor.created_at = date(instructor.created_at).format;
            
            return res.render('instructors/show', { instructor})
        });
    },

    // edit (Exibe formulário com os dados disponivéis para alteração)
    edit(req, res) {
        Instructor.find(req.params.id, function(instructor) {
            if (!instructor) {
                return res.send("Registro não encontrado!")
            }

            instructor.birth = date(instructor.birth).iso;
                        
            return res.render('instructors/edit', { instructor})
        });
    },

    // update - PUT (Comando de atualização)
    put(req, res) {
        const keys = Object.keys(req.body);

        for (key of keys) {
            if (req.body[key] == "") {
                return res.send("Por favor, preencha todos os campos.");
            }
        }

        Instructor.update(req.body, function() {
            return res.redirect(`/instructors/${req.body.id}`)
        });
    },

    // delete - DELETE (Comando de deletar)
    delete(req, res) {
        Instructor.delete(req.body.id, function() {
            return res.redirect(`/instructors`)
        });
    },
}
