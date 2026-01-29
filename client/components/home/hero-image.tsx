import Image from "next/image";

export function HeroImage() {
  return (
    <div className="relative mb-6 h-48 w-48 lg:h-64 lg:w-64">
      <Image
        src="/plantasonya-removebg-preview.png"
        alt="Plank Plant"
        fill
        className="object-contain"
        priority
      />
    </div>
  );
}
