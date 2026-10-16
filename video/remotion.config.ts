import { Config } from "@remotion/cli/config";

// Frames are drawn by the Chrome already on this machine, so Remotion downloads no browser of its own.
Config.setBrowserExecutable("C:/Program Files/Google/Chrome/Application/chrome.exe");
Config.setVideoImageFormat("jpeg");
Config.setJpegQuality(95);
Config.setOverwriteOutput(true);
