const formValidate = new AwakeValidate('#test-form', {
    errorsText: [
        {
            name: 'email',
            validateText: 'Email is invalid'
        }
    ]
})

console.log(formValidate.isValid);
