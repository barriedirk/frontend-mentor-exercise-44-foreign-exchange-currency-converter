import { execSync } from "child_process";

try {
  // Get staged files
  const output = execSync("git diff --cached --name-only", {
    encoding: "utf-8",
  });
  const files = output.split("\n");

  // Define forbidden patterns (Regex)
  // Matches .env (but not .env.example), .pem, .key, id_rsa, etc.

  //
  // Regex pattern fails to detect most sensitive files.
  // const secretPattern = /^(\.env|\.pem|id_rsa|\.key|\.p12|\.pfx)$|(\.env$)/;
  // The anchored patterns ^(\.pem|id_rsa|\.key|\.p12|\.pfx)$ require the entire path to match exactly, but git diff --cached --name-only returns full paths like keys/server.key or certs/cert.pem. Only .env works correctly due to the separate \.env$ alternative.
  //
  // For example:
  // - secretPattern.test("keys/server.key") → false (should be true)
  // - secretPattern.test("certs/cert.pem") → false (should be true)

  const secretPattern = /\.env$|\.pem$|id_rsa$|\.key$|\.p12$|\.pfx$/;

  const detectedSecrets = files.filter((file) =>
    secretPattern.test(file.trim()),
  );

  if (detectedSecrets.length > 0) {
    console.error("──────────────────────────────────────────────────────────");
    console.error("❌ [SECURITY ERROR] Sensitive files detected in commit:");
    detectedSecrets.forEach((file) => console.error(`   -> ${file}`));
    console.error("──────────────────────────────────────────────────────────");
    console.error("Please remove these files from staging before committing.");
    process.exit(1);
  }
} catch (error) {
  // If git is not installed or another error occurs
  console.error("Security check failed to run:", error.message);
  process.exit(1);
}
