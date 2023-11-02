/**
 * This file is the entry point for the AI module, which contains
 * various AI models that will be used to generate startup ideas.
 * 
 * Current Models:
 * - ChatGPT: a request handler to the ChatGPT API, allowing for LLM generation.
 */

import { ChatGPT, GPTModel } from "./chatgpt.model";


export { ChatGPT, GPTModel };
