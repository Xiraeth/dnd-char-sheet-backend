export function setAuthCookie(res, token) {
  const isProduction = process.env.NODE_ENV === "production";

  res.cookie("token", token, {
    httpOnly: true,
    secure: isProduction, // Secure cookies only in production
    sameSite: "None", // Cross-site in production, more relaxed in dev
    maxAge: 24 * 60 * 60 * 1000, // 1 day
    path: "/",
  });
}
