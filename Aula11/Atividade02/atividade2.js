// Função para adicionar um produto ao carrinho
function adicionarProduto(id, nome, valor, quantidade) {
    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

    // Verificar se o produto já está no carrinho
    const produtoExistente = carrinho.find(produto => produto.id === id);
    
    if (produtoExistente) {
        // Atualizar a quantidade e valor se o produto já estiver no carrinho
        produtoExistente.quantidade += quantidade;
    } else {
        // Adicionar o novo produto ao array
        carrinho.push({ id, nome, valor, quantidade });
    }

    // Salvar o carrinho atualizado no localStorage
    localStorage.setItem('carrinho', JSON.stringify(carrinho));

    // Atualizar a exibição do carrinho
    exibirCarrinho();
}

// Função para remover um produto do carrinho
function removerProduto(id) {
    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

    // Filtrar os produtos, removendo o produto com o id especificado
    carrinho = carrinho.filter(produto => produto.id !== id);

    // Salvar o carrinho atualizado no localStorage
    localStorage.setItem('carrinho', JSON.stringify(carrinho));

    // Atualizar a exibição do carrinho
    exibirCarrinho();
}

// Função para exibir os produtos do carrinho
function exibirCarrinho() {
    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    const listaProdutos = document.getElementById('lista-produtos');
    listaProdutos.innerHTML = '';

    if (carrinho.length > 0) {
        carrinho.forEach(produto => {
            const li = document.createElement('li');
            li.innerHTML = `
                ${produto.nome} - Quantidade: ${produto.quantidade} - Valor: R$ ${(produto.valor * produto.quantidade).toFixed(2)}
                <button onclick="removerProduto(${produto.id})">Remover</button>
            `;
            listaProdutos.appendChild(li);
        });
    } else {
        listaProdutos.innerHTML = 'SEU CARRINHO ESTÁ VAZIO!';
    }
}

// Forma que fizemos para adicionar o produto
document.getElementById('form-produto').addEventListener('submit', function (e) {
    e.preventDefault();

    const id = parseInt(document.getElementById('produto-id').value);
    const nome = document.getElementById('produto-nome').value;
    const valor = parseFloat(document.getElementById('produto-valor').value);
    const quantidade = parseInt(document.getElementById('produto-quantidade').value);

    adicionarProduto(id, nome, valor, quantidade);

    // Reset para limpar o formulário depois de enviar ele
    document.getElementById('form-produto').reset();
});

// Exibir o carrinho ao carregar a página
document.addEventListener('DOMContentLoaded', exibirCarrinho);
