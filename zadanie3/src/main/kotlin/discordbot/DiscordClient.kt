package discordbot

import io.ktor.client.*
import io.ktor.client.engine.cio.*
import io.ktor.client.request.*
import io.ktor.client.statement.*
import io.ktor.http.*
import kotlinx.serialization.json.Json

object DiscordClient {
    private val client = HttpClient(CIO)

    suspend fun sendMessageToDiscord(message: DiscordMessage, channelId: String, botToken: DiscordBotToken): HttpResponse {
        val jsonMessage = Json.encodeToString(DiscordMessage.serializer(), message)

        val response: HttpResponse = client.post("https://discord.com/api/v9/channels/$channelId/messages") {
            header("Authorization", botToken.token)
            contentType(ContentType.Application.Json)
            setBody(jsonMessage)
        }
        return response;
    }
}