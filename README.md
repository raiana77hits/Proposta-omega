# Proposta comercial · Ômega Infra Elétrica

Humanize Marketing Digital

## O que tem aqui

| Arquivo | Para que serve |
|---|---|
| `index.html` | Versão principal, em seis seções. Boa para apresentar numa tela grande. |
| `stories.html` | Mesma proposta em 16 telas no formato 9:16, para ler no celular. |
| `Proposta-Omega-Humanize-celular.pdf` | PDF das 16 telas. É o que se manda no WhatsApp. |
| `Proposta-Omega-Humanize-A4.pdf` | PDF em seis páginas A4, para imprimir. |

As duas páginas têm, na capa, um botão que baixa o PDF de celular pronto. O PDF
A4 fica no repositório e no site, mas sem botão na capa.

## Atualizar os PDFs

Os PDFs são gerados a partir do HTML. Depois de mexer em `index.html` ou em
`stories.html`, gere de novo:

```bash
node ferramentas/gerar-pdfs.js
```

Precisa do Playwright com o Chromium instalado. Não use a impressão do
navegador para isso: ela põe cabeçalho com data e endereço, ignora as quebras
de página e acrescenta páginas em branco.

## Publicar

Site estático, sem etapa de build. Na Vercel, importe o repositório sem escolher
framework. O `.vercelignore` deixa a pasta `ferramentas/` e este README fora do
site publicado.

Não crie um `package.json` na raiz: com ele a Vercel passa a tentar um build em
vez de servir os arquivos.
