import connectDatabase from "../config/database.js";
import Order from "../models/orders.js";
import { ObjectId } from "mongodb";

// Controller actions
export const getAllOrders = async (req, res) => {
	try {
		const db = await connectDatabase();
		const collection = db.collection("orders");
		const results = await collection.find({}).toArray();
		res.status(200).json(results);
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: "Server error" });
	}
};

export const getUserOrders = async (req, res) => {
	try {
		const { username } = req.params;
		const db = await connectDatabase();
		const collection = db.collection("orders");
		const results = await collection.find({ username }).toArray();
		res.status(200).json(results);
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: "Server error" });
	}
};

export const createOrder = async (req, res) => {
	try {
		const db = await connectDatabase();
		const orderCollection = db.collection("orders");
		const { username, totalAmount, products, address, payment } = req.body;

		products.map((product) => ({
			updateOne: {
				filter: { productName: product.name },
				update: { $inc: { quantity: -1 } },
			},
		}));

		const insertedOrder = await orderCollection.insertOne({
			username,
			totalAmount,
			products,
			address,
			payment,
			variant: req.body.variant 
		});
		const order = await orderCollection.findOne({
			_id: insertedOrder.insertedId,
		});
		res.status(201).json(order);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Server error" });
	}
};

export const exchangeProduct = async (req, res) => {
    try {
        const { username, oldProductId, newProductId, priceDifference, payment } = req.body;
        const db = await connectDatabase();
        const orderCollection = db.collection("orders");
        const productCollection = db.collection("products");

        const order = await orderCollection.findOne({ username, "products.id": oldProductId });
        if (!order) {
            return res.status(404).json({ error: "Order not found" });
        }

        const newProduct = await productCollection.findOne({ _id: new ObjectId(newProductId) });
        if (!newProduct) {
            return res.status(404).json({ error: "New product not found" });
        }

        const updatedProducts = order.products.map(product =>
            product.id === oldProductId ? { ...newProduct, isExchanged: true, extraPaid: priceDifference } : product
        );

        const updatedTotalAmount = order.totalAmount + priceDifference;

        await orderCollection.updateOne(
            { _id: order._id },
            { 
                $set: { 
                    products: updatedProducts,
                    totalAmount: updatedTotalAmount,
                    payment: payment 
                } 
            }
        );

        res.status(200).json({ message: "Product exchanged successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
};

export const updateOrderStatus = async (req, res) => {
	try {
		const { orderId } = req.params;
		const { status } = req.body;
		const order = await Order.findByIdAndUpdate(
			orderId,
			{ status }, 
			{ new: true }
		);
		if (!order) return res.status(404).json({ error: "Order not found" });
		res.status(200).json(order);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Server error" });
	}
};

export const updateOrderTracking = async (req, res) => {
	try {
		const { orderId } = req.params;
		const { trackingNumber, shippingCarrier } = req.body;
		const order = await Order.findById(orderId);
		if (!order) return res.status(404).json({ error: "Order not found" });
		
		await new Promise(resolve => setTimeout(resolve, 1000));

		order.trackingNumber = trackingNumber;
		order.shippingCarrier = shippingCarrier;
		await order.save();
		
		res.status(200).json(order);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Server error" });
	}
};
