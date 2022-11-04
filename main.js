import dotenv from 'dotenv'
import DiscordClient from "./src/client.js";
dotenv.config()

const client = new DiscordClient()

client.initClient()
client.initEvents()
client.loginClient()
