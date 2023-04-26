const db = require("../config/db");

const tambahkanDataBarang = (kode_barang, nama_barang, harga, stok) => {
  const query = `INSERT INTO table_barang (kode_barang, nama_barang, harga, stok) 
                    VALUES ('${kode_barang}', '${nama_barang}', ${harga}, '${stok}')`;
  return db.execute(query);
};

const cekKodeBarang = (kode_barang) => {
  const query = `SELECT * FROM table_barang WHERE kode_barang='${kode_barang}'`;
  return db.execute(query);
};

const tampilkanDataBarang = (bodyQuery) => {
  const params = Object.keys(bodyQuery);
  if (params.length == 0) {
    const query = `SELECT kode_barang, nama_barang, harga, stok FROM table_barang`;
    return db.execute(query);
  } else {
    let param = "";
    params.forEach((par) => {
      param += `${par}='${bodyQuery[par]}' AND `;
    });
    param = param.substring(0, param.length - 5);
    const query = `SELECT table_barang.kode_barang, table_barang.nama_barang, table_barang.harga, table_barang.stok FROM table_barang WHERE ${param}`;
    return db.execute(query);
  }
};

const updateDataBarang = (body, kode_barang) => {
  let queryForUpdate = "";
  const params = Object.keys(body);
  params.forEach((param) => {
    queryForUpdate += `${param}='${body[param]}', `;
  });
  queryForUpdate = queryForUpdate.substring(0, queryForUpdate.length - 2);
  const query = `UPDATE table_barang
                SET ${queryForUpdate}
                WHERE kode_barang='${kode_barang}'`;
  return db.execute(query);
};

const hapusDataBarang = (kode_barang) => {
  const query = `DELETE FROM table_barang WHERE kode_barang='${kode_barang}'`;
  return db.execute(query);
};

module.exports = {
  tambahkanDataBarang,
  cekKodeBarang,
  tampilkanDataBarang,
  updateDataBarang,
  hapusDataBarang,
};
