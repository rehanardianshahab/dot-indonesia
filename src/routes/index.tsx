import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
  component: Index,
});

function Index() {
  return (
    <div className="container text-center">
      <img src="/welcome.svg" className="w-1-3" />
      <h2 className="font-bold text-primary mt-10">Welcome to my website</h2>
    </div>
  );
}
