class CommonFun{
    parseAddressError(error){
        let new_errors = {};
        if(error.code = "ADDRESS_VALIDATION_ERROR"){
            error.validations.forEach(v=>{
                if (['street1','city','state','zip','country', 'name', 'phone'].includes(v.field)){
                    new_errors[v.field] = v.message;
                } else{
                    new_errors['street1'] = v.message;
                }
            });
            return new_errors;
        }else{
            return {};
        }
    }
}

const commonFun = new CommonFun();
export default commonFun;