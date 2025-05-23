import { NextRequest, NextResponse } from "next/server";
import { JWT } from "google-auth-library";

const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;

async function getAccessToken() {
  const client = new JWT({
    email: process.env.FIREBASE_CLIENT_EMAIL,
    key: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    scopes: ["https://www.googleapis.com/auth/firebase.messaging"],
  });

  const tokenResponse = await client.authorize();
  return tokenResponse.access_token;
}

export async function POST(req: NextRequest) {
  const { token } = await req.json();

  if (!projectId) {
    return NextResponse.json(
      { error: "Missing FIREBASE_PROJECT_ID" },
      { status: 500 }
    );
  }

  try {
    const accessToken = await getAccessToken();

    const message = {
      message: {
        token,
        data: {
          title: "🔔 Test push avec objet data",
          body: "Hello, OAuth2-based notification",
          icon: "/icons/icon-192.png",
          url: "/",
        },
        // notification: {
        //   title: "🔔 Test push avec objet notification!",
        //   body: "This will show up immediately",
        // },
      },
    };

    const response = await fetch(
      `https://fcm.googleapis.com/v1/projects/${projectId}/messages:send`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(message),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      return NextResponse.json(
        { error: errorText },
        { status: response.status }
      );
    }

    return NextResponse.json({ success: true });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Unknown error" },
      { status: 500 }
    );
  }
}
