class ValidateTool {
    constructor() {
        this.type = {
            "NAME": "name",
            "PHONE":'phone',
            "EMAIL":'email',
            "USERNAME":'username',
            "PASSWORD":'password'
        }

        this.config = {
            'name': [
                this.lengthFilter('Name', 1, 200)
            ],
            'phone': [
                this.regexFilter('Phone number',/^((\(\d{3}\) ?)|(\d{3}-?))?\d{3}-?\d{4}$/)
            ],
            'email' : [
                this.regexFilter('Email',/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
            ],
            'username':[
                this.lengthFilter('Username', 1, 50)
            ],
            'password':[
                this.lengthFilter("Password",8,50)
            ]
        }

    }

    lengthFilter(key, min, max) {
        return function (val, error) {
            if (val.length < min || val.length > max) {
                if(val.length == 0 && min > 0){
                    error.push(key + " can't be empty");
                }else{
                    error.push(key + " must have " + min + "-" + max + " character");
                }
                return false;
            }
            return true;
        }
    }


    regexFilter(key, regex, str){
        return function(val,error){
            if(!val.match(regex)){
                if(str){
                    error.push(str);
                }else{
                    error.push("Please input correct " + key);
                }
                return false;
            }
            return true;
        }
    }

    validate(type, value, error) {
        let funArr = this.config[type];
        let res = true;
        funArr.forEach(function(fun){
            if(!fun(value,error)){
                res = false;
            }
        })
        return res;
    }
}

const  validateTool = new ValidateTool();
export default validateTool;

