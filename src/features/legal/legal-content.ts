export type LegalBlock =
  | { kind: "text"; value: string }
  | { kind: "list"; items: readonly string[] }
  | { kind: "contact"; lines: readonly string[] };

export type LegalSection = {
  title: string;
  blocks: readonly LegalBlock[];
};

export type LegalDocument = {
  title: string;
  updatedAt: string;
  intro: readonly LegalBlock[];
  sections: readonly LegalSection[];
};

export const PRIVACY_POLICY: LegalDocument = {
  title: "Política de Privacidade",
  updatedAt: "agosto de 2026",
  intro: [],
  sections: [
    {
      title: "1. Quem somos",
      blocks: [
        {
          kind: "text",
          value:
            "A Taktico Tecnologia é uma empresa brasileira especializada em soluções digitais estratégicas e é a responsável pelo AlitaApp, plataforma de prospecção e atendimento com agentes de inteligência artificial.",
        },
        {
          kind: "text",
          value:
            "Esta Política de Privacidade descreve como coletamos, usamos, compartilhamos e protegemos as informações tratadas quando você navega neste site, preenche nosso formulário de contato ou testa a demonstração da agente.",
        },
        {
          kind: "text",
          value:
            "Ela trata apenas do site. O uso da plataforma em app.alitaapp.com.br por clientes contratantes é regido por instrumentos contratuais próprios.",
        },
      ],
    },
    {
      title: "2. Dados que coletamos",
      blocks: [
        {
          kind: "text",
          value:
            "Dados que você nos fornece. Pelo formulário de contato, coletamos:",
        },
        {
          kind: "list",
          items: [
            "Nome e sobrenome",
            "Endereço de e-mail",
            "Empresa (opcional)",
            "Número de telefone (opcional)",
            "Mensagem ou descrição da necessidade",
          ],
        },
        {
          kind: "text",
          value:
            "Registramos também de qual parte do site a solicitação partiu, para direcionar melhor o atendimento.",
        },
        {
          kind: "text",
          value:
            "Conteúdo da demonstração. Nas páginas de teste da agente, os textos que você escreve são enviados aos nossos servidores para gerar a resposta ou conduzir a ligação. Trata-se de um ambiente de demonstração aberto ao público: recomendamos que você não informe ali dados pessoais sensíveis, credenciais ou informações confidenciais.",
        },
        {
          kind: "text",
          value:
            "Dados de navegação. Coletamos automaticamente informações como endereço IP, tipo de dispositivo e navegador, páginas visitadas, origem do acesso e interações com o site, por meio das tecnologias descritas na seção 5.",
        },
      ],
    },
    {
      title: "3. Como usamos seus dados",
      blocks: [
        { kind: "text", value: "Utilizamos as informações coletadas para:" },
        {
          kind: "list",
          items: [
            "Responder às suas solicitações de contato e conduzir o processo comercial;",
            "Enviar informações sobre nossos serviços, quando solicitado;",
            "Operar e melhorar a demonstração da agente;",
            "Medir o desempenho do site e das nossas campanhas de divulgação;",
            "Melhorar a experiência de navegação;",
            "Cumprir obrigações legais e regulatórias.",
          ],
        },
      ],
    },
    {
      title: "4. Base legal (LGPD)",
      blocks: [
        {
          kind: "text",
          value:
            "O tratamento dos seus dados é realizado com base no consentimento que você nos concede ao preencher o formulário de contato, usar a demonstração ou aceitar cookies não essenciais, e no legítimo interesse da Taktico em responder às suas solicitações, garantir a segurança do site e divulgar seus serviços, sempre em conformidade com a Lei Geral de Proteção de Dados (Lei nº 13.709/2018).",
        },
        {
          kind: "text",
          value:
            "Você pode revogar o consentimento a qualquer momento, conforme a seção 9.",
        },
      ],
    },
    {
      title: "5. Cookies e tecnologias de rastreamento",
      blocks: [
        {
          kind: "text",
          value:
            "Utilizamos cookies essenciais, necessários ao funcionamento do site, e as seguintes tecnologias de terceiros:",
        },
        {
          kind: "list",
          items: [
            "Google Tag Manager, que gerencia as demais tags de medição carregadas nesta página;",
            "Meta Pixel, que registra visitas e o envio do formulário de contato para medir o resultado dos nossos anúncios e permitir a exibição de publicidade nas plataformas da Meta. Nas nossas páginas de campanha carregamos também um segundo pixel da Meta, de uma agência do nosso grupo econômico responsável por veicular esses anúncios, com a mesma finalidade e restrito a essas páginas.",
          ],
        },
        {
          kind: "text",
          value:
            "Essas tecnologias só são carregadas após a sua primeira interação com a página. Você pode bloqueá-las nas configurações do navegador, por extensões de bloqueio ou pelas preferências de anúncios da própria Meta. Cookies essenciais não podem ser desativados sem afetar o funcionamento do site.",
        },
      ],
    },
    {
      title: "6. Compartilhamento com terceiros",
      blocks: [
        {
          kind: "text",
          value:
            "Nós não vendemos nem alugamos seus dados pessoais. O compartilhamento ocorre apenas nas situações abaixo, sempre limitado ao necessário:",
        },
        {
          kind: "list",
          items: [
            "Meta Platforms, que recebe eventos de navegação e de conversão pelos pixels descritos na seção 5, para mensuração e publicidade, incluindo o da agência do nosso grupo econômico, nas páginas de campanha;",
            "Google, pelo gerenciador de tags e pelas ferramentas de análise de audiência;",
            "Nossos sistemas de atendimento e de gestão de relacionamento com clientes, que recebem os dados do formulário para que nosso time possa responder você;",
            "Autoridades públicas, quando houver obrigação legal, regulatória ou ordem judicial.",
          ],
        },
      ],
    },
    {
      title: "7. Transferência internacional de dados",
      blocks: [
        {
          kind: "text",
          value:
            "Alguns dos provedores citados na seção 6 operam servidores fora do Brasil. Nesses casos, seus dados podem ser transferidos e processados no exterior, nos termos dos artigos 33 e seguintes da LGPD. Selecionamos fornecedores que adotam salvaguardas contratuais e técnicas adequadas para proteger essas informações.",
        },
      ],
    },
    {
      title: "8. Armazenamento e segurança",
      blocks: [
        {
          kind: "text",
          value:
            "As informações enviadas pelo formulário são mantidas em nossos sistemas de atendimento pelo tempo necessário para atender à sua solicitação, conduzir o relacionamento comercial ou cumprir exigências legais. As mensagens da demonstração são retidas apenas pelo período necessário à operação e ao aprimoramento do serviço.",
        },
        {
          kind: "text",
          value:
            "Adotamos medidas técnicas e organizacionais adequadas para proteger suas informações contra acesso não autorizado, perda ou divulgação indevida.",
        },
      ],
    },
    {
      title: "9. Seus direitos",
      blocks: [
        { kind: "text", value: "Nos termos da LGPD, você tem o direito de:" },
        {
          kind: "list",
          items: [
            "Confirmar se tratamos seus dados;",
            "Acessar, corrigir ou excluir seus dados;",
            "Revogar o consentimento a qualquer momento;",
            "Solicitar a anonimização ou o bloqueio de dados desnecessários;",
            "Solicitar a portabilidade dos seus dados;",
            "Obter informação sobre com quem compartilhamos seus dados;",
            "Apresentar reclamação à ANPD.",
          ],
        },
        {
          kind: "text",
          value:
            "Para exercer seus direitos, entre em contato pelo e-mail contato@taktico.com.br.",
        },
      ],
    },
    {
      title: "10. Links externos",
      blocks: [
        {
          kind: "text",
          value:
            "Nosso site pode conter links para sites de terceiros, incluindo redes sociais e a plataforma do AlitaApp. Esta política não se aplica a esses sites, e não nos responsabilizamos pelas suas práticas de privacidade.",
        },
      ],
    },
    {
      title: "11. Alterações nesta política",
      blocks: [
        {
          kind: "text",
          value:
            "Podemos atualizar esta Política de Privacidade periodicamente. A versão mais recente estará sempre disponível nesta página, com a data da última atualização.",
        },
      ],
    },
    {
      title: "12. Contato",
      blocks: [
        { kind: "text", value: "Dúvidas sobre esta política? Fale com a gente:" },
        {
          kind: "contact",
          lines: ["Taktico Tecnologia", "E-mail: contato@taktico.com.br"],
        },
      ],
    },
  ],
};

