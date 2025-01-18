// Cotação de moedas do dia
const USD = 6.08
const EUR = 6.24
const GBP = 7.78

// Obtendo os elementos do formulário
const form = document.querySelector('form')
const amount = document.getElementById('amount')
const currency = document.getElementById('currency')
const footer = document.querySelector('main footer')
const description = document.getElementById('description')
const result = document.getElementById('result')

// Manipulando o input amount para receber apenas números
amount.addEventListener('input', () => {
    const hasCharactersRegex  = /\D+/g
    amount.value = amount.value.replace(hasCharactersRegex, "")
})

// Captando o evento de submit(enviar) do formulário
form.onsubmit = (e) => {
    e.preventDefault()

    switch(currency.value) {
        case 'USD':
            convertCurrency(amount.value, USD, 'US$')
            break
        case 'EUR':
            convertCurrency(amount.value, EUR, '€')
            break
        case 'GBP':
            convertCurrency(amount.value, GBP, '£')
            break
    }
}

// Função para converter a moeda
function convertCurrency(amount, price, symbol) {
    try {
        //Exibindo a cotação da moeda selecionada
        description.textContent = `${symbol} 1 = ${formatCurrencyBRL(price)}`
        
        // Calcula o resultado total
        let total = (amount * price)

        if(isNaN(total)) {
            return alert('Por favor, digite o valor corretamente para converter')
        }

        // Formata o valor total
        total = formatCurrencyBRL(total).replace('R$', '')

        // Exibe o resultado total
        result.textContent = `${total} Reais`
        
        // aplica a classe que exibe o footer para mostrar o resultado
        footer.classList.add('show-result')
    } catch (error) {
        console.log(error);
        alert('Não foi possível converter, tente novamente mais tarde')
    }
    
}

// Formata a moeda em Real Brasileiro
function formatCurrencyBRL(value) {
    return Number(value).toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    })
}