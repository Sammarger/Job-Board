import SignupForm from "@/components/SignupForm";

const Index = () => {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 py-16">
      <div className="w-full max-w-xl text-center mb-10">
        <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-4 tracking-tight">
          Georgia's Job List
        </h1>
        <p className="text-lg text-muted-foreground max-w-md mx-auto leading-relaxed">
          Georgia Bullens cureated job list.
        </p>
      </div>
      <SignupForm />
      <footer className="mt-16 text-sm text-muted-foreground">
        We respect your privacy. Unsubscribe anytime.
      </footer>
    </main>
  );
};

export default Index;
