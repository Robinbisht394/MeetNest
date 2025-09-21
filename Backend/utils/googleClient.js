import { google } from "googleapis";
import jwt from "jsonwebtoken";

//  OAuth env variables
const {
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  GOOGLE_REDIRECT_URI,
  JWT_SECRET,
} = process.env;

const scopes = ["https://www.googleapis.com/auth/calendar.events"]; // scope

const oauth2Client = new google.auth.OAuth2( // auth client
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  GOOGLE_REDIRECT_URI
);

// build google auth url

export function getAuthUrl(userId) {
  // encode userId into state
  const stateToken = jwt.sign({ userId }, JWT_SECRET, {
    expiresIn: "10m",
  });

  return oauth2Client.generateAuthUrl({
    access_type: "offline",
    scope: scopes,
    state: stateToken,
    prompt: "consent",
  });
}

// exchange code for tokens

export async function getTokens(code) {
  const { tokens } = await oauth2Client.getToken(code);
  console.log(tokens, "gettoken fnx");

  return tokens; //conatin access token , refresh token and expiry date
}

// create calender client with user's token

export function getCalendarClient(tokens) {
  const client = new google.auth.OAuth2(
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET,
    GOOGLE_REDIRECT_URI
  );
  client.setCredentials(tokens);
  return google.calendar({ version: "v3", auth: client });
}
