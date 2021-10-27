class AwakeValidate {
  constructor ( selector, options ) {
    this.$form = document.querySelector( selector );
    if ( this.$form ) {
      this.$requiredElements = this.$form.querySelectorAll( '*[required=""]' );
    }
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
          default:
              if (!value) {
                  error++;
                  validate = true
              }
      }

      if (error > 0 ) {
          return {
              errorCount: error,
              name: name,
              validate: validate
          }
      } else {
          return false;
      }


  }

  inputHandler ( e ) {
    let target = e.target;
    const { name, value, type } = target;

    const errors = this.checkValue( name, value, target, type );

    if (errors && Object.keys(errors).length > 0) {
        if (this.$errors.length) {
            const err = this.$errors.find(item => item.name === errors.name);
            const err2 = this.$errors.find(item => item.name === errors.name && item.validate !== errors.validate);

            if ( !err ) {
                this.$errors.push(errors);
                if (!target.classList.contains('invalid')) {
                    target.classList.add('invalid')
                }
            }

            if (err2) {
                this.$errors.find(item => {
                    if (item.name === errors.name && item.validate !== errors.validate) {
                        item.validate = errors.validate;
                    }
                })
            }

        }else {
            this.$errors.push(errors);
            if (!target.classList.contains('invalid')) {
                target.classList.add('invalid')
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
            }
        }
    }

      console.log(this.$errors);

  }

  submitHandler ( e ) {
    e.preventDefault();
    e.stopPropagation();
    if ( this.validate() ) {
      this.isValid = true;
    }
  }

  validate () {
    let validated = true;

    return validated;
  }

}

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJhd2FrZS12YWxpZGF0ZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJjbGFzcyBBd2FrZVZhbGlkYXRlIHtcclxuICBjb25zdHJ1Y3RvciAoIHNlbGVjdG9yLCBvcHRpb25zICkge1xyXG4gICAgdGhpcy4kZm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoIHNlbGVjdG9yICk7XHJcbiAgICBpZiAoIHRoaXMuJGZvcm0gKSB7XHJcbiAgICAgIHRoaXMuJHJlcXVpcmVkRWxlbWVudHMgPSB0aGlzLiRmb3JtLnF1ZXJ5U2VsZWN0b3JBbGwoICcqW3JlcXVpcmVkPVwiXCJdJyApO1xyXG4gICAgfVxyXG4gICAgdGhpcy5pc1ZhbGlkID0gZmFsc2U7XHJcbiAgICB0aGlzLiRlcnJvcnMgPSBbXTtcclxuICAgIHRoaXMuI2Fzc2lnbigpO1xyXG4gIH1cclxuXHJcbiAgI2Fzc2lnbiAoKSB7XHJcbiAgICBpZiAoIHRoaXMuJGZvcm0gKSB7XHJcbiAgICAgIHRoaXMuc3VibWl0SGFuZGxlciA9IHRoaXMuc3VibWl0SGFuZGxlci5iaW5kKCB0aGlzICk7XHJcbiAgICAgIHRoaXMuY2hhbmdlSGFuZGxlciA9IHRoaXMuY2hhbmdlSGFuZGxlci5iaW5kKCB0aGlzICk7XHJcbiAgICAgIHRoaXMuaW5wdXRIYW5kbGVyID0gdGhpcy5pbnB1dEhhbmRsZXIuYmluZCggdGhpcyApO1xyXG4gICAgICB0aGlzLiRmb3JtLmFkZEV2ZW50TGlzdGVuZXIoICdzdWJtaXQnLCB0aGlzLnN1Ym1pdEhhbmRsZXIgKTtcclxuICAgICAgaWYgKCB0aGlzLiRyZXF1aXJlZEVsZW1lbnRzICkge1xyXG4gICAgICAgIHRoaXMuJHJlcXVpcmVkRWxlbWVudHMuZm9yRWFjaCggaW5wdXQgPT4ge1xyXG4gICAgICAgICAgaWYgKCBpbnB1dC50eXBlID09PSAnY2hlY2tib3gnIHx8IGlucHV0LnR5cGUgPT09ICdyYWRpbycgKSB7XHJcbiAgICAgICAgICAgIGlucHV0LmFkZEV2ZW50TGlzdGVuZXIoICdjaGFuZ2UnLCB0aGlzLmNoYW5nZUhhbmRsZXIgKTtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGlucHV0LmFkZEV2ZW50TGlzdGVuZXIoICdpbnB1dCcsIHRoaXMuaW5wdXRIYW5kbGVyICk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSApO1xyXG4gICAgICB9XHJcblxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgY2hhbmdlSGFuZGxlciAoIGUgKSB7XHJcblxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogRW1haWwgdmFsaWRhdGlvbiBoZWxwZXJcclxuICAgKiBAcGFyYW0gZW1haWxcclxuICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cclxuICAgKi9cclxuICB2YWxpZGF0ZUVtYWlsICggZW1haWwgKSB7XHJcbiAgICBjb25zdCByZSA9IC9eKChbXjw+KClbXFxdXFxcXC4sOzpcXHNAXCJdKyhcXC5bXjw+KClbXFxdXFxcXC4sOzpcXHNAXCJdKykqKXwoXCIuK1wiKSlAKChcXFtbMC05XXsxLDN9XFwuWzAtOV17MSwzfVxcLlswLTldezEsM31cXC5bMC05XXsxLDN9XFxdKXwoKFthLXpBLVpcXC0wLTldK1xcLikrW2EtekEtWl17Mix9KSkkLztcclxuICAgIHJldHVybiByZS50ZXN0KCBTdHJpbmcoIGVtYWlsICkudG9Mb3dlckNhc2UoKSApO1xyXG4gIH1cclxuXHJcbiAgY2hlY2tWYWx1ZSAoIG5hbWUsIHZhbHVlLCB0YXJnZXQsIHR5cGUgKSB7XHJcbiAgICAgIGxldCBlcnJvciA9IDA7XHJcbiAgICAgIGxldCB2YWxpZGF0ZSA9IHRydWU7XHJcbiAgICAgIHN3aXRjaCAoIHR5cGUgKSB7XHJcbiAgICAgICAgICBjYXNlICdlbWFpbCc6XHJcbiAgICAgICAgICAgICAgaWYgKHZhbHVlICYmICF0aGlzLnZhbGlkYXRlRW1haWwodmFsdWUpKSB7XHJcbiAgICAgICAgICAgICAgICAgIGVycm9yKys7XHJcbiAgICAgICAgICAgICAgICAgIHZhbGlkYXRlID0gZmFsc2VcclxuICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgIGlmICghdmFsdWUgJiYgIXRoaXMudmFsaWRhdGVFbWFpbCh2YWx1ZSkpIHtcclxuICAgICAgICAgICAgICAgICAgZXJyb3IrKztcclxuICAgICAgICAgICAgICAgICAgdmFsaWRhdGUgPSB0cnVlXHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICBpZiAoIXZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICAgIGVycm9yKys7XHJcbiAgICAgICAgICAgICAgICAgIHZhbGlkYXRlID0gdHJ1ZVxyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKGVycm9yID4gMCApIHtcclxuICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgZXJyb3JDb3VudDogZXJyb3IsXHJcbiAgICAgICAgICAgICAgbmFtZTogbmFtZSxcclxuICAgICAgICAgICAgICB2YWxpZGF0ZTogdmFsaWRhdGVcclxuICAgICAgICAgIH1cclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgfVxyXG5cclxuXHJcbiAgfVxyXG5cclxuICBpbnB1dEhhbmRsZXIgKCBlICkge1xyXG4gICAgbGV0IHRhcmdldCA9IGUudGFyZ2V0O1xyXG4gICAgY29uc3QgeyBuYW1lLCB2YWx1ZSwgdHlwZSB9ID0gdGFyZ2V0O1xyXG5cclxuICAgIGNvbnN0IGVycm9ycyA9IHRoaXMuY2hlY2tWYWx1ZSggbmFtZSwgdmFsdWUsIHRhcmdldCwgdHlwZSApO1xyXG5cclxuICAgIGlmIChlcnJvcnMgJiYgT2JqZWN0LmtleXMoZXJyb3JzKS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuJGVycm9ycy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgY29uc3QgZXJyID0gdGhpcy4kZXJyb3JzLmZpbmQoaXRlbSA9PiBpdGVtLm5hbWUgPT09IGVycm9ycy5uYW1lKTtcclxuICAgICAgICAgICAgY29uc3QgZXJyMiA9IHRoaXMuJGVycm9ycy5maW5kKGl0ZW0gPT4gaXRlbS5uYW1lID09PSBlcnJvcnMubmFtZSAmJiBpdGVtLnZhbGlkYXRlICE9PSBlcnJvcnMudmFsaWRhdGUpO1xyXG5cclxuICAgICAgICAgICAgaWYgKCAhZXJyICkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy4kZXJyb3JzLnB1c2goZXJyb3JzKTtcclxuICAgICAgICAgICAgICAgIGlmICghdGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnaW52YWxpZCcpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGFyZ2V0LmNsYXNzTGlzdC5hZGQoJ2ludmFsaWQnKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoZXJyMikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy4kZXJyb3JzLmZpbmQoaXRlbSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGl0ZW0ubmFtZSA9PT0gZXJyb3JzLm5hbWUgJiYgaXRlbS52YWxpZGF0ZSAhPT0gZXJyb3JzLnZhbGlkYXRlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0udmFsaWRhdGUgPSBlcnJvcnMudmFsaWRhdGU7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9ZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuJGVycm9ycy5wdXNoKGVycm9ycyk7XHJcbiAgICAgICAgICAgIGlmICghdGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnaW52YWxpZCcpKSB7XHJcbiAgICAgICAgICAgICAgICB0YXJnZXQuY2xhc3NMaXN0LmFkZCgnaW52YWxpZCcpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKCFlcnJvcnMgJiYgdGhpcy4kZXJyb3JzLmxlbmd0aCl7XHJcbiAgICAgICAgY29uc3Qgbm9FcnIgPSB0aGlzLiRlcnJvcnMuZmluZChpdGVtID0+IGl0ZW0ubmFtZSA9PT0gdGFyZ2V0Lm5hbWUpO1xyXG4gICAgICAgIGlmIChub0Vycikge1xyXG4gICAgICAgICAgICBjb25zdCBmaWx0ZXJlZCA9IHRoaXMuJGVycm9ycy5maWx0ZXIoaXRlbSA9PiBpdGVtLm5hbWUgIT09IHRhcmdldC5uYW1lKTtcclxuICAgICAgICAgICAgdGhpcy4kZXJyb3JzID0gWy4uLmZpbHRlcmVkXTtcclxuICAgICAgICAgICAgaWYgKHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ2ludmFsaWQnKSkge1xyXG4gICAgICAgICAgICAgICAgdGFyZ2V0LmNsYXNzTGlzdC5yZW1vdmUoJ2ludmFsaWQnKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgICAgY29uc29sZS5sb2codGhpcy4kZXJyb3JzKTtcclxuXHJcbiAgfVxyXG5cclxuICBzdWJtaXRIYW5kbGVyICggZSApIHtcclxuICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICBpZiAoIHRoaXMudmFsaWRhdGUoKSApIHtcclxuICAgICAgdGhpcy5pc1ZhbGlkID0gdHJ1ZTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHZhbGlkYXRlICgpIHtcclxuICAgIGxldCB2YWxpZGF0ZWQgPSB0cnVlO1xyXG5cclxuICAgIHJldHVybiB2YWxpZGF0ZWQ7XHJcbiAgfVxyXG5cclxufVxyXG4iXSwiZmlsZSI6ImF3YWtlLXZhbGlkYXRlLmpzIn0=
