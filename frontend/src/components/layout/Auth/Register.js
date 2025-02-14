import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { generateBaseURL } from "../../../utils.js";

const Register = () => {
	const [username, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();

	// form function
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const baseURL = generateBaseURL();
			const response = await fetch(`${baseURL}/api/auth/register`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					username,
					email,
					password,
				}),
			});

			if (response.status === 200) {
				toast.success("Registered successfully");
				navigate("/login");
			} else {
				toast.error("Something went wrong");
			}
		} catch (error) {
			console.log(error);
			toast.error("Something went wrong");
		}
	};

	return (
		<div className="form-container ">
			<form onSubmit={handleSubmit}>
				<h4 className="title">REGISTER</h4>
				<div className="mb-3">
					<input
						type="text"
						value={username}
						onChange={(e) => setName(e.target.value)}
						className="form-control"
						id="exampleInputEmail1"
						placeholder="Enter Your Name"
						required
						autoFocus
					/>
				</div>
				<div className="mb-3">
					<input
						type="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						className="form-control"
						id="exampleInputEmail1"
						placeholder="Enter Your Email "
						required
					/>
				</div>
				<div className="mb-3">
					<input
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						className="form-control"
						id="exampleInputPassword1"
						placeholder="Enter Your Password"
						required
					/>
				</div>
				<button type="submit" className="btn btn-primary">
					REGISTER
				</button>
			</form>
		</div>
	);
};

export default Register;
