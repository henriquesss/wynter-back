/* eslint-disable no-undef */
import chai from "chai";
import chaiHttp from "chai-http";
import app from "../../app.js";  

chai.use(chaiHttp);
const { expect } = chai;

describe("BugFix Testing", () => {

	it("Validates atleast 3 tags are required correctly", (done) => {
		const productData = {
			name: "sampleProduct",
			price: 89,
			description: "The latest product",
			tags: "demo"
		};

		chai.request(app)
			.post("/api/products/")
			.send(productData)
			.end((err, res) => {
				expect(res).to.have.status(400);
				expect(res.body).to.have.property("error").to.equal("At least 3 tags are required");
				done();
			});
	});

	it("Create product funtions correctly", (done) => {
		const productData = {
			name: "sampleProduct",
			price: 89,
			description: "The latest product",
			tags: "demo, try, sample"
		};

		chai.request(app)
			.post("/api/products/")
			.send(productData)
			.end((err, res) => {
				expect(res).to.have.status(201);
				expect(res.body).to.not.have.property("error");
				expect(res.body).to.not.be.empty;
				expect(res.body).to.have.property("acknowledged").to.equal(true);
				done()
			});
	});

	it("Delete Operation works correctly",  (done) => {
		let id = "";
		chai.request(app)
			.get("/api/products")
			.end((err, res) => {
				id = res.body[0]._id;
        
				chai.request(app)
					.delete(`/api/products/${id}`) 
					.end((err, res) => {
						chai.request(app)
							.get("/api/products")
							.end((err, res) => {
								expect(res).to.have.status(200);
								expect(res.body[0]).to.have.property("name").to.not.equal("myPhone");
								expect(res.body[0]).to.have.property("price").to.not.equal(999);
								expect(res.body[0]).to.have.property("description").to.not.equal("The latest phone with advanced features");
								done(); 
							})
					});
			});  
	});
});
