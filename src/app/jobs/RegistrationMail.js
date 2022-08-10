import Mail from "../lib/Mail";

export default {
  name: "Mail_Job",
  queueName: "RegistrationMail",  
  options: {
    //delay: 5000, need a QueueScheduler
    priority: 3
  },
  async handle({ data }) {
    const { user } = data;
    
    await Mail.sendMail({
      from: "DIO <contato@dio.com>",
      to: `${user.name} <${user.email}>`,
      subject: "Cadastro de usuário",
      html: `Olá ${user.name}, Bem-vindo`
    });  
    
  }
}