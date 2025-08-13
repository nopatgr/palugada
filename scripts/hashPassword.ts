// hash-password.js
import bcrypt from "bcrypt";

// password yang mau di-hash
const plainPassword = "admin123"; // ubah sesuai password kamu

// jumlah salt rounds (10 = standar)
const saltRounds = 10;

bcrypt.hash(plainPassword, saltRounds, (err, hash) => {
  if (err) {
    console.error("Gagal membuat hash:", err);
    return;
  }
  console.log("Password asli :", plainPassword);
  console.log("Password hash:", hash);
});
