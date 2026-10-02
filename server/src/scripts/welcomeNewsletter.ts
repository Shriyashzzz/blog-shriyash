import { sendNewsLetterToSubscribers } from "../services/email.service.js";
import { welcomeNewsletterTemplate } from "../templates/newsletter_welcome.template.js";
import { generateSubscriberToken } from "../ultility/getSubscriberToken.js";

// test script

const dummySubscribers = ["ghimireshriyash@gmail.com"];
const welcomeSubject = "Heya, Thanks for subscribing to my newsletter!";
const dummyToken: string | undefined = generateSubscriberToken(
  "ghimireshriyash@gmail.com",
);
if (dummyToken) {
  await sendNewsLetterToSubscribers(
    welcomeSubject,
    welcomeNewsletterTemplate(),
    dummySubscribers,
    dummyToken,
  );
} else {
  console.log("dummy token was undefined");
}
