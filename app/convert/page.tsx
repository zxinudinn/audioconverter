"use client";

import { useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Upload,
  ArrowRight,
  HelpCircle,
  User,
  Globe,
  Music,
  LogIn,
  LogOut
} from "lucide-react";
import { motion } from "framer-motion";

export default function ConvertPage() {
  const { data: session, status } = useSession();
  const [robloxUserId, setRobloxUserId] = useState("");
  const [robloxApiKey, setRobloxApiKey] = useState("");
  const [robloxGroupId, setRobloxGroupId] = useState("");
  const [robloxGroupApiKey, setRobloxGroupApiKey] = useState("");
  const [accountType, setAccountType] = useState<"personal" | "group">("personal");
  const [activeTab, setActiveTab] = useState<"convert" | "roblox">("convert");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
const [isUploading, setIsUploading] = useState(false);
const [audioSource, setAudioSource] = useState<"url" | "file">("url");
const [audioUrl, setAudioUrl] = useState("");

const handleSaveSettings = async () => {
  try {
    setIsSaving(true);

    const res = await fetch("/api/roblox/settings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        accountType,
        robloxUserId,
        robloxApiKey,
        robloxGroupId,
        robloxGroupApiKey,
      }),
    });

    if (!res.ok) {
      throw new Error("Failed to save settings");
    }

    alert("Roblox settings saved.");
  } catch (err) {
    console.error(err);
    alert("Unable to save Roblox settings.");
  } finally {
    setIsSaving(false);
  }
};

