import { Config } from "@remotion/cli/config";

// Frames are drawn by a Chrome already installed on the machine, so Remotion downloads no browser of its own. Its
// location is a setting of the machine (REMOTION_CHROME), never written here: this repository is public and holds no
// local paths. Without it, Remotion uses its own browser.
const chrome = process.env.REMOTION_CHROME;
if (chrome) Config.setBrowserExecutable(chrome);
Config.setVideoImageFormat("jpeg");
Config.setJpegQuality(95);
Config.setOverwriteOutput(true);
