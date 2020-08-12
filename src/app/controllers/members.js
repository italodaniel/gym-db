const Member = require('../models/Member');
const { age, date, birthDay } = require('../../lib/utils');

module.exports = {
    // index
    index(req, res) {
        
        Member.all(function(members) {
            return res.render("members/index", { members });
        });
    },

    // Exibe a página create
    create(req, res) {

        Member.instructorsSelectOptions(function(options){
            return res.render("members/create", { instructorsOptions: options})
        })

    },

    
    post(req, res) {
        const keys = Object.keys(req.body);

        for (key of keys) {
            if (req.body[key] == "") {
                return res.send("Por favor, preencha todos os campos.");
            }
        }

        Member.create(req.body, function(member) {
            return res.redirect(`/members/${member.id}`);
        })
    },

    
    show(req, res) {
        Member.find(req.params.id, function(member) {
            if (!member) {
                return res.send('Registro não encontrado!')
            }

            member.age = age(member.birth);
            member.birthDay = birthDay(member.birth).iso;
            member.created_at = date(member.created_at).format;
            
            return res.render('members/show', { member })
        });
    },

   
    edit(req, res) {
        Member.find(req.params.id, function(member) {
            if (!member) {
                return res.send("Registro não encontrado!")
            }

            member.birth = date(member.birth).iso;

            Member.instructorsSelectOptions(function(options){
                return res.render("members/edit", { member, instructorsOptions: options})
            })
        });
    },

   
    put(req, res) {
        const keys = Object.keys(req.body);

        for (key of keys) {
            if (req.body[key] == "") {
                return res.send("Por favor, preencha todos os campos.");
            }
        }

        Member.update(req.body, function() {
            return res.redirect(`/members/${req.body.id}`)
        });
    },

  
    delete(req, res) {
        Member.delete(req.body.id, function() {
            return res.redirect(`/members`)
        });
    },
}
