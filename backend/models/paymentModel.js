const mongoose=require ('mongoose');


const paymentType={discriminatorKey:'paymentType',timestamps:true};

const basePaymentSchema=new mongoose.Schema({

payID:{type:String,unique: true},
amount:{type:Number,required:true},
payStatus:{type:String,enum:['Pending','Paid','Proceed To Validation','Free'],default:'Pending',required:true},





},paymentType);

basePaymentSchema.pre('save', async function (next) {
    const payment = this;
    if (!payment.isNew) return next();
  
    try {
      
      const lastPayment = await mongoose.model('payment').findOne().sort({ createdAt: -1 });
  
      let newId = 'P001';
      if (lastPayment && lastPayment.payID) {
        const lastIdNumber = parseInt(lastPayment.payID.substring(1)); 
        const nextIdNumber = lastIdNumber + 1; 
        newId = `P${nextIdNumber.toString().padStart(3, '0')}`; 
      }
  
      
      payment.payID = newId;
      next();
    } catch (error) {
      next(error);
    }
  });

const payment=mongoose.model('payment',basePaymentSchema);


//Cash Payments
const cashPaymentSchema=new mongoose.Schema({


  payeeName:{type:String,required:true},
  paySlip:{type:String,required:true},
  isValidated:{type:Boolean,default:false}
  
  
  
  })
  
  
  const cashPayment=payment.discriminator('cashPayment',cashPaymentSchema);
//Card payments
const cardPaymentSchema=new mongoose.Schema({


  cardHolderName:{type:String,required:true},
  
  
  
  
  })
  
  
  const cardPayment=payment.discriminator('cardPayment',cardPaymentSchema);
//Insuarance Claim
const insuaranceClaimSchema=new mongoose.Schema({

  //insuaranceProvider:{type:mongoose.Schema.Types.ObjectId,ref:'InsuaranceProvider',required:true},
  insuaranceProvider:{type:String,required:true},
  insuaranceDocuments:{type:String,required:true},
  isValidated:{type:Boolean,required:true,default:false}

  })
  const insuaranceClaim=payment.discriminator('insuaranceClaim',insuaranceClaimSchema);
//Free Channeling

const freeChannelSchema=new mongoose.Schema({


})


const freeChannel=payment.discriminator('freeChannel',freeChannelSchema);








module.exports={payment,cardPayment,cashPayment,freeChannel,insuaranceClaim};