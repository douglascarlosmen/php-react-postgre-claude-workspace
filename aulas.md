# **Estrutura Detalhada do Curso de Agentes IA WhatsApp**

Este documento apresenta a grade curricular completa, organizada por módulos, conforme detalhado no arquivo "Estrutura de Curso Agentes IA WhatsApp".

## **Módulo 0: O Nivelamento de Fronteira e a Infraestrutura Local Segura**

* **Aula 1: A Anatomia do Agente SDR Autônomo** – Introdução aos agentes cognitivos dinâmicos e suas diferenças em relação a chatbots estáticos.  
* **Aula 2: Preparação do Ambiente Host (Windows e WSL2)** – Configuração do ambiente com WSL2 e Docker Desktop para garantir compatibilidade com Linux.  
* **Aula 3: Orquestração Local com Docker Compose** – Criação do primeiro arquivo docker-compose.yml e conceitos de persistência de dados.  
* **Aula 4: A Dicotomia Lógica: Nós Condutores e Nós Submissos** – Entendimento da interface do n8n e a distinção entre Triggers (Gatilhos) e Actions (Ações).  
* **Aula 5: O Fast-Track Epifânico (A Primeira Vitória)** – Teste prático conectando um Webhook ao Google Sheets para validação do ambiente.

## **Módulo 1: Transição para a Nuvem, VPS Linux e Soberania de Dados**

* **Aula 1: Provisionamento e Segurança Inicial em VPS Linux** – Configuração de VPS, SSH e uso de chaves criptográficas para segurança.  
* **Aula 2: Painéis de Gestão e Implantação Simplificada na Nuvem** – Instalação de gerenciadores visuais como Portainer ou EasyPanel.  
* **Aula 3: A Armadilha do SQLite e a Persistência com PostgreSQL** – Migração do banco SQLite para PostgreSQL para garantir robustez dos dados.  
* **Aula 4: Orquestração de Fuso Horário e Mitigação de Disparos Nocturnos** – Ajuste de variáveis de ambiente (TZ e GENERIC\_TIMEZONE) para sincronização temporal.

## **Módulo 2: Desbravamento Matemático JSON, Condicionais Analíticas e Laços Iterativos**

* **Aula 1: Fundamentos da Notação de Objetos JavaScript (JSON)** – Noções de estruturas de dados e extração via expressões no n8n.  
* **Aula 2: Lógica Condicional Rigorosa (If e Switch Nodes)** – Uso de nós condicionais e Regex para filtragem de dados corrompidos.  
* **Aula 3: O Paradigma da Iteração e o Fracasso das Matrizes Antigas** – Explicação sobre as limitações do "Split in Batches" e a evolução para métodos modernos.  
* **Aula 4: O Domínio do Nó "Loop Over Items" e Controle de Conclusão** – Implementação avançada de loops para processamento contínuo de listas.

## **Módulo 3: O Elo de Comunicação B2B com Evolution API e Protocolos Anti-Colapso**

* **Aula 1: Dicotomia de Integração: Nuvem da Meta vs. Bibliotecas Open-Source** – Comparação entre a API oficial e soluções baseadas em Baileys.  
* **Aula 2: Deploy Autônomo da Evolution API via Docker** – Configuração da Evolution API para comunicação com o WhatsApp.  
* **Aula 3: Configuração de Webhooks e Análise do Payload de Recepção** – Captura e interpretação de eventos (messages.upsert) via Webhooks.  
* **Aula 4: O Loop Tóxico e as Defesas de Portaria do n8n** – Técnicas para evitar que o bot responda a si mesmo (filtros de fromMe e is\_echo).  
* **Aula 5: Formatação Avançada de Requisições de Disparo (HTTP Requests)** – Parametrização rígida de requisições HTTP para envio de mensagens.  
* **Aula 6: Sobrevivência Sistêmica e Protocolos Anti-Banimento via Spin-Tax** – Uso de Spin-tax e pausas randômicas para evitar detecção de spam.

## **Módulo 4: Multimodalidade Sintética e Decodificação de Intenções**

* **Aula 1: Integração com Modelos de Fundação Base (LLMs)** – Prompt Engineering e comportamento de persona utilizando o modelo **Gemini**.  
* **Aula 2: Manipulação e Isolamento da Matriz de Áudio em Base64** – Como extrair dados de áudio das requisições.  
* **Aula 3: Reconstrução Binária e Conversão Acústica** – Conversão de Base64 para arquivos de áudio (MP3).  
* **Aula 4: A Engenharia Speech-to-Text de Baixa Latência (Whisper e Groq)** – Transcrição rápida de áudio para texto.  
* **Aula 5: O Uso de Vision API para Triagem Documental e Visual** – Interpretação de imagens e fotografias via IA.  
* **Aula 6: Roteamento Semântico Condicional e Triagem de Funil (Intent Parsing)** – Classificação automática das intenções do cliente.

## **Módulo 5: Resolução da Alucinação Sistêmica via Vetores, RAG e Supabase**

* **Aula 1: Fundamentos do RAG e o Dilema Zero-Shot** – Introdução ao Retrieval-Augmented Generation para maior fidedignidade.  
* **Aula 2: Desmembramento e Ingestão de Bibliografia Comercial** – Preparação de manuais e documentos para consulta da IA.  
* **Aula 3: A Vetorização Matemática e o Instanciamento no Supabase** – Uso de Embeddings e banco de dados vetorial para busca inteligente.  
* **Aula 4: O "Expert Librarian" e as Consultas Relacionais** – Configuração para garantir que a IA responda estritamente baseada no contexto fornecido.

## **Módulo 6: Intervenção Pragmática de Retaguarda Human-in-The-Loop (HITL) Com Redis**

* **Aula 1: Estratégias de Coexistência Ativa (HITL)** – Gestão da transição entre bot e atendimento humano.  
* **Aula 2: Redis como Arbitrador Central e Matriz Chave-Valor** – Introdução ao cache para controle de fluxo.  
* **Aula 3: Configuração dos Gatilhos de Retenção Analógica (TTL)** – Uso de tempo de expiração no Redis para "quarentena" de leads.  
* **Aula 4: O Nó Validador Contínuo e o Despertar do Bot** – Lógica para verificar o status de quarentena do lead.  
* **Aula 5: Execuções Manuais via "Wait and Approval" em Integrações de Risco** – Intervenção humana necessária para processos críticos.

## **Módulo 7: Fortificação Infraestrutural Exaustiva, Escala e Cibersegurança Nativa**

* **Aula 1: Blindagem Nativa no Host (UFW, Chaves SSH e Fail2Ban)** – Implementação de segurança de rede na VPS.  
* **Aula 2: Proteção Absoluta das Variáveis de Ambiente e Injeções** – Ocultação segura de chaves de API e tokens.  
* **Aula 3: O Gargalo de Processamento e a Introdução Escalar do Queue Mode** – Escalonamento de instâncias para alto volume.  
* **Aula 4: Descentralização do Trabalho: Redis, Workers e BullMQ** – Orquestração de Workers para processamento assíncrono.

## **Módulo 8: Arquitetura Comercial B2B, Inteligência Financeira e Escalonamento Sustentável**

* **Aula 1: Posicionamento Estratégico da Agência SDR no Brasil** – Visão de negócio e postura de agência.  
* **Aula 2: Taxonomia de Cotações: Implantações e Desenvolvimentos Isolados** – Estrutura de preços e pacotes de serviço.  
* **Aula 3: A Receita Previsível (MRR) via SLA e Manutenções no Prompt** – Criação de modelos de recorrência (contratos de manutenção).