/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {
   const TRESSECEMMILI = 3000 //VARIAVEL 
    beforeEach(function()
    {
        cy.visit('./src/index.html')
        //Antes de todos os blocos de testes deve-se abrir a aplicação, devido a isso, deve se colocar no bloco beforeEach
    })
    it('verifica o título da aplicação', function() {
        cy.title().should('be.equal','Central de Atendimento ao Cliente TAT')
    })

    it('Prencher os campos obrigatórios e enviar o formulário',function()
    {
        cy.clock()
        
        cy.get('#firstName').type('Nay')
        cy.get('#lastName').type('Candançan')
        cy.get('#email').type('exemplo@gmail.com')
        cy.get('#open-text-area').type('Teste')
        cy.get('button[type="submit"]').click()

        cy.get('.success').should('be.visible')
        cy.tick(TRESSECEMMILI)
        cy.get('.success').should('not.be.visible')
    }
    )

    it('Longo texto com delay sobrescrito como zero',function()
    {
        cy.clock()

        const longText = 'Teste TesteTesteTesteTesteTesteTesteTesteTesteTesteTesteTesteTesteTesteTesteTeste vTesteTesteTesteTesteTesteTesteTeste TesteTesteTesteTeste TesteTesteTesteTeste Teste Teste TesteTesteTesteTesteTeste TesteTesteTesteTesteTesteTesteTeste TesteTesteTesteTesteTesteTesteTesteTesteTesteTesteTesteTesteTeste  TesteTesteTesteTesteTesteTeste TesteTesteTesteTesteTesteTesteTesteTesteTesteTesteTesteTesteTesteTesteTeste'
        cy.get('#firstName').type('Nay')
        cy.get('#lastName').type('Candançan')
        cy.get('#email').type('exemplo@gmail.com')
        cy.get('#open-text-area').type(longText, {delay: 0})
        cy.get('button[type="submit"]').click()

        cy.get('.success').should('be.visible')
        cy.tick(TRESSECEMMILI)
        cy.get('.success').should('not.be.visible')
    }
    )
    it('Validação de mensagem de erro do e-mail inválido',function()
    {
        cy.clock()

        cy.get('#firstName').type('Nay')
        cy.get('#lastName').type('Candançan')
        cy.get('#email').type('exemplo@')
        cy.get('#open-text-area').type('Teste')
        cy.get('button[type="submit"]').click()

        cy.get('.error').should('be.visible')
        cy.tick(TRESSECEMMILI)
        cy.get('.success').should('not.be.visible')
    }
    )
    it('Validação do campo telefone com valores não numéricos deve continuar vazio',function()
    {
        cy.get('#phone')
        .type('abcdefghij')
        .should('have.value','') //valor vazio 
    }
    )
    it('Exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function()
    {
        cy.clock()

        cy.get('#firstName').type('Nay')
        cy.get('#lastName').type('Candançan')
        cy.get('#email').type('exemplo@gmail.com')
        cy.get('#phone-checkbox').click()
        cy.get('#open-text-area').type('Teste')
        cy.get('button[type="submit"]').click()

        cy.get('.error').should('be.visible')
        cy.tick(TRESSECEMMILI)
        cy.get('.success').should('not.be.visible')
    }
    )
    it('reenche e limpa os campos nome, sobrenome, email e telefone', function()
    {
        cy.get('#firstName')
        .type('Nay')
        .should('have.value','Nay')
        .clear()
        .should('have.value','')
        
        cy.get('#lastName')
        .type('Candançan')
        .should('have.value','Candançan')
        .clear()
        .should('have.value','')

        cy.get('#email')
        .type('exemplo@gmail.com')
        .should('have.value','exemplo@gmail.com')
        .clear()
        .should('have.value','')
        
        cy.get('#open-text-area')
        .type('Teste')
        .should('have.value','Teste')
        .clear()
        .should('have.value','')

        cy.get('#phone')
        .type('12953416679')
        .should('have.value','12953416679')
        .clear()
        .should('have.value','')
    })
    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function()
    {
        cy.clock()

        cy.get('button[type="submit"]').click()

        cy.get('.error').should('be.visible')
        cy.tick(TRESSECEMMILI)
        cy.get('.success').should('not.be.visible')
    })
    it('envia o formuário com sucesso usando um comando customizado',function()
    {
        cy.filMandatoryFieldsAndSubmit()
    })
    it('Usar o contém para identificar o botão',function()
    {
        cy.clock()

        cy.get('#firstName').type('Nay')
        cy.get('#lastName').type('Candançan')
        cy.get('#email').type('exemplo@gmail.com')
        cy.get('#open-text-area').type('Teste')
        cy.contains('button','Enviar').click()
        //Encontrar na tela um botão que contém o texto enviar, o primeiro elemento é um seletor css e o segundo o texto que ele tem dentro de si.

        cy.get('.success').should('be.visible')
        cy.tick(TRESSECEMMILI)
        cy.get('.success').should('not.be.visible')
    })
    it('seleciona um produto (YouTube) por seu texto',function()
    {
        cy.get('#product')
        .select('YouTube')
        .should('have.value','youtube') 
        //Nesse caso, está com letra mínuscula, porque estamos validando o valor do inspect ao invés do texto que apresenta na combobox
    })
    it('seleciona um produto (Mentoria) por seu valor (value)',function()
    {
        cy.get('#product')
        .select('mentoria')
        .should('have.value','mentoria') 

    })
    it('seleciona um produto (Blog) por seu indíce',function()
    {
        cy.get('#product')
        .select(1)
        .should('have.value','blog') 

    })
    it('Check na opção Feedback',function()
    {
     cy.get('input[type=radio][value="feedback"]')
     .check()
     .should('have.value','feedback')
    })
    it('Marca cada tipo de atendimento',function()
    {
     cy.get('input[type=radio]')
     .should('have.length', 3)
     .each(function($radio) //Função que pega cada um dos 3 elementos que é do tipo radio
     {
        cy.wrap($radio).check()
        //Wrap encapsula todos os elementos, para usar depois 
        cy.wrap($radio).should('be.checked')
     })
    })
    it('marca ambos checkboxes, depois desmarca o último',function()
    {
        cy.get('input[type=checkbox]')
        .check() //check em ambos
        .should('be.checked')
        .last() //pega somente o ultimo
        .uncheck() //desmarca o ultimo 
        .should('not.be.checked')
    })
    it('Erro do telefone utilizando o check',function()
    {
        cy.clock()

        cy.get('#firstName').type('Nay')
        cy.get('#lastName').type('Candançan')
        cy.get('#email').type('exemplo@gmail.com')
        cy.get('#phone-checkbox')
        .check()
        .should('be.checked')
        cy.get('#open-text-area').type('Teste')
        cy.get('button[type="submit"]').click()

        cy.get('.error').should('be.visible')
        cy.tick(TRESSECEMMILI)
        cy.get('.success').should('not.be.visible')
    })
    it('seleciona um arquivo da pasta fixtures',function()
    {
        cy.get('input [type="file"] , #file-upload')
        .should ('not.have.value')
        .selectFile('./cypress/fixtures/example.json')
        .should(function($input)
        {
            //console.log($input)
            expect($input[0].files[0].name).to.equal('example.json')
        })
    })
    it('seleciona um arquivo simulando um drag-and-drop',function()
    {
        cy.get('input [type="file"] , #file-upload')
        .should ('not.have.value')
        .selectFile('./cypress/fixtures/example.json', {action: 'drag-drop'}) 
        //drag-drop, é uma ação, ou seja, um objeto, que ao invés de clilcar no botão de anexo e realizar o upload do arquivo, ela simula que o arquivo foi arrastado até a area de anexo
        .should(function($input)
        {
            //console.log($input)
            expect($input[0].files[0].name).to.equal('example.json')
        })
    })
    it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias',function()
    {
     cy.fixture('example.json').as('sampleFile') //pegar o examplo.json e também a chamar de sampleFile
     cy.get('input[type="file"]')
     .selectFile('@sampleFile')
     .should(function($input)
        {
            //console.log($input)
            expect($input[0].files[0].name).to.equal('example.json')
        })
    })
    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique',function()
    {
        cy.get('#privacy a').should('have.attr', 'target', '_blank') //atributo target com o valor blank
    })
    it('acessa a página da política de privacidade removendo o target e então clicando no link',function()
    {
        cy.get('#privacy a')
        .invoke('removeAttr', 'target') //removendo o target, para rodar a mesma página que está rodando o teste cypress, porque em uma segunda aba não é possível realizar uma verificação
        .click()

        cy.contains('Talking About Testing').should('be.visible')
    })
    it('exibe e esconde as mensagens de sucesso e erro usando o .invoke', () => {
        cy.get('.success')
          .should('not.be.visible')
          .invoke('show')
          .should('be.visible')
          .and('contain', 'Mensagem enviada com sucesso.')
          .invoke('hide')
          .should('not.be.visible')
       
          cy.get('.error')
          .should('not.be.visible')
          .invoke('show')
          .should('be.visible')
          .and('contain', 'Valide os campos obrigatórios!')
          .invoke('hide')
          .should('not.be.visible')
      })
      it('preenche a area de texto usando o comando invoke', function() 
      {
        const longText = Cypress._.repeat('Nay ', 40)
        cy.get('#open-text-area')
        .invoke('val', longText)
        .should('have.value', longText)
      })
      it('faz uma requisição HTTP', function() 
      {
          cy.request('https://cac-tat.s3.eu-central-1.amazonaws.com/index.html')
          .should(function(response)
          {
            const{status, statusText, body} = response
            expect (status).to.equal(200)
            expect (statusText).to.equal('OK')
            expect(body).to.include('CAC TAT')
          })
      })
      it('Encontre o easter cat', function() 
      {
          cy.get('#cat')
          .invoke('show')
          .should('be.visible')
          cy.get('#title')
          .invoke('text', 'CAT TAT')
      })
 })