import React from "react";
import { NavLink } from "react-router-dom";
const AdminMenu = () => {
	return (
		<>
			<div className="text-center">
				<div className="list-group">
					<h4>Admin Panel</h4>

					<NavLink
						to="/dashboard/admin/create-product"
						className="list-group-item list-group-item-action"
					>
						Create Product
					</NavLink>

					<NavLink
						to="/dashboard/admin/orders"
						className="list-group-item list-group-item-action"
					>
						Orders
					</NavLink>
					<NavLink
						to="/dashboard/admin/all-products"
						className="list-group-item list-group-item-action"
					>
						All Products
					</NavLink>
					<NavLink
						to="/dashboard/admin/inventory"
						className="list-group-item list-group-item-action"
					>
						Inventory
					</NavLink>
				</div>
			</div>
		</>
	);
};

export default AdminMenu;
