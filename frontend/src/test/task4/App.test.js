import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { describe, beforeEach, it, expect } from "@jest/globals";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ShopContextProvider } from "../../../src/contexts/shopContext";
import { CurrencyProvider } from "../../../src/contexts/currencyContext";
import ProductDetail from "../../../src/components/views/shop/ProductDetail";
import { Cart } from "../../../src/components/views/cart/Cart";
import fetchMock from "fetch-mock";
import { generateBaseURL } from "../../../../frontend/src/utils";

jest.mock("../../../src/contexts/onAuth.js", () => ({
	useAuth: () => [
		{
			user: { username: "testUser" },
			token: "testToken",
			isLoading: false,
		},
		jest.fn(),
	],
}));

jest.mock("react-router-dom", () => ({
	...jest.requireActual("react-router-dom"),
	useParams: () => ({ id: "65a4f6605cf27839a8b9b4db" }),
}));

global.console.warn = jest.fn();
global.console.error = jest.fn();

describe("Feature Testing", () => {
	beforeEach(() => {
		fetchMock.reset();
	});

	it("Cart details are saved in the backend database correctly", async () => {
		const baseURL = generateBaseURL();
		fetchMock.get(`${baseURL}/api/products`, {
			status: 200,
			body: [
				{
					_id: "65a653eacb531b6ca29f8a6c",
					sNo: 1,
					name: "myPhone",
					price: 999,
					description: "The latest phone with advanced features",
					tags: "electronics, smartphone, mobile",
				},
				{
					_id: "65a4f6605cf27839a8b9b4db",
					sNo: 2,
					name: "Galexy Fone 27",
					price: 799,
					description: "High-performance Android smartphone",
					tags: "electronics, smartphone, mobile",
				},
			],
		});
		fetchMock.get(
			`${baseURL}/api/products/detail/65a4f6605cf27839a8b9b4db`,
			{
				status: 200,
				body: {
					_id: "65a4f6605cf27839a8b9b4db",
					sNo: 2,
					name: "Galexy Fone 27",
					price: 799,
					description: "High-performance Android smartphone",
					tags: "electronics, smartphone, mobile",
				},
			},
		);
		fetchMock.post(`${baseURL}/api/cart/`, {
			status: 200,
			body: {
				userId: "6640a59c18df22e3c4b9b4db",
				productId: "65a4f6605cf27839a8b9b4db",
				quantity: 1,
			},
		});
		fetchMock.get(`${baseURL}/api/cart/6640a59c18df22e3c4b9b4db`, {
			status: 200,
			body: {
				cartItems: [],
				totalPrice: 799,
			},
		});
		await act(async () => {
			render(
				<Router>
					<ShopContextProvider>
					<CurrencyProvider>
						<Routes>
							<Route path="/cart" element={<Cart />} />
							<Route path="/" element={<ProductDetail />} />
						</Routes>
						</CurrencyProvider>
					</ShopContextProvider>
				</Router>,
			);
		});
		await act(async () => {
			fireEvent.click(screen.getByTestId("add-to-cart-button"));
		});

		fireEvent.click(screen.getByTestId("go-to-cart-button"));
		expect(window.location.pathname).toBe("/cart");
		expect(screen.getByTestId("purchase-subtotal")).toHaveTextContent(
			"Subtotal: $799",
		);

		await act(async () => {
			render(
				<Router>
					<ShopContextProvider>
					<CurrencyProvider>
						<Routes>
							<Route path="/cart" element={<Cart />} />
							<Route path="/" element={<ProductDetail />} />
						</Routes>
					</CurrencyProvider>
					</ShopContextProvider>
				</Router>,
			);
		});

		await act(async () => {
			await new Promise((resolve) => setTimeout(resolve, 1000));
		});

		expect(
			screen.getAllByTestId("purchase-subtotal")[1],
		).toBeInTheDocument();
		expect(screen.getAllByTestId("purchase-subtotal")[1]).toHaveTextContent(
			"Subtotal: $799",
		);
	});
});
