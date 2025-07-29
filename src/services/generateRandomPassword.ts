import bcrypt from "bcrypt";

const generateRandomPassword = (ownerName: string) => {
  const randomNumber = Math.floor(1000 + Math.random() * 90000);
  const passwordData = {
    hashedVersion: bcrypt.hashSync(`${randomNumber}_${ownerName}`, 10), // table ma store garna ko lagi
    plainVersion: `${randomNumber}_${ownerName}`, // teacher lai mail ma sent garna ko lagi
  };

  return passwordData;
};

export default generateRandomPassword;
