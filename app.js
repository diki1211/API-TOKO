require("dotenv").config();
const userController = require("./controller/user");
const barangController = require("./controller/barang");
const pembeliController = require("./controller/pembeli");
const MiddlewareCekToken = require("./middleware/cekToken");
const express = require("express");
const app = express();
const PORT = process.env.PORT;

app.use(express.json());

app.post("/user/registrasi", userController.registrasi);
app.post("/user/login", userController.login);
app.post("/barang", MiddlewareCekToken, barangController.tambahkanDataBarang);
app.get("/barang", MiddlewareCekToken, barangController.tampilkanDataBarang);
app.patch("/barang/:kode_barang", MiddlewareCekToken, barangController.updateDataBarang);
app.delete("/barang/:kode_barang", MiddlewareCekToken, barangController.hapusDataBarang);
app.get("/pembeli", MiddlewareCekToken, pembeliController.getSemuaPembeli);
app.post("/pembeli", MiddlewareCekToken, pembeliController.tambahkanDataPembeli);

app.listen(PORT, () => {
  console.log("Berjalan di port: " + PORT);
});
