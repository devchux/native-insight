import Link from "next/link";
import { Container } from "@/components/atoms/container";
import { SiteFooter } from "@/components/organisms/site-footer";
import { SiteHeader } from "@/components/organisms/site-header";

export default function NotFound() {
  return <><SiteHeader /><main className="grid min-h-[75dvh] place-items-center pt-24"><Container className="text-center"><p className="text-base font-bold text-brand">404</p><h1 className="mt-5 font-display text-5xl tracking-tight">Page not found.</h1><Link href="/" className="mt-8 inline-block font-bold text-brand">Return home →</Link></Container></main><SiteFooter /></>;
}
