# **ANEXO C**

## **PLANO DE TRABALHO: Sistema para Análise e Classificação de Amostras Celulares em Tempo Real utilizando Inteligência Artificial  \- Turma 2024**

***Yuri Dinis Rocker \- yuridinisrocker@gmail.com***  
***Orientador: Ademir Luiz do Prado \- ademir.prado@ifpr.edu.br***

**Resumo** \- O presente trabalho propõe o desenvolvimento de um sistema inteligente para análise e interpretação de amostras celulares utilizando Inteligência Artificial. A solução permitirá identificar, classificar, contabilizar e rastrear células em tempo real, promovendo maior agilidade e confiabilidade no processo laboratorial. O sistema utilizará redes neurais com Python (TensorFlow e Keras), além de OpenCV para processamento de imagens e FastAPI para transmissão de dados via WebSocket. Também será desenvolvido um portal web desacoplado, permitindo a visualização das análises e o envio de novos datasets por usuários, utilizando .NET e Entity Framework. Como resultado, espera-se uma plataforma acessível, escalável e colaborativa para análise celular.

1. Introdução e Justificativa  
   A análise de amostras celulares é uma etapa fundamental em diversas áreas da biologia e da saúde, sendo essencial para diagnósticos, pesquisas e monitoramento de condições clínicas. No entanto, esse processo pode ser demorado e sujeito a falhas humanas, especialmente quando realizado manualmente.  
   Com o avanço da Inteligência Artificial e da Visão Computacional, tornou-se possível automatizar tarefas complexas de reconhecimento de padrões, contribuindo para maior precisão e eficiência. Nesse contexto, o presente trabalho propõe o desenvolvimento de um sistema distribuído capaz de identificar e classificar padrões celulares de forma automatizada.  
   O projeto se destaca por integrar diferentes tecnologias e permitir não apenas a análise automatizada, mas também a expansão contínua do conhecimento por meio do envio de novos datasets pelos usuários. Dessa forma, busca-se contribuir para a democratização do acesso a ferramentas avançadas de análise celular.  
   Como limitação, o sistema dependerá da qualidade dos datasets utilizados e do escopo inicial de padrões celulares definidos para treinamento da IA.

 


2. Objetivos

Objetivo Geral: Desenvolver um sistema inteligente capaz de analisar, identificar, classificar e rastrear amostras celulares em tempo real, permitindo também a expansão do conhecimento por meio do envio colaborativo de datasets.  
Objetivos Específicos: 

* Desenvolver uma rede neural para reconhecimento de padrões celulares;  
* Implementar processamento de imagens em tempo real utilizando OpenCV;  
* Criar um sistema de transmissão de dados via WebSocket;  
* Desenvolver uma aplicação web para visualização das análises;  
* Implementar um módulo para envio e armazenamento de datasets;

3. Metodologia  
   O desenvolvimento do sistema será dividido em etapas estruturadas:  
   Inicialmente, será realizado um estudo aprofundado sobre histologia e análise de padrões celulares, com apoio de profissionais da área de biologia. Em seguida, será realizada a coleta e preparação de datasets iniciais para treinamento da rede neural.  
   A etapa seguinte consiste no desenvolvimento da Inteligência Artificial utilizando Python com TensorFlow e Keras, responsável pela identificação e classificação dos padrões celulares. Paralelamente, será implementado o processamento de imagens em tempo real com OpenCV.  
   Após isso, será desenvolvido um serviço utilizando FastAPI para transmissão dos dados processados via WebSocket para uma aplicação web. Essa aplicação será responsável pela visualização dos resultados em tempo real.  
   Posteriormente, será implementado um sistema backend em .NET com Entity Framework, responsável pelo gerenciamento de usuários e envio de novos datasets, permitindo a expansão contínua da base de conhecimento da IA.  
   Por fim, serão realizados testes, validações e ajustes no sistema.

4. Cronograma Proposto

Definir um cronograma com as etapas especificadas no Item 3\. O cronograma deve ser representado na forma Mês/Ano. O cronograma deve abranger as datas e as etapas pré- estabelecidas no calendário anual de TCC.

| Etapas | ANO |  |  |  |  |  |  |  |  |  |  |  |
| ----- | ----- | :---- | :---- | :---- | :---- | :---- | :---- | :---- | :---- | :---- | :---- | :---- |
|  | Jan | Fev | Mar | Abr | Mai | Jun | Jul | Ago | Set | Out | Nov | Dez |
| **1 \- Levantamento teórico** | x | x | x |  |  |  |  |  |  |  |  |  |
| **2 \- Coleta de Datasets base** |  |  | x | x |  |  |  |  |  |  |  |  |
| **3 \- Desenvolvimento da IA** |  |  |  | x | x |  |  |  |  |  |  |  |
| **4 \- Processamento com OpenCV** |  |  |  |  | x | x |  |  |  |  |  |  |
| **5 \- Desenvolvimento plataforma Web (Backend/FrontEnd e Lógica de WebSocket)** |  |  |  |  |  | x | x |  |  |  |  |  |
| **6 \- Validação** |  |  |  |  |  |  | x | x |  |  |  |  |
| **7 \- Documentação** |  |  |  |  |  |  | x | x | x | x |  |  |

5. Acompanhamento

Acompanhamento será realizado no horário de atendimento ao aluno com a frequência quinzenal entre aluno e orientador, presencialmente, nas sextas-feiras das 17h00 às 19h00.

6. Referências Bibliográficas

HARRISON, Matt. **Machine learning \- Guia de referência rápida : Trabalhando com dados estruturados em python**. São Paulo: Novatec, 2020\. 272 p.  
TROELSEN, A. **Profissional C\# e A Plataforma .net 4**. 1ª ed., Alta Books, 2013  
PUGA, Sandra, FRANÇA, Edson, GOYA, Milton. **Banco de Dados: Implementação emSQL,PL/SQL e Oracle 11g**. São Paulo. Pearson. 2013\.  
DUCKETT, Jon. **HTML & CSS: projete e construa websites**. Rio de Janeiro: Alta Books, 2016

***Colombo***, ***26*** de ***março*** de ***2026***.

**Orientador					Aluno**

