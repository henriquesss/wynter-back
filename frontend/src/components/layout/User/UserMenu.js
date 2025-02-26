import React from "react";
import { NavLink } from "react-router-dom";

const UserMenu = () => {
	return (
		<div>
			<div className="text-center">
				<div className="list-group">
					<h4>Dashboard</h4>
					<NavLink
						to="/dashboard/user/profile"
						className="list-group-item list-group-item-action"
					>
						Profile
					</NavLink>
					<NavLink
						to="/dashboard/user/orders"
						className="list-group-item list-group-item-action"
					>
						Orders
					</NavLink>
					<NavLink
						to="/dashboard/user/addresses"
						className="list-group-item list-group-item-action"
					>
						Addresses
					</NavLink>
					<NavLink
						to="/dashboard/user/exchange-product"
						className="list-group-item list-group-item-action"
					>
						Exchange Product
					</NavLink>
					<NavLink
						to="dashboard/user/compare-products"
						className="list-group-item list-group-item-action"
					>
						Product Comparison
					</NavLink>
				</div>
			</div>
		</div>
	);
};

export default UserMenu;
