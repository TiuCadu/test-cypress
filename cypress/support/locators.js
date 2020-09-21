const locators = {
  LOGIN: {
    USER: '[data-test="email"]',
    PASSWORD: '[data-test="passwd"]',
    BTN_LOGIN: 'button[type="submit"]'
  },
  MENU: {
    HOME: '[data-test=menu-home]',
    SETTINGS: '[data-test="menu-settings"]',
    CONTAS: '[href="/contas"]',
    RESET: '[href="/reset"]',
    MOVIMENTACAO: '[data-test=menu-movimentacao]',
    EXTRATO: '[data-test=menu-extrato]'

  },
  CONTAS: {
    NOME: '[data-test=nome]',
    BTN_SALVAR: '.btn',
    FN_CSS_BUSCA_BOTAO_ALTERAR: nome => `td:contains("${nome}")~td i:eq(0)`
  },
  MOVIMENTACAO: {
    DESCRICAO: '#descricao',
    VALOR: '[data-test=valor]',
    INTERESSADO: '#envolvido',
    CONTA: '[data-test=conta]',
    BTN_SALVAR: '.btn-primary',
    STATUS: '[data-test=status]'
  },
  EXTRATO: {
    LINHAS: '.list-group li',
    FN_CSS_BUSCA_ELEMENTO: (nome, valor) => `span:contains("${nome}")~small:contains("${valor}")`,
    FN_CSS_REMOVER_ELEMENTO: nome => `.row div:contains("${nome}")~div i:eq(1)`
  },
  SALDO: {
    FN_CSS_BUSCA_SALDO_CONTA: (nome, valor) => `td:contains("${nome}")~td:contains("${valor}")`

  },
  MESSAGE: '.toast'
}

export default locators
