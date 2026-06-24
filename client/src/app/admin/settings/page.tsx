"use client";

import { toast } from "sonner";

import { Section } from "@/components/common/Section";
import { Field } from "@/components/common/Field";
import { Toggle } from "@/components/common/Toggle";

export default function SettingsPage() {
  return (
    <div className="space-y-10">
      <div>
        <div className="text-eyebrow">Account</div>

        <h1 className="mt-2 font-display text-4xl tracking-tight">Settings</h1>
      </div>

      <Section title="Store" desc="Public storefront information.">
        <Field label="Store name" defaultValue="NOIR Devices" />

        <Field label="Support email" defaultValue="support@noir.com" />

        <Field label="Currency" defaultValue="USD" />
      </Section>

      <Section title="Notifications" desc="Choose what we ping you about.">
        <Toggle
          label="New orders"
          desc="Get notified the moment a new order comes in."
          defaultChecked
        />

        <Toggle
          label="Low stock alerts"
          desc="When a product drops below 5 units."
          defaultChecked
        />

        <Toggle
          label="Weekly digest"
          desc="A summary delivered every Monday morning."
        />
      </Section>

      <Section title="Profile" desc="Your admin profile.">
        <Field label="Full name" defaultValue="Alex Morgan" />

        <Field label="Email" defaultValue="alex@noir.com" />
      </Section>

      <div>
        <button
          onClick={() => toast.success("Settings saved (mock)")}
          className="inline-flex h-11 items-center rounded-full bg-foreground px-6 text-sm font-medium text-background transition hover:opacity-90"
        >
          Save changes
        </button>
      </div>
    </div>
  );
}
