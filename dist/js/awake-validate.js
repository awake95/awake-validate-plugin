class AwakeValidate {
  constructor ( selector, options ) {
    this.$form = document.querySelector( selector );
    if ( this.$form ) {
        this.$form.setAttribute('novalidate', '')
      this.$requiredElements = this.$form.querySelectorAll( '*[required=""]' );
    }
    this.$options = options;
    this.$errorsText = options.errorsText ?? false;
    this.isValid = false;
    this.$errors = [];
    this.#assign();
  }

  #assign () {
    if ( this.$form ) {
      this.submitHandler = this.submitHandler.bind( this );
      this.changeHandler = this.changeHandler.bind( this );
      this.inputHandler = this.inputHandler.bind( this );
      this.$form.addEventListener( 'submit', this.submitHandler );
      if ( this.$requiredElements ) {
        this.$requiredElements.forEach( input => {
            const spanErr = document.createElement('span');
            spanErr.classList.add('error');

            input.parentNode.insertBefore(spanErr, input.nextSibling);
          if ( input.type === 'checkbox' || input.type === 'radio' ) {
            input.addEventListener( 'change', this.changeHandler );
          } else {
            input.addEventListener( 'input', this.inputHandler );
          }
        } );
      }

    }
  }

  changeHandler ( e ) {

  }

  /**
   * Email validation helper
   * @param email
   * @returns {boolean}
   */
  validateEmail ( email ) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test( String( email ).toLowerCase() );
  }

  findErrorText(item) {
      let emptyText = false;
      let validateText = false;
      if (this.$errorsText) {
          const existError = this.$errorsText.find(el => el.name === item.name);

          if (existError) {
              validateText = existError.validateText ?? '';
              emptyText = existError.emptyText ?? 'This value shouldn\'t be empty';
          } else {
              emptyText = 'This value shouldn\'t be empty';

          }
      }

      if (item.validate) {
          return emptyText;
      }else {
          return validateText;
      }
  }

  checkValue ( name, value, target, type ) {
      let error = 0;
      let validate = true;
      switch ( type ) {
          case 'email':
              if (value && !this.validateEmail(value)) {
                  error++;
                  validate = false
              }

              if (!value && !this.validateEmail(value)) {
                  error++;
                  validate = true
              }
              break;
          case 'radio':
              if (!value.checked) {
                  error++;
                  validate = true
              }
          default:
              if (!value) {
                  error++;
                  validate = true
              }
      }

      let errors = {}

      if (error > 0 ) {
          errors =  {
              name: name,
              validate: validate
          }
      } else {
          errors = false;
      }

      if (errors && Object.keys(errors).length > 0) {
          if (this.$errors.length) {
              const err = this.$errors.find(item => item.name === errors.name);
              const err2 = this.$errors.find(item => item.name === errors.name && item.validate !== errors.validate);

              if ( !err ) {
                  this.$errors.push(errors);
                  if (!target.classList.contains('invalid')) {
                      target.classList.add('invalid')
                      let item = this.$errors.find(item => item.name === target.name);
                      const errText = this.findErrorText(item);
                      console.log('12');
                      if (errText) {
                          target.nextSibling.textContent = errText;
                      }
                  }
              }

              if (err2) {
                  this.$errors.find(item => {
                      if (item.name === errors.name && item.validate !== errors.validate) {
                          item.validate = errors.validate;
                          const errText = this.findErrorText(item);
                          if (errText) {
                              target.nextSibling.textContent = errText;
                          }
                      }
                  })
              }

          }else {
              this.$errors.push(errors);
              if (!target.classList.contains('invalid')) {
                  target.classList.add('invalid')

                  this.$errors.find(item => {
                      if (item.name === errors.name) {
                          item.validate = errors.validate;
                          const errText = this.findErrorText(item);
                          if (errText) {
                              target.nextSibling.textContent = errText;
                          }
                      }
                  })
              }
          }
      }

      if (!errors && this.$errors.length){
          const noErr = this.$errors.find(item => item.name === target.name);
          if (noErr) {
              const filtered = this.$errors.filter(item => item.name !== target.name);
              this.$errors = [...filtered];
              if (target.classList.contains('invalid')) {
                  target.classList.remove('invalid')
                  target.nextSibling.textContent = ''
              }
          }
      }

      console.log(this.$errors);

  }

  inputHandler ( e ) {
    let target = e.target;
    const { name, value, type } = target;
    this.checkValue( name, value, target, type );
  }

  submitHandler ( e ) {
    e.preventDefault();
    e.stopPropagation();

    if ( this.validate() ) {
        console.log('submit');
    }
  }

  validate () {
    let validated = false;

      if (this.$requiredElements){
          this.$requiredElements.forEach(elem => {
              this.checkValue(elem.name, elem.value, elem, elem.type);
          })
      }

      if (this.$errors.length === 0) {
          validated = true;
      }

    return validated;
  }

}

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJhd2FrZS12YWxpZGF0ZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJjbGFzcyBBd2FrZVZhbGlkYXRlIHtcbiAgY29uc3RydWN0b3IgKCBzZWxlY3Rvciwgb3B0aW9ucyApIHtcbiAgICB0aGlzLiRmb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvciggc2VsZWN0b3IgKTtcbiAgICBpZiAoIHRoaXMuJGZvcm0gKSB7XG4gICAgICAgIHRoaXMuJGZvcm0uc2V0QXR0cmlidXRlKCdub3ZhbGlkYXRlJywgJycpXG4gICAgICB0aGlzLiRyZXF1aXJlZEVsZW1lbnRzID0gdGhpcy4kZm9ybS5xdWVyeVNlbGVjdG9yQWxsKCAnKltyZXF1aXJlZD1cIlwiXScgKTtcbiAgICB9XG4gICAgdGhpcy4kb3B0aW9ucyA9IG9wdGlvbnM7XG4gICAgdGhpcy4kZXJyb3JzVGV4dCA9IG9wdGlvbnMuZXJyb3JzVGV4dCA/PyBmYWxzZTtcbiAgICB0aGlzLmlzVmFsaWQgPSBmYWxzZTtcbiAgICB0aGlzLiRlcnJvcnMgPSBbXTtcbiAgICB0aGlzLiNhc3NpZ24oKTtcbiAgfVxuXG4gICNhc3NpZ24gKCkge1xuICAgIGlmICggdGhpcy4kZm9ybSApIHtcbiAgICAgIHRoaXMuc3VibWl0SGFuZGxlciA9IHRoaXMuc3VibWl0SGFuZGxlci5iaW5kKCB0aGlzICk7XG4gICAgICB0aGlzLmNoYW5nZUhhbmRsZXIgPSB0aGlzLmNoYW5nZUhhbmRsZXIuYmluZCggdGhpcyApO1xuICAgICAgdGhpcy5pbnB1dEhhbmRsZXIgPSB0aGlzLmlucHV0SGFuZGxlci5iaW5kKCB0aGlzICk7XG4gICAgICB0aGlzLiRmb3JtLmFkZEV2ZW50TGlzdGVuZXIoICdzdWJtaXQnLCB0aGlzLnN1Ym1pdEhhbmRsZXIgKTtcbiAgICAgIGlmICggdGhpcy4kcmVxdWlyZWRFbGVtZW50cyApIHtcbiAgICAgICAgdGhpcy4kcmVxdWlyZWRFbGVtZW50cy5mb3JFYWNoKCBpbnB1dCA9PiB7XG4gICAgICAgICAgICBjb25zdCBzcGFuRXJyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgICAgICAgICAgc3BhbkVyci5jbGFzc0xpc3QuYWRkKCdlcnJvcicpO1xuXG4gICAgICAgICAgICBpbnB1dC5wYXJlbnROb2RlLmluc2VydEJlZm9yZShzcGFuRXJyLCBpbnB1dC5uZXh0U2libGluZyk7XG4gICAgICAgICAgaWYgKCBpbnB1dC50eXBlID09PSAnY2hlY2tib3gnIHx8IGlucHV0LnR5cGUgPT09ICdyYWRpbycgKSB7XG4gICAgICAgICAgICBpbnB1dC5hZGRFdmVudExpc3RlbmVyKCAnY2hhbmdlJywgdGhpcy5jaGFuZ2VIYW5kbGVyICk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlucHV0LmFkZEV2ZW50TGlzdGVuZXIoICdpbnB1dCcsIHRoaXMuaW5wdXRIYW5kbGVyICk7XG4gICAgICAgICAgfVxuICAgICAgICB9ICk7XG4gICAgICB9XG5cbiAgICB9XG4gIH1cblxuICBjaGFuZ2VIYW5kbGVyICggZSApIHtcblxuICB9XG5cbiAgLyoqXG4gICAqIEVtYWlsIHZhbGlkYXRpb24gaGVscGVyXG4gICAqIEBwYXJhbSBlbWFpbFxuICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICovXG4gIHZhbGlkYXRlRW1haWwgKCBlbWFpbCApIHtcbiAgICBjb25zdCByZSA9IC9eKChbXjw+KClbXFxdXFxcXC4sOzpcXHNAXCJdKyhcXC5bXjw+KClbXFxdXFxcXC4sOzpcXHNAXCJdKykqKXwoXCIuK1wiKSlAKChcXFtbMC05XXsxLDN9XFwuWzAtOV17MSwzfVxcLlswLTldezEsM31cXC5bMC05XXsxLDN9XFxdKXwoKFthLXpBLVpcXC0wLTldK1xcLikrW2EtekEtWl17Mix9KSkkLztcbiAgICByZXR1cm4gcmUudGVzdCggU3RyaW5nKCBlbWFpbCApLnRvTG93ZXJDYXNlKCkgKTtcbiAgfVxuXG4gIGZpbmRFcnJvclRleHQoaXRlbSkge1xuICAgICAgbGV0IGVtcHR5VGV4dCA9IGZhbHNlO1xuICAgICAgbGV0IHZhbGlkYXRlVGV4dCA9IGZhbHNlO1xuICAgICAgaWYgKHRoaXMuJGVycm9yc1RleHQpIHtcbiAgICAgICAgICBjb25zdCBleGlzdEVycm9yID0gdGhpcy4kZXJyb3JzVGV4dC5maW5kKGVsID0+IGVsLm5hbWUgPT09IGl0ZW0ubmFtZSk7XG5cbiAgICAgICAgICBpZiAoZXhpc3RFcnJvcikge1xuICAgICAgICAgICAgICB2YWxpZGF0ZVRleHQgPSBleGlzdEVycm9yLnZhbGlkYXRlVGV4dCA/PyAnJztcbiAgICAgICAgICAgICAgZW1wdHlUZXh0ID0gZXhpc3RFcnJvci5lbXB0eVRleHQgPz8gJ1RoaXMgdmFsdWUgc2hvdWxkblxcJ3QgYmUgZW1wdHknO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGVtcHR5VGV4dCA9ICdUaGlzIHZhbHVlIHNob3VsZG5cXCd0IGJlIGVtcHR5JztcblxuICAgICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKGl0ZW0udmFsaWRhdGUpIHtcbiAgICAgICAgICByZXR1cm4gZW1wdHlUZXh0O1xuICAgICAgfWVsc2Uge1xuICAgICAgICAgIHJldHVybiB2YWxpZGF0ZVRleHQ7XG4gICAgICB9XG4gIH1cblxuICBjaGVja1ZhbHVlICggbmFtZSwgdmFsdWUsIHRhcmdldCwgdHlwZSApIHtcbiAgICAgIGxldCBlcnJvciA9IDA7XG4gICAgICBsZXQgdmFsaWRhdGUgPSB0cnVlO1xuICAgICAgc3dpdGNoICggdHlwZSApIHtcbiAgICAgICAgICBjYXNlICdlbWFpbCc6XG4gICAgICAgICAgICAgIGlmICh2YWx1ZSAmJiAhdGhpcy52YWxpZGF0ZUVtYWlsKHZhbHVlKSkge1xuICAgICAgICAgICAgICAgICAgZXJyb3IrKztcbiAgICAgICAgICAgICAgICAgIHZhbGlkYXRlID0gZmFsc2VcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIGlmICghdmFsdWUgJiYgIXRoaXMudmFsaWRhdGVFbWFpbCh2YWx1ZSkpIHtcbiAgICAgICAgICAgICAgICAgIGVycm9yKys7XG4gICAgICAgICAgICAgICAgICB2YWxpZGF0ZSA9IHRydWVcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlICdyYWRpbyc6XG4gICAgICAgICAgICAgIGlmICghdmFsdWUuY2hlY2tlZCkge1xuICAgICAgICAgICAgICAgICAgZXJyb3IrKztcbiAgICAgICAgICAgICAgICAgIHZhbGlkYXRlID0gdHJ1ZVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgaWYgKCF2YWx1ZSkge1xuICAgICAgICAgICAgICAgICAgZXJyb3IrKztcbiAgICAgICAgICAgICAgICAgIHZhbGlkYXRlID0gdHJ1ZVxuICAgICAgICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGxldCBlcnJvcnMgPSB7fVxuXG4gICAgICBpZiAoZXJyb3IgPiAwICkge1xuICAgICAgICAgIGVycm9ycyA9ICB7XG4gICAgICAgICAgICAgIG5hbWU6IG5hbWUsXG4gICAgICAgICAgICAgIHZhbGlkYXRlOiB2YWxpZGF0ZVxuICAgICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZXJyb3JzID0gZmFsc2U7XG4gICAgICB9XG5cbiAgICAgIGlmIChlcnJvcnMgJiYgT2JqZWN0LmtleXMoZXJyb3JzKS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgaWYgKHRoaXMuJGVycm9ycy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgY29uc3QgZXJyID0gdGhpcy4kZXJyb3JzLmZpbmQoaXRlbSA9PiBpdGVtLm5hbWUgPT09IGVycm9ycy5uYW1lKTtcbiAgICAgICAgICAgICAgY29uc3QgZXJyMiA9IHRoaXMuJGVycm9ycy5maW5kKGl0ZW0gPT4gaXRlbS5uYW1lID09PSBlcnJvcnMubmFtZSAmJiBpdGVtLnZhbGlkYXRlICE9PSBlcnJvcnMudmFsaWRhdGUpO1xuXG4gICAgICAgICAgICAgIGlmICggIWVyciApIHtcbiAgICAgICAgICAgICAgICAgIHRoaXMuJGVycm9ycy5wdXNoKGVycm9ycyk7XG4gICAgICAgICAgICAgICAgICBpZiAoIXRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ2ludmFsaWQnKSkge1xuICAgICAgICAgICAgICAgICAgICAgIHRhcmdldC5jbGFzc0xpc3QuYWRkKCdpbnZhbGlkJylcbiAgICAgICAgICAgICAgICAgICAgICBsZXQgaXRlbSA9IHRoaXMuJGVycm9ycy5maW5kKGl0ZW0gPT4gaXRlbS5uYW1lID09PSB0YXJnZXQubmFtZSk7XG4gICAgICAgICAgICAgICAgICAgICAgY29uc3QgZXJyVGV4dCA9IHRoaXMuZmluZEVycm9yVGV4dChpdGVtKTtcbiAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnMTInKTtcbiAgICAgICAgICAgICAgICAgICAgICBpZiAoZXJyVGV4dCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICB0YXJnZXQubmV4dFNpYmxpbmcudGV4dENvbnRlbnQgPSBlcnJUZXh0O1xuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIGlmIChlcnIyKSB7XG4gICAgICAgICAgICAgICAgICB0aGlzLiRlcnJvcnMuZmluZChpdGVtID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICBpZiAoaXRlbS5uYW1lID09PSBlcnJvcnMubmFtZSAmJiBpdGVtLnZhbGlkYXRlICE9PSBlcnJvcnMudmFsaWRhdGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbS52YWxpZGF0ZSA9IGVycm9ycy52YWxpZGF0ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZXJyVGV4dCA9IHRoaXMuZmluZEVycm9yVGV4dChpdGVtKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGVyclRleHQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhcmdldC5uZXh0U2libGluZy50ZXh0Q29udGVudCA9IGVyclRleHQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICB9ZWxzZSB7XG4gICAgICAgICAgICAgIHRoaXMuJGVycm9ycy5wdXNoKGVycm9ycyk7XG4gICAgICAgICAgICAgIGlmICghdGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnaW52YWxpZCcpKSB7XG4gICAgICAgICAgICAgICAgICB0YXJnZXQuY2xhc3NMaXN0LmFkZCgnaW52YWxpZCcpXG5cbiAgICAgICAgICAgICAgICAgIHRoaXMuJGVycm9ycy5maW5kKGl0ZW0gPT4ge1xuICAgICAgICAgICAgICAgICAgICAgIGlmIChpdGVtLm5hbWUgPT09IGVycm9ycy5uYW1lKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0udmFsaWRhdGUgPSBlcnJvcnMudmFsaWRhdGU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGVyclRleHQgPSB0aGlzLmZpbmRFcnJvclRleHQoaXRlbSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChlcnJUZXh0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YXJnZXQubmV4dFNpYmxpbmcudGV4dENvbnRlbnQgPSBlcnJUZXh0O1xuICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKCFlcnJvcnMgJiYgdGhpcy4kZXJyb3JzLmxlbmd0aCl7XG4gICAgICAgICAgY29uc3Qgbm9FcnIgPSB0aGlzLiRlcnJvcnMuZmluZChpdGVtID0+IGl0ZW0ubmFtZSA9PT0gdGFyZ2V0Lm5hbWUpO1xuICAgICAgICAgIGlmIChub0Vycikge1xuICAgICAgICAgICAgICBjb25zdCBmaWx0ZXJlZCA9IHRoaXMuJGVycm9ycy5maWx0ZXIoaXRlbSA9PiBpdGVtLm5hbWUgIT09IHRhcmdldC5uYW1lKTtcbiAgICAgICAgICAgICAgdGhpcy4kZXJyb3JzID0gWy4uLmZpbHRlcmVkXTtcbiAgICAgICAgICAgICAgaWYgKHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ2ludmFsaWQnKSkge1xuICAgICAgICAgICAgICAgICAgdGFyZ2V0LmNsYXNzTGlzdC5yZW1vdmUoJ2ludmFsaWQnKVxuICAgICAgICAgICAgICAgICAgdGFyZ2V0Lm5leHRTaWJsaW5nLnRleHRDb250ZW50ID0gJydcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgY29uc29sZS5sb2codGhpcy4kZXJyb3JzKTtcblxuICB9XG5cbiAgaW5wdXRIYW5kbGVyICggZSApIHtcbiAgICBsZXQgdGFyZ2V0ID0gZS50YXJnZXQ7XG4gICAgY29uc3QgeyBuYW1lLCB2YWx1ZSwgdHlwZSB9ID0gdGFyZ2V0O1xuICAgIHRoaXMuY2hlY2tWYWx1ZSggbmFtZSwgdmFsdWUsIHRhcmdldCwgdHlwZSApO1xuICB9XG5cbiAgc3VibWl0SGFuZGxlciAoIGUgKSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG5cbiAgICBpZiAoIHRoaXMudmFsaWRhdGUoKSApIHtcbiAgICAgICAgY29uc29sZS5sb2coJ3N1Ym1pdCcpO1xuICAgIH1cbiAgfVxuXG4gIHZhbGlkYXRlICgpIHtcbiAgICBsZXQgdmFsaWRhdGVkID0gZmFsc2U7XG5cbiAgICAgIGlmICh0aGlzLiRyZXF1aXJlZEVsZW1lbnRzKXtcbiAgICAgICAgICB0aGlzLiRyZXF1aXJlZEVsZW1lbnRzLmZvckVhY2goZWxlbSA9PiB7XG4gICAgICAgICAgICAgIHRoaXMuY2hlY2tWYWx1ZShlbGVtLm5hbWUsIGVsZW0udmFsdWUsIGVsZW0sIGVsZW0udHlwZSk7XG4gICAgICAgICAgfSlcbiAgICAgIH1cblxuICAgICAgaWYgKHRoaXMuJGVycm9ycy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICB2YWxpZGF0ZWQgPSB0cnVlO1xuICAgICAgfVxuXG4gICAgcmV0dXJuIHZhbGlkYXRlZDtcbiAgfVxuXG59XG4iXSwiZmlsZSI6ImF3YWtlLXZhbGlkYXRlLmpzIn0=
