/**
 * This module contains utility functions for displaying various things.
 */
import React, { ReactElement } from 'react';


/**
 * Splits the text into lines and wraps each line in <br/> tags.
 * 
 * @param text the text to split into lines and wrap in <br/> tags.
 * @returns the react elements with the text split into lines and wrapped in <br/> tags.
 */
function splitLines(text: string): ReactElement[] {
    return text.split(/\n/).map((line, index) => <React.Fragment key={index}>{line}<br/></React.Fragment>)
}


export {
    splitLines,
}
