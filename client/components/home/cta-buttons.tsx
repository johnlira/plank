import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CtaButtons() {
  return (
    <div className="flex gap-4">
      <Button
        asChild
        variant="outline"
        size="lg"
        className="cursor-pointer gap-2 rounded-full hover:text-white"
      >
        <Link href="/signin">
          Get Started
          <ArrowRight className="size-4" />
        </Link>
      </Button>
      <Button
        asChild
        variant="outline"
        size="lg"
        className="cursor-pointer rounded-full hover:text-white"
      >
        <Link href="#">Documentation</Link>
      </Button>
    </div>
  );
}
