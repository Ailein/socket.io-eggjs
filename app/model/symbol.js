module.exports = app => {
  const mongoose = app.mongoose;
  const SymbolSchema = new mongoose.Schema({

    name: {type: String},    //
  	description: {type: String},   //
  	symbol: {type: String},   //
  	status: {type: String},   //
  	fund_manager: {type: String},   //
  	ipo_date: {type: String},   //
  	cname:{type: String},  //中文名字
  	ename:{type:String},  //英文名字
  	unit:{type:String}  //钱包单位

  });

  return mongoose.model('Symbol', SymbolSchema);
}
