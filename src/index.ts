import { DiscordSR, VoiceMessage } from "discord-speech-recognition";
import { Client } from "discord.js";
import dotenv from "dotenv";
dotenv.config();

const client = new Client();
const sr = new DiscordSR(client);

// let currentConnection: VoiceConnection;

sr.client.on("voiceStateUpdate", async (oldState, newState) => {
  if (newState.channelID !== null) {
    await newState.member?.voice.channel?.join();
  } else {
    await oldState.channel?.leave();
  }
});

sr.client.on("speech", async (msg: VoiceMessage) => {
  if (msg.content) {
    if (msg.content.toLowerCase().includes("b****")) {
      msg.member?.voice.kick();
    }
  }
});

client.on("ready", () => {
  console.log(`Logged in as ${client?.user?.tag}!`);
});

client.login(process.env.TOKEN);
