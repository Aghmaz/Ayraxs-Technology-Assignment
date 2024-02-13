import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateField } from "../redux/DataSlice";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import formData from "../Json/form-data.json";

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const fieldsRedux = useSelector((state) => state.dataHandeler.fields);

  const [formDataValues, setFormDataValues] = useState(fieldsRedux);
  const [formDataErrors, setFormDataErrors] = useState({});

  // const handleInputChange = (e) => {
  //   setFormDataValues({
  //     ...formDataValues,
  //     [e.target.name]: e.target.value,
  //   });

  //   setFormDataErrors({
  //     ...formDataErrors,
  //     [e.target.name]: "",
  //   });
  // };
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormDataValues({
      ...formDataValues,
      [name]: value,
    });

    setFormDataErrors({
      ...formDataErrors,
      [name]: "",
    });

    dispatch(updateField({ name, value }));
  };
  const handleInputBlur = (field) => {
    const value = formDataValues[field.name];
    const validation = field.validation;

    if (validation.required && !value) {
      setFormDataErrors({
        ...formDataErrors,
        [field.name]: `${field.label} is required.`,
      });
    } else if (
      validation.pattern &&
      !new RegExp(validation.pattern).test(value)
    ) {
      setFormDataErrors({
        ...formDataErrors,
        [field.name]: `Invalid ${field.label} address`,
      });
    } else if (validation.minLength && value.length < validation.minLength) {
      setFormDataErrors({
        ...formDataErrors,
        [field.name]: `${field.label} must be at least ${validation.minLength} characters long`,
      });
    } else {
      setFormDataErrors({
        ...formDataErrors,
        [field.name]: "",
      });
    }
    dispatch(updateField({ name: field.name, value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const anyFieldIsEmpty = formData.fields.some(
      (field) => !formDataValues[field.name]
    );

    if (anyFieldIsEmpty) {
      toast.error("Please fill in all the fields");
      return;
    }
    formData.fields.forEach((field) => {
      handleInputBlur(field);
    });

    if (Object.values(formDataErrors).some((error) => error !== "")) {
      toast.error("Please fix the highlighted error fields");
    } else {
      dispatch(updateField(formDataValues));
      localStorage.setItem("userData", JSON.stringify(formDataValues));
      navigate("/home");
    }
  };
  useEffect(() => {
    setFormDataValues(fieldsRedux);
  }, [fieldsRedux]);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="text-center text-3xl font-extrabold text-gray-900">
          Login to your account
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {formData.fields.map((field) => (
              <div key={field.name}>
                <label className="block text-sm font-medium text-gray-700">
                  {field.label}:
                  <div className="mt-1">
                    <input
                      type={field.type}
                      name={field.name}
                      placeholder={field.placeholder}
                      className={`appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
                        formDataErrors[field.name] ? "border-red-500" : ""
                      }`}
                      value={formDataValues[field.name] || ""}
                      onChange={handleInputChange}
                      onBlur={() => handleInputBlur(field)}
                      required={field.required}
                    />
                    {formDataErrors[field.name] && (
                      <p
                        className="mt-2 text-sm text-red-500"
                        id={`${field.name}-error`}
                      >
                        {formDataErrors[field.name]}
                      </p>
                    )}
                  </div>
                </label>
              </div>
            ))}

            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Submit
            </button>
          </form>

          <ToastContainer />
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
