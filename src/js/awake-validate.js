class AwakeValidate {
    constructor(selector, options) {
        this.$form = document.querySelector(selector);
        if (this.$form) {
            this.$inputs = this.$form.querySelectorAll('*[required=""]');
        }
        this.isValid = false;
        this.$errors = [];
        this.#assign();
    }

    #assign() {
        if (this.$form) {
            this.submitHandler = this.submitHandler.bind(this);
            this.changeHandler = this.changeHandler.bind(this);
            this.inputHandler = this.inputHandler.bind(this);
            this.$form.addEventListener('submit', this.submitHandler)
            this.$inputs.forEach(input => {
                if (input.type === 'checkbox' || input.type === 'radio') {
                    input.addEventListener('change', this.changeHandler)
                }else {
                    input.addEventListener('input', this.inputHandler)
                }
            })
        }
    }

    changeHandler(e) {

    }

    inputHandler(e) {
        let target = e.target;
        const {name, value, type} = target;

        if (!value) {
            this.$errors.push({
                name: name,
            })
        }else {
            const removeErrors = this.$errors.filter(item => item.name !== name);
            this.$errors = [ ...removeErrors];
            target.nextElementSibling.remove();
        }

        const existName = this.$errors.find(item => item.name === name);

        if (existName) {
            const err = document.createElement('span');
            err.classList.add('error');
            err.textContent = `${name} is required field and should not be empty`;
            target.parentNode.insertBefore(err, target.nextSibling);
        }

    }

    submitHandler(e) {
        e.preventDefault();
        e.stopPropagation();
        if (this.validate()) {
            this.isValid = true;
        }
    }



    validate() {
        let validated = true;



        return validated;
    }


}
