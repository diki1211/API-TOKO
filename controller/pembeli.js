const pembeliModel = require("../models/pembeli");

const getSemuaPembeli = async (req, res) => {
  try {
    const [pembeli] = await pembeliModel.getSemuaPembeli();
    res.status(200).json({
      status: 200,
      message: "Ini adalah data dari para pembeli",
      timestamp: new Date().toLocaleTimeString(),
      pembeli,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: error,
      timestamp: new Date().toLocaleTimeString(),
    });
  }
};

const tambahkanDataPembeli = async (req, res) => {
  const kode_barang = req.body.kode_barang;
  const nama_pembeli = req.body.nama_pembeli;
  const alamat_pembeli = req.body.alamat_pembeli;
  try {
    await pembeliModel.tambahkanDataPembeli(kode_barang, nama_pembeli, alamat_pembeli);
    res.status(201).json({
      status: 201,
      message: "Data dari pembeli sukses ditambahkan",
      timestamp: new Date().toLocaleTimeString(),
      data: {
        kode_barang,
        nama_pembeli,
        alamat_pembeli,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: error,
      timestamp: new Date().toLocaleTimeString(),
    });
  }
};

module.exports = {
  getSemuaPembeli,
  tambahkanDataPembeli,
};
