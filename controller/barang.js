const barangModel = require("../models/barang");

const tambahkanDataBarang = async (req, res) => {
  const kode_barang = req.body.kode_barang;
  const nama_barang = req.body.nama_barang;
  const harga = req.body.harga;
  const stok = req.body.stok;
  const [cekBarang] = await barangModel.cekKodeBarang(kode_barang);
  if (cekBarang.length === 1) {
    res.status(400).json({
      status: 400,
      message: "Gunakan kode barang yang lain karena kode tersebut sudah digunakan",
      timestamp: new Date().toLocaleTimeString(),
    });
  } else {
    try {
      await barangModel.tambahkanDataBarang(kode_barang, nama_barang, harga, stok);
      res.status(201).json({
        status: 201,
        timestamp: new Date().toLocaleTimeString(),
        message: "Data barang sukses ditambahkan",
        barangBaru: {
          kode_barang,
          nama_barang,
          harga,
          stok,
        },
      });
    } catch (error) {
      res.status(500).json({
        status: 500,
        timestamp: new Date().toLocaleTimeString(),
        message: error,
      });
    }
  }
};

const tampilkanDataBarang = async (req, res) => {
  const query = req.query;
  let [dataBarang] = await barangModel.tampilkanDataBarang(query);
  if (dataBarang.length == 1) {
    dataBarang = dataBarang[0];
  }
  res.status(200).json({
    status: 200,
    timestamp: new Date().toLocaleTimeString(),
    message: "Ini adalah daftar barangnya",
    dataBarang,
  });
  try {
  } catch (error) {
    res.status(500).json({
      status: 500,
      timestamp: new Date().toLocaleTimeString(),
      message: error,
    });
  }
};

const updateDataBarang = async (req, res) => {
  const kode_barang = req.params.kode_barang;
  const body = req.body;
  try {
    await barangModel.updateDataBarang(body, kode_barang);
    res.status(200).json({
      status: 200,
      timestamp: new Date().toLocaleTimeString(),
      message: `Data barang berhasil diupdate`,
      data: body,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      timestamp: new Date().toLocaleTimeString(),
      message: error,
    });
  }
};

const hapusDataBarang = async (req, res) => {
  const { kode_barang } = req.params;
  try {
    await barangModel.hapusDataBarang(kode_barang);
    res.status(200).json({
      status: 200,
      timestamp: new Date().toLocaleTimeString(),
      message: `Data barang berhasil dihapus`,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      timestamp: new Date().toLocaleTimeString(),
      message: error,
    });
  }
};

module.exports = {
  tambahkanDataBarang,
  tampilkanDataBarang,
  updateDataBarang,
  hapusDataBarang,
};
