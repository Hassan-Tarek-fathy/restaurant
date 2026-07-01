import Image from "next/image";
import { Mail, Phone, MapPin, Clock } from "lucide-react";

const ContactPage = () => {
  return (
    <section className="min-h-[calc(100vh-6rem)] bg-zinc-950 py-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 grid lg:grid-cols-2 gap-16 items-center">
        {/* LEFT */}
        <div>
          <span className="inline-block px-4 py-2 rounded-full bg-yellow-500/20 text-yellow-500 uppercase tracking-[4px] text-sm font-semibold">
            Contact Us
          </span>

          <h1 className="mt-6 text-5xl md:text-6xl font-black text-white leading-tight">
            We&apos;d Love to Hear From You 🍔
          </h1>

          <p className="mt-6 text-zinc-400 text-lg leading-8 max-w-xl">
            Whether you have questions about our menu, delivery, catering, or
            reservations, our team is ready to help you anytime.
          </p>

          <div className="mt-12 space-y-6">
            <div className="flex items-center gap-5">
              <div className="w-14 h-14 rounded-2xl bg-yellow-500 flex items-center justify-center">
                <MapPin className="text-black" />
              </div>

              <div>
                <h3 className="text-white font-bold text-lg">
                  Address
                </h3>
                <p className="text-zinc-400">
                  25 Burger Street, New York, USA
                </p>
              </div>
            </div>

            <div className="flex items-center gap-5">
              <div className="w-14 h-14 rounded-2xl bg-yellow-500 flex items-center justify-center">
                <Phone className="text-black" />
              </div>

              <div>
                <h3 className="text-white font-bold text-lg">
                  Phone
                </h3>
                <p className="text-zinc-400">
                  +1 (555) 123-4567
                </p>
              </div>
            </div>

            <div className="flex items-center gap-5">
              <div className="w-14 h-14 rounded-2xl bg-yellow-500 flex items-center justify-center">
                <Mail className="text-black" />
              </div>

              <div>
                <h3 className="text-white font-bold text-lg">
                  Email
                </h3>
                <p className="text-zinc-400">
                  info@bossburger.com
                </p>
              </div>
            </div>

            <div className="flex items-center gap-5">
              <div className="w-14 h-14 rounded-2xl bg-yellow-500 flex items-center justify-center">
                <Clock className="text-black" />
              </div>

              <div>
                <h3 className="text-white font-bold text-lg">
                  Working Hours
                </h3>
                <p className="text-zinc-400">
                  Every Day • 10:00 AM – 11:00 PM
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="relative">
          <div className="absolute inset-0 bg-yellow-500/10 blur-3xl rounded-full" />

          <div className="relative bg-zinc-900 border border-zinc-800 rounded-3xl p-8 shadow-2xl">
            <h2 className="text-3xl font-bold text-white mb-8">
              Send us a Message
            </h2>

            <form className="space-y-5">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full rounded-xl bg-zinc-800 border border-zinc-700 p-4 text-white placeholder:text-zinc-500 focus:border-yellow-500 focus:outline-none"
              />

              <input
                type="email"
                placeholder="Your Email"
                className="w-full rounded-xl bg-zinc-800 border border-zinc-700 p-4 text-white placeholder:text-zinc-500 focus:border-yellow-500 focus:outline-none"
              />

              <textarea
                rows={5}
                placeholder="Write your message..."
                className="w-full rounded-xl bg-zinc-800 border border-zinc-700 p-4 text-white placeholder:text-zinc-500 resize-none focus:border-yellow-500 focus:outline-none"
              />

              <button className="w-full rounded-xl bg-yellow-500 py-4 text-lg font-bold text-black transition-all duration-300 hover:bg-yellow-400 hover:scale-[1.02] shadow-lg shadow-yellow-500/20">
                Send Message
              </button>
            </form>

            <div className="relative h-64 mt-10">
              <Image
                src="/offerProduct.png"
                alt="Boss Burger"
                fill
                className="object-contain hover:scale-105 transition duration-500"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactPage;