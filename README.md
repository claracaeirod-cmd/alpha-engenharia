# Site ALPHA Engenharia e Construção

**Site no ar:** https://claracaeirod-cmd.github.io/alpha-engenharia/

Publicado pelo GitHub Pages a partir da branch `main`. Qualquer alteração enviada para a `main` aparece no site em 1 a 2 minutos.

Site de uma página em HTML, CSS e JavaScript puros, sem frameworks e sem dependências externas.
Para ver, abra o `index.html` no navegador. Para publicar, envie a pasta inteira para qualquer hospedagem (Hostinger, Netlify, Vercel, GitHub Pages etc.).

```
index.html             o site
design-system.html     página de referência do design system (não aparece no Google)
favicon.ico
assets/css/tokens.css  cores, fontes, espaçamentos, raios, sombras
assets/css/styles.css  estilos do site
assets/js/main.js      menu, animações, acordeão, filtro, modal, galeria, formulário
assets/img/obras/      fotos das obras (.webp e versão -sm.webp menor)
assets/img/logos/      logos dos clientes (colorido e -mono)
assets/img/brand/      logo ALPHA, ícone, favicons e imagem de compartilhamento
assets/fonts/          Montserrat e Playfair Display (.woff2)
```

## Trocar textos
Todo o texto está no `index.html`, em português e na ordem em que aparece no site. Use a busca do editor (Ctrl+F) pelo trecho que quer mudar.

- **Campos marcados como `[informar]`**: enquanto não forem preenchidos, ficam escondidos no site publicado (o bloco inteiro some). Procure por `fill-me`. São os anos de atuação, o total de obras entregues e o CNPJ. Troque o `<span class="fill-me">[informar]</span>` pelo número, por exemplo `<span class="value">12</span>`. Para o número subir com animação, coloque também `data-count="12"` no elemento `stat__number` (veja como estão o "5" e o "8").
- **Obras**: cada obra tem um cartão (procure por `data-work="nome-da-obra"`) e o conteúdo do modal num bloco `<template id="obra-nome-da-obra">`. Para criar uma nova, copie um cartão e o template correspondente, troque o `id` nos dois e ajuste o `data-cat` (`saude`, `corporativo`, `logistica`, `infra`, `institucional` ou `residencial`). Os contadores dos filtros se atualizam sozinhos.

## Trocar fotos
1. Exporte a foto em **.webp** (pode usar squoosh.app), com cerca de 1400 px no lado maior, e uma cópia menor com 640 px terminando em `-sm.webp`.
2. Coloque em `assets/img/obras/` com o mesmo nome da foto antiga, ou com um nome novo e atualize o `src`, o `srcset`, o `width` e o `height` da tag `<img>`.
3. Atualize o `alt` descrevendo o que aparece na foto.

O raio de 20 px, o recorte e o degradê são aplicados pelo CSS: não precisa editar a imagem.

## Trocar contatos
- **WhatsApp**: o número está em todos os links `https://wa.me/5521993674473?text=...` do `index.html` e na variável `WHATSAPP_NUMBER` no início do `assets/js/main.js`. Use "Substituir tudo" no editor. O texto depois de `?text=` é a mensagem que já chega preenchida, codificada para URL (dá para gerar em urlencoder.org).
- **E-mail, Instagram e endereço**: procure por `alphaengenharia16@gmail.com`, `alpha.engdvs` e `Andrade Neves` e troque em todos os lugares, inclusive no bloco `application/ld+json` do `<head>`.
- **Domínio**: hoje o `<head>` do `index.html` aponta para `https://claracaeirod-cmd.github.io/alpha-engenharia/` (canonical, Open Graph e dados estruturados). Quando o site tiver domínio próprio, troque esse endereço em todos os lugares.

## Trocar cores e fontes
Tudo fica em `assets/css/tokens.css`. Mude um valor ali e o site e o `design-system.html` acompanham. Mantenha o contraste mínimo AA (4,5:1 para texto normal); a página do design system mostra os pares aprovados.

## Logo
O logo foi recortado da apresentação em PDF, porque não havia arquivo original. Ao receber o logo original (PNG transparente ou SVG), substitua `assets/img/brand/logo-alpha-escuro.webp` e `logo-alpha-icone.webp` mantendo os nomes, e gere de novo `favicon.ico`, `favicon-32.png` e `apple-touch-icon.png` (dá para usar realfavicongenerator.net).

## Créditos
Ícones de linha desenhados no padrão do conjunto Lucide (licença ISC). Fontes Montserrat e Playfair Display (SIL Open Font License).
