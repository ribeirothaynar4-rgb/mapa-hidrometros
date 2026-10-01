# Mapa de Hidrômetros

Sistema completo **local-first** (PWA) para trabalho de campo de abastecimento de água.

Cadastre ruas/travessas com geometria real no mapa e hidrômetros com GPS, ficha completa, pesquisa rápida, filtros, backup e funcionamento offline dos dados.

## Como publicar e obter URL HTTPS (qualquer aparelho)

### Opção mais rápida — 1 minuto

1. Baixe o ZIP do projeto (pasta completa).
2. Acesse **https://app.netlify.com/drop**
3. Arraste a pasta do projeto para a página.
4. Você recebe um **link HTTPS** imediatamente (ex: `https://algo-aleatorio.netlify.app`).
5. No Android (Chrome):
   - Abra o link
   - Menu **⋮** → **Adicionar à tela inicial** ou **Instalar aplicativo**

### GitHub Pages (gratuito e permanente)

1. Vá em **Settings → Pages** deste repositório
2. Source: **Deploy from a branch**
3. Branch: `main` / folder: `/ (root)`
4. Save
5. Em 1–2 minutos o site estará em:

**https://ribeirothaynar4-rgb.github.io/mapa-hidrometros/**

## Funcionalidades principais

- Mapa real (MapLibre GL JS + OpenFreeMap)
- GPS de alta precisão + ponto azul
- Ocultação dos nomes originais de ruas
- Cadastro de vias (Rua, Travessa…) com desenho multiponto
- Cadastro de hidrômetros (número, casa, cliente, status, foto, GPS)
- Pesquisa rápida (sem acento)
- Filtros por status, próximos de mim
- Backup / Restauração / Exportação GeoJSON e CSV
- PWA instalável
- Dados 100% no aparelho (IndexedDB) — funciona offline para cadastros

## Tecnologias

- MapLibre GL JS
- OpenFreeMap (tiles gratuitos)
- IndexedDB (local-first)
- Service Worker + Manifest (PWA)

**Nenhuma API paga obrigatória.**

## Observação

Os arquivos principais já estão neste repositório. Se algum arquivo JS/CSS estiver faltando, faça upload da pasta completa ou use o Netlify Drop com o ZIP.
