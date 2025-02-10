// Importer le contexte
import { contexteCV } from './contexte.js';

// Sélectionner les éléments du DOM
const chatbotInput = document.getElementById('chatbot-input');
const chatbotMessages = document.getElementById('chatbot-messages');

// Gérer les questions de l'utilisateur
chatbotInput.addEventListener('keypress', async (e) => {
    if (e.key === 'Enter') {
        const message = chatbotInput.value;
        chatbotMessages.innerHTML += `<div>Vous : ${message}</div>`;
        chatbotInput.value = '';

        // Appeler l'API OpenAI avec le contexte du CV
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}` // Clé API sécurisée
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo",
                messages: [
                    { role: "system", content: contexteCV }, // Contexte du CV
                    { role: "user", content: message } // Question de l'utilisateur
                ]
            })
        });

        const data = await response.json();
        chatbotMessages.innerHTML += `<div>Chatbot : ${data.choices[0].message.content}</div>`;
    }
});
