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
