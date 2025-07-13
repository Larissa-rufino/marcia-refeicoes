// Estrutura inicial do site do Márcia Refeições - Área do Cliente

import React, { useState } from 'react';

export default function App() {
  const [carrinho, setCarrinho] = useState([]);
  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [endereco, setEndereco] = useState('');
  const [observacao, setObservacao] = useState('');
  const [formaPagamento, setFormaPagamento] = useState('');

  const pratos = [
    {
      id: 1,
      nome: 'Frango à Milanesa',
      descricao: 'Acompanha arroz, feijão e salada.',
      preco: 20,
      imagem: 'https://via.placeholder.com/150',
    },
    {
      id: 2,
      nome: 'Peixe Frito',
      descricao: 'Com arroz, feijão tropeiro e vinagrete.',
      preco: 22,
      imagem: 'https://via.placeholder.com/150',
    },
  ];

  const adicionarAoCarrinho = (prato) => {
    setCarrinho([...carrinho, prato]);
  };

  const total = carrinho.reduce((soma, item) => soma + item.preco, 0);

  const gerarMensagemWhatsApp = () => {
    const pedido = carrinho.map(p => `- ${p.nome} (R$${p.preco})`).join('\n');
    return `Olá, meu nome é ${nome} e meu telefone é ${telefone}.\n\nGostaria de fazer o seguinte pedido:\n${pedido}\n\nTotal: R$${total}\n\nEndereço: ${endereco || 'Retirada no local'}\nForma de pagamento: ${formaPagamento}\n\nObservações: ${observacao}`;
  };

  const linkWhatsApp = `https://wa.me/55SEUNUMERO?text=${encodeURIComponent(gerarMensagemWhatsApp())}`;

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Márcia Refeições</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {pratos.map(prato => (
          <div key={prato.id} className="border p-4 rounded-xl shadow">
            <img src={prato.imagem} alt={prato.nome} className="w-full h-40 object-cover rounded-lg mb-2" />
            <h2 className="text-xl font-semibold">{prato.nome}</h2>
            <p>{prato.descricao}</p>
            <p className="text-green-600 font-bold">R${prato.preco}</p>
            <button onClick={() => adicionarAoCarrinho(prato)} className="mt-2 bg-green-500 text-white px-4 py-2 rounded">Adicionar</button>
          </div>
        ))}
      </div>

      <div className="mt-6">
        <h2 className="text-2xl font-bold mb-2">Seu Pedido</h2>
        {carrinho.map((item, index) => (
          <p key={index}>- {item.nome} (R${item.preco})</p>
        ))}
        <p className="font-bold mt-2">Total: R${total}</p>

        <input
          type="text"
          placeholder="Seu nome"
          className="block w-full mt-4 p-2 border rounded"
          value={nome}
          onChange={e => setNome(e.target.value)}
        />
        <input
          type="text"
          placeholder="Seu telefone"
          className="block w-full mt-2 p-2 border rounded"
          value={telefone}
          onChange={e => setTelefone(e.target.value)}
        />
        <input
          type="text"
          placeholder="Endereço de entrega (ou deixe em branco para retirada)"
          className="block w-full mt-2 p-2 border rounded"
          value={endereco}
          onChange={e => setEndereco(e.target.value)}
        />
        <textarea
          placeholder="Observações"
          className="block w-full mt-2 p-2 border rounded"
          value={observacao}
          onChange={e => setObservacao(e.target.value)}
        ></textarea>

        <select
          className="block w-full mt-2 p-2 border rounded"
          value={formaPagamento}
          onChange={e => setFormaPagamento(e.target.value)}
        >
          <option value="">Escolha a forma de pagamento</option>
          <option value="Dinheiro (com troco)">Dinheiro (com troco)</option>
          <option value="Pix">Pix</option>
          <option value="Maquininha">Maquininha</option>
          <option value="Pagamento online">Pagamento online</option>
        </select>

        <a
          href={linkWhatsApp}
          target="_blank"
          className="block mt-4 bg-green-600 text-white text-center px-4 py-2 rounded"
        >
          Enviar pedido pelo WhatsApp
        </a>
      </div>
    </div>
  );
}
