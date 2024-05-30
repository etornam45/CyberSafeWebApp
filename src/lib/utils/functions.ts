export interface Conversation {
    speaker: string;
    message: string;
    timestamp: string;
}

interface Options {
    target: string;
    targetType: string;
}

export function checkForCyberBullying(conversations: Conversation[], options: Options) {
    return fetch('http://127.0.0.1:3400/CyberBullying?stream=true', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            data: {
                conversationHistory: conversations,
                type: options.target,
                targetType: options.targetType
            }
        })
    })
        .then(response => response.json())
}