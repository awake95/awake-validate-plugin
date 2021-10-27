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

    checkValue(value, target, name) {
        if (!value) {
            this.$errors.push({
                name: name,
            })
        } else {
            const removeErrors = this.$errors.filter(item => item.name !== name);
            this.$errors = [ ...removeErrors];

            if (target.nextElementSibling) {
                target.nextElementSibling.remove();
            }

        }

        const existName = this.$errors.find(item => item.name === name);

        if (existName) {
            const err = document.createElement('span');
            err.classList.add('error');
            const nameText = target.parentNode.querySelector('label').textContent;
            err.textContent = `${nameText} is required field and should not be empty`;
            target.parentNode.insertBefore(err, target.nextSibling);
        }
    }

    inputHandler(e) {
        let target = e.target;
        const {name, value, type} = target;

        this.checkValue(value, target, name);

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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJhd2FrZS12YWxpZGF0ZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJjbGFzcyBBd2FrZVZhbGlkYXRlIHtcbiAgICBjb25zdHJ1Y3RvcihzZWxlY3Rvciwgb3B0aW9ucykge1xuICAgICAgICB0aGlzLiRmb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihzZWxlY3Rvcik7XG4gICAgICAgIGlmICh0aGlzLiRmb3JtKSB7XG4gICAgICAgICAgICB0aGlzLiRpbnB1dHMgPSB0aGlzLiRmb3JtLnF1ZXJ5U2VsZWN0b3JBbGwoJypbcmVxdWlyZWQ9XCJcIl0nKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmlzVmFsaWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy4kZXJyb3JzID0gW107XG4gICAgICAgIHRoaXMuI2Fzc2lnbigpO1xuICAgIH1cblxuICAgICNhc3NpZ24oKSB7XG4gICAgICAgIGlmICh0aGlzLiRmb3JtKSB7XG4gICAgICAgICAgICB0aGlzLnN1Ym1pdEhhbmRsZXIgPSB0aGlzLnN1Ym1pdEhhbmRsZXIuYmluZCh0aGlzKTtcbiAgICAgICAgICAgIHRoaXMuY2hhbmdlSGFuZGxlciA9IHRoaXMuY2hhbmdlSGFuZGxlci5iaW5kKHRoaXMpO1xuICAgICAgICAgICAgdGhpcy5pbnB1dEhhbmRsZXIgPSB0aGlzLmlucHV0SGFuZGxlci5iaW5kKHRoaXMpO1xuICAgICAgICAgICAgdGhpcy4kZm9ybS5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCB0aGlzLnN1Ym1pdEhhbmRsZXIpXG4gICAgICAgICAgICB0aGlzLiRpbnB1dHMuZm9yRWFjaChpbnB1dCA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGlucHV0LnR5cGUgPT09ICdjaGVja2JveCcgfHwgaW5wdXQudHlwZSA9PT0gJ3JhZGlvJykge1xuICAgICAgICAgICAgICAgICAgICBpbnB1dC5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCB0aGlzLmNoYW5nZUhhbmRsZXIpXG4gICAgICAgICAgICAgICAgfWVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBpbnB1dC5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsIHRoaXMuaW5wdXRIYW5kbGVyKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjaGFuZ2VIYW5kbGVyKGUpIHtcblxuICAgIH1cblxuICAgIGNoZWNrVmFsdWUodmFsdWUsIHRhcmdldCwgbmFtZSkge1xuICAgICAgICBpZiAoIXZhbHVlKSB7XG4gICAgICAgICAgICB0aGlzLiRlcnJvcnMucHVzaCh7XG4gICAgICAgICAgICAgICAgbmFtZTogbmFtZSxcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zdCByZW1vdmVFcnJvcnMgPSB0aGlzLiRlcnJvcnMuZmlsdGVyKGl0ZW0gPT4gaXRlbS5uYW1lICE9PSBuYW1lKTtcbiAgICAgICAgICAgIHRoaXMuJGVycm9ycyA9IFsgLi4ucmVtb3ZlRXJyb3JzXTtcblxuICAgICAgICAgICAgaWYgKHRhcmdldC5uZXh0RWxlbWVudFNpYmxpbmcpIHtcbiAgICAgICAgICAgICAgICB0YXJnZXQubmV4dEVsZW1lbnRTaWJsaW5nLnJlbW92ZSgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBleGlzdE5hbWUgPSB0aGlzLiRlcnJvcnMuZmluZChpdGVtID0+IGl0ZW0ubmFtZSA9PT0gbmFtZSk7XG5cbiAgICAgICAgaWYgKGV4aXN0TmFtZSkge1xuICAgICAgICAgICAgY29uc3QgZXJyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgICAgICAgICAgZXJyLmNsYXNzTGlzdC5hZGQoJ2Vycm9yJyk7XG4gICAgICAgICAgICBjb25zdCBuYW1lVGV4dCA9IHRhcmdldC5wYXJlbnROb2RlLnF1ZXJ5U2VsZWN0b3IoJ2xhYmVsJykudGV4dENvbnRlbnQ7XG4gICAgICAgICAgICBlcnIudGV4dENvbnRlbnQgPSBgJHtuYW1lVGV4dH0gaXMgcmVxdWlyZWQgZmllbGQgYW5kIHNob3VsZCBub3QgYmUgZW1wdHlgO1xuICAgICAgICAgICAgdGFyZ2V0LnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKGVyciwgdGFyZ2V0Lm5leHRTaWJsaW5nKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGlucHV0SGFuZGxlcihlKSB7XG4gICAgICAgIGxldCB0YXJnZXQgPSBlLnRhcmdldDtcbiAgICAgICAgY29uc3Qge25hbWUsIHZhbHVlLCB0eXBlfSA9IHRhcmdldDtcblxuICAgICAgICB0aGlzLmNoZWNrVmFsdWUodmFsdWUsIHRhcmdldCwgbmFtZSk7XG5cbiAgICB9XG5cbiAgICBzdWJtaXRIYW5kbGVyKGUpIHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICBpZiAodGhpcy52YWxpZGF0ZSgpKSB7XG4gICAgICAgICAgICB0aGlzLmlzVmFsaWQgPSB0cnVlO1xuICAgICAgICB9XG4gICAgfVxuXG5cblxuICAgIHZhbGlkYXRlKCkge1xuICAgICAgICBsZXQgdmFsaWRhdGVkID0gdHJ1ZTtcblxuXG5cbiAgICAgICAgcmV0dXJuIHZhbGlkYXRlZDtcbiAgICB9XG5cblxufVxuIl0sImZpbGUiOiJhd2FrZS12YWxpZGF0ZS5qcyJ9
