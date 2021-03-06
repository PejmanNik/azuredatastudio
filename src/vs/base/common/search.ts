/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the Source EULA. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import * as strings from './strings';

export function buildReplaceStringWithCasePreserved(matches: string[] | null, pattern: string): string {
	if (matches && (matches[0] !== '')) {
		if (matches[0].toUpperCase() === matches[0]) {
			return pattern.toUpperCase();
		} else if (matches[0].toLowerCase() === matches[0]) {
			return pattern.toLowerCase();
		} else if (strings.containsUppercaseCharacter(matches[0][0])) {
			if (validateSpecificSpecialCharacter(matches, pattern, '-')) {
				return buildReplaceStringForSpecificSpecialCharacter(matches, pattern, '-');
			} else {
				return pattern[0].toUpperCase() + pattern.substr(1);
			}
		} else {
			// we don't understand its pattern yet.
			return pattern;
		}
	} else {
		return pattern;
	}
}

function validateSpecificSpecialCharacter(matches: string[], pattern: string, specialCharacter: string): boolean {
	const doesConatinSpecialCharacter = matches[0].indexOf(specialCharacter) !== -1 && pattern.indexOf(specialCharacter) !== -1;
	return doesConatinSpecialCharacter && matches[0].split(specialCharacter).length === pattern.split(specialCharacter).length;
}

function buildReplaceStringForSpecificSpecialCharacter(matches: string[], pattern: string, specialCharacter: string): string {
	const splitPatternAtSpecialCharacter = pattern.split(specialCharacter);
	const splitMatchAtSpecialCharacter = matches[0].split(specialCharacter);
	let replaceString: string = '';
	splitPatternAtSpecialCharacter.forEach((splitValue, index) => {
		replaceString += buildReplaceStringWithCasePreserved([splitMatchAtSpecialCharacter[index]], splitValue) + specialCharacter;
	});

	return replaceString.slice(0, -1);
}
