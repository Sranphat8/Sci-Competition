import { useEffect, useState } from "react";
import AuthService from "../services/auth.service";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";

const Register = () => {
  const [userData, setUserData] = useState({
    email: "",
    name: "",
    school: "",
    phone: "",
    password: "",
    type: "teacher",
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };
  const handleSubmit = async () => {
    try {
      const currentUser = await AuthService.register(userData);

      if (currentUser.status === 201) {
        Swal.fire({
          title: "User Register",
          text: currentUser?.data?.message,
          icon: "success",
        }).then(() => {
          setUserData({
            email: "",
            name: "",
            school: "",
            phone: "",
            password: "",
            type: "teacher",
          });
          navigate("/login");
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Register new user",
        text: error?.response?.data?.message || error.message,
        icon: "error",
      });
    }
  };
  return (
    <div className="flex flex-col items-center space-y-4">
      <h1 className="text-3xl font-bold mb-4">Register</h1>

      <label className="input input-bordered flex items-center gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
          className="h-4 w-4 opacity-70"
        >
          <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
          <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
        </svg>
        <input
          type="text"
          className="grow"
          placeholder="Email"
          name="email"
          value={userData.email}
          onChange={handleChange}
        />
      </label>
      <label className="input input-bordered flex items-center gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
          className="h-4 w-4 opacity-70"
        >
          <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
        </svg>
        <input
          type="text"
          className="grow"
          placeholder="Name"
          name="name"
          value={userData.name}
          onChange={handleChange}
        />
      </label>
      <label className="input input-bordered flex items-center gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1em"
          height="1em"
          viewBox="0 0 72 72"
        >
          <path
            fill="#d0cfce"
            d="M9.356 56.506h53.288V23.564H45.282v-2.906H26.718v2.906H9.356v32.942z"
          ></path>
          <path fill="#a57939" d="M30.625 39.995h10.751v12.746H30.625z"></path>
          <circle cx="36" cy="30.242" r="6.298" fill="#fff"></circle>
          <path
            fill="none"
            stroke="#92d3f5"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M20.498 46.817h1.938v4.035h-1.938zm-6.782 0h1.938v4.035h-1.938zm6.782-9.689h1.938v4.844h-1.938zm-6.782 0h1.938v4.844h-1.938zm6.782-9.688h1.938v4.844h-1.938zm-6.782 0h1.938v4.844h-1.938zm42.63 19.377h1.938v4.035h-1.938zm-6.782 0h1.938v4.035h-1.938zm6.782-9.689h1.938v4.844h-1.938zm-6.782 0h1.938v4.844h-1.938zm6.782-9.688h1.938v4.844h-1.938zm-6.782 0h1.938v4.844h-1.938z"
          ></path>
          <path
            fill="#d22f27"
            d="M24.8 20.49h1.92v3.07H9.36l3.85-6.14h15.201L24.8 20.49zm22.4 0h-1.916v3.07h17.36l-3.85-6.14H43.592l3.608 3.07z"
          ></path>
          <path
            fill="#ea5a47"
            d="M47.2 20.49H24.8l1.92-1.631L36 10.96l11.2 9.53z"
          ></path>
          <path
            fill="#b1cc33"
            d="M7.196 50.852h19.522v5.653H7.196zm38.086 0h19.522v5.653H45.282z"
          ></path>
          <g
            fill="none"
            stroke="#000"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
          >
            <path d="M26.72 20.49h18.56v36.02H26.72z"></path>
            <path d="M24.8 20.49h1.92v3.07H9.36l3.85-6.14h15.201L24.8 20.49zm22.4 0h-1.916v3.07h17.36l-3.85-6.14H43.592l3.608 3.07z"></path>
            <path d="M47.2 20.49H24.8l1.92-1.631L36 10.96l11.2 9.53zM9.71 50.852h14.493a2.514 2.514 0 0 1 2.515 2.515v3.139H7.196v-3.14a2.514 2.514 0 0 1 2.514-2.513Zm38.087 0H62.29a2.514 2.514 0 0 1 2.514 2.515v3.139H45.282v-3.14a2.514 2.514 0 0 1 2.515-2.513Zm-21.079 1.889h18.564M9.356 50.852V23.564h17.362m35.926 32.942H9.356"></path>
            <path d="M45.282 23.564h17.362v27.288M30.625 39.995h10.751v12.746H30.625zM36 52.741V39.995"></path>
            <circle cx="36" cy="30.242" r="6.298"></circle>
            <path d="M36 30.727V26.55m0 4.177l2.089-1.044M20.498 50.852v-4.035m-6.782 4.035v-4.035m8.72-4.844h-1.938v-4.845m-4.844 4.845h-1.938v-4.845m8.72-4.844h-1.938V27.44m-4.844 4.844h-1.938V27.44m42.63 23.412v-4.035m-6.782 4.035v-4.035m8.72-4.844h-1.938v-4.845m-4.844 4.845h-1.938v-4.845m8.72-4.844h-1.938V27.44m-4.844 4.844h-1.938V27.44"></path>
          </g>
        </svg>

        <input
          type="text"
          className="grow"
          placeholder="School"
          name="school"
          value={userData.school}
          onChange={handleChange}
        />
      </label>
      <label className="input input-bordered flex items-center gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1em"
          height="1em"
          viewBox="0 0 26 26"
        >
          <path
            fill="#000000"
            d="M22.386 18.026c-1.548-1.324-3.119-2.126-4.648-.804l-.913.799c-.668.58-1.91 3.29-6.712-2.234c-4.801-5.517-1.944-6.376-1.275-6.951l.918-.8c1.521-1.325.947-2.993-.15-4.71l-.662-1.04C7.842.573 6.642-.552 5.117.771l-.824.72c-.674.491-2.558 2.087-3.015 5.119c-.55 3.638 1.185 7.804 5.16 12.375c3.97 4.573 7.857 6.87 11.539 6.83c3.06-.033 4.908-1.675 5.486-2.272l.827-.721c1.521-1.322.576-2.668-.973-3.995l-.931-.801z"
          ></path>
        </svg>

        <input
          type="text"
          className="grow"
          placeholder="Phone"
          name="phone"
          value={userData.phone}
          onChange={handleChange}
        />
      </label>
      <label className="input input-bordered flex items-center gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
          className="h-4 w-4 opacity-70"
        >
          <path
            fillRule="evenodd"
            d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
            clipRule="evenodd"
          />
        </svg>
        <input
          type="password"
          className="grow"
          value={userData.password}
          onChange={handleChange}
          name="password"
        />
      </label>
      <button className="btn btn-success" onClick={handleSubmit}>
        Submit
      </button>
    </div>
  );
};

export default Register;