export const TERMS_OF_SERVICE: LegalDocument = {
  title: "Termos de Serviço",
  updatedAt: "agosto de 2026",
  intro: [],
  sections: [
    {
      title: "1. Aceitação dos termos",
      blocks: [
        {
          kind: "text",
          value:
            "Ao acessar e utilizar este site, você concorda com os presentes Termos de Serviço. Caso não concorde com qualquer disposição, solicitamos que não utilize o site.",
        },
        {
          kind: "text",
          value:
            "Estes termos se aplicam ao site do AlitaApp, operado pela Taktico Tecnologia. Eles não regem o uso da plataforma disponível em app.alitaapp.com.br, que depende de contratação e é regida por instrumento próprio.",
        },
      ],
    },
    {
      title: "2. Sobre o AlitaApp",
      blocks: [
        {
          kind: "text",
          value:
            "O AlitaApp é uma plataforma de prospecção, atendimento e agendamento com agentes de inteligência artificial, desenvolvida e operada pela Taktico Tecnologia, empresa brasileira especializada em soluções digitais estratégicas.",
        },
        { kind: "text", value: "Contato: contato@taktico.com.br" },
      ],
    },
    {
      title: "3. Uso do site",
      blocks: [
        {
          kind: "text",
          value: "Ao utilizar este site, você se compromete a:",
        },
        {
          kind: "list",
          items: [
            "Usar o site apenas para fins lícitos e legítimos;",
            "Não tentar acessar áreas restritas ou sistemas internos;",
            "Não reproduzir, copiar ou redistribuir conteúdo sem autorização;",
            "Não realizar ações que possam prejudicar o funcionamento do site;",
            "Não utilizar meios automatizados para extrair conteúdo ou sobrecarregar o serviço;",
            "Fornecer informações verdadeiras ao entrar em contato conosco.",
          ],
        },
      ],
    },
    {
      title: "4. Propriedade intelectual",
      blocks: [
        {
          kind: "text",
          value:
            "Todo o conteúdo disponível neste site, incluindo textos, logotipos, imagens, design, código-fonte e identidade visual, é de propriedade exclusiva da Taktico Tecnologia ou de seus licenciantes, e está protegido pela legislação brasileira de propriedade intelectual.",
        },
        {
          kind: "text",
          value:
            "É vedada a reprodução, distribuição ou uso comercial de qualquer conteúdo sem autorização prévia e expressa por escrito.",
        },
      ],
    },
    {
      title: "5. Formulário de contato",
      blocks: [
        {
          kind: "text",
          value:
            "O formulário de contato destina-se exclusivamente ao envio de dúvidas, solicitações de informação e interesse em nossos serviços. Ao utilizá-lo, você autoriza a Taktico a entrar em contato para responder à sua solicitação.",
        },
        {
          kind: "text",
          value:
            "Não nos responsabilizamos por informações imprecisas ou falsas fornecidas por meio do formulário.",
        },
      ],
    },
    {
      title: "6. Demonstração da agente de IA",
      blocks: [
        {
          kind: "text",
          value:
            "O site oferece uma demonstração pública da nossa agente de inteligência artificial. Ela existe para ilustrar o funcionamento do produto e está sujeita a limites de uso.",
        },
        {
          kind: "text",
          value:
            "As respostas são geradas automaticamente por inteligência artificial e podem conter imprecisões. Elas não constituem proposta comercial, aconselhamento profissional nem compromisso vinculante da Taktico. Condições, preços e escopo de serviço são definidos apenas por contrato.",
        },
        {
          kind: "text",
          value:
            "Por se tratar de ambiente aberto ao público, não informe dados pessoais sensíveis, credenciais ou informações confidenciais na demonstração.",
        },
      ],
    },
    {
      title: "7. Disponibilidade do serviço",
      blocks: [
        {
          kind: "text",
          value:
            "Envidamos esforços para manter o site disponível continuamente, mas não garantimos disponibilidade ininterrupta. O site pode ficar temporariamente indisponível por manutenção, atualizações ou falhas técnicas fora do nosso controle.",
        },
      ],
    },
    {
      title: "8. Links para terceiros",
      blocks: [
        {
          kind: "text",
          value:
            "Este site pode conter links para sites externos, como redes sociais. Esses links são fornecidos apenas por conveniência. A Taktico não possui controle sobre o conteúdo de terceiros e não se responsabiliza por suas práticas, conteúdo ou disponibilidade.",
        },
      ],
    },
    {
      title: "9. Limitação de responsabilidade",
      blocks: [
        {
          kind: "text",
          value:
            "O site é fornecido no estado em que se encontra. A Taktico não se responsabiliza por danos diretos, indiretos ou consequentes resultantes do uso ou da impossibilidade de uso do site, na máxima extensão permitida pela legislação aplicável.",
        },
      ],
    },
    {
      title: "10. Privacidade",
      blocks: [
        {
          kind: "text",
          value:
            "O tratamento de dados pessoais realizado neste site é descrito na nossa Política de Privacidade, que integra estes Termos de Serviço.",
        },
      ],
    },
    {
      title: "11. Lei aplicável e foro",
      blocks: [
        {
          kind: "text",
          value:
            "Estes Termos de Serviço são regidos pelas leis da República Federativa do Brasil. Fica eleito o foro da comarca de domicílio da Taktico Tecnologia para dirimir quaisquer controvérsias decorrentes destes termos, com renúncia a qualquer outro, por mais privilegiado que seja.",
        },
      ],
    },
    {
      title: "12. Alterações nos termos",
      blocks: [
        {
          kind: "text",
          value:
            "A Taktico reserva-se o direito de modificar estes Termos de Serviço a qualquer momento. A versão atualizada será publicada nesta página com a nova data de vigência. O uso continuado do site após as alterações implica na aceitação dos novos termos.",
        },
      ],
    },
  ],
};
