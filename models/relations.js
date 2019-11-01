module.exports = (db) => {

  db.user.hasMany(db.invoice,{foreignKey : "userId"});
  db.invoice.belongsTo(db.user,{foreignKey : "userId"});





  return db;
};