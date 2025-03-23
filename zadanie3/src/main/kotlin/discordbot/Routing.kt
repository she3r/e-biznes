package discordbot

import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.request.*
import io.ktor.server.response.*
import io.ktor.server.routing.*

fun Application.configureRouting() {
    routing {
        get("/") {
            call.respondText("Hello World!")
        }
        post("submit-message"){
            val message = call.parameters["message"] ?: throw IllegalArgumentException("message missing");
            val channelId = environment.config.property("discord.channelid").getString();
            val botToken = environment.config.property("discord.bottoken").getString();
            val response = DiscordClient.sendMessageToDiscord(DiscordMessage(message), channelId, DiscordBotToken(botToken));
            if(response.status.isSuccess()){
                //call.respond(HttpStatusCode.OK, mapOf("message" to "Sucessfully sent message: $message!"));
                call.respond(HttpStatusCode.OK);
            }
            else{
                call.respond(response.status);
                //call.respond(response.status, mapOf("message" to "Sending failed of message: $message "));
            }
        }
    }
}
