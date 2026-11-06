// Gera os dois PDFs da proposta a partir do HTML.
//
//   node ferramentas/gerar-pdfs.js
//
// Precisa do Playwright com o Chromium instalado. Não há package.json de
// propósito: com um package.json na raiz a Vercel passaria a tentar um build
// em vez de servir os arquivos estáticos.
//
// Não use a impressão do navegador para fazer estes PDFs. Dentro do Claude a
// página roda num quadro, e o navegador imprime o site inteiro: põe cabeçalho
// com data e endereço, ignora as quebras de página e acrescenta páginas em
// branco no fim.

const path = require('path');
const { chromium } = require('playwright');

const raiz = path.resolve(__dirname, '..');
const url = (arquivo) => 'file://' + path.join(raiz, arquivo);

(async () => {
  const navegador = await chromium.launch();

  // A4 — uma seção por página, seis no total
  const contexto = await navegador.newContext({ reducedMotion: 'reduce' });
  const a4 = await contexto.newPage();
  await a4.goto(url('index.html'));
  await a4.waitForTimeout(800);
  await a4.pdf({
    path: path.join(raiz, 'Proposta-Omega-Humanize-A4.pdf'),
    format: 'A4',
    printBackground: true,
  });
  await contexto.close();

  // Celular — uma tela de story (1080 × 1920) por página
  const cel = await navegador.newPage({ viewport: { width: 1080, height: 1920 } });
  await cel.goto(url('stories.html'));
  await cel.waitForTimeout(1200);
  const telas = await cel.evaluate(() => document.querySelectorAll('.story').length);
  await cel.pdf({
    path: path.join(raiz, 'Proposta-Omega-Humanize-celular.pdf'),
    width: '1080px',
    height: '1920px',
    printBackground: true,
    pageRanges: '1-' + telas,
  });

  await navegador.close();
  console.log('PDFs gerados: A4 e celular (' + telas + ' telas).');
})();
