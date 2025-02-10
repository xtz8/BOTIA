const chatbotInput = document.getElementById('chatbot-input');
const chatbotMessages = document.getElementById('chatbot-messages');

chatbotInput.addEventListener('keypress', async (e) => {
    if (e.key === 'Enter') {
        const message = chatbotInput.value;
        chatbotMessages.innerHTML += `<div>Vous : ${message}</div>`;
        chatbotInput.value = '';

        // Appeler l'API OpenAI
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer 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' // Remplacez par votre clé API
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo",  // Moins cher que GPT-4
                messages: [{ role: "user", content: message }]
            })
        });

        const data = await response.json();
        chatbotMessages.innerHTML += `<div>Chatbot : ${data.choices[0].message.content}</div>`;
    }
});
