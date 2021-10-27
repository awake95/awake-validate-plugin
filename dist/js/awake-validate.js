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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJhd2FrZS12YWxpZGF0ZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJjbGFzcyBBd2FrZVZhbGlkYXRlIHtcbiAgICBjb25zdHJ1Y3RvcihzZWxlY3Rvciwgb3B0aW9ucykge1xuICAgICAgICB0aGlzLiRmb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihzZWxlY3Rvcik7XG4gICAgICAgIGlmICh0aGlzLiRmb3JtKSB7XG4gICAgICAgICAgICB0aGlzLiRpbnB1dHMgPSB0aGlzLiRmb3JtLnF1ZXJ5U2VsZWN0b3JBbGwoJypbcmVxdWlyZWQ9XCJcIl0nKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmlzVmFsaWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy4kZXJyb3JzID0gW107XG4gICAgICAgIHRoaXMuI2Fzc2lnbigpO1xuICAgIH1cblxuICAgICNhc3NpZ24oKSB7XG4gICAgICAgIGlmICh0aGlzLiRmb3JtKSB7XG4gICAgICAgICAgICB0aGlzLnN1Ym1pdEhhbmRsZXIgPSB0aGlzLnN1Ym1pdEhhbmRsZXIuYmluZCh0aGlzKTtcbiAgICAgICAgICAgIHRoaXMuY2hhbmdlSGFuZGxlciA9IHRoaXMuY2hhbmdlSGFuZGxlci5iaW5kKHRoaXMpO1xuICAgICAgICAgICAgdGhpcy5pbnB1dEhhbmRsZXIgPSB0aGlzLmlucHV0SGFuZGxlci5iaW5kKHRoaXMpO1xuICAgICAgICAgICAgdGhpcy4kZm9ybS5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCB0aGlzLnN1Ym1pdEhhbmRsZXIpXG4gICAgICAgICAgICB0aGlzLiRpbnB1dHMuZm9yRWFjaChpbnB1dCA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGlucHV0LnR5cGUgPT09ICdjaGVja2JveCcgfHwgaW5wdXQudHlwZSA9PT0gJ3JhZGlvJykge1xuICAgICAgICAgICAgICAgICAgICBpbnB1dC5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCB0aGlzLmNoYW5nZUhhbmRsZXIpXG4gICAgICAgICAgICAgICAgfWVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBpbnB1dC5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsIHRoaXMuaW5wdXRIYW5kbGVyKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjaGFuZ2VIYW5kbGVyKGUpIHtcblxuICAgIH1cblxuICAgIGlucHV0SGFuZGxlcihlKSB7XG4gICAgICAgIGxldCB0YXJnZXQgPSBlLnRhcmdldDtcbiAgICAgICAgY29uc3Qge25hbWUsIHZhbHVlLCB0eXBlfSA9IHRhcmdldDtcblxuICAgICAgICBpZiAoIXZhbHVlKSB7XG4gICAgICAgICAgICB0aGlzLiRlcnJvcnMucHVzaCh7XG4gICAgICAgICAgICAgICAgbmFtZTogbmFtZSxcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1lbHNlIHtcbiAgICAgICAgICAgIGNvbnN0IHJlbW92ZUVycm9ycyA9IHRoaXMuJGVycm9ycy5maWx0ZXIoaXRlbSA9PiBpdGVtLm5hbWUgIT09IG5hbWUpO1xuICAgICAgICAgICAgdGhpcy4kZXJyb3JzID0gWyAuLi5yZW1vdmVFcnJvcnNdO1xuICAgICAgICAgICAgdGFyZ2V0Lm5leHRFbGVtZW50U2libGluZy5yZW1vdmUoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGV4aXN0TmFtZSA9IHRoaXMuJGVycm9ycy5maW5kKGl0ZW0gPT4gaXRlbS5uYW1lID09PSBuYW1lKTtcblxuICAgICAgICBpZiAoZXhpc3ROYW1lKSB7XG4gICAgICAgICAgICBjb25zdCBlcnIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgICAgICAgICBlcnIuY2xhc3NMaXN0LmFkZCgnZXJyb3InKTtcbiAgICAgICAgICAgIGVyci50ZXh0Q29udGVudCA9IGAke25hbWV9IGlzIHJlcXVpcmVkIGZpZWxkIGFuZCBzaG91bGQgbm90IGJlIGVtcHR5YDtcbiAgICAgICAgICAgIHRhcmdldC5wYXJlbnROb2RlLmluc2VydEJlZm9yZShlcnIsIHRhcmdldC5uZXh0U2libGluZyk7XG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIHN1Ym1pdEhhbmRsZXIoZSkge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIGlmICh0aGlzLnZhbGlkYXRlKCkpIHtcbiAgICAgICAgICAgIHRoaXMuaXNWYWxpZCA9IHRydWU7XG4gICAgICAgIH1cbiAgICB9XG5cblxuXG4gICAgdmFsaWRhdGUoKSB7XG4gICAgICAgIGxldCB2YWxpZGF0ZWQgPSB0cnVlO1xuXG5cblxuICAgICAgICByZXR1cm4gdmFsaWRhdGVkO1xuICAgIH1cblxuXG59XG4iXSwiZmlsZSI6ImF3YWtlLXZhbGlkYXRlLmpzIn0=
