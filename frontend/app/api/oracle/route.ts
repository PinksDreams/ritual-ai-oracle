export async function GET() {
  try {
    const res = await fetch("http://127.0.0.1:4000/api/oracle");

    if (!res.ok) {
      return Response.json(
        { error: "Backend not responding" },
        { status: 500 }
      );
    }

    const data = await res.json();
    return Response.json(data);
  } catch (err) {
    return Response.json(
      { error: "Cannot reach backend" },
      { status: 500 }
    );
  }
}