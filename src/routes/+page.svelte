<script lang="ts">
	import { io } from "socket.io-client";
	import {
		checkForCyberBullying,
		type Conversation,
	} from "$lib/utils/functions";

	const socket = io(); let message = ""; let name = "";
	let messages: Conversation[] = [];

	$: {
		if (messages.length > 0) {
			checkForCyberBullying(messages, {
				target: "contextual",
				targetType: "general",
			});
		}
	}

	socket.on("eventFromServer", (message) => {
		messages = [...messages, message];
		console.log(message);
	});

	function SendMsg() {
		socket.emit("eventFromClient", {
			message: message,
			speaker: name,
			timestamp: new Date().toISOString(),
		} as Conversation);
		message = "";
		name = "";
	}
</script>

<h4>Page</h4>

{#each messages as message}
	<p class="font-bold">
		{message.speaker} -> {message.message}
	</p>
	<sub>{new Date(message.timestamp).toLocaleTimeString()}</sub>
{/each}

<form style="display: flex; flex-direction: column; width: 100%;">
	<input
		required
		name="message"
		type="text"
		placeholder="Enter your name"
		bind:value={name}
	/>
	<input
		required
		type="text"
		placeholder="Enter your message"
		bind:value={message}
	/>
	<button type="submit" on:click={SendMsg}>Send</button>
</form>
