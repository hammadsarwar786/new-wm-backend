import bcrypt from "bcrypt";

const hashedPassword = await bcrypt.hash("admin123", 10);

console.log(hashedPassword, "pass");
