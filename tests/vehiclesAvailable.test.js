import request from "supertest";
import app from "../index.js";
import "../tests/setup.test.js";
import { jest } from '@jest/globals'; // ← add this

jest.setTimeout(30000); // 30 seconds

describe("GET /api/vehicles/available", () => {
    it("should return vehicles meeting capacity", async () => {

        await request(app).post("/api/vehicles").send({
            name: "Toyota Camry",
            type: "Sedan",
            capacity: 5,
            rentalPricePerDay: 70,
            tyers: "4",
        });

        const res = await request(app).get("/api/vehicles/available?capacityRequired=3&fromPincode=392001&toPincode=5210052&startTime=2025-09-20T10:00:00Z");

        expect(res.status).toBe(200);
        expect(res.body.length).toBeGreaterThan(0);
        expect(res.body[0]).toBeGreaterThanOrEqual(2000);
    });
});