const handleConvert = async () => {
  try {
    setIsUploading(true);

    const form = new FormData();

    form.append("accountType", accountType);
    form.append("userId", robloxUserId);
    form.append("groupId", robloxGroupId);

    if (audioSource === "url") {
      if (!audioUrl.trim()) {
        alert("Please paste a YouTube, SoundCloud or MP3 URL.");
        return;
      }

      form.append("sourceType", "url");
      form.append("audioUrl", audioUrl);

    } else {
      if (!selectedFile) {
        alert("Please select an audio file.");
        return;
      }

      form.append("sourceType", "file");
      form.append("file", selectedFile);
    }

    const res = await fetch("/api/convert", {
      method: "POST",
      body: form,
    });

    if (!res.ok) {
      throw new Error("Convert failed");
    }

    const result = await res.json();

    console.log(result);

    alert("Conversion completed!");

  } catch (err) {
    console.error(err);
    alert("Conversion failed.");
  } finally {
    setIsUploading(false);
  }
};

  // File handlers
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setSelectedFile(e.dataTransfer.files[0]);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0a0b14] text-white">
      <Header />

      <main className="flex-1 pt-28 pb-12 px-4">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Hero Section */}
            <div className="mb-10">
              <h1 className="text-4xl md:text-5xl font-black mb-2">
                CONVERT & UPLOAD TO <span className="bg-gradient-to-r from-[#38bdf8] to-[#6366f1] bg-clip-text text-transparent">ROBLOX</span>
              </h1>
              <p className="text-[#8b93b1] text-lg">
                Convert audio from files, YouTube or SoundCloud and upload directly to Roblox
              </p>
            </div>

            {/* Session Status */}
            <div className="mb-8">
              {status === "loading" ? (
                <div className="bg-[#1a1c2e] rounded-xl p-4 border border-[#2a2d4e] text-center">
                  <div className="inline-block animate-spin rounded-full h-6 w-6 border-2 border-[#38bdf8] border-t-transparent mr-2" />
                  Loading...
                </div>
              ) : session ? (
                <div className="bg-[#1a1c2e] rounded-xl p-4 border border-[#2a2d4e] flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <img
                      src={session.user?.image || "https://i.pravatar.cc/150?img=12"}
                      alt={session.user?.name || "User"}
                      className="w-12 h-12 rounded-full"
                    />
                    <div>
                      <p className="text-sm text-[#8b93b1] uppercase tracking-wider font-medium">Logged in as</p>
                      <p className="text-lg font-semibold">{session.user?.name}</p>
                      <p className="text-sm text-[#38bdf8]">{session.user?.email}</p>
                    </div>
                  </div>
                  <Button
                    variant="default"
                    className="bg-[#121425] hover:bg-[#2a2d4e] text-white border border-[#2a2d4e]"
                    onClick={() => signOut()}
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign Out
                  </Button>
                </div>
              ) : (
                <div className="bg-[#1a1c2e] rounded-xl p-6 border border-[#2a2d4e] text-center">
                  <p className="text-[#8b93b1] mb-4">Please sign in to convert audio</p>
                  <Button
                    variant="default"
                    className="bg-[#5865F2] hover:bg-[#4752C4] text-white gap-2"
                    onClick={() => signIn("discord")}
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
                    </svg>
                    <LogIn className="w-4 h-4 mr-2" />
                    Sign in with Discord
                  </Button>
                </div>
              )}
            </div>

            {/* Tabs */}
            <div className="flex gap-4 mb-8 border-b border-[#2a2d4e]">
              <button
                onClick={() => setActiveTab("convert")}
                className={`pb-4 px-2 font-semibold text-lg transition-colors ${
                  activeTab === "convert" ? "text-[#38bdf8] border-b-2 border-[#38bdf8]" : "text-[#8b93b1] hover:text-white"
                }`}
              >
                Convert Audio
              </button>
              <button
                onClick={() => setActiveTab("roblox")}
                className={`pb-4 px-2 font-semibold text-lg transition-colors ${
                  activeTab === "roblox" ? "text-[#38bdf8] border-b-2 border-[#38bdf8]" : "text-[#8b93b1] hover:text-white"
                }`}
              >
                Roblox Account
              </button>
            </div>

            {/* Tab Content */}
            {activeTab === "convert" ? (
              <div className="bg-gradient-to-br from-[#1a1c2e] to-[#0f1120] rounded-2xl border border-[#2a2d4e] p-8">
                {/* Conversion Limit */}
                <div className="mb-6 bg-[#121425] rounded-xl p-4 border border-[#2a2d4e]">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-white">2 / 2 conversions remaining</span>
                    <span className="text-xs text-[#38bdf8]">Free plan • Resets daily</span>
                  </div>
                  <div className="w-full bg-[#2a2d4e] rounded-full h-2">
                    <div className="bg-gradient-to-r from-[#38bdf8] to-[#6366f1] h-2 rounded-full" style={{ width: "100%" }} />
                  </div>
                </div>

               {/* Audio Source */}
<div className="mb-6">
  <label className="block text-sm font-medium text-[#8b93b1] mb-3">
    Audio Source
  </label>

  <div className="grid grid-cols-2 gap-3">
    <Button
      type="button"
      onClick={() => setAudioSource("url")}
      className={
        audioSource === "url"
          ? "bg-[#38bdf8] text-black"
          : "bg-[#121425] border border-[#2a2d4e] text-white"
      }
    >
      🌐 URL
    </Button>

    <Button
      type="button"
      onClick={() => setAudioSource("file")}
      className={
        audioSource === "file"
          ? "bg-[#38bdf8] text-black"
          : "bg-[#121425] border border-[#2a2d4e] text-white"
      }
    >
      📁 Upload File
    </Button>
  </div>
</div>

{/* URL Input */}
{audioSource === "url" && (
  <div className="mb-6">
    <label className="block text-sm font-medium text-[#8b93b1] mb-2">
      YouTube / SoundCloud / MP3 URL
    </label>

    <div className="relative">
      <Music className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#8b93b1]" />

      <Input
        type="url"
        value={audioUrl}
        onChange={(e) => setAudioUrl(e.target.value)}
        placeholder="https://youtube.com/... atau https://soundcloud.com/..."
        className="pl-12 bg-[#121425] border-[#2a2d4e] text-white placeholder-[#5a5f8a] h-14"
      />
    </div>
  </div>
)}

{/* Upload File */}
{audioSource === "file" && (
  <div className="mb-6">
    <label className="block text-sm font-medium text-[#8b93b1] mb-2">
      Upload Audio File
    </label>

    <input
      id="file-upload"
      type="file"
      accept=".mp3,.wav,.ogg,.m4a"
      onChange={handleFileChange}
      className="hidden"
    />

    <div
      className={`border-2 border-dashed rounded-xl p-12 text-center bg-[#121425] cursor-pointer transition-all ${
        isDragging
          ? "border-[#38bdf8]"
          : "border-[#2a2d4e] hover:border-[#38bdf8]"
      }`}
      onClick={() => document.getElementById("file-upload")?.click()}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {selectedFile ? (
        <>
          <Music className="w-12 h-12 text-[#38bdf8] mx-auto mb-4" />

          <p className="text-white font-semibold">
            {selectedFile.name}
          </p>

          <p className="text-sm text-[#8b93b1] mt-1">
            {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
          </p>

          <Button
            type="button"
            variant="ghost"
            className="mt-4"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedFile(null);
            }}
          >
            Remove File
          </Button>
        </>
      ) : (
        <>
          <Upload className="w-12 h-12 text-[#8b93b1] mx-auto mb-4" />

          <p className="text-white">
            Drag & Drop Audio Here
          </p>

          <p className="text-sm text-[#8b93b1] mt-2">
            or click to browse
          </p>
        </>
      )}
    </div>
  </div>
)}

                <Button
  onClick={handleConvert}
  disabled={!session || isUploading}
  className="w-full h-14 bg-gradient-to-r from-[#38bdf8] to-[#0ea5e9] hover:from-[#0ea5e9] hover:to-[#38bdf8] text-black font-bold text-lg"
>
  {isUploading
    ? "Uploading..."
    : session
    ? "Convert & Upload to Roblox"
    : "Please Sign In to Convert"}
</Button>
              </div>
            ) : (
              <div className="bg-gradient-to-br from-[#1a1c2e] to-[#0f1120] rounded-2xl border border-[#2a2d4e] p-8">
                <div className="text-[#8b93b1] text-sm mb-6 leading-relaxed">
                  Follow the steps below to create an API key and connect your Roblox account.
                </div>

                <div className="flex items-center gap-3 mb-6">
                  <Button variant="default" className="bg-[#121425] hover:bg-[#2a2d4e] text-white border border-[#2a2d4e] flex-1">
                    Create API Key on Roblox Creator Hub
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>

                <div className="flex gap-3 mb-6">
                  <Button 
                    variant="default" 
                    className={`flex-1 ${accountType === "personal" ? "bg-[#38bdf8] text-black" : "bg-[#121425] text-[#8b93b1] border border-[#2a2d4e]"}`}
                    onClick={() => setAccountType("personal")}
                  >
                    <User className="w-4 h-4 mr-2" />
                    Personal Account
                  </Button>
                  <Button 
                    variant="default" 
                    className={`flex-1 ${accountType === "group" ? "bg-[#38bdf8] text-black" : "bg-[#121425] text-[#8b93b1] border border-[#2a2d4e]"}`}
                    onClick={() => setAccountType("group")}
                  >
                    <Globe className="w-4 h-4 mr-2" />
                    Group Account
                  </Button>
                </div>

                {/* Instructions */}
                <div className="bg-[#121425] rounded-xl p-4 mb-6 border border-[#38bdf8]/30">
                  <h3 className="flex items-center gap-2 text-white font-semibold mb-3">
                    <HelpCircle className="w-5 h-5 text-[#38bdf8]" />
                    How to Get Your API Key
                  </h3>
                  <ol className="list-decimal list-inside text-[#8b93b1] text-sm space-y-2">
                    <li>Press the "Create API Key" button on the Roblox Creator Hub</li>
                    <li>Set a name for your API key (e.g., "ZY STUDIO")</li>
                    <li>Create an API key with read and write permissions (Assets:Read and Assets:Write) to enable moderation detection</li>
                    <li>Click "Save & Generate Key" button</li>
                    <li>Copy the generated API key (you won't be able to see it again!)</li>
                    <li>Paste the API key into the form below and click "Save"</li>
                  </ol>
                </div>

                {accountType === "personal" ? (
                  <>
                    {/* Roblox User ID */}
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-[#8b93b1] mb-2">
                        Roblox User ID
                      </label>
                      <Input
                        type="text"
                        value={robloxUserId}
                        onChange={(e) => setRobloxUserId(e.target.value)}
                        placeholder="Enter your Roblox User ID"
                        className="bg-[#121425] border-[#2a2d4e] text-white placeholder-[#5a5f8a] focus:border-[#38bdf8] focus:ring-0"
                        disabled={!session}
                      />
                      <p className="text-xs text-[#5a5f8a] mt-1">Example: 921755467</p>
                    </div>

                    {/* API Key */}
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-[#8b93b1] mb-2">
                        API Key
                      </label>
                      <Input
                        type="password"
                        value={robloxApiKey}
                        onChange={(e) => setRobloxApiKey(e.target.value)}
                        placeholder="••••••••••••••••••••"
                        className="bg-[#121425] border-[#2a2d4e] text-white placeholder-[#5a5f8a] focus:border-[#38bdf8] focus:ring-0"
                        disabled={!session}
                      />
                      <p className="text-xs text-[#5a5f8a] mt-1">Optional - only update if you have a new API key</p>
                    </div>
                  </>
                ) : (
                  <>
                    {/* Group ID */}
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-[#8b93b1] mb-2">
                        Roblox Group ID
                      </label>
                      <Input
                        type="text"
                        value={robloxGroupId}
                        onChange={(e) => setRobloxGroupId(e.target.value)}
                        placeholder="Enter your Roblox Group ID"
                        className="bg-[#121425] border-[#2a2d4e] text-white placeholder-[#5a5f8a] focus:border-[#38bdf8] focus:ring-0"
                        disabled={!session}
                      />
                      <p className="text-xs text-[#5a5f8a] mt-1">Example: 1234567</p>
                    </div>

                    {/* Roblox User ID (for group) */}
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-[#8b93b1] mb-2">
                        Your Roblox User ID
                      </label>
                      <Input
                        type="text"
                        value={robloxUserId}
                        onChange={(e) => setRobloxUserId(e.target.value)}
                        placeholder="Enter your Roblox User ID"
                        className="bg-[#121425] border-[#2a2d4e] text-white placeholder-[#5a5f8a] focus:border-[#38bdf8] focus:ring-0"
                        disabled={!session}
                      />
                      <p className="text-xs text-[#5a5f8a] mt-1">Example: 921755467</p>
                    </div>

                    {/* Group API Key */}
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-[#8b93b1] mb-2">
                        Group API Key
                      </label>
                      <Input
                        type="password"
                        value={robloxGroupApiKey}
                        onChange={(e) => setRobloxGroupApiKey(e.target.value)}
                        placeholder="••••••••••••••••••••"
                        className="bg-[#121425] border-[#2a2d4e] text-white placeholder-[#5a5f8a] focus:border-[#38bdf8] focus:ring-0"
                        disabled={!session}
                      />
                      <p className="text-xs text-[#5a5f8a] mt-1">Optional - only update if you have a new API key</p>
                    </div>
                  </>
                )}

                <p className="text-xs text-[#5a5f8a] mb-6 leading-relaxed">
                  Your API key is encrypted and stored securely. We never share this data.
                </p>

                <Button
  onClick={handleSaveSettings}
  disabled={!session || isSaving}
  className="w-full bg-gradient-to-r from-[#38bdf8] to-[#0ea5e9] hover:from-[#0ea5e9] hover:to-[#38bdf8] text-black font-bold"
>
  {isSaving ? "Saving..." : "Save Roblox Settings"}
</Button>
              </div>
            )}
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
