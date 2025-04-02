import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { AlertCircle, Key, Lock, Shield } from "lucide-react";

function Help() {
  return (
    <div className="container py-10">
      <div className="max-w-3xl mx-auto space-y-8">
        <section>
          <h1 className="text-3xl font-bold mb-4">Help & Documentation</h1>
          <p className="text-muted-foreground">
            Learn how to use our encryption tools effectively and securely
            protect your data.
          </p>
        </section>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Key className="h-5 w-5" />
              Getting Started
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>To encrypt or decrypt a message:</p>
            <ol className="list-decimal pl-4 space-y-2">
              <li>
                Choose an encryption algorithm (AES, 3DES, Twofish, or Blowfish)
              </li>
              <li>Enter your message in the text field</li>
              <li>Provide a strong password</li>
              <li>Click the Encrypt/Decrypt button</li>
              <li>Copy the result using the copy button</li>
            </ol>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lock className="h-5 w-5" />
              Password Guidelines
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>For maximum security, your password should:</p>
            <ul className="list-disc pl-4 space-y-2">
              <li>Be at least 12 characters long</li>
              <li>Include uppercase and lowercase letters</li>
              <li>Include numbers and special characters</li>
              <li>Not be used across multiple services</li>
              <li>Be stored securely and not shared</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5" />
              Important Notes
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <ul className="list-disc pl-4 space-y-2">
              <li>
                Always use the same algorithm and password for encryption and
                decryption
              </li>
              <li>
                Keep your password safe - if lost, encrypted data cannot be
                recovered
              </li>
              <li>
                For sensitive data, consider using additional security measures
              </li>
              <li>
                The strength of the encryption depends on the password strength
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Algorithm Comparison
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div>
                <h3 className="font-semibold mb-2">AES (Recommended)</h3>
                <p className="text-sm text-muted-foreground">
                  The current industry standard. Offers the best combination of
                  security and performance.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">3DES</h3>
                <p className="text-sm text-muted-foreground">
                  Older standard, still secure but slower than AES. Good for
                  legacy system compatibility.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Twofish</h3>
                <p className="text-sm text-muted-foreground">
                  Strong security with flexible key sizes. Good alternative to
                  AES for specific use cases.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Blowfish</h3>
                <p className="text-sm text-muted-foreground">
                  Fast and secure for most purposes, but has a smaller block
                  size than modern alternatives.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default Help;
