import { useForm, useFieldArray } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { useEffect } from "react";
let render = 0;
const YTForm = () => {
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isDirty, isValid ,isSubmitted,isSubmitting,isSubmitSuccessful},
  } = useForm({
    defaultValues: {
      username: "",
      email: "",
      channel: "",
      socials: {
        twitter: "",
        instagram: "",
      },
      phoneNumbers: ["", ""],
      phNumbers: [{ number: "" }],
      age: 0,
      dob: new Date(),
    },
    mode:"onBlur"
  });
  console.log(errors);
  render++;
  const onSubmit = (data) => {
    console.log("Form Submitted", data);
  };
  const { fields, append, remove } = useFieldArray({
    name: "phNumbers",
    control,
  });
  const onError = (errors) => {
    console.log(errors, "OnSubmit Error");
  };

  useEffect(()=>{
    isSubmitSuccessful && reset()
  },[isSubmitSuccessful,reset])

  console.log(isSubmitSuccessful,isSubmitted,isSubmitting)
  return (
    <div>
      <h1>YouTube Form {render / 2}</h1>

      <form onSubmit={handleSubmit(onSubmit, onError)} noValidate>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          {...register("username", {
            required: {
              value: true,
              message: "User Name is Required",
            },
          })}
        />
        <p className="error">{errors.username?.message}</p>
        <br />
        <label htmlFor="email">E-mail</label>
        <input
          type="email"
          id="email"
          {...register("email", {
            required: {
              value: true,
              message: "Gmail is Required",
            },
            pattern: {
              value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
              message: "Invalid Email",
            },
            validate: {
              notAdmin: (fieldValue) => {
                return (
                  fieldValue !== "admin@gmail.com" ||
                  "Enter Anonther Gmail Adress"
                );
              },
              notAllowed: (fieldValue) => {
                return (
                  !fieldValue.endsWith("baddomain.com") ||
                  "This domain is not supported"
                );
              },
            },
          })}
        />
        <p className="error">{errors.email?.message}</p>

        <br />

        <label htmlFor="channel">Channel</label>
        <input
          type="text"
          id="channel"
          {...register("channel", {
            required: "Channel Name is Required",
          })}
        />
        <p className="error">{errors.channel?.message}</p>

        <br />
        <label htmlFor="instagram">Instagram Link</label>
        <input
          type="text"
          id="instagram"
          {...register("socials.instagram", {
            required: "Instagram is Required",
          })}
        />
        <p className="error">{errors.socials?.instagram?.message}</p>
        <br />
        <label htmlFor="twitter">Twitter Link</label>
        <input
          type="text"
          id="twitter"
          {...register("socials.twitter", {
            
            required: "Twitter is Required",
          })}
        />
        <p className="error">{errors.socials?.twitter?.message}</p>
        <br />
        <label htmlFor="phone1">Phone Number 1 </label>
        <input
          type="text"
          id="phone1"
          {...register("phoneNumbers.0", {
            required: {
              value: true,
              message: "Phone Number is Required",
            },
          })}
        />

        <p className="error">{errors.phoneNumbers?.[0]?.message}</p>

        <br />
        <label htmlFor="phone2">Phone Number 2</label>
        <input
          type="text"
          id="phone2"
          {...register("phoneNumbers.1", {
            required: {
              value: true,
              message: "Phone Number is Required",
            },
          })}
        />
        <p className="error">{errors.phoneNumbers?.[1]?.message}</p>

        <br />
        <div>
          <label htmlFor="">List of Phone Numbers</label>
          <div>
            {fields.map((field, index) => {
              return (
                <div className="form-control" key={field.id}>
                  <input
                    type="text"
                    {...register(`phNumbers.${index}.number`)}
                  />
                  {index > 0 && (
                    <button type="button" onClick={() => remove(index)}>
                      Remove Field
                    </button>
                  )}
                </div>
              );
            })}
          </div>
          <button type="button" onClick={() => append({ number: "" })}>
            Add Phone Number
          </button>
        </div>
        <div>
          <label htmlFor="age">Age</label>
          <input
            type="number"
            id="age"
            {...register("age", {
              valueAsNumber: true,
              required: "Age is Required",
            })}
          />
          <p className="error">{errors.age?.message}</p>
        </div>
        <div>
          <label htmlFor="dob">Date of Birth</label>
          <input
            type="date"
            id="dob"
            {...register("dob", {
              valueAsDate: true,
              required: "Date of Birth  is Required",
            })}
          />
          <p className="error">{errors.dob?.message}</p>
        </div>
        <button >Submit</button>
        <button type="button" onClick={()=>reset()} >Reset</button>
      </form>
      <DevTool control={control} />
    </div>
  );
};

export default YTForm;
