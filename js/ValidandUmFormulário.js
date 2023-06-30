class ValidandoForm {
    constructor() {
        this.formulario = document.querySelector('.formulario');
        this.eventos();
    }

    eventos(){
        this.formulario.addEventListener('submit', e =>{
            this.handleSubmit(e)
            

        });
    }


    handleSubmit(e) {
        e.preventDefault();
        const camposValidos = this.camposValidos();
        const senhasValidas = this.senhasValidas();

        if(camposValidos && senhasValidas){
            alert('Formulário de cadastro enviado com sucesso!');
            this.formulario.submit();
        }
    }

    senhasValidas() {
        let valido = true
        const senha = this.formulario.querySelector('.senha');
        const repetirSenha = this.formulario.querySelector('.repetirSenha');

        if(senha.value !== repetirSenha.value){
            valido = false;
            this.criaErro(senha,'As senhas precisam ser iguais!' );
            this.criaErro(repetirSenha,'As senhas precisam ser iguais!' );
        }

        if(senha.value.length < 6 || senha.value.length > 12){
            valido = false;
            this.criaErro(senha, 'Senha precisa ter entre 6 e 12 caracteres!');
            
        }


        return valido
    }

    camposValidos() {
        let valido = true;

        for(let erroText of this.formulario.querySelectorAll('.erro-text')){
            erroText.remove();
        }

        for(let campo of this.formulario.querySelectorAll('.validar')){
            const label = campo.previousElementSibling.innerText;

            if(!campo.value){
                this.criaErro(campo, `Campo "${label}" não pode estar vazio!`);
                valido = false;
            }

            if(campo.classList.contains('cpf')) {
                if(!this.validaCPF(campo)) valido = false;
            }

            if(campo.classList.contains('usuario')) {
                if(!this.validaUser(campo)) valido = false;

            }
        }

        return valido

    }

    validaCPF(campo) {
        const cpf = new ValidaCPF(campo.value);

        if(!cpf.valida()) {
            this.criaErro(campo, 'CPF inválido!');
            return false;
        }

        return true
    }

    validaUser(campo) {
        const userName = campo.value;
        let valido = true;
        if(userName.length < 3 || userName.length > 12){
            this.criaErro(campo, 'O usuário deve estar entre 3 á 12 carcteres!');
            valido = false;
        }
        if(!userName.match(/^[a-zA-Z0-9]+$/g)){
            this.criaErro(campo, 'Apenas números e letras são permitidos!');
            valido = false;
        }
        return valido;
    }

    criaErro(campo, msg){
        const div = document.createElement('div');
        div.innerHTML = msg;
        div.classList.add('erro-text');
        campo.insertAdjacentElement('afterend', div);
    }

}

const valida = new ValidandoForm();