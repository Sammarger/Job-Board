import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { Mail, CheckCircle2 } from "lucide-react";

const ROLES = [
  "Leadership & Executive",
  "Policy, Government & Public Affairs",
  "Research, Academia & Fellowships",
  "Data, AI & Tech",
  "Product, Design & UX",
  "Operators, Program & Project Management",
  "Communications, Media & Marketing",
  "Philanthropy, Fundraising & Impact Investing",
  "Publishing, Journalism & Content",
  "Education, Training & Early Career Programs",
];

const LOCATIONS = [
  "Remote",
  "US - Northeast",
  "US - Mid Atlantic / DC Area",
  "US - Midwest",
  "US - West Coast",
  "UK & Ireland",
  "Western / Central Europe",
  "Asia-Pacific",
];

const SignupForm = () => {
  const [email, setEmail] = useState("");
  const [selectedRoles, setSelectedRoles] = useState<string[]>([]);
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);

  const toggleRole = (role: string) => {
    setSelectedRoles((prev) =>
      prev.includes(role) ? prev.filter((r) => r !== role) : [...prev, role]
    );
  };

  const toggleLocation = (loc: string) => {
    setSelectedLocations((prev) =>
      prev.includes(loc) ? prev.filter((l) => l !== loc) : [...prev, loc]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !email.includes("@")) {
      toast.error("Please enter a valid email address.");
      return;
    }
    if (selectedRoles.length === 0) {
      toast.error("Please select at least one role.");
      return;
    }
    if (selectedLocations.length === 0) {
      toast.error("Please select at least one location.");
      return;
    }

    setSubmitted(true);
    toast.success("You're on the list!");
  };

  if (submitted) {
    return (
      <div className="w-full max-w-xl bg-card rounded-2xl p-10 text-center shadow-sm border border-border">
        <CheckCircle2 className="mx-auto mb-4 h-12 w-12 text-primary" />
        <h2 className="text-2xl font-bold text-foreground mb-2">You're in!</h2>
        <p className="text-muted-foreground">
          We'll send job matches to <span className="font-medium text-foreground">{email}</span>.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-xl bg-card rounded-2xl p-8 md:p-10 shadow-sm border border-border space-y-8"
    >
      {/* Email */}
      <div className="space-y-2">
        <Label htmlFor="email" className="text-sm font-medium text-foreground">
          Email address
        </Label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            id="email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Roles */}
      <div className="space-y-3">
        <Label className="text-sm font-medium text-foreground">
          Roles you're interested in
        </Label>
        <div className="grid grid-cols-2 gap-2">
          {ROLES.map((role) => (
            <label
              key={role}
              className="flex items-center gap-2 rounded-lg border border-border px-3 py-2.5 cursor-pointer hover:bg-secondary/60 transition-colors has-[input:checked]:border-primary has-[input:checked]:bg-primary/5"
            >
              <Checkbox
                checked={selectedRoles.includes(role)}
                onCheckedChange={() => toggleRole(role)}
              />
              <span className="text-sm text-foreground">{role}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Locations */}
      <div className="space-y-3">
        <Label className="text-sm font-medium text-foreground">
          Preferred locations
        </Label>
        <div className="grid grid-cols-2 gap-2">
          {LOCATIONS.map((loc) => (
            <label
              key={loc}
              className="flex items-center gap-2 rounded-lg border border-border px-3 py-2.5 cursor-pointer hover:bg-secondary/60 transition-colors has-[input:checked]:border-primary has-[input:checked]:bg-primary/5"
            >
              <Checkbox
                checked={selectedLocations.includes(loc)}
                onCheckedChange={() => toggleLocation(loc)}
              />
              <span className="text-sm text-foreground">{loc}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Submit */}
      <Button type="submit" size="lg" className="w-full text-base font-semibold">
        Join the List
      </Button>
    </form>
  );
};

export default SignupForm;
