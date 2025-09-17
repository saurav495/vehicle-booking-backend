import express from "express";
import { MongoMemoryServer } from "mongodb-memory-server";
import app from "../index.js";

let mongoServer;

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();
    process.env.MONGO_URI = mongoUri;

    // Wait for the app to connect to the in-memory MongoDB
    await new Promise((resolve) => setTimeout(resolve, 2000));
});

afterAll(async () => {
    if (mongoServer) {
        await mongoServer.stop();
    }
});