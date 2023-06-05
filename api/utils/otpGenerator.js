const otpGenerator = require("otp-generator");
const generateOTP = () => {
  const OTP = otpGenerator.generate(5, {
    upperCaseAlphabets: false,
    lowerCaseAlphabets: false,
    specialChars: false,
  });
  return OTP;
};

module.exports = generateOTP;
