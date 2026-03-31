import Link from 'next/link';

export default function CTASection() {
  return (
    <div className="bg-[#15120D] text-[#F4EFE8] py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-sm uppercase tracking-[0.3em] text-[#C9A96A] mb-3">Exclusive Access</p>
        <h2 className="text-3xl font-semibold mb-4">
          Ready to find your perfect property?
        </h2>
        <p className="text-lg mb-8 text-[#D9CBB7]">
          Join thousands of satisfied customers worldwide
        </p>
        <Link href="/register" className="lux-button">
          Get Started Today
        </Link>
      </div>
    </div>
  );
}
