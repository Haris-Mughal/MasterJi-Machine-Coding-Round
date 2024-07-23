import { useState } from "react";

const OTPForm = () => {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [status, setStatus] = useState("");

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value && index < 3) {
        document.getElementById(`otp-input-${index + 1}`).focus();
      }

      if (newOtp.join("").length === 4) {
        if (newOtp.join("") === "1234") {
          setStatus("success");
        } else {
          setStatus("error");
        }
      } else {
        setStatus("");
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      document.getElementById(`otp-input-${index - 1}`).focus();
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-blue-400">
      <div className=" text-white font-bold text-[80px] pb-10 leading-[96.82px] text-center">
        Chai aur Code
      </div>
      <div className="bg-white min-w-[650px] p-8 rounded-xl shadow-md text-center">
        <div className="font-sans font-semibold text-[35px] leading-[52px] text-center ">
          Mobile Phone Verification
        </div>
        <div className=" text-[#BFBFBF] text-center mx-auto text-[20px] w-[450px] text-wrap font-sans leading-[25px] ">
          Enter the 4-digit verification code that was sent to your phone
          number.
        </div>
        <div className="flex space-x-2 py-7 justify-center">
          {otp.map((digit, index) => (
            <input
              key={index}
              id={`otp-input-${index}`}
              type="text"
              value={digit}
              onChange={(e) => handleChange(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              maxLength="1"
              className={`rounded-xl border-2 bg-[#d5d5d5] font-semibold p-2 w-16 h-20 text-center text-2xl ${
                status === "success"
                  ? "border-green-500"
                  : status === "error"
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
            />
          ))}
        </div>
        <div className=" text-white w-[417px] cursor-pointer mx-auto h-[64px] rounded-lg ">
          <p
            className={`mt-3 pt-3 h-[64px] rounded-lg font-sans text-[25px] text-center ${
              status === "success"
                ? "bg-green-500"
                : status === "error"
                ? "bg-red-500"
                : "bg-[#112D4E]"
            }`}
          >
            {status === "success"
              ? "Verified!"
              : status === "error"
              ? "Verification failed"
              : "Verify Account"}
          </p>
        </div>
        {status === "success" ? "" : <div className="font-sans mt-2 text-[20px] text-center text-[#BFBFBF] ">
          Didn&apos;t receive code?{" "}
          <span className="text-[#112D4E] cursor-pointer">Resend</span>
        </div>}
      </div>
    </div>
  );
};

export default OTPForm;
