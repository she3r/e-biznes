package discordbot

data class DiscordBotToken(val token: String){
    override fun toString(): String {
        return "Bot $token"
    }
}