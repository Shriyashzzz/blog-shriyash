import request from "supertest";
import { prisma } from "../config/prisma.js";
import { app } from "../app.js";

describe("test newsLetter Signup ", () => {
  const email = "testEmail@testmail.com";
  afterAll(async () => {
    await prisma.newsSubscribers.delete({
      where: {
        email: email,
      },
    });
    prisma.$disconnect();
  });
  it("signUp for newsLetter", (done) => {
    request(app)
      .post("/api/newsletter/signup")
      .send({ email: email })
      .expect(200)
      .end(done);
  });

  it("check if the user exists in the database", async () => {
    const response = await prisma.newsSubscribers.findUniqueOrThrow({
      where: {
        email: email,
      },
    });
    expect(response.email).toBe(email);
  });
});
