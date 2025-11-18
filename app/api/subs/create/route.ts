export default function POST() {
  return new Response(JSON.stringify({ message: "Create subscription endpoint" }), { status: 200 });
}