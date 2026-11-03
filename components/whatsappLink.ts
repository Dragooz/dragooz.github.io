// Business line: WhatsApp Business account "Yi Chong | Engineer".
// TODO: swap to the WhatsApp Business short link (https://wa.me/message/<code>) once it exists,
// so the raw number leaves the page source.
const WHATSAPP_BUSINESS_NUMBER = "60173523876";

// Prefilled text marks the lead as coming from the site. GA4 cannot see WhatsApp opens.
const WHATSAPP_PREFILLED_TEXT = "Hi Yi Chong, I saw your site. I would like the free diagnosis.";

export const WHATSAPP_CHAT_URL = `https://wa.me/${WHATSAPP_BUSINESS_NUMBER}?text=${encodeURIComponent(WHATSAPP_PREFILLED_TEXT)}`;
