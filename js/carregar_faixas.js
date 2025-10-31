document.addEventListener('DOMContentLoaded', function() {
    console.log('Script de faixas carregado');
    carregarFaixas();
});

const url = 'data/carregar_dados'

// Dados embutidos como fallback principal
const dadosFaixasFallback = {
    faixas: [
        {
            "imagem": "white",
            "faixa": "Branca",
            "significado": "Inocência e pureza, como uma tela em branco",
            "tempo": "3 meses"
        },
        {
            "imagem": "yellow",
            "faixa": "Amarela", 
            "significado": "Terra fértil onde a semente do conhecimento é plantada",
            "tempo": "4 meses"
        },
        {
            "imagem": "green",
            "faixa": "Verde",
            "significado": "Crescimento, como a planta que brota da terra",
            "tempo": "4 meses"
        },
        {
            "imagem": "blue",
            "faixa": "Azul",
            "significado": "Céu, para onde a planta cresce e se torna forte",
            "tempo": "5 meses"
        },
        {
            "imagem": "red",
            "faixa": "Vermelha",
            "significado": "Perigo, alertando o aluno para controlar seu conhecimento",
            "tempo": "6 meses"
        }
    ]
};

function carregarFaixas() {
    // Tenta carregar do JSON primeiro
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(dados => {
            console.log('JSON carregado com sucesso');
            if (dados.faixas && dados.faixas.length > 0) {
                preencherTabelaFaixas(dados.faixas);
            } else {
                throw new Error('JSON não contém dados de faixas');
            }
        })
        .catch(erro => {
            console.warn('Não foi possível carregar o JSON, usando dados embutidos:', erro);
            preencherTabelaFaixas(dadosFaixasFallback.faixas);
        });
}

function preencherTabelaFaixas(faixas) {
    const tabela = document.querySelector('table');
    if (!tabela) {
        console.error('Tabela não encontrada - verifique se há uma tabela na página');
        return;
    }

    let tbody = tabela.querySelector('tbody');
    if (!tbody) {
        tbody = document.createElement('tbody');
        tabela.appendChild(tbody);
    }
    
    tbody.innerHTML = '';

    faixas.forEach(item => {
        const linha = document.createElement('tr');
        
        linha.innerHTML = `
            <td><div class="faixa-img" style="background-color: ${item.imagem}"></div></td>
            <td>${item.faixa}</td>
            <td>${item.significado}</td>
            <td>${item.tempo}</td>
        `;
        
        tbody.appendChild(linha);
    });

    console.log('Tabela de faixas preenchida com', faixas.length, 'faixas');
}