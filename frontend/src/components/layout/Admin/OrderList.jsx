//react imports
import React, { useEffect, useState } from "react";

//internal imports
import "./OrderList.css";
import { generateBaseURL } from "../../../utils.js";
import { useCurrency } from "../../../contexts/currencyContext";

const OrderList = () => {
	const [orders, setOrders] = useState([]);
	const { convertPrice } = useCurrency();

	//fetch orders
	async function fetchOrders() {
		try {
			const baseURL = generateBaseURL();
			const response = await fetch(`${baseURL}/api/orders`);

			if (!response.ok) {
				throw new Error(`Failed to fetch data: ${response.statusText}`);
			}

			const ordersData = await response.json();
			setOrders(ordersData);
		} catch (error) {
			console.error("Error retrieving orders:", error);
		}
	}

	useEffect(() => {
		fetchOrders();
	}, []);

	// Calculate the total amount
	const totalAmount = orders.reduce(
		(total, order) => total + order.totalAmount,
		0,
	);

	return (
		<div className="order-list-container">
			<h2>Order List</h2>
			{orders.map((order) => (
				<div key={order._id} className="order-item">
					<h4>Order ID: {order._id}</h4>
					<p>Customer Name: {order.username}</p>
					<p>Total Amount: ${convertPrice(order.totalAmount)}</p>
				</div>
			))}
			<div className="total-amount">
				<p>Total Amount of All Orders: ${convertPrice(totalAmount)}</p>
			</div>
		</div>
	);
};

export default OrderList;
