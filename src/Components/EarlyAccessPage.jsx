import React, { useState } from "react";
import { ArrowRight, Mail, CheckCircle2, AlertCircle } from "lucide-react";
import emailjs from "@emailjs/browser";

// Initialize EmailJS
emailjs.init("YOUR_PUBLIC_KEY");

const CustomAlert = ({ variant = "default", children }) => {
  const styles = {
    default: "bg-gray-50 border-gray-200 text-gray-800",
    destructive: "bg-red-50 border-red-200 text-red-800",
    success: "bg-purple-50 border-purple-200 text-purple-800",
  };

  return (
    <div className={`flex items-center p-4 rounded-lg border ${styles[variant]}`}>
      {variant === "destructive" && <AlertCircle className="h-5 w-5 text-red-600 mr-2" />}
      {variant === "success" && <CheckCircle2 className="h-5 w-5 text-purple-600 mr-2" />}
      <div>{children}</div>
    </div>
  );
};

const EarlyAccessPage = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      setError("Please enter your email address");
      return;
    }
    if (!email.includes("@")) {
      setError("Please enter a valid email address");
      return;
    }

    setLoading(true);
    try {
      const result = await emailjs.send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", {
        user_email: email,
        signup_time: new Date().toLocaleString(),
        source: "Early Access Landing Page",
      });

      if (result.status === 200) {
        setSubmitted(true);
        setError("");
        setEmail("");
      } else {
        throw new Error("Failed to send email");
      }
    } catch (error) {
      console.error("EmailJS error:", error);
      setError("Failed to sign up. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#4A2A5D] via-[#5d3574] to-[#6b4087] flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-xl">
        {/* Main Content */}
        <div className="relative space-y-8 bg-white/90 backdrop-blur-sm p-8 rounded-3xl shadow-xl border border-purple-100">
          {/* Decorative elements */}
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-24 h-24 bg-purple-500/10 rounded-full blur-2xl" />
          <div className="absolute -top-4 left-1/4 w-32 h-32 bg-purple-300/10 rounded-full blur-3xl" />
          <div className="absolute -top-4 right-1/4 w-32 h-32 bg-purple-400/10 rounded-full blur-3xl" />

          {/* Badge */}
          <div className="relative">
            <span className="inline-block px-4 py-1.5 rounded-full bg-purple-100 text-[#4A2A5D] text-sm font-medium">Early Access Now Open</span>
          </div>

          {/* Title & Description */}
          <div className="relative space-y-4">
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900">Master Science Through</h1>
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900">
              {" "}
              <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-[#4A2A5D] to-[#6b4087]">Smart Learning</span>
            </h1>

            <p className="text-lg text-gray-600 max-w-2xl">
              Revolutionizing science education with spaced retrieval learning. Join our early access program to transform how you learn and retain
              knowledge.
            </p>
          </div>

          {/* Form Section */}
          <div className="relative">
            {!submitted ? (
              <form onSubmit={handleSubmit}>
                <div className="flex flex-col sm:flex-row gap-4 p-2 bg-white rounded-2xl shadow-sm border border-purple-100">
                  <div className="relative flex-grow">
                    <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      className="block w-full rounded-xl border-gray-200 pl-10 py-3 text-gray-900 focus:ring-2 focus:ring-[#4A2A5D] focus:border-[#4A2A5D]"
                      disabled={loading}
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="inline-flex items-center justify-center rounded-xl bg-[#4A2A5D] px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-[#5d3574] focus:outline-none focus:ring-2 focus:ring-[#4A2A5D] focus:ring-offset-2 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        Get Early Access
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </button>
                </div>
                {error && (
                  <div className="mt-4">
                    <CustomAlert variant="destructive">{error}</CustomAlert>
                  </div>
                )}
              </form>
            ) : (
              <CustomAlert variant="success">Thanks for signing up! We'll notify you when we launch.</CustomAlert>
            )}
          </div>

          {/* Feature Highlights */}
          <div className="relative grid grid-cols-1 sm:grid-cols-2 gap-4 pt-8 border-t border-purple-100">
            {["Personalized Learning Path", "Smart Study Schedules", "Enhanced Memory Retention", "Progress Tracking"].map((feature, index) => (
              <div key={index} className="flex items-center gap-2 text-gray-600">
                <CheckCircle2 className="h-5 w-5 text-[#4A2A5D]" />
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EarlyAccessPage;
