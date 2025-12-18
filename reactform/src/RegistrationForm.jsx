
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const initialFormState = {
  firstName: "",
  lastName: "",
  username: "",
  email: "",
  password: "",
  phoneCountryCode: "+91",
  phone: "",
  country: "",
  city: "",
  pan: "",
  aadhaar: "",
};

function RegistrationForm() {
  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const validateField = (name, value) => {
    switch (name) {
      case "firstName":
        if (!value.trim()) return "First name is required";
        if (value.trim().length < 2)
          return "First name must be at least 2 characters";
        return "";

      case "lastName":
        if (!value.trim()) return "Last name is required";
        return "";

      case "username":
        if (!value.trim()) return "Username is required";
        if (value.trim().length < 4)
          return "Username must be at least 4 characters";
        return "";

      case "email":
        if (!value.trim()) return "Email is required";
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(value)) return "Please enter a valid email";
        return "";

      case "password":
        if (!value.trim()) return "Password is required";
        if (value.length < 6)
          return "Password must be at least 6 characters";
        return "";

      case "phoneCountryCode":
        if (!value.trim()) return "Country code is required";
        return "";

      case "phone": {
        const onlyDigits = value.replace(/\D/g, "");
        if (!onlyDigits) return "Phone number is required";
        if (!/^[0-9]{10}$/.test(onlyDigits))
          return "Phone must be 10 digits";
        return "";
      }

      case "country":
        if (!value.trim()) return "Country is required";
        return "";

      case "city":
        if (!value.trim()) return "City is required";
        return "";

      case "pan": {
        const upperPan = value.toUpperCase();
        if (!upperPan.trim()) return "PAN is required";
        if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(upperPan))
          return "Enter valid PAN (e.g., ABCDE1234F)";
        return "";
      }

      case "aadhaar": {
        const onlyDigits = value.replace(/\D/g, "");
        if (!onlyDigits) return "Aadhaar is required";
        if (!/^[0-9]{12}$/.test(onlyDigits))
          return "Aadhaar must be exactly 12 digits";
        return "";
      }

      default:
        return "";
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    let newValue = value;

    if (name === "pan") {
      newValue = value.toUpperCase();
    }

    setFormData((prev) => ({
      ...prev,
      [name]: newValue,
    }));

    const errorMsg = validateField(name, newValue);
    setErrors((prev) => ({
      ...prev,
      [name]: errorMsg,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};
    Object.keys(formData).forEach((field) => {
      const msg = validateField(field, formData[field]);
      if (msg) newErrors[field] = msg;
    });

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      const cleanedData = {
        ...formData,
        phone: formData.phone.replace(/\D/g, ""),
        aadhaar: formData.aadhaar.replace(/\D/g, ""),
      };

      navigate("/details", { state: { formData: cleanedData } });
    }
  };

  const isFormValid =
    Object.values(formData).every((val) => val.toString().trim() !== "") &&
    Object.values(errors).every((err) => !err);

  return (
    <div className="page-wrapper">
      <div className="card">
        <div className="card-header">
          <h1 className="form-title">React Registration Form</h1>
          <p className="form-subtitle">
            Fill all the required details. Validation is applied on each field.
          </p>
        </div>

        <form className="form-grid" onSubmit={handleSubmit}>
          
          <div className="field-row">
            <div className="field-group">
              <label>First Name</label>
              <input
                type="text"
                name="firstName"
                placeholder="Enter first name"
                value={formData.firstName}
                onChange={handleChange}
                className={errors.firstName ? "input input-error" : "input"}
              />
              {errors.firstName && (
                <p className="error-text">{errors.firstName}</p>
              )}
            </div>

            <div className="field-group">
              <label>Last Name</label>
              <input
                type="text"
                name="lastName"
                placeholder="Enter last name"
                value={formData.lastName}
                onChange={handleChange}
                className={errors.lastName ? "input input-error" : "input"}
              />
              {errors.lastName && (
                <p className="error-text">{errors.lastName}</p>
              )}
            </div>
          </div>

          
          <div className="field-group">
            <label>Username</label>
            <input
              type="text"
              name="username"
              placeholder="Choose a username"
              value={formData.username}
              onChange={handleChange}
              className={errors.username ? "input input-error" : "input"}
            />
            {errors.username && (
              <p className="error-text">{errors.username}</p>
            )}
          </div>

          
          <div className="field-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              className={errors.email ? "input input-error" : "input"}
            />
            {errors.email && <p className="error-text">{errors.email}</p>}
          </div>


          <div className="field-group">
            <label>Password</label>
            <div className="password-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter password"
                value={formData.password}
                onChange={handleChange}
                className={errors.password ? "input input-error" : "input"}
              />
              <button
                type="button"
                className="toggle-btn"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
            {errors.password && (
              <p className="error-text">{errors.password}</p>
            )}
          </div>

         
          <div className="field-group">
            <label>Phone Number</label>
            <div className="phone-grid">
              <input
                type="text"
                name="phoneCountryCode"
                placeholder="+91"
                value={formData.phoneCountryCode}
                onChange={handleChange}
                className={
                  errors.phoneCountryCode ? "input input-error" : "input"
                }
              />
              <input
                type="text"
                name="phone"
                placeholder="10 digit phone number"
                value={formData.phone}
                onChange={handleChange}
                className={errors.phone ? "input input-error" : "input"}
              />
            </div>
            {errors.phoneCountryCode && (
              <p className="error-text">{errors.phoneCountryCode}</p>
            )}
            {errors.phone && <p className="error-text">{errors.phone}</p>}
          </div>

          
          <div className="field-row">
            <div className="field-group">
              <label>Country</label>
              <input
                type="text"
                name="country"
                placeholder="Enter country"
                value={formData.country}
                onChange={handleChange}
                className={errors.country ? "input input-error" : "input"}
              />
              {errors.country && (
                <p className="error-text">{errors.country}</p>
              )}
            </div>

            <div className="field-group">
              <label>City</label>
              <input
                type="text"
                name="city"
                placeholder="Enter city"
                value={formData.city}
                onChange={handleChange}
                className={errors.city ? "input input-error" : "input"}
              />
              {errors.city && <p className="error-text">{errors.city}</p>}
            </div>
          </div>

          
          <div className="field-group">
            <label>PAN</label>
            <input
              type="text"
              name="pan"
              placeholder="ABCDE1234F"
              value={formData.pan}
              onChange={handleChange}
              className={errors.pan ? "input input-error" : "input"}
            />
            {errors.pan && <p className="error-text">{errors.pan}</p>}
          </div>

         
          <div className="field-group">
            <label>Aadhaar</label>
            <input
              type="text"
              name="aadhaar"
              placeholder="12 digit Aadhaar number"
              value={formData.aadhaar}
              onChange={handleChange}
              className={errors.aadhaar ? "input input-error" : "input"}
            />
            {errors.aadhaar && (
              <p className="error-text">{errors.aadhaar}</p>
            )}
          </div>

          
          <button
            type="submit"
            className="submit-btn"
            disabled={!isFormValid}
          >
            Submit
          </button>

          {!isFormValid && (
            <p className="hint-text">
              Fill all fields correctly to enable the Submit button.
            </p>
          )}
        </form>
      </div>
    </div>
  );
}

export default RegistrationForm;
