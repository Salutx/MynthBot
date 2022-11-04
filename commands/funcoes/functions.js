module.exports = {

    promptMessage: async function (message, author, time, validReactions) {
          // Tempo em segundos
          time *= 1000;
  
          // Reage com cada emoji enviado como parametro
          for (const reaction of validReactions) await message.react(reaction);
  
          // Permite reações apenas do autor da mensagem, 
          // Filtra apenas emojis enviados pelo parametro.
          const filter = (reaction, user) => validReactions.includes(reaction.emoji.name) && user.id === author.id;
  
          // Aguarda reação do usuário
          return message
              .awaitReactions(filter, { max: 1, time: time})
              .then(collected => collected.first() && collected.first().emoji.name);
      }
  
  } //fim module.exports