import React ,{useEffect}from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { DevTool } from "@hookform/devtools";

const TestForm = () => {
  const {
    register,
    control,
    handleSubmit,
    watch,
    getValues,
    reset,
    formState: { errors,isSubmitting,isSubmitSuccessful },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      cpassword: "",
      dob: "",
      gender: "male",
      phNumbers: [" ", " "],
      raddress: {
        city: "",
        country: "",
        pincode: "",
      },
      oaddress: {
        city: "",
        country: "",
        pincode: "",
      },
      showoff: false,
      notes: [{ title: "", desc: "" }],
    },
    mode: "onChange",
  });

  const {
    fields: phonefields,
    append: phoneappend,
    remove: phoneremove,
  } = useFieldArray({
    name: "phNumbers",
    control,
  });
  const {
    fields: notesfields,
    append: notesappend,
    remove: notesremove,
  } = useFieldArray({
    name: "notes",
    control,
  });

  const onHandleSubmit = (data) => {
    console.log(data);
  };
  const onError = (errors) => {
    console.log(errors);
  };
  console.log(errors)
  console.log(watch("password"));
 console.log( errors?.phNumbers?.[0]?.message,"error")
 useEffect(()=>{
    isSubmitSuccessful && reset()
  },[isSubmitSuccessful,reset])
  return (
    <div className="max-w-4xl mx-auto mt-8 p-4">
      <h1 className="text-4xl font-bold mb-8 text-center">Registration Form</h1>
   
      <form onSubmit={handleSubmit(onHandleSubmit, onError)}>
        {/* Basic Information */}
        <div className="mb-8">
          <h1 className="text-xl font-bold mb-4">Basic Information</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-md font-medium" htmlFor="name">
                Name
              </label>
              <input
                type="text"
                id="name"
                {...register("name", { required: "Name is required" })}
                placeholder="Enter Your Name"
                className="border p-2 w-full"
              />
              <p className="text-red-500 text-left text-sm">
                {errors.name?.message}
              </p>
            </div>
            <div>
              <label className="text-md font-medium" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                id="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                    message: "Enter Correct Email",
                  },
                })}
                placeholder="Enter Your Email"
                className="border p-2 w-full"
              />
              <p className="text-red-500 text-sm text-left">
                {errors.email?.message}
              </p>
            </div>
            <div>
              <label className="text-md font-medium" htmlFor="password">
                Password
              </label>
              <input
                type="password"
                id="password"
                {...register("password", {
                  required: "Password is required",
                  pattern: {
                    value:
                      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                    message:
                      "Enter one uppercase , lowercase,number,special symbol (min 8)",
                  },
                })}
                placeholder="Enter Your Password"
                className="border p-2 w-full"
              />
              <p className="text-red-500 text-sm text-left">
                {errors.password?.message}
              </p>
            </div>
            <div>
              <label className="text-md font-medium" htmlFor="cpassword">
                Confirm Password
              </label>
              <input
                type="password"
                id="cpassword"
                {...register("cpassword", {
                  required: "Confirm Password is required",
                  pattern: {
                    value:
                      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                    message:
                      "Enter one uppercase , lowercase,number,special symbol (min 8)",
                  },
                  validate: {
                    isMatching: (fieldValue) => {
                      const passwordValue = getValues("password");
                      return (
                        fieldValue !== passwordValue ||
                        "Password Is Not Matching"
                      );
                    },
                  },
                })}
                placeholder="Enter Confirm Password"
                className="border p-2 w-full"
              />
              <p className="text-red-500 text-sm text-left">
                {errors.cpassword?.message || errors.cpassword?.isMatching}
              </p>
            </div>
            <div>
              <label className="text-md font-medium" htmlFor="dob">
                Date of Birth
              </label>
              <input
                type="date"
                id="dob"
                {...register("dob")}
                className="border p-2 w-full"
              />
              <p className="text-red-500 text-sm">{errors.dob?.message}</p>
            </div>
            <div class="mb-4">
              <label
                class="block text-md text-left font-medium text-gray-700"
                htmlFor="gender"
              >
                Gender
              </label>
              <div class="relative">
                <select
                  {...register("gender")}
                  id="gender"
                  class="block appearance-none w-full bg-white border border-gray-300 text-gray-700 py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200"
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
                <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg
                    class="fill-current h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 12.586l4.293-4.293a1 1 0 0 1 1.414 1.414l-5 5a1 1 0 0 1-1.414 0l-5-5a1 1 0 1 1 1.414-1.414L10 12.586z" />
                  </svg>
                </div>
              </div>
              <p className="text-red-500 text-xs mt-1">{errors.gender?.message}</p>
            </div>
          </div>
        </div>

        <div>
          <h1 className="text-left text-xl my-4  font-bold">Phone Numbers</h1>
          <div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {phonefields.map((field, index) => {
                return (
                  <div className="form-control " key={field.id}>
                    <div  className="flex">
                    <input
                      type="text"
                      {...register(`phNumbers.${index}.number`, {
                        required: {
                          value: true,
                          message: "Enter Phone Number",
                        },
                      })}
                      className="outline-none"
                      placeholder={`Enter Phone Number ${index + 1}`}
                    />

            
                      <button
                        type="button"
                        className="p-3 px-4 bg-red-600 text-white"
                        onClick={() => phoneremove(index)}
                        disabled={index===0}
                      >
                        X
                      </button>
                    
                    </div>
                    <p className="text-red-500 text-sm text-left">
                        {errors?.phNumbers?.[index]?.number?.message ||""} 
                    </p>
                   
                  </div>
                );
              })}
              <button
                type="button"
                className="h-12 bg-black text-white py-2 font-bold rounded uppercase"
                onClick={() => phoneappend({ number: "" })}
              >
                Add
              </button>
            </div>
          </div>
        </div>

        {/* Address */}
        <div className="mb-8">
          <h1 className="text-xl font-bold text-left my-4 ">Address</h1>
          <div className="flex flex-col md:flex-row space-between items-start md:space-x-4">
            <div>
              <h1 className="text-left">Residental Address</h1>
              <div>
                <label className="text-md font-medium" htmlFor="city">
                  City
                </label>
                <input
                  type="text"
                  id="city"
                  {...register("raddress.city", {
                    required: "Enter City Name",
                  })}
                  placeholder="Enter City Name"
                  className="border p-2 w-full"
                />
                <p className="text-red-500 text-sm text-left">
                  {errors.raddress?.city?.message}
                </p>
              </div>
              <div>
                <label className="text-md font-medium" htmlFor="country">
                  Country
                </label>
                <input
                  type="text"
                  id="country"
                  {...register("raddress.country", {
                    required: "Enter Country Name",
                  })}
                  placeholder="Enter Country Name"
                  className="border p-2 w-full"
                />
                <p className="text-red-500 text-sm text-left">
                  {errors.raddress?.country?.message}
                </p>
              </div>
              <div>
                <label className="text-md font-medium" htmlFor="pin">
                  Pin Code
                </label>
                <input
                  type="text"
                  id="pin"
                  {...register("raddress.pincode", {
                    required: "Enter PIN Code",
                  })}
                  placeholder="Enter PIN Code"
                  className="border p-2 w-full"
                />
                <p className="text-red-500 text-sm text-left">
                  {errors.raddress?.pincode?.message}
                </p>
              </div>
              <div className="flex  space-x-4">
                <label htmlFor="showoff" className="font-medium">
                  Add Office Address
                </label>
                <input type="checkbox" id="showoff" {...register("showoff")} />
              </div>
            </div>
            {watch("showoff") && (
              <div>
                <h1 className="text-left">Office Address</h1>
                <div>
                  <label className="text-md font-medium" htmlFor="ocity">
                    City
                  </label>
                  <input
                    type="text"
                    id="ocity"
                    {...register("oaddress.city")}
                    placeholder="Enter City Name"
                    className="border p-2 w-full"
                  />
                  <p className="text-red-500 text-sm text-left">
                    {errors.oaddress?.city?.message}
                  </p>
                </div>
                <div>
                  <label className="text-md font-medium" htmlFor="ocountry">
                    Country
                  </label>
                  <input
                    type="text"
                    id="ocountry"
                    {...register("oaddress.country")}
                    placeholder="Enter Country Name"
                    className="border p-2 w-full"
                  />
                  <p className="text-red-500 text-sm text-left">
                    {errors.oaddress?.country?.message}
                  </p>
                </div>
                <div>
                  <label className="text-md font-medium" htmlFor="opin">
                    Pin Code
                  </label>
                  <input
                    type="text"
                    id="opin"
                    {...register("oaddress.pincode")}
                    placeholder="Enter PIN Code"
                    className="border p-2 w-full"
                  />
                  <p className="text-red-500 text-sm text-left">
                    {errors.oaddress?.pincode?.message}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Add your address form fields here */}
        </div>

        <div>
          <h1 className="text-xl font-bold text-left my-4 ">Notes</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {notesfields.map((field, index) => {
              return (
                <div className="form-control flex " key={field.id}>
                  <div className="flex flex-col space-y-2 ">
                    <input
                      type="text"
                      {...register(`notes.${index}.title`, {
                        required: {
                          value: true,
                          message: "Enter Note Title",
                        },
                      })}
                      className="outline-none"
                      placeholder={`Enter  Title`}
                    />
                    <br />
                   
                    <p className="error">{errors?.notes?.[index]?.title?.message || ""}</p>

                    <textarea
                      className="border-2 outline-none p-4 "
                      placeholder="Enter Description "
                      rows={8}
                      {...register(`notes.${index}.desc`, {
                        required: {
                          value: true,
                          message: "Enter Note Description",
                        },
                      })}
                    ></textarea>
                    <br />
                    <p className="error">{errors?.notes?.[index]?.desc?.message || ""}</p>
                    <button
                      type="button"
                      className="px-12 bg-red-500  text-white py-1 font-bold rounded uppercase"
                      onClick={() => notesremove(index)}
                    >
                     Remove Note
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
          <button
            type="button"
            className="px-12 bg-black text-white py-1 font-bold rounded uppercase"
            onClick={() => notesappend({ title: "", desc: "" })}
          >
            Add Note
          </button>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full px-8 my-8 py-2 bg-black text-white font-bold rounded"
        >
          Submit
        </button>
      </form>
      <DevTool control={control} />
    </div>
  );
};

export default TestForm;
