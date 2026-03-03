import { MessageCircle } from "lucide-react";

const WHATSAPP_NUMBER = "919819236010";
const WHATSAPP_MESSAGE = encodeURIComponent("Hi, I'd like to enquire about your industrial rubber components.");

const WhatsAppButton = () => (
  <a
    href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`}
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Chat on WhatsApp"
    className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[hsl(142,70%,45%)] text-white shadow-lg transition-transform duration-200 hover:scale-110"
  >
    <MessageCircle className="h-6 w-6" fill="white" stroke="none" />
  </a>
);

export default WhatsAppButton;
