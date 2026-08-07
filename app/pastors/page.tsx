import type { Metadata } from "next";
import { PastorsContent } from "./pastors-content";

export const metadata: Metadata = {
  title: "Our Pastors",
  description:
    "Meet the pastors of Trinity Fellowship Addis Ababa: Michael Granger, Amanuel Yehualashet, and Yeabtsega Haile, called to shepherd, teach, and care for the flock of God.",
  alternates: { canonical: "/pastors" },
};

export default function PastorsPage() {
  return (
    <div className="min-h-screen">
      <PastorsContent />
    </div>
  );
}
