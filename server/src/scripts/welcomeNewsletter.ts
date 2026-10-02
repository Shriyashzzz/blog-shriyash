import { sendNewsLetterToSubscribers } from "../services/email.service.js";
import { welcomeNewsletterTemplate } from "../templates/newsletter_welcome.template.js";

const dummySubscribers = ["ghimireshriyash@gmail.com"];
const welcomeSubject = "Heya, Thanks for subscribing to my newsletter!";
await sendNewsLetterToSubscribers(
  welcomeSubject,
  welcomeNewsletterTemplate(),
  dummySubscribers,
);
