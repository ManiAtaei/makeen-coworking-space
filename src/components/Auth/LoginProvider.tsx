import React, { useState } from "react";
import Login from "./Login";
import Register from "./Register";

export default function LoginProvider() {
  const [step, setStep] = useState<1 | 2 | 3>(1);

  return (
    <div>
      {step === 1 && <Login setStep={setStep} />}
      {step === 2 && <Register setStep={setStep} />}
    </div>
  );
}
