const db = require("../config/db");

const getSemuaPembeli = () => {
  const query = `SELECT table_pembeli.nama_pembeli, table_pembeli.alamat_pembeli, table_barang.nama_barang FROM table_pembeli JOIN table_barang ON table_pembeli.kode_barang = table_barang.kode_barang`;
  return db.execute(query);
};

const tambahkanDataPembeli = (kode_barang, nama_pembeli, alamat_pembeli) => {
  const query = `INSERT INTO table_pembeli (kode_barang, nama_pembeli, alamat_pembeli) VALUES ('${kode_barang}', '${nama_pembeli}', '${alamat_pembeli}')`;
  return db.execute(query);
};

module.exports = {
  getSemuaPembeli,
  tambahkanDataPembeli,
};
