/**
 * @fileoverview The GPT chatbot model.
 */
import axios from 'axios';

import { Request } from './types';


/**
 * The models for the GPT chatbot.
 * 
 * Models:
 * - GPT_35_TURBO: 1.3B parameters, 256 sequence length, 12 attention heads.
 * - GPT_35_TURBO_16K: 1.3B parameters, 16 sequence length, 12 attention heads.
 * - GPT_4: 6B parameters, 256 sequence length, 16 attention heads.
 */
enum GPTModel {
    GPT_35_TURBO="gpt-3.5-turbo",
    GPT_35_TURBO_16K="gpt-3.5-turbo-16k",
    GPT_4="gpt-4",
}


/**
 * The request data for the GPT chatbot.
 * 
 * @property model The model to use for the GPT chatbot.
 * @property messages The messages to send to the GPT chatbot.
 * @property messages.role The role of the message.
 * @property messages.content The content of the message.
 * @property temperature The temperature to use for the GPT chatbot (0-1).
 */
interface GPTRequestData {
    model: string;
    messages: [
        {
            role: string;
            content: string;
        }
    ];
    temperature: number;
}


/**
 * The response choice for the GPT chatbot.
 * 
 * @property finish_reason The reason for the finish.
 * @property index The index of the response.
 * @property message The message of the response.
 * @property message.content The content of the message.
 * @property message.role The role of the message.
 */
interface GPTResponseChoice {
    finish_reason: string;
    index: number;
    message: {
        content: string;
        role: string;
    }
}


/**
 * The response data from the GPT chatbot.
 * 
 * @property choices The choices from the GPT chatbot.
 * @property created The time the response was created.
 * @property id The id of the response.
 * @property model The model used for the GPT chatbot.
 * @property object The object of the response.
 */
interface GPTResponseData {
    choices: GPTResponseChoice[];
    created: number;
    id: string;
    model: string;
    object: string;
}


/**
 * The GPT chatbot.
 * 
 * @private_property url The url for the GPT chatbot.
 * @private_property token The api token for the GPT chatbot.
 * 
 * @private_method generateGptRequest Generates a request for the GPT chatbot.
 * 
 * @public_method ask Sends a prompt to the GPT chatbot and returns the response.
 */
class ChatGPT {
    private url: string;
    private token: string;

    /**
     * Creates a new GPT chatbot.
     * 
     * @param token The api token for the GPT chatbot.
     * @param url The optiona url for the GPT chatbot. Defaults to 'https://api.openai.com/v1/chat/completions'.
     */
    constructor(token: string, url?: string) {
        this.token = token;
        this.url = url ? url : 'https://api.openai.com/v1/chat/completions';
    }

    /**
     * Generates a request for the GPT chatbot.
     * 
     * @param promp The prompt to send to the GPT chatbot.
     * @param model The model to use for the GPT chatbot.
     * @param temperature The temperature to use for the GPT chatbot (0-1).
     * @returns The generated request.
     */
    private generateGptRequest(prompt: string, model: string, temperature: number = 0): Request<GPTRequestData> {
        const request: Request<GPTRequestData> = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.token}`,
            },
            data: {
                model: model,
                messages: [
                    {
                      role: "user",
                      content: prompt
                    },
                ],
                temperature: temperature,
            },
        };

        return request;
    }

    /**
     * Sends a prompt to the GPT chatbot and returns the response.
     * 
     * @param prompt the prompt to send to the GPT chatbot.
     * @param model the model to use for the GPT chatbot.
     * @param temperature the temperature to use for the GPT chatbot (0-1).
     * @returns the response from the GPT chatbot.
     */
    async ask(prompt: string, model: string = GPTModel.GPT_35_TURBO, temperature: number = 0): Promise<GPTResponseData> {
        const request = this.generateGptRequest(prompt, model, temperature);
        const response = await axios.post<GPTResponseData>(
            this.url, request.data, { headers: request.headers }
        );

        return response.data;
    }
}


export { ChatGPT, GPTModel };
