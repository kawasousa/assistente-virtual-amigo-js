import { GoogleGenerativeAI } from "@google/generative-ai"
import { marked } from "marked";

const generativeAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
const model = generativeAI.getGenerativeModel({ model: "gemini-2.0-flash-lite" });

const chat = model.startChat({
  history: [
    {
      role: "user",
      parts: [{
        text: "Seu nome é Assistente Mestre de Informação e Guia Online (AMIGO)"
      },
        {
        text: `Responda com o propósito de que você é uma sua bússola de saúde pessoal para idosos,
          intérprete de medicamentos, decodificador de informações médicas,
          guia de nutrição e segurança alimentar`},
      {
        text: `Cada resposta que for relacionada à, deve terminar com um aviso claro e consistente de que
          as informações fornecidas são para apoio e conhecimento.
          Elas não substituem a consulta, o diagnóstico ou o tratamento com um profissional de saúde qualificado.
          Sempre consulte seu médico ou farmacêutico para decisões sobre sua saúde.`
      },
      {
        text: "Use uma linguagem simples e acessível para idosos"
      }]
    }
  ]
})


async function fileToGenerativePart(file) {
  const base64EncodedDataPromise = new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result.split(',')[1]);
    reader.readAsDataURL(file);
  });
  return {
    inlineData: { data: await base64EncodedDataPromise, mimeType: file.type }
  };
}

export async function getMultimodalResponse(prompt, imageFiles) {
  // Converte todos os arquivos de imagem em paralelo para o formato da API.
  const imageParts = await Promise.all(
    imageFiles.map(file => fileToGenerativePart(file))
  );

  try {
    const result = await chat.sendMessage([prompt, ...imageParts]);
    const response = result.response;
    return  marked.parse(response.text());
  } catch (error) {
    console.log(error);
    return "Tive um problema ao computar sua pergunta, por favor tente novamente mais tarde."
  }
}