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
