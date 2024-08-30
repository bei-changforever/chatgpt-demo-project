import http from ".";

interface BotResArg {
    msgCount: string,
    key: string
}
export const Api = {
    // getBotRes: ({ msgCount, key }: BotResArg) => {
    //     return http.post('/v1/completions',
    //         {
    //             prompt: msgCount, max_tokens: 2048, model: "text-davinci-003"
    //         },
    //         {
    //             headers: { 'content-type': 'application/json', 'Authorization': 'Bearer ' + key }
    //         })

    // }
}