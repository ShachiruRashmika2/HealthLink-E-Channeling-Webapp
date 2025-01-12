const mongoose=require('mongoose');


const insuaranceProviderSchema=new mongoose.Schema({

    providerCompanyName:{type:String,required:true},
    ProviderEmail:{type:String,required:true}




})


const insuaranceProvider=mongoose.model('InsuaranceProvider',insuaranceProviderSchema);
module.exports=insuaranceProvider;