/**
 * @fileoverview This file contains the prompt generator function that will be used to generate the prompts
 * to be used in conjunction with the AI model.
 */


/**
 * This function generates the prompt to be used in conjunction with the AI model.
 * 
 * @param industries the industries that the user is interested in
 * @param hobbies the hobbies that the user is interested in
 * @param ideaDetails the details specific to the ideas that the user is interested in
 * @returns the prompt to be used in conjunction with the AI model
 */
function generateIdeaPrompt(industries: string[], hobbies: string[], ideaDetails: string): string {
    const industriesString: string = industries.join(', ');
    const hobbiesString: string = hobbies.join(', ');

    const prompt: string = `
        Please provide a list of startup ideas with explicit details about the idea, along with the
        reason for the idea.
        
        I am interested in the following industries: ${industriesString}. I am also
        interested in the following hobbies: ${hobbiesString}.

        Additionally, please take into account the following details about the ideas I am interested in
        pursuing: ${ideaDetails}.
    `

    return prompt;
}


export { generateIdeaPrompt };
