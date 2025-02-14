import React, { useState, useEffect } from "react";
import UserMenu from "./UserMenu.js";
import { useAuth } from "../../../contexts/onAuth.js";
import toast from "react-hot-toast";
import "./Profile.css";
import { generateBaseURL } from "../../../utils.js";
const Profile = () => {
	//context
	const [auth, setAuth] = useAuth();
	//state
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [phone, setPhone] = useState("");
	const [address, setAddress] = useState("");

	//get user data
	useEffect(() => {
		const { username = auth?.user?.username, email = auth?.user?.email } =
			auth;

		setName(username);
		setEmail(email);
	}, [auth?.user]);

	// form function
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const baseURL = generateBaseURL();
			const response = await fetch(`${baseURL}/api/auth/profile`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					name,
					email,
					password,
				}),
			});

			if (!response.ok) {
				throw new Error(
					`Failed to update profile: ${response.statusText}`,
				);
			}

			const data = await response.json();

			if (data?.error) {
				toast.error(data?.error);
			} else {
				setAuth({ ...auth, user: data?.updatedUser });
				let ls = localStorage.getItem("auth");
				ls = JSON.parse(ls);
				ls.user = data.updatedUser;
				localStorage.setItem("auth", JSON.stringify(ls));
				toast.success("Profile Updated Successfully");
			}
		} catch (error) {
			console.error(error);
			toast.error("Something went wrong");
		}
	};

	return (
		<div className="container-fluid m-3 p-3 dashboard">
			<div className="row">
				<div className="col-md-3">
					<UserMenu />
				</div>
				<div className="col-md-8">
					<div className="form-container">
						<form onSubmit={handleSubmit}>
							<h4 className="title">USER PROFILE</h4>
							<div className="mb-3">
								<input
									type="text"
									value={name}
									onChange={(e) => setName(e.target.value)}
									className="form-control"
									id="exampleInputEmail1"
									placeholder="Enter Your Name"
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
									disabled
								/>
							</div>
							<div className="mb-3">
								<input
									type="password"
									value={password}
									onChange={(e) =>
										setPassword(e.target.value)
									}
									className="form-control"
									id="exampleInputPassword1"
									placeholder="Enter Your Password"
								/>
							</div>
							<div className="mb-3">
								<input
									type="text"
									value={phone}
									onChange={(e) => setPhone(e.target.value)}
									className="form-control"
									id="exampleInputEmail1"
									placeholder="Enter Your Phone"
								/>
							</div>
							<div className="mb-3">
								<input
									type="text"
									value={address}
									onChange={(e) => setAddress(e.target.value)}
									className="form-control"
									id="exampleInputEmail1"
									placeholder="Enter Your Address"
								/>
							</div>

							<button
								type="submit"
								className="btn btn-primary"
								disabled
							>
								UPDATE
							</button>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Profile;
