import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import { Copy, Download } from "lucide-react";
import { FileUpload } from "../components/ui/file-upload";
import EncryptButton from "../components/ui/EncryptButton";

function Encrypt() {
  const [text, setText] = useState(""); // For text input mode
  const [file, setFile] = useState(null); // For file upload mode
  const [algorithm, setAlgorithm] = useState("1"); // Default to AES (value "1")
  const [mode, setMode] = useState("text"); // Track selected mode ("text" or "file")
  const [encryptionMode, setEncryptionMode] = useState("simple"); // Track Simple or Advanced mode
  const [keySize, setKeySize] = useState("16"); // Default Key Size (128 bits)
  const [userIv, setUserIv] = useState(""); // State for user-provided IV
  const [userKey, setUserKey] = useState(""); // State for user-provided Key
  const [showOutputFields, setShowOutputFields] = useState(false); // State to control visibility of output fields
  const [encryptedMessage, setEncryptedMessage] = useState(""); // State for Encrypted Message
  const [keyValue, setKeyValue] = useState(""); // State for Key Value
  const [ivValue, setIvValue] = useState(""); // State for IV
  const [encryptedFile, setEncryptedFile] = useState("");
  const [encryptedHexFile, setEncryptedHexFile] = useState("");

  // Reset output fields when mode or encryptionMode changes
  useEffect(() => {
    setShowOutputFields(false);
    setEncryptedMessage("");
    setKeyValue("");
    setIvValue("");
    setEncryptedFile(null);
  }, [mode, encryptionMode]);

  // Function to generate key sizes based on the selected algorithm
  const getKeySizes = (algorithm) => {
    switch (algorithm) {
      case "1": // AES
        return ["16", "24", "32"]; // 128, 192, 256 bits
      case "2": // 3DES
        return ["16", "24"]; // 128, 192 bits
      case "3": // Blowfish
        return Array.from({ length: 56 - 4 + 1 }, (_, i) => (i + 4).toString()); // 32 to 448 bits
      case "4": // Twofish
        return ["16", "24", "32"]; // 128, 192, 256 bits
      default:
        return [];
    }
  };

  // Function to get the block size based on the selected algorithm
  const getBlockSize = (algorithm) => {
    switch (algorithm) {
      case "1": // AES
        return 128;
      case "2": // 3DES
        return 64;
      case "4": // Twofish
        return 128;
      case "3": // Blowfish
        return 64;
      default:
        return 0;
    }
  };

  // Function to validate all required fields
  const validateFields = () => {
    if (mode === "text" && !text) {
      return false;
    } else if (mode === "file" && !file) {
      return false;
    } else if (encryptionMode === "advanced") {
      if (!userIv || !userKey) {
        return false;
      }
    }
    return true;
  };

  // Function to handle encryption
  const handleEncrypt = async () => {
    try {
      // Validate all fields before proceeding
      if (!validateFields()) {
        return;
      }

      // Create FormData object
      const formData = new FormData();
      formData.append("ipmode", mode);
      formData.append("mode", encryptionMode);
      formData.append("algorithm", algorithm);
      const blockSizeInBits = getBlockSize(algorithm);
      const blockSizeInBytes = blockSizeInBits / 8;
      formData.append("blocksize", blockSizeInBytes.toString());
      formData.append("keysize", keySize);

      if (mode === "text") {
        formData.append("iptext", text);
      } else if (mode === "file") {
        formData.append("ipfile", file);
      }

      if (encryptionMode === "advanced") {
        formData.append("iv", userIv);
        formData.append("kvalue", userKey);
      }

      // Log form data for debugging
      for (const [key, value] of formData.entries()) {
        console.log(key, value);
      }

      // Send the form data to the backend
      const response = await fetch("https://5000-cs-9e739aa8-3f03-46bb-b62b-c83686e1a010.cs-asia-southeast1-yelo.cloudshell.dev/uploader/", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Encryption failed");
      }

      const result = await response.json();
      console.log("Encryption result:", result);

      // Access the nested `data` object in the response
      const { encryptedMessage, keyValue, ivValue, encryptedFile, encryptedHexFile } =
        result.Data;

      // Update state with the response data
      setEncryptedMessage(encryptedMessage || "");
      setKeyValue(keyValue || "");
      setIvValue(ivValue || "");
      setEncryptedFile(encryptedFile || "");
      setEncryptedHexFile(encryptedHexFile || "");
      setShowOutputFields(true);
    } catch (err) {
      console.error("Encryption failed:", err);
    }
  };

  // Function to handle file download
  const handleFileDownload = () => {
    if (encryptedFile) {
      window.open(
        `https://5000-cs-9e739aa8-3f03-46bb-b62b-c83686e1a010.cs-asia-southeast1-yelo.cloudshell.dev/download/${encryptedFile}`,
        "_self"
      );
    }
  };

  const handleHexFileDownload = () => {
    if (encryptedHexFile) {
      window.open(
        `https://5000-cs-9e739aa8-3f03-46bb-b62b-c83686e1a010.cs-asia-southeast1-yelo.cloudshell.dev/download/${encryptedHexFile}`,
        "_self"
      );
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="container py-10 min-h-screen flex flex-col border-none">
      <Card className="flex-1 border-none shadow-none">
        <CardHeader className="pt-0">
          <CardTitle>Encrypt Message</CardTitle>
          <CardDescription>
            Choose an algorithm and enter your message or upload a file to
            encrypt
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 overflow-y-auto">
          {/* Choose Algorithm */}
          <div className="space-y-2">
            <Label>Choose your algorithm</Label>
            <select
              value={algorithm}
              onChange={(e) => setAlgorithm(e.target.value)}
              className="w-full border rounded-lg p-2"
            >
              <option value="1">AES</option>
              <option value="2">3DES</option>
              <option value="3">Blowfish</option>
              <option value="4">Twofish</option>
            </select>
          </div>

          {/* Mode Selection */}
          <div className="space-y-2">
            <Label>Choose Mode</Label>
            <div className="flex space-x-4">
              <Button
                className={`inline-flex rounded-lg shadow-sm p-3 cursor-pointer ${
                  mode === "text"
                    ? "bg-black text-white"
                    : "bg-white text-gray-800 border-2 border-black"
                }`}
                onClick={() => setMode("text")}
              >
                Text Input
              </Button>
              <Button
                className={`inline-flex rounded-lg shadow-sm p-3 cursor-pointer ${
                  mode === "file"
                    ? "bg-black text-white"
                    : "bg-white text-gray-800 border-2 border-black"
                }`}
                onClick={() => setMode("file")}
              >
                File Upload
              </Button>
            </div>
          </div>

          {/* Conditional UI for Text Input */}
          {mode === "text" && (
            <>
              {/* Simple/Advanced Selection */}
              <div className="space-y-2">
                <Label>Choose Encryption Mode</Label>
                <div className="flex space-x-4">
                  <Button
                    className={`inline-flex rounded-lg shadow-sm p-3 cursor-pointer ${
                      encryptionMode === "simple"
                        ? "bg-black text-white"
                        : "bg-white text-gray-800 border-2 border-black"
                    }`}
                    onClick={() => setEncryptionMode("simple")}
                  >
                    Simple
                  </Button>
                  <Button
                    className={`inline-flex rounded-lg shadow-sm p-3 cursor-pointer ${
                      encryptionMode === "advanced"
                        ? "bg-black text-white"
                        : "bg-white text-gray-800 border-2 border-black"
                    }`}
                    onClick={() => setEncryptionMode("advanced")}
                  >
                    Advanced
                  </Button>
                </div>
              </div>

              {/* Key Size Dropdown for Both Modes */}
              <div className="space-y-2">
                <Label>Key Size</Label>
                <select
                  value={keySize}
                  onChange={(e) => setKeySize(e.target.value)}
                  className="w-full border rounded-lg p-2"
                >
                  {getKeySizes(algorithm).map((size) => (
                    <option key={size} value={size}>
                      {algorithm === "3"
                        ? `${parseInt(size) * 8} bits` // For Blowfish, show bits (size*8)
                        : size === "8"
                        ? "64 bits"
                        : size === "16"
                        ? "128 bits"
                        : size === "24"
                        ? "192 bits"
                        : "256 bits"}
                    </option>
                  ))}
                </select>
              </div>

              {/* Simple Mode: Show only Message Input and Encrypt Button */}
              {encryptionMode === "simple" && (
                <>
                  {/* Message Area */}
                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      placeholder="Enter your message here"
                      value={text}
                      onChange={(e) => setText(e.target.value)}
                      required
                    />
                    {!text && (
                      <p className="text-sm text-red-500">
                        Message is required.
                      </p>
                    )}
                  </div>

                  <EncryptButton
                    onClick={handleEncrypt}
                    disabled={!text}
                    className="cursor-pointer"
                  />
                </>
              )}

              {/* Advanced Mode: Show Block Size, Key Size, and IV Input */}
              {encryptionMode === "advanced" && (
                <>
                  {/* Display Block Size */}
                  <div className="space-y-2">
                    <Label>Block Size</Label>
                    <input
                      type="text"
                      value={`${getBlockSize(algorithm)} bits`}
                      readOnly
                      className="w-full border rounded-lg p-2 bg-gray-100"
                    />
                  </div>

                  {/* IV Input in Advanced Mode */}
                  <div className="space-y-2">
                    <Label>IV Input</Label>
                    <input
                      type="text"
                      value={userIv}
                      onChange={(e) => setUserIv(e.target.value)}
                      placeholder="Enter your IV"
                      className="w-full border rounded-lg p-2"
                      required
                    />
                    {!userIv && (
                      <p className="text-sm text-red-500">
                        IV Input is required.
                      </p>
                    )}
                  </div>

                  {/* Key Input in Advanced Mode */}
                  <div className="space-y-2">
                    <Label>Key Input</Label>
                    <input
                      type="text"
                      value={userKey}
                      onChange={(e) => setUserKey(e.target.value)}
                      placeholder="Enter your Key"
                      className="w-full border rounded-lg p-2"
                      required
                    />
                    {!userKey && (
                      <p className="text-sm text-red-500">
                        Key Input is required.
                      </p>
                    )}
                  </div>

                  {/* Message Area */}
                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      placeholder="Enter your message here"
                      value={text}
                      onChange={(e) => setText(e.target.value)}
                      required
                    />
                    {!text && (
                      <p className="text-sm text-red-500">
                        Message is required.
                      </p>
                    )}
                  </div>

                  <EncryptButton
                    onClick={handleEncrypt}
                    disabled={!text || !userIv || !userKey}
                    className="cursor-pointer"
                  />
                </>
              )}
            </>
          )}

          {/* Conditional UI for File Upload */}
          {mode === "file" && (
            <>
              {/* Simple/Advanced Selection */}
              <div className="space-y-2">
                <Label>Choose Encryption Mode</Label>
                <div className="flex space-x-4">
                  <Button
                    className={`inline-flex rounded-lg shadow-sm p-3 cursor-pointer ${
                      encryptionMode === "simple"
                        ? "bg-black text-white"
                        : "bg-white text-gray-800 border-2 border-black"
                    }`}
                    onClick={() => setEncryptionMode("simple")}
                  >
                    Simple
                  </Button>
                  <Button
                    className={`inline-flex rounded-lg shadow-sm p-3 cursor-pointer ${
                      encryptionMode === "advanced"
                        ? "bg-black text-white"
                        : "bg-white text-gray-800 border-2 border-black"
                    }`}
                    onClick={() => setEncryptionMode("advanced")}
                  >
                    Advanced
                  </Button>
                </div>
              </div>

              {/* Key Size Dropdown for Both Modes */}
              <div className="space-y-2">
                <Label>Key Size</Label>
                <select
                  value={keySize}
                  onChange={(e) => setKeySize(e.target.value)}
                  className="w-full border rounded-lg p-2"
                >
                  {getKeySizes(algorithm).map((size) => (
                    <option key={size} value={size}>
                      {algorithm === "3"
                        ? `${parseInt(size) * 8} bits` // For Blowfish, show bits (size*8)
                        : size === "8"
                        ? "64 bits"
                        : size === "16"
                        ? "128 bits"
                        : size === "24"
                        ? "192 bits"
                        : "256 bits"}
                    </option>
                  ))}
                </select>
              </div>

              {/* Simple Mode for File Upload */}
              {encryptionMode === "simple" && (
                <>
                  {/* File Upload Input */}
                  <div className="space-y-2">
                    <div className="w-full max-w-4xl mx-auto min-h-96 border border-dashed bg-white dark:bg-black border-neutral-200 dark:border-neutral-800 rounded-lg">
                      <FileUpload onChange={(files) => setFile(files[0])} />
                    </div>
                    {!file && (
                      <p className="text-sm text-red-500">File is required.</p>
                    )}
                  </div>

                  <EncryptButton
                    onClick={handleEncrypt}
                    disabled={!file}
                    className="cursor-pointer"
                  />
                </>
              )}

              {/* Advanced Mode for File Upload */}
              {encryptionMode === "advanced" && (
                <>
                  {/* Display Block Size */}
                  <div className="space-y-2">
                    <Label>Block Size</Label>
                    <input
                      type="text"
                      value={`${getBlockSize(algorithm)} bits`}
                      readOnly
                      className="w-full border rounded-lg p-2 bg-gray-100"
                    />
                  </div>

                  {/* IV Input in Advanced Mode */}
                  <div className="space-y-2">
                    <Label>IV Input</Label>
                    <input
                      type="text"
                      value={userIv}
                      onChange={(e) => setUserIv(e.target.value)}
                      placeholder="Enter your IV"
                      className="w-full border rounded-lg p-2"
                      required
                    />
                    {!userIv && (
                      <p className="text-sm text-red-500">
                        IV Input is required.
                      </p>
                    )}
                  </div>

                  {/* Key Input in Advanced Mode */}
                  <div className="space-y-2">
                    <Label>Key Input</Label>
                    <input
                      type="text"
                      value={userKey}
                      onChange={(e) => setUserKey(e.target.value)}
                      placeholder="Enter your Key"
                      className="w-full border rounded-lg p-2"
                      required
                    />
                    {!userKey && (
                      <p className="text-sm text-red-500">
                        Key Input is required.
                      </p>
                    )}
                  </div>

                  {/* File Upload Input */}
                  <div className="space-y-2">
                    <div className="w-full max-w-4xl mx-auto min-h-96 border border-dashed bg-white dark:bg-black border-neutral-200 dark:border-neutral-800 rounded-lg">
                      <FileUpload onChange={(files) => setFile(files[0])} />
                    </div>
                    {!file && (
                      <p className="text-sm text-red-500">File is required.</p>
                    )}
                  </div>
                  <EncryptButton
                    onClick={handleEncrypt}
                    disabled={!file || !userIv || !userKey}
                    className="cursor-pointer"
                  />
                </>
              )}
            </>
          )}

          {/* Display Output Fields */}
          {showOutputFields && (
            <div className="space-y-4">
              {/* Encrypted Message or File */}
              {mode === "text" ? (
                <div className="space-y-2">
                  <Label>Encrypted Message</Label>
                  <Textarea
                    value={encryptedMessage}
                    onChange={(e) => setEncryptedMessage(e.target.value)}
                    placeholder="Encrypted message will appear here"
                    readOnly
                  />
                  <Button
                    onClick={() => copyToClipboard(encryptedMessage)}
                    className="cursor-pointer"
                  >
                    <Copy size={16} className="mr-2" />
                    Copy
                  </Button>
                </div>
              ) : (
                <>
                <div className="space-y-2">
                  <Label>Encrypted File</Label>
                  <Button
                    onClick={handleFileDownload}
                    className="cursor-pointer"
                  >
                    <Download size={16} className="mr-2" />
                    Download Encrypted File
                  </Button>
                </div>
                <div className="space-y-2">
          <Label>Encrypted Hex File</Label>
          <Button
            onClick={handleHexFileDownload}
            className="cursor-pointer"
          >
            <Download size={16} className="mr-2" />
            Download Encrypted Hex File
          </Button>
        </div>
        </>
              )}

              {/* Key Value */}
              <div className="space-y-2">
                <Label>Key Value</Label>
                <Textarea
                  value={keyValue}
                  onChange={(e) => setKeyValue(e.target.value)}
                  placeholder="Key value will appear here"
                  readOnly
                />
                <Button
                  onClick={() => copyToClipboard(keyValue)}
                  className="cursor-pointer"
                >
                  <Copy size={16} className="mr-2" />
                  Copy
                </Button>
              </div>

              {/* IV Value (Only in Advanced Mode) */}
              {encryptionMode === "advanced" && (
                <div className="space-y-2">
                  <Label>IV Value</Label>
                  <Textarea
                    value={ivValue}
                    onChange={(e) => setIvValue(e.target.value)}
                    placeholder="IV value will appear here"
                    readOnly
                  />
                  <Button
                    onClick={() => copyToClipboard(ivValue)}
                    className="cursor-pointer"
                  >
                    <Copy size={16} className="mr-2" />
                    Copy
                  </Button>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default Encrypt;
