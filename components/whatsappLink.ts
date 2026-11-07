import { SITE_URL } from "../lib/siteUrl";

// Business line: WhatsApp Business account "Yi Chong | Engineer".
// TODO: swap to the WhatsApp Business short link (https://wa.me/message/<code>) once it exists,
// so the raw number leaves the page source.
const WHATSAPP_BUSINESS_NUMBER = "60173523876";

// Prefilled text marks the lead as coming from the site. GA4 cannot see WhatsApp opens.
const WHATSAPP_PREFILLED_TEXT = "Hi Yi Chong, I saw your site. I would like the free call. My business is: ";

export const WHATSAPP_CHAT_URL = `https://wa.me/${WHATSAPP_BUSINESS_NUMBER}?text=${encodeURIComponent(WHATSAPP_PREFILLED_TEXT)}`;

// For staff who are not the owner: forwards the site to their boss on WhatsApp. No number, so they pick the chat.
const FORWARD_TO_BOSS_TEXT = `Boss, this engineer automates the work we do by hand. First call is free: ${SITE_URL}`;

export const WHATSAPP_FORWARD_URL = `https://wa.me/?text=${encodeURIComponent(FORWARD_TO_BOSS_TEXT)}`;